import Link from "next/link";
import { useState } from "react";
import MenuFullScreen from "./MenuFullScreen";
import useStore from "../stores/defaultStore";
import { useRouter } from "next/router";

import BurgerMenu from "../public/icons/others/burger.svg";
import Logo from "../public/icons/logo/hat-logo.svg";

export default function Menu({ menuItems }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  return (
    <div
      className={`flex h-32 container mx-auto w-full border-b-2 border-tertiaryBackground items-center justify-between lg:h-40 bg-white px-8 lg:px-0`}
    >
      <Link href="/">
        <a className="group flex text-27 font-bold text-secondary hover:text-primary items-center gap-2 whitespace-nowrap">
          <Logo className="stroke-secondary fill-transparent group-hover:stroke-primary w-16 h-16 shrink-0" />
          Jobify
        </a>
      </Link>
      <ul className="flex flex-row items-center justify-center gap-x-2 lg:gap-x-4">
        {menuItems.map((item, index) => (
          <li className="relative" key={index}>
            {item.label !== "Logout" && (
              <Link href={item.link}>
                <a className="group hidden font-regular relative hover:text-primary lg:flex items-center justify-center gap-x-2 py-3 px-2 text-16 uppercase lg:bg-grayButtons lg:py-3 2xl:px-4  ">
                  {item.icon}
                  <p className="whitespace-nowrap">{item.label}</p>
                  {item.cartCounter > 0 && (
                    <p
                      className="
                    font-regular absolute flex top-2 right-2 h-5 w-5 items-center justify-center rounded-full bg-primary text-16 text-white md:right-0 md:-top-1 lg:h-6 lg:w-6"
                    >
                      {item.cartCounter}
                    </p>
                  )}
                </a>
              </Link>
            )}
            {item.label === "Logout" && (
              <button
                className="group hidden font-regular relative hover:text-primary md:flex items-center justify-center gap-x-2 py-3 px-2 text-16 uppercase lg:bg-grayButtons lg:py-3 lg:px-4  "
                key={index}
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setUser("");
                  router.reload();
                  router.push(item.link);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            )}
          </li>
        ))}
        {/* ---------------------- Burger button ------------------- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-1/6 lg:w-full group"
        >
          <BurgerMenu className="fill-secondary group-hover:fill-primary w-8 h-8" />
        </button>
      </ul>
      <MenuFullScreen
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuItems={menuItems}
      />
    </div>
  );
}
