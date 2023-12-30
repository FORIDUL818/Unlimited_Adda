import  { useState } from "react";
import Lottie from "lottie-react";
import LoiginImg from '../animation_imgage/LoginAnimatin.json'
 import { Link, useNavigate } from "react-router-dom";
 import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import BeatLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../Redux/userSlice";
//  import Image from "../imgases/RasiImage.jpg"
const Login = () => {
 const auth = getAuth()
 const navgate=useNavigate()
 const Dispatch=useDispatch()
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

    const [mailerrormgs,setmailerrormgs]=useState('')
    const [errorpassword,seterrorpassword]=useState('')

    let [showpassword,setshowpassword]=useState(false)
    let [loading, setLoading] = useState(false);
   

    let Toggole=()=>{
     setshowpassword(!showpassword)
  }


    const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    const handleEmail=(e)=>{
      setemail(e.target.value)
      setmailerrormgs('')
    
    }
    
    const handlepass=(e)=>{
      setpassword(e.target.value)
      seterrorpassword('')
    }
    

   const HandleLoginForm =(e)=>{
      e.preventDefault()
      if (email=='') {
        setmailerrormgs(" enter your mail")
      }
      else if (!email.match(emailRegex)) {
         setmailerrormgs("this is not a email")
      }
      if (password=='') {
        seterrorpassword(" enter your password")
      }
      else if (!password.match(passwordRegex)) {
         seterrorpassword("this is not enaf password")
      }
      else {
         setLoading(true)
         signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
            Dispatch(userLoginInfo(user))
            localStorage.setItem("user", JSON.stringify(user));
            setLoading(false)
           toast.success("successefull work")
          navgate ('/home')

         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           console.log(errorCode,errorMessage)
         });
      }
       
   }
    return (
      // ragitraion aria start
      <div className="Login bg-[#ececec] shadow-md h-screen">
         {/* registration form start */}
          <div className="LeftSide">
          <form onSubmit={HandleLoginForm} className=" Form ">
          <h1>Unlimited adda </h1>
          <h3>Login form </h3>
          <div className="eamailPass">
           <label>
            <h3 className=" text-left pl-2">Eamil:</h3>
            <input type="email" onChange={handleEmail} placeholder=" enter your password" className=" bg-white p-2 w-full rounded-md mb-2" />
            <h2 className=" ml-3 mt-1 text-[#ff4e4e]"> {mailerrormgs} </h2>
            <h3 className=" text-left pl-2">PassWord:</h3>
            <div className=" relative">
                {
                    showpassword?
                    <FaEye onClick={Toggole} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-[black] text-xl cursor-pointer"/>
                    :
                    <FaEyeSlash onClick={Toggole} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-[black] text-xl cursor-pointer"/>
                }
               <input type={showpassword?"text":"password"} onChange={handlepass} placeholder=" enter your repassword" className=" bg-white p-2 w-full rounded-md mb-4" />
               </div>
         
            <h2 className=" ml-3 mt-1 text-[#ff4e4e]"> {errorpassword} </h2>
           </label>
           {
            loading?
            <div><BeatLoader/></div>:
            <button className="FormBtn bg-seventh w-[90%] p-2 uppercase rounded-md hover:bg-sixth mb-2">Login</button>
           }
          <div className="flex flex-row  justify-between items-center">
          <div><h4 className=" pl-4 mr-2 ">please registration </h4></div>
          <div>
          <Link to="/" className=" text-seventh uppercase">ragistration</Link>
            </div>
            <div>
               <Link to="/fogetPass" className=" text-[14px] block transform active: scale-[1.09] transition-[.4s] text-right w-full uppercase text-[#3ec249] mt-3 hover:text-indigo-700">Forget Password</Link>
            </div> 
          </div>
          </div>
          </form>
          </div>
         {/* registration form end */}
         {/* imgese site start */}
          <div className="RightSide ">
          <Lottie  className="w-[400px] h-[400px]" animationData={LoiginImg}></Lottie>
          </div>
          {/* imgese site end */}
       </div>
    // ragitraion aria start
    );
};

export default Login;
// Pa$$w0rd!
// lyjumesim@mailinator.co