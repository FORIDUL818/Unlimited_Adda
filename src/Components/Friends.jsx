import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";
import { activeSlice } from "../Redux/ActiveSlice";

const Friends = () => {
    const db=getDatabase()
    const dispatch=useDispatch()
    const data =useSelector((state)=>state.userLoginInfo.user)
    const [friendList,setFriendList]=useState([]);
    console.log(friendList)
    useEffect(()=>{
      const friendref=ref(db,"friend/")

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

    // handleUfriend start
     const handleUfriend=(item)=>{
      remove(ref(db, 'friend/'+item.id))

     }
    // handleUfriend end
    // handleblogFriend start
       const handleblogFriend=(item)=>{
         if(data.uid==item.senderId) {
            set(push(ref(db,"block/")),{
              block:item.reseverName,
              blockId:item.reseverId,
              blockBy:item.senderName,
              blockById:item.senderId,
              
            }).then(()=>{
              remove(ref(db, 'friend/'+item.id))
            })
         }else{
           set(push(ref(db,"block/")),{
            block:item.senderName,
            blockId:item.senderId,
            blockBy:item.reseverName,
            blockById:item.reseverId,
           }).then(()=>{
            remove(ref(db,'friend/'+item.id))
          })
         }
       }
    // handleblogFriend end
   
    // handleActiveFriend start 
    const handleActiveFriend=(item)=>{
      console.log(item)

      if(item.reseverId===data.uid){
        
        dispatch(activeSlice({status:"single",Id:item.senderId,Name:item.senderName}))
        localStorage.setItem("activeFriend",JSON.stringify({Id:item.senderId,Name:item.senderName}))
         
      }else{
        dispatch(activeSlice({status:"single",Id:item.reseverId,Name:item.reseverId}))
        localStorage.setItem("activeFriend",JSON.stringify({Id:item.senderId,Name:item.senderName}))
         
      
      }
      
    }
    // handleActiveFriend end

    return (
        <div className="UserList ">
      
      <div className="UserContent">
            <div className="title flex justify-between">
                <h1 >Friends</h1>
                <BsThreeDotsVertical/>
            </div>
        {
          friendList.map((item)=>{
           
            

            return(
                <div onClick={()=>handleActiveFriend(item)} key={item} className=" cursor-pointer userName_pic flex justify-between mb-2 bg-fith p-3">
                <div className=" userName_picRapper">
                <div className=" UserProfilePic w-[80px] mb-2 mt-4 h-[80px] rounded-full overflow-hidden">
                <ProfilePic id={data.uid==item.senderId?item.reseverId:item.senderId}/>
                </div>
                <div className=" flex flex-col justify-center text-primay">
                    {
                        data.uid==item.senderId?
                        <h1>{item.reseverName}</h1>:
                        <h1>{item.senderName}</h1>

                    }
                    <h3>hellow.....</h3>
                </div>
                </div>
                
                <div className=" flex justify-center items-center mt-[-50px] ">
                <button onClick={()=>handleUfriend(item)} className="btn_v_2 mr-2 ">UnFriends</button>
                <button onClick={()=>handleblogFriend(item)} id="btnBlock">Block</button>
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