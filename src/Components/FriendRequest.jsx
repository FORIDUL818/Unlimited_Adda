import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";



const FriendRequest = () => {
    const data =useSelector((state)=>state.userLoginInfo.user)
    const [FriendRequest,setFriendRequstList]=useState([])
      const db=getDatabase()


     useEffect(()=>{
       
     const friendRef=ref(db,"friendRequest")
        onValue(friendRef,(snapshot)=>{
            const list=[]
          snapshot.forEach((item)=>{
              if(item.val().reseverId==data.uid){
                list.push({...item.val(),id:item.key})
               
            }
          })  
          setFriendRequstList(list)
        })
    },[])

    // handleFriendrequestAccept start 
    const handleFriendrequestAccept=(item)=>{
     set(push(ref(db, 'friend/')),{...item})
     .then(()=>{
      remove(ref(db, 'friendRequest/'+item.id))
     })
    }
    return (
        <div className="UserList">
        
        <div className="UserContent">
            <div className="title">
                <h1 >FriendRequest</h1>
                <BsThreeDotsVertical/>
            </div>
         {
           FriendRequest.map((item)=>{
            return (
                <div key={item} className="userName_pic">
                <div className=" userName_picRapper">
                <div className="  UserProfilePic overflow-hidden">
                    <ProfilePic id={data.uid==item.senderId?item.reseverId:item.senderId}/>
                </div>
                <div className=" flex flex-col justify-center ">
                    <h1>{item.senderName}</h1>
                    <h3>hellow.....</h3>
                </div>
                </div>
                
                <div className=" flex justify-center items-center ">
                <button onClick={()=>handleFriendrequestAccept(item)} className=" btn_v_2 mr-2" >accept</button>
                <button id="btnBlock" >Cansel</button>
                </div>
            </div>
            )
           }) 
         }
            
            </div>
        </div>
        
    
    );
};

export default FriendRequest;