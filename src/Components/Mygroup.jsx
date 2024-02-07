import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";

const Mygroup = () => {
  const data = useSelector((state) => state.userLoginInfo.user);
  const db = getDatabase();
  const [mygroupList, setMygroupList] = useState([]);
  const [show, setshow] = useState(false);
  const [showGroupMember, setshowGroupMember] = useState(false);
  const [groupJoinRequestList, setgroupJoinRequestList] = useState([]);

  useEffect(() => {
    const mygroupref = ref(db, "groups");

    onValue(mygroupref, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setMygroupList(list);
    });
  }, []);
  //   handle gourp start
  const handleGroup = (itemgroup) => {
    setshowGroupMember(!showGroupMember);
    console.log(itemgroup);
  };
  //   handle gourp  end

  //   handleGroupRequest start
  const handGroupRequest = (group) => {
    setshow(!show);
  console.log(group)
    const friendRequestRef = ref(db, "friendJoinRequest");
    onValue(friendRequestRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId && item.val().groupId == group.id) {
          list.push({ ...item.val(), id:item.key});
        }
      });
   setgroupJoinRequestList(list);
   console.log(groupJoinRequestList)
    });
  };
  //   handleGroupRequest end
  return (
    <div className="UserList">
      <div className="title">
        <h1 className=" text-[blue] mb-3">
          {mygroupList.length <= 1 ? "MyGroup" : "Mygroups"}
        </h1>
        {showGroupMember ? (
          <button
            onClick={() => setshowGroupMember(!showGroupMember)}
            className=" bg-sixth pl-5 rounded-md shadow-xl hover:bg-seventh pr-5"
          >
            back
          </button>
        ) : show ? (
          <button
            onClick={() => setshow(!show)}
            className=" bg-sixth pl-5 rounded-md shadow-xl hover:bg-seventh pr-5"
          >
            back
          </button>
        ) : (
          <BsThreeDotsVertical />
        )}
      </div>

      {mygroupList.length <= 0 ? (
        <h2 className=" text-[#e45252]">No group</h2>
      ) : showGroupMember ? (
        <h1 className=" text-[#000]">GroupInfo</h1>
      ) : show ? (
        <h1 className=" text-[#000]">Request</h1>
      ) : (
        mygroupList.map((item) => {
          return (
            <div key={item} className="UserContent">
              <div className="userName_pic">
                <div className=" userName_picRapper">
                  <div className=" UserProfilePic overflow-hidden">
                    <ProfilePic id={data.uid} />
                  </div>
                  <div className=" flex flex-col justify-center ">
                    <h1>{item.groupName}</h1>
                    <h3>{item.groupInro}</h3>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleGroup(item)}
                    className=" mb-3 p-1 rounded-md  text-[#000] uppercase bg-thirdary w-full"
                  >
                    info
                  </button>
                  <button
                    onClick={() => handGroupRequest(item)}
                    className=" w-full p-1 rounded-md text-[#000] uppercase bg-seventh"
                  >
                    request
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Mygroup;
