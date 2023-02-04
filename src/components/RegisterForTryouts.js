import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  maxWidth: 700,
  p: 4,
};

const RegisterForTryouts = ({ open, handleClose, data, docId }) => {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector(selectUser);

  const onSubmit = async (dataForm) => {
    console.log(dataForm);
    try {
      const CollectionRef = doc(db, "studentUsers", docId);
      await updateDoc(CollectionRef, dataForm);
      reset();

      const collectionRef = collection(db, dataForm.gameName);

      const checkForDuplicate = async () => {
        const docSnap = await getDocs(
          query(collectionRef, where("Email", "==", user.email))
        );
        if (docSnap.empty) {
          await addDoc(collectionRef, { ...data, dataForm });
          toast.success("Registered Successfully");
        } else {
          toast.error("User already registered");
        }
      };
      checkForDuplicate();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registration For Try-Outs
          </Typography>
          <div className="mt-2">
            <form
              className="flex flex-col justify-center space-y-5 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                className="px-3 py-2 rounded-md"
                placeholder={data?.First_name + " " + data?.Last_name}
                disabled
              />

              <input
                type="text"
                className="px-3 py-2 rounded-md"
                placeholder={data?.Email}
                disabled
              />
              <input
                type="text"
                className="px-3 py-2 rounded-md"
                placeholder={data?.Mobile_number}
                disabled
              />
              <input
                className="px-3 py-2 rounded-md"
                type="text"
                placeholder={data?.gender}
                disabled
              />

              <input
                className="px-3 py-2 rounded-md"
                type="text"
                placeholder={data?.semester}
                disabled
              />

              <input
                className="px-3 py-2 rounded-md"
                type="text"
                placeholder={data?.department}
                disabled
              />

              <select
                className="px-3 py-2 rounded-md"
                {...register("gameName")}
                required
              >
                <option value={null} selected disabled hidden>
                  Select Sport
                </option>
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="basketball">BasketBall</option>
                <option value="basketball">Badminton</option>
                <option value="basketball">Gymnastics</option>
                <option value="basketball">Yoga</option>
              </select>
              <select
                className="px-3 py-2 rounded-md"
                {...register("ageGroup")}
                required
              >
                <option value={null} selected disabled hidden>
                  Select Age Group
                </option>
                <option value="u18">Under 18</option>
                <option value="u21">Under 21</option>
                <option value="u24">Under 24</option>
              </select>
              <button
                className="px-3 py-2 rounded-md bg-blue-900 text-white"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default RegisterForTryouts;
