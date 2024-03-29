import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";

const UserList = () => {
  const db = getDatabase();
  const [userList, setuserList] = useState([]);
  const [friendRequstList, setFriendRequstList] = useState([]);
  const [FriendList, setFriendList] = useState([]);

  const data = useSelector((state) => state.userLoginInfo.user);
  // get all users from database

  useEffect(() => {
    const userRef = ref(db, "user/");
    onValue(userRef, (snapshot) => {
      const list1 = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          list1.push({ ...item.val(), id: item.key});
        }
      });
      setuserList(list1);
    });
  }, []);

  // friendRequestsend

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      senderId: data.uid,
      reseverId: item.id,
      senderName: data.displayName,
      reseverName: item.username,
    });
  };

  // get friendrequest list
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      let friendRequest = [];
      snapshot.forEach((item) => {
        friendRequest.push(item.val().reseverId + item.val().senderId);
      });
      setFriendRequstList(friendRequest);
    });
  }, []);

  useEffect(() => {
    const friendListref = ref(db, "friend/");
    onValue(friendListref, (snapshot) => {
      const friendRequest = [];
      snapshot.forEach((item) => {
        friendRequest.push(item.val().reseverId + item.val().senderId);
      });
      setFriendList(friendRequest);
    });
  }, []);

  return (
    <div className="UserList">
      <div className="UserContent">
        <div className="title">
          <h1>UserList</h1>
          <BsThreeDotsVertical />
        </div>

        {userList.map((item) => {
          return (
            <div key={item} className="userName_pic">
              <div className=" userName_picRapper">
                <div className=" UserProfilePic">
                  <div className="img overflow-hidden rounded-full">
                    <ProfilePic id={item.id} />
                  </div>
                </div>
                <div className=" flex flex-col justify-center ">
                  <h1>{item.username}</h1>
                  <h3>hellow.....</h3>
                </div>
              </div>

              <div className=" flex justify-center items-center ">
                {FriendList.includes(item.id + data.uid) ||
                FriendList.includes(data.uid + item.id) ? (
                  <button className="btn_v_2 !bg-seventh">friend</button>
                ) : friendRequstList.includes(item.id + data.uid) ||
                  friendRequstList.includes(data.uid + item.id) ? (
                  <button className="btn_v_1">Send Requst</button>
                ) : (
                  <button
                    className="btn_v_2"
                    onClick={() => handleFriendRequest(item)}
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
