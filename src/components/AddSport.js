import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {  arrayUnion, doc, updateDoc } from 'firebase/firestore';
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
    bgcolor: "black",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };




const AddSport = ({ open, handleClose, data, docId }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (dataForm) => {
      console.log(dataForm);
      try {
        const CollectionRef = doc(db, "sports", "NdzFxfaLpUAjWpuxbRnq");
        console.log(CollectionRef)
        await updateDoc(CollectionRef, {
            Game: arrayUnion(dataForm.Name)
        });
        
        toast.success("Updated Successfully");
        reset();
  
        
       
          
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
          <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
            Add new sport
          </Typography>
          <div className="mt-2">
            <form
              className="flex flex-col justify-center space-y-5 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              
              <input
                className="px-3 py-2 rounded-md"
                type="text"
                {...register("Name")}
                placeholder="Enter new sport"
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
};

export default AddSport;
