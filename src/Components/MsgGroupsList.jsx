import { getDatabase, onValue, ref, } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const MsgGroupsList = () => {
    const db=getDatabase()
    const data =useSelector((state)=>state.userLoginInfo.user)

    const [groupList,setgrouptList]=useState([])

    useEffect(()=>{
       
        const groupref=ref(db,"groups")
        onValue(groupref,(shanpshot)=>{
            let list=[]
            shanpshot.forEach((item)=>{
              if(data.uid==item.val().adminId){
                 list.push({...item.val(),id:item.key})
            }
            })
            setgrouptList(list)
        })
    
    },[])

    
    return (
        <div className="UserList ">
      
        <div className="UserContent">
              <div className="title flex justify-between">
                  <h1 >Group List</h1>
                  <BsThreeDotsVertical/>
              </div>
          {
            groupList.map((item)=>{
              return(
                  <div key={item} className="userName_pic flex justify-between bg-fith p-3 h-[200px]">
                  <div className=" userName_picRapper">
                  <div className=" UserProfilePic w-[80px]  mb-2 mt-4 h-[80px] rounded-full overflow-hidden">
                 
                  </div>
                  <div className=" flex flex-col justify-center mt-[-80px] text-primay">
                      <div className=" h-[80px] mb-[60px] w-[80px] flex rounded-full justify-center items-center bg-secondary">
                           <h1 className=" text-5xl text-[green]">{item.groupName[0]}</h1>
                      </div>
                      <div className=" mt-[-50px] ml-2">
                        <h1> Admin: {item.adminName}</h1>
                        <h1>{item.groupName}</h1>
                        <h1>{item.groupInro}</h1>
                      </div>
                  </div>
                  </div>
                  
                  <div className=" flex justify-center items-center mt-[-20px] ">
                  <button id="btnBlock">massege</button>
                  </div>
              </div>
              )
            })  
          }
       </div>
      </div>
    );
};

export default MsgGroupsList;