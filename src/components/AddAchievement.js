import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { collection, doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "grey",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };



const AddAchievement = ({ open, handleClose, data, docId }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const user = useSelector(selectUser);
    
    const onSubmit = async (dataForm) => {
    
      try {
        const CollectionRef = doc(db, `Achievements/${dataForm.Name}`);
        await setDoc(CollectionRef, dataForm);
        toast.success("Updated Successfully");
        reset();
  
        const collectionRef = collection(db, dataForm.Date);
       
          
      //    await addDoc(collectionRef, { ...data, dataForm });
      
          
        
        handleClose();
      } catch (e) {
   
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
              Add Achievement
            </Typography>
            <div className="mt-2">
              <form
                className="flex flex-col justify-center space-y-5 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                
  
                <input
                  className="px-3 py-2 rounded-md"
                  type="text"
                  {...register("Name",{ required: true, maxLength: 80, pattern: {
                    value: /^[A-Za-z ]*$/,
                    message: "only characters to be entered",
                  }})}
                  placeholder="Enter student name"
                  required
                />
  <div className="text-red-700">{errors.First_name?.message}</div>
                <input
                  className="px-3 py-2 rounded-md"
                  type="text"
                  {...register("Game",{ required: true, maxLength: 80, pattern: {
                    value: /^[A-Za-z ]*$/,
                    message: "only characters to be entered",
                  }})}
                  placeholder="enter sport"
                  required
                />
  <div className="text-red-700">{errors.First_name?.message}</div>
  <select
          className="px-3 py-2 rounded-md"
          {...register("department")}
          required
        >
          <option value={null} selected disabled hidden>
          Select Department
          </option>
          <option value="AS">AS</option>
          <option value="AIML">CS</option>
          <option value="CH">CH</option>
          <option value="CS">CS</option>
          <option value="CV">CV</option>
          <option value="DS">DS</option>
          <option value="EC">EC</option>
          <option value="EE">EE</option>
          <option value="EI">EI</option>
          <option value="ET">ET</option>
          <option value="IS">IS</option>
          <option value="IM">IM</option>
          <option value="ME">ME</option>
          <option value="MCA">MCA</option>
          <option value="M.Tech">M.Tech</option>

        </select>
                <input
                  className="px-3 py-2 rounded-md"
                  type="number"
          min={1}
          max={8}
                  {...register("Semester", {
                    required: true,
                    maxLength: { value: 1, message: "enter a number between 1 and 8" },
                    min: {
                      value: 1,
                      message: "Enter a value greater than or equal to 1",
                    },
                    max: {
                      value: 8,
                      message: "Enter a value less than or equal to 8",
                    },
                  })}
                  placeholder="semester"
                  
                />
                <div className="text-red-700">{errors.semester?.message}</div>
                <input
                  className="px-3 py-2 rounded-md"
                  type="text"
                  {...register("Venue")}
                  placeholder="enter venue"
                  required
                />
                <input
                  className="px-3 py-2 rounded-md"
                  type="text"
                  {...register("rank")}
                  placeholder="enter rank"
                  required
                />
  
              
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
    )
}

export default AddAchievement
