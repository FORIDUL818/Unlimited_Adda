import { IoIosHome } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { ImCloudUpload } from "react-icons/im";
import profleImgae from '../imgases/832.jpg'
import { createRef, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import  { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { data } from "autoprefixer";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from "../Redux/userSlice";


const Header = () => {
  const auth=getAuth()
  const dispatch=useDispatch()
  const storage = getStorage();
  // react copper start
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [modal,setmodal]=useState(false)
  const cropperRef = createRef();
  const navigate=useNavigate()


  // HanlgeCloseModal start
      const HanlgeCloseModal=()=>{
        setmodal(false)
        setImage("")
      }
  // HanlgeCloseModal end
  // HanlgeCloseModal start
      const handleProfileUpload=(e)=>{
        e.preventDefault()
        // console.log(e)
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
          // console.log(reader.result)
        };
        reader.readAsDataURL(files[0]);
      }
  // HanlgeCloseModal end
  // react copper end

  // getcrop data start
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage,auth.currentUser.uid);
      
      const message4 =cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, { 
            photoURL:downloadURL
          })
          dispatch(userLoginInfo({ ...data, photoURL: downloadURL }));
          localStorage.setItem("user", JSON.stringify(auth.currentUser));
          setmodal(false)
          
        });
      });
    }
  };
   const data =useSelector((state)=>state.userLoginInfo.user)
  // getcrop data end
    return (
        <div className="namvMain">
       <nav className="NavBer">
          <div className="Icons">
          <IoIosHome />
          <AiFillMessage />
          <GrLogout />
          </div>
          <div className="SearchBer">
           <input type="text" className="SearchInput" placeholder="entry your data"/>
           <button className="SearchButton_v_1">search</button>
          </div>
          
               
               <div className=" flex justify-center items-start  gap-2 text-[#fff]">
                <div>
                  <h1 className="mt-[20px]">{data?.displayName}</h1>
                </div>
               <div className=" profile_imgase">
            <div onClick={()=>setmodal(true)} className=" profile_upload">
            <ImCloudUpload/>
            </div>
            <img src={data?.photoURL}/>
          </div>
               </div>
            
        
       </nav>
       {/* image upload start */}
         {
          modal&&
           <div className="imageUploadModal">
            <div className="imageUploadContainer">
               <h1>Upload your profile picture</h1>
 
            {
                image?
                <div className=" mb-5 w-32 h-32 mt-5 bg-secondary rounded-full mx-auto overflow-hidden ">
                <div className="img-preview h-full w-full"></div>
              </div>:
                <div className=" mb-5 w-32 h-32 mt-5 bg-secondary rounded-full mx-auto overflow-hidden ">
                <img src={data?.photoURL} />
              </div>
               
            }
             
          {
            image&&
            <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
          />
          }

              <div className=" flex justify-center my-4">
                <input onChange={handleProfileUpload} type="file" className="w-[250px]" />
              </div>
              <div className=" flex gap-6 mx-auto w-[450px]">
                <button onClick={getCropData} className="btn_v_1">Upload</button>
                <button onClick={HanlgeCloseModal} className="btn_v_2">Cansel</button>
              </div>
            </div>
           </div>
         }
         
       {/* image upload end */}
 
       
        </div>
        
    );
};

export default Header;