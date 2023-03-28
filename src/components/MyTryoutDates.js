import { Box, Modal, Typography } from '@mui/material';
import { collection, getDocs, getFirestore, query, where, listCollections } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%", 
    transform: "translate(-50%, -50%)",
    width: "20vw",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };



const MyTryoutDates = ({ open, handleClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const [docId, setDocId] = useState("");
  const [data1, setData1] = useState([]);
  const [games, setMyGames] = useState([])
  const user = useSelector(selectUser);
  const [sportNames, setSportNames]= useState([]);
  const [matchedDates, setMatchedDates] = useState([])
  var [tryout, setTryout] = useState("")
  let tryoutDates = []
  let dates = [];
  const [data, setData] = useState([]);
 
  const getSportdata= async() => {
    const CollectionR = collection(db, `sports`);
    const col = await getDocs(CollectionR);
    col.forEach((col) => {
     setSportNames(col.data().Game)}
    )};
  
    const getUserDataagain = async() => {
      const userData = collection(db, "studentUsers");
      const docSnap = await getDocs(
        query(userData, where("Email", "==", user.email))
      );
      docSnap.forEach((doc) => calling(doc.data(), doc.id));
    };
    

  const getDates= async() => {
    const querySnapshot = await getDocs(query(collection(db, "TryoutDates")));
    querySnapshot.forEach((doc) => {
      dates.push(doc.data());
    });
    
    setData(dates);
  };
  const calling = (d, id) => {
        setData1(d);
        setDocId(id);
        
      };

  useEffect(()=>{
    getDates();
    getSportdata();
    getSports();
    getUserDataagain();
    setMyGames(tryoutDates)
    setMatchedDates(getMatch(data, games))
  }, [data])

  const getSports = () => {
    sportNames.forEach(async (e)=> {
    const newColl = collection(db, e)
    const col = await getDocs(
      query(newColl, where('Email',"==", user.email))
    )
    col.forEach(async (doc) => { 
      tryoutDates.push(doc.data().dataForm.gameName)      
    })
    })
}
  const getMatch = (a, b) => {
    var matches = [];
    for ( var i = 0; i < a.length; i++ ) {
      for ( var e = 0; e < b.length; e++ ) {
            if ( a[i].gameName === b[e] ) matches.push( a[i] );
        }
    }
    return matches;
}


 
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
          {matchedDates.map((item) => (
            <tr id={item.Name}>
              <td className="grid-cols-6 text-center">{item.gameName}</td>
              <td className="px-3 py-2  whitespace-nowrap">{item.Date}</td>
              
            </tr>))}
          
        </table>
           
          </div>
          
        </Box>
      </Modal>
    </>
  )
}

export default MyTryoutDates
