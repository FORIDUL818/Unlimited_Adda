import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";

const Friends = () => {
    const db=getDatabase()
    const data =useSelector((state)=>state.userLoginInfo.user)
    const [friendList,setFriendList]=useState([]);
    console.log(friendList)
    useEffect(()=>{
      const friendref=ref(db,"friend")

        onValue(friendref,(snapshot)=>{
            const list=[]
           snapshot.forEach((item)=>{
            if(data.uid==item.val().reseverId || data.uid==item.val().senderId){
            list.push({...item.val(),id:item.key})
            }
           })
           setFriendList(list)
        })
        
    },[])
    return (
        <div className="UserList">
      
      <div className="UserContent">
            <div className="title">
                <h1 >Friends</h1>
                <BsThreeDotsVertical/>
            </div>
        {
          friendList.map((item)=>{
            return(
                <div key={item} className="userName_pic">
                <div className=" userName_picRapper">
                <div className=" UserProfilePic overflow-hidden">
                <ProfilePic id={data.uid==item.senderId?item.reseverId:item.senderId}/>
                </div>
                <div className=" flex flex-col justify-center ">
                    {
                        data.uid==item.senderId?
                        <h1>{item.reseverName}</h1>:
                        <h1>{item.senderName}</h1>

                    }
                    <h3>hellow.....</h3>
                </div>
                </div>
                
                <div className=" flex justify-center items-center ">
                <button className="btn_v_2 mr-2 ">UnFriends</button>
                <button id="btnBlock">Block</button>
                </div>
            </div>
            )
          })  
        }
     </div>
    </div>
    );
};

export default Friends;