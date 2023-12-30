
import { useSelector } from "react-redux";
import BlockUser from "../Components/BlockUser";
import FriendRequest from "../Components/FriendRequest";
import Friends from "../Components/Friends";
import GroupList from "../Components/GroupList";
import Mygroup from "../Components/Mygroup";
import UserList from "../Components/UserList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate=useNavigate()
    const data =useSelector((state)=>state.userLoginInfo.user)
    useEffect(()=>{
        if(!data){
         navigate('/login')
        }
        if(data){
         navigate('/home')
        }
    },[])

    return (
        <div className=" h-screen  bg-fourth">
            <div className="HomePage">
            <GroupList/>
            <Friends/>
            <UserList/>
            <FriendRequest/>
            <Mygroup/>
             <BlockUser/>
        </div>
        </div>
    );
};


export default Home;