import { Outlet } from "react-router-dom";
import Header from "../Components/Header";


const HeadingLaout = () => {
    return (
        <div className=" container mx-auto">
            <Header/>
            <Outlet/>
        </div>
    );
};

export default HeadingLaout;