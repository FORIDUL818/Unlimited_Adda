import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPass = () => {
    const auth = getAuth();
    let forgotpassword=(e)=>{
        e.preventDefault()
        const email = e.target.email.value;
       
        sendPasswordResetEmail(auth, email).then(() => {
            console.log(" this is successfully done")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, "---------------", errorMessage)
        });
    }
    return (
        <div className="bg-[#a2a2a9]">
            
            <div className=" flex justify-center items-center h-screen">
            <div className=" w-[50%] h-[500px] bg-slate-400 flex justify-center items-center">
            <form  onSubmit={forgotpassword} className=" w-[50%]">
                <h1 className=" text-start mb-2 uppercase">Forget Password</h1>
            <input name="email" type="email" placeholder="enter your email" className=" w-[380px] p-2 text-[18px] border border-blue-400" />
            <button className=" ml-1 p-2 uppercase text-[18px] bg-teal-400 " >Send</button>
            </form>
            </div>
            </div>
        </div>
    );
};

export default ForgetPass;