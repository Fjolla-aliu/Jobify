import Link from "next/link";
import { useRouter } from "next/router";
import useStore from "../stores/defaultStore";

import Logo from "../public/icons/logo/hat-logo.svg";

export default function Footer({ menuItems }) {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  return (
    <div className="w-full h-auto border-t-2 border-tertiaryBackground pb-8">
      <div className="flex gap-8 w-full container mx-auto px-8 xl:px-0 flex-col xl:flex-row items-center justify-center xl:justify-between">
        <div className="w-full xl:w-1/3 flex flex-col items-center py-8 pt-32 xl:items-start">
          <p className="text-21 font-semibold text-secondary">Menu</p>
          <ul className="text-16 text-tertiary font-regular text-center xl:text-left">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.label !== "Logout" && (
                  <Link href={item.link}>
                    <a>{item.label}</a>
                  </Link>
                )}
                {item.label === "Logout" && (
                  <button
                    onClick={() => {
                      setUser("");
                      router.push(item.link);
                      router.reload();
                    }}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full xl:w-1/3 flex flex-col items-center">
          <Link href="/">
            <a className="group items-center flex flex-col">
              <Logo className="stroke-secondary fill-transparent w-16 h-16" />
              <h1 className="text-27 font-bold text-secondary">Jobify</h1>
            </a>
          </Link>
        </div>
        <div className="w-full xl:w-1/3 flex flex-col items-center py-8 pt-32 xl:items-end text-18 font-regular text-secondary">
          <p>“The future depends on what you do today”</p>
          <p className="font-semibold">Mahatma Gandhi</p>
        </div>
      </div>
      <div className="flex text-12 font-regular w-full text-tertiary items-center justify-center ">
        <p>
          Copyright &copy;{" "}
         
        </p>
      </div>
    </div>
  );
}
