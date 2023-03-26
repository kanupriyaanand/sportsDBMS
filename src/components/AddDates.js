import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';


const style = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35vw",
    bgcolor: "black",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };


const AddDates = ({ open, handleClose, data, docId }) => {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector(selectUser);
  const [sportNames, setSportNames]= useState([]);
  
  useEffect(async() => {
    const CollectionR = collection(db, `sports`);
    const col = await getDocs(CollectionR);
    col.forEach((col) => {
     setSportNames(col.data().Game)
    })
  }, [])
  
  const onSubmit = async (dataForm) => {
    console.log(dataForm);
    try {
      const CollectionRef = doc(db, `TryoutDates/${dataForm.gameName}`);
      await setDoc(CollectionRef, dataForm);
      toast.success("Updated Successfully");
      reset();

      const collectionRef = collection(db, dataForm.Date);
     
        
    //    await addDoc(collectionRef, { ...data, dataForm });
    
        
      
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
          <Typography id="modal-modal-title" color="white" variant="h6" component="h2">
            Add Date
          </Typography>
          <div className="mt-2">
            <form
              className="flex flex-col justify-center space-y-5 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              

              

            <select
                className="px-3 py-2 rounded-md"
                {...register("gameName")}
                required
              >
                <option value={null} selected disabled hidden>
                  Select Sport
                </option>

              {
                sportNames?.map((e)=><option value={e.toLowerCase()||""}>{e}</option>)
              }
              </select>

              <input
                className="px-3 py-2 rounded-md"
                type="date"
                {...register("Date")}
                placeholder="enter try-out date"
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

export default AddDates
