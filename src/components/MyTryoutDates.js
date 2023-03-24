import { Box, Modal, Typography } from '@mui/material';
import React from 'react'
import { Toaster } from 'react-hot-toast';


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



const MyTryoutDates = ({ open, handleClose }) => {
  return (
    <>
       <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dates for try-outs
          </Typography>
          
         
          <div className="mt-2">
          <table className="table overflow-x-auto" id="data-table">
          <thead>
            <tr className="grid-cols-2">
              <th className="px-4 py-2 whitespace-nowrap">Game</th>
              <th className="px-2 py-2 whitespace-nowrap">Date</th>

            </tr>
          </thead>

          
        </table>
           
          </div>
          
        </Box>
      </Modal>
    </>
  )
}

export default MyTryoutDates
