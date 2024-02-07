import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";

const BlockUser = () => {
  const data = useSelector((state) => state.userLoginInfo.user);
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);
  console.log(blockList);

  useEffect(() => {
    const blockref = ref(db, "block/");
    onValue(blockref, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().blockId) {
          list.push({
            id: item.key,
            block: item.val().block,
            blockId: item.val().blockId,
          });
        } else {
          list.push({
            id: item.key,
            block: item.val().blockBy,
            blockId: item.val().blockById,
          });
        }
      });
      setBlockList(list);
    });
  }, []);
  // handleUnblock start
  const handleUnblock = (item) => {
    console.log(item);
    set(push(ref(db, "friend/")), {
      senderName: item.block,
      senderId: item.blockId,
      reseverId: data.uid,
      reseverName: data.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };
  // handleUnblock end
  return (
    <div className="UserList">
      <div className="UserContent">
        <div className="title">
          <h1>BlockList</h1>
          <BsThreeDotsVertical />
        </div>
        {blockList.map((item) => {
          return (
            <div key={item} className="userName_pic">
              <div className=" userName_picRapper">
                <div className=" UserProfilePic overflow-hidden">
                  {item.blockId ? (
                    <ProfilePic id={item.blockId}></ProfilePic>
                  ) : (
                    <ProfilePic id={item.blockById}></ProfilePic>
                  )}
                </div>
                <div className=" flex flex-col justify-center ">
                  <h1>{item.block ? item.block : item.blockBy}</h1>
                  <h3>hellow.....</h3>
                </div>
              </div>

              <div className=" flex justify-center items-center ">
                {item.blockById ? (
                  <button className="bg-[red] p-1">I block to you</button>
                ) : (
                  <button
                    className="btn_v_2"
                    onClick={() => handleUnblock(item)}
                  >
                    Unblock
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

export default BlockUser;
