import Menu from "./Menu";
import Footer from "./Footer";
import { useEffect, useState } from "react";

//SVG
import Tik from "../image/icons/others/tik-with-circle.svg";
import Triangle from "../image/icons/shapes/triangle-info.svg";
import User from "../image/icons/others/user.svg";
import Building from "../image/icons/objects/building.svg";
import Question from "../image/icons/objects/question.svg";

export default function Layout({ children }) {
  
  const [jobsSavedNumber, setJobsSavedNumber] = useState(0);


  const [menuItems, setMenuItems] = useState([
    {
      icon: (
        <image src={Building} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/",
      label: "Home",
      cartCounter: 0,
    },
    {
      icon: (
        <image src={Building} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/workers",
      label: "Workers",
      cartCounter: 0,
    },
    {
      icon: <image src={Tik} className="w-4 h-4 fill-secondary group-hover:fill-primary" />,
      link: "/favorites",
      label: "Favorites",
      cartCounter: jobsSavedNumber,
    },
    {
      icon: (
        <image src={Question} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/about-us",
      label: "About Us",
      cartCounter: 0,
    },
    {
      icon: (
        <image src={User} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/login",
      label: "Login",
      cartCounter: 0,
    },
  ]);

 

  useEffect(() => {
   
      setMenuItems([
        {
          icon: (
            <image src={Building} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/",
          label: "Home",
          cartCounter: 0,
        },
        {
          icon: (
            <image src={Building} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/workers",
          label: "Workers",
          cartCounter: 0,
        },
        {
          icon: (
            <image src={Tik} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/favorites",
          label: "Favorites",
          cartCounter: jobsSavedNumber,
        },
        {
          icon: (
            <image src={User} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/me",
          label: "Me",
          cartCounter: 0,
        },
        {
          icon: (
            <image src={User} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/my-applies",
          label: "My Applies",
          cartCounter: 0,
        },
        {
          icon: (
            <image src={User} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/profile",
          label: "Profile",
          cartCounter: 0,
        },
        {
          icon: (
            <image src={Triangle} className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/login",
          label: "Logout",
          cartCounter: 0,
        },
      ]);
    
  }, [ jobsSavedNumber]);

 

  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
      <div className="w-full h-auto flex flex-col">
        <Menu menuItems={menuItems} />
        {children}
      </div>
      <Footer menuItems={menuItems} />
    </div>
  );
}
