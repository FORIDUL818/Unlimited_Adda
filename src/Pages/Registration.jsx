import { Link, useNavigate } from "react-router-dom";
import Image from "../imgases/RasiImage.jpg"
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Lottie from "lottie-react";
import { FaEye } from "react-icons/fa";   
import { FaEyeSlash } from "react-icons/fa6"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import BeatLoader from "react-spinners/ClipLoader";
import { getDatabase, ref, set } from "firebase/database";
import Googlesinge from "../Components/GoogleSingn";



const Registration = () => { 
  const auth = getAuth();   
  const navigate=useNavigate()
  const db = getDatabase();

  // useState aria start
     const [Fname,setFname]=useState('')
     const [Lname,setLname]=useState('')
     const [email,setemail]=useState('')
     const [password,setpassword]=useState('')
     const [repassword,setrepassword]=useState('')
  // useState aria start
  // useState error mgs aria start
     const [FnameerrorMgs,setFnameerrormgs]=useState('')
     const [LnameerrorMgs,setLnameerrormgs]=useState('')
     const [passErrormgs,setpasserrorMgs]=useState('') 
     const [repassErrormgs,setrepasserrorMgs]=useState('')
     const [emailErrormgs,setemailerrorMgs]=useState('')
     let [showpassword,setshowpassword]=useState(false)
     let [reshowpassword,setreshowpassword]=useState(false)
     
     let [loading, setLoading] = useState(false);
     

     let Toggole=()=>{
      setshowpassword(!showpassword)
   }
   let Toggole2=()=>{
      setreshowpassword(!reshowpassword)
   }
     
  
  // useState error mgs aria end
  // function aria start ============================
  const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
         const HandleFrastName=(e)=>{
          setFname(e.target.value)
          setFnameerrormgs("")
         }
         const HandleLastNmme=(e)=>{
          setLname(e.target.value)
          setLnameerrormgs('')
         }
         const HandleEmail =(e)=>{
          setemail(e.target.value)
          setemailerrorMgs("")
          
         }
         const HandlePass=(e)=>{
          setpassword(e.target.value)  
          setpasserrorMgs("")
         }
         const HandleRepass=(e)=>{
          setrepassword(e.target.value)
          setrepasserrorMgs('')

         }
       

        const HandleForm=(e)=>{
          e.preventDefault()
          if( Fname=='') {
            setFnameerrormgs('please enter your Frist name')
          }
          if( Lname=='') {
            setLnameerrormgs('please enter your last name')
          }
          if (email=='') {
            setemailerrorMgs("this is a emty")
          }  if (!email.match(emailRegex)){
            setemailerrorMgs("this is not a email")
          }
          if (password=='') {
            setpasserrorMgs("please enter your password")
          } 
          else if (!password.match(passwordRegex)){
            setpasserrorMgs("this is not enaf password")
          }
          if (repassword=='') {
              setrepasserrorMgs("this is not enaf password")
          }
          else if (!repassword.match(passwordRegex)){ 
          setrepasserrorMgs("this is not a email")
        
        }
       else if(password!==repassword) {
           setpasserrorMgs("this is not match")
        }
        else {
         
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) =>{
            setLoading(true)
            updateProfile(auth.currentUser,{
              displayName:Fname, 
              photoURL:'../imgases/832.jpg'
            })
            .then(() => {
              setLoading(false)
                set(ref(db, 'user/' +auth.currentUser.uid), {
                  username: auth.currentUser.displayName,
                  email: auth.currentUser.email,
                 
                });
              
            });
     toast.success("successefull work")
     navigate('/login')
     setemail('')
     setpassword('')
     setFname('')
     setLname('')

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
     console.log(errorCode,errorMessage)
     console.log(error)
     toast.error("rong work");
  });


        }

      }

        // email regex
   

  // function aria end ==============================
    return (
      // ragitraion aria start
      <div className="Ragistration">
     
         {/* registration form start */}
          <div className="LeftSide">
          <form onSubmit={HandleForm} className=" Form">
          <h1>Unlimited adda </h1>
          <h3>Registration form </h3>
          <div className="NamingForm">
            <h3 className=" text-left pl-4">Name:</h3>
           <h2 className=" ml-3 mt-1 text-[#ff4e4e]"> {FnameerrorMgs} </h2>
           <label>
            <input onChange={HandleFrastName} type="text"placeholder="Frist Name"/>
            <input onChange={HandleLastNmme}  type="text"placeholder="Last Name"/>
           </label>
           <h2 className=" ml-3 mt-1 text-[#ff4e4e] text-right"> {LnameerrorMgs} </h2>
          </div>
          <div className="eamailPass">
           <label>
            <h3 className=" text-left pl-2">Eamil:</h3>
            <input onChange={HandleEmail} type="email" placeholder=" enter your email"/>
            <h2 className=" ml-3  text-[#ff4e4e]"> {emailErrormgs} </h2>
            <h3 className=" text-left pl-2">PassWord:</h3>
            <div className=" relative">
                {
                    showpassword?
                    <FaEye onClick={Toggole} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-[black] text-xl cursor-pointer"/>
                    :
                   <FaEyeSlash onClick={Toggole} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-[black] text-xl cursor-pointer"/>
                }
               <input type={showpassword?"text":"password"} onChange={HandlePass} placeholder=" enter your password" className=" bg-white p-2 w-full rounded-md mb-2" />
               </div>
            {/* <input type="password" onChange={} placeholder=" enter your password"/> */}
           <h2 className=" ml-3 mt-1 text-[#ff4e4e]"> {passErrormgs} </h2>
            <h3 className=" text-left pl-2">RePassword:</h3>
            <div className=" relative">
                {
                    reshowpassword?
                    <FaEye onClick={Toggole2} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-[black] text-xl cursor-pointer"/>
                    :
                    <FaEyeSlash onClick={Toggole2} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-[black] text-xl cursor-pointer"/>
                }
               <input type={reshowpassword?"text":"password"} onChange={HandleRepass} placeholder=" enter your repassword" className=" bg-white p-2 w-full rounded-md mb-4" />
               </div>
          
            <h2 className=" ml-3 mt-1 text-[#ff4e4e]"> {repassErrormgs} </h2>
           </label>
           {
            loading?
            <div className=" flex justify-center items-center"><BeatLoader color="#36d7b7"/></div>:
            <button className="FormBtn">Rasitration</button>
          }
          <div className="flex flex-row ">
          <h4 className=" pl-4 mr-10">already have an acount? </h4><Link to='/login' className=" text-seventh uppercase mr-10">login</Link>  <Googlesinge className=" "/>
     
          </div>
          </div>
          </form>
          </div>
         {/* registration form end */} 
          {/* imgese site start * */}
          <div className="RightSide ml-5">
            <img className=" w-[500px] h-[550px]" src={Image} />
          </div>
           {/* imgese site end */}
       </div>
    // ragitraion aria start
    );
};

export default Registration;