import {} from "firebase/database";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import demoImage from "../imgases/832.jpg";

const ProfilePic = ({ id }) => {
  const [ProfilePicture, setprofilepic] = useState("");
  const storege = getStorage();
  const imageref = ref(storege, id);
  useEffect(() => {
    getDownloadURL(imageref).then((downloadURL) => {
      setprofilepic(downloadURL);
    });
  }, []);

  return (
    <div>
      {ProfilePicture ? (
        <img src={ProfilePicture} alt="profilePictuer" />
      ) : (
        <img src={demoImage} alt="demoimage" />
      )}
    </div>
  );
};

export default ProfilePic;
