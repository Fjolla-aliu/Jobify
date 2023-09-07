import Menu from "./Menu";
import Footer from "./Footer";
import useStore from "../stores/defaultStore";
import { useEffect, useState } from "react";

//SVG-s
import Triangle from "../public/icons/shapes/triangle-info.svg";
import User from "../public/icons/others/user.svg";
import Users from "../public/icons/others/users.svg";
import Building from "../public/icons/objects/building.svg";
import Question from "../public/icons/objects/question.svg";

export default function Layout({ children }) {
  const user = useStore((state) => state.user);
  


  const [menuItems, setMenuItems] = useState([
    {
      icon: (
        <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/",
      label: "Home",
      cartCounter: 0,
    },
    {
      icon: (
        <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/workers",
      label: "Workers",
      cartCounter: 0,
    },
    {
      icon: (
        <Question className="w-4 h-4 fill-secondary group-hover:fill-primary" />
      ),
      link: "/about-us",
      label: "About Us",
      cartCounter: 0,
    },
    {
      icon: (
        <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
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
          <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
        ),
        link: "/",
        label: "Home",
        cartCounter: 0,
      },
      {
        icon: (
          <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
        ),
        link: "/workers",
        label: "Workers",
        cartCounter: 0,
      },
      {
        icon: (
          <Question className="w-4 h-4 fill-secondary group-hover:fill-primary" />
        ),
        link: "/about-us",
        label: "About Us",
        cartCounter: 0,
      },
      {
        icon: (
          <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
        ),
        link: "/login",
        label: "Login",
        cartCounter: 0,
      },
    ]);
  });

  useEffect(() => {
    if (user.role === "admin" || user.role === "user") {
      setMenuItems([
        {
          icon: (
            <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/",
          label: "Home",
          cartCounter: 0,
        },
        {
          icon: (
            <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/workers",
          label: "Workers",
          cartCounter: 0,
        },
        {
          icon: (
            <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/me",
          label: "Me",
          cartCounter: 0,
        },
        {
          icon: (
            <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/my-applies",
          label: "My Applies",
          cartCounter: 0,
        },
        {
          icon: (
            <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/profile",
          label: "Profile",
          cartCounter: 0,
        },
        {
          icon: (
            <Triangle className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/login",
          label: "Logout",
          cartCounter: 0,
        },
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (user.role === "company") {
      setMenuItems([
        {
          icon: (
            <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/",
          label: "Home",
          cartCounter: 0,
        },
        {
          icon: (
            <Building className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/workers",
          label: "Workers",
          cartCounter: 0,
        },
        {
          icon: (
            <Users className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/us",
          label: "Us",
          cartCounter: 0,
        },
        {
          icon: (
            <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/our-applies",
          label: "Our Applies",
          cartCounter: 0,
        },
        {
          icon: (
            <User className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/profile",
          label: "Profile",
          cartCounter: 0,
        },
        {
          icon: (
            <Triangle className="w-4 h-4 fill-secondary group-hover:fill-primary" />
          ),
          link: "/login",
          label: "Logout",
          cartCounter: 0,
        },
      ]);
    }
  }, [user]);

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
