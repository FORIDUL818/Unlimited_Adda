import  { useEffect, useState } from 'react';
import { getDownloadURL, getStorage,ref, } from 'firebase/storage';
import profleImgae from '../imgases/832.jpg'
const ProfilePic = ({id}) => {


    const [profilePicture,setprofilePicture]=useState('')
    const storage=getStorage();
    const imgref=ref(storage,id);
    useEffect(()=>{
        getDownloadURL(imgref)
        .then((downloadURL)=>{
            setprofilePicture(downloadURL)
        })
    },[])
    return (


        <div>
       
           {
            profilePicture?
            <img src={profilePicture} alt="" />:
            <img src={profleImgae}/>
           }
        </div>
    );
};

export default ProfilePic;