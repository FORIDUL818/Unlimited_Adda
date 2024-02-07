import { getDatabase, ref, onValue, push, set} from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";


const GroupList = () => {
    const [groupList,setgroupList]=useState([])
    const data =useSelector((state)=>state.userLoginInfo.user)
    const [groupName,setgroupName]=useState('')
    const [groupInro,setgroupIntro]=useState('')
    const [show,setshow]=useState(false)
    // error handle mgs start
       const [groupNameerrmgs,setgroupNameerrmgs]=useState('')
       const [groupIntroerrmgs,setgroupIntroerrmgs]=useState('')
    
       const db=getDatabase()
    // error handle mgs end
    // handleGroup start
        const handleGroup=()=>{
            // errorHandaling start
          
        if( groupName===''){
          setgroupNameerrmgs(" please inter your GroupName is emty")
        } 
        if(groupInro && groupName===groupInro.value && groupName.value){
               alert("this name group already created")
        }
        if(groupInro===""){
            setgroupIntroerrmgs("please inter your GroupIntro is emty")
        }else{
            set(push(ref(db,"groups")),{
                groupName:groupName,
                groupInro:groupInro,
                adminId:data.uid,
                adminName:data.displayName
              }).then(()=>{
                setshow(!show)
                setgroupIntro('')
                setgroupName('')
              })
       
        }
        }
        
          // errorHandaling end
            
          

    // handleGroup end 
    useEffect(()=>{
      
        const groupref=ref(db,"groups")
        onValue(groupref,(snapshot)=>{
            const list=[]
            snapshot.forEach((item)=>{
              if(data.uid !=item.val().adminId){
              list.push({...item.val(),id:item.key})
              }
            })
            setgroupList(list)
        })
    },[])
 

    //   handleGroupJoin start
         const handleGroupJoin=(item)=>{
            set(push(ref(db,"groupjoinRequest")),{
                groupId:item.id,
                groupName:item.groupName,
                adminId:item.adminId,
                adminName:item.adminName,
                userId:data.uid,
                userName:data.displayName
            }).then(()=>{
                alert("testing parpes")
            })
         }
    //  handleGroupJoin end
    return (
        <div className="UserList">
        
        <div className="UserContent">
            <div className="title">
                <h1 > GroupList</h1>
             <button className=" bg-sixth pl-2 pr-2 rounded-lg" onClick={()=>setshow(!show)}>{show?"Back":"CREATE"}</button>
            </div>
            {
                show?
                 <div className=" flex flex-col gap-2 pt-4 bg-sixth">
                    <input type="text" onChange={(e)=>{
                        setgroupName(e.target.value)
                        setgroupNameerrmgs('')

                    }} placeholder="enter your groupName" className=" p-2 shadow-lg rounded-md text-[#000]"/>
                    <h3 className=" text-[red]">{groupNameerrmgs}</h3>
                    <input type="text" onChange={(e)=>{
                        setgroupIntro(e.target.value)
                        setgroupIntroerrmgs('')
                    }} placeholder=" enter your groupName" className=" p-2 shadow-lg rounded-md text-[#000]"/>
                    <h3 className=" text-[red]"> {groupIntroerrmgs} </h3>
                    {
                        groupName && groupInro ?
                        <button className=" bg-seventh mb-3 p-1 uppercase" onClick={handleGroup}>create</button>
                        :
                    <button className=" bg-seventh mb-3 p-1 uppercase opacity-[0.4] cursor-default">create</button>
                    }
                    
                 </div>
                :
             groupList.map((item)=>{
                return (
                    <div key={item} className="userName_pic">
                    <div className=" userName_picRapper">
                    <div className=" UserProfilePic overflow-hidden">
                    <ProfilePic id={data.uid}/>
                    </div>
                    <div className=" flex flex-col justify-center ">
                        <h4 className="mb-2 text-[#88bfc4]"><span className=" uppercase">admin</span>: {item.adminName}</h4>
                        <h1>{item.groupName}</h1>
                        <h3>{item.groupInro}</h3>
                    </div>
                    </div>
                    
                    <div className=" flex justify-center items-center ">
                    <button className="btn_v_2" onClick={()=>handleGroupJoin(item)}>Join</button>
                    </div>
                </div>
                )
             })
            }
           
            
        </div>
        
    </div>
    );
};

export default GroupList;