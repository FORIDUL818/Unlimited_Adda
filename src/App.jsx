import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Registration from './Pages/Registration';
import Login from "./Pages/Login";
import { ToastContainer,  } from 'react-toastify';
import Home from './Pages/Home';
import HeadingLaout from "./Laout/HeadingLaout";
import ForgetPass from "./Components/ForgetPass";

const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',element:<Registration/>
    },
    {
      path:'/login',element:<Login/>,
    },
    {
      path:'/home',element:<HeadingLaout/>,
      children:[
        {
          path:'/home',element:<Home/>
        }
      ]
    },
    {
      path:"*",element:<h1>404</h1>
    },
    {
      path:"/fogetPass",element:<ForgetPass/>
     },
    
  ])
  return (
    <div>
         <ToastContainer/>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;