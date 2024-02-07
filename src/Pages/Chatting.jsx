import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from "react-icons/vsc";
import Friends from "../Components/Friends";
import MsgGroupsList from "../Components/MsgGroupsList";

const Chatting = () => {
    return (
     <div className=" flex container mx-auto ">
     <div className="  w-[35%] bg-fourth ">
       <div className=" h-[500px] mb-9">
       <Friends/>
       </div>
       <div>
       <MsgGroupsList/>
       </div>
     </div>
     <div className=" bg-seventh w-[65%] ">
        <div className="  w-full">
            <navber className=" w-full"><div className=" bg-seventh  w-full p-4 ">
             <div className=" flex">
             <div className=" w-[80px] h-[80px] rounded-full bg-fourth"></div>
              <h2 className=" flex items-center ml-4 text-[#fff]">Foridul Islam</h2>
             </div>
              </div></navber>
            <div className=" bg-[#95a5a6] h-[800px] px-2 overflow-y-scroll pt-[-10]"> 

              <div className=" text-left pl-2 mt-3">
                <div className=" px-2 py-1 relative bg-fourth inline-block rounded-[2px]">
                    <p className=" text-left">hi haw are you </p>
                    <VscTriangleLeft className=" absolute bottom-[-3px] left-[-15px] text-2xl text-fourth"/>
                </div>
              </div>

              <div className=" text-right pl-2">
                <div className=" px-2 py-1 relative bg-[blue] text-[#fff] inline-block rounded-[2px] mr-[13px]">
                    <p className=" text-left">hi haw are you </p>
                    <VscTriangleRight className=" absolute bottom-[-3px] right-[-15px] text-2xl text-[blue] "/>
                </div>
              </div>

            </div>
            <footer className=" w-full bg-seventh p-4 "><h1 className=" w-full">bottom</h1></footer>
        </div>
     </div>
     </div>
    );
};

export default Chatting;