import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Googlesinge = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    let navigate=useNavigate()


  let Google =()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token)
  
    const user = result.user;
    console.log(user)

    toast.success("successefull work")
    navigate('/home')
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
   
    const email = error.customData.email;
  
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error)
  });
  }
    return (
        <div>
           <button onClick={Google}>Google</button>
        </div>
    );
};

export default Googlesinge;