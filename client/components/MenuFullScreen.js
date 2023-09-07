import Link from "next/link";
import { useRouter } from "next/router";
import useStore from "../stores/defaultStore";

import BurgerMenu from "../public/icons/others/close.svg";

export default function MenuFullScreen({ menuOpen, setMenuOpen, menuItems }) {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  return (
    <div
      className={`${
        menuOpen ? "" : "flex"
      } pointer-events-none fixed top-0 left-0 z-50 h-full w-full`}
    >
      {/* left */}
      <div
        className={`${
          menuOpen ? "-left-full" : "left-0"
        } pointer-events-auto absolute hidden h-full w-1/2 transform flex-col items-end bg-primaryBackground duration-300 lg:flex`}
      >
        <div className="flex h-full w-96 items-start pt-32 justify-end px-20 text-right text-secondary font-semibold text-[60px]">
          Don't lose your opportunity to find yourself a better job.
        </div>
      </div>

      {/* right  */}
      <div
        className={`${
          menuOpen ? "-right-full" : "right-0"
        }  pointer-events-auto absolute flex h-full w-full transform flex-col bg-white duration-300 lg:w-1/2`}
      >
        <div className="w-full flex flex-col px-12 pt-8 h-full lg:px-20 lg:pt-32">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute group right-0 top-0 px-4 pt-8 lg:pt-20 pr-8 lg:pr-12 xl:pr-20"
          >
            <BurgerMenu className="fill-secondary group-hover:fill-primary w-8 h-8" />
          </button>
          <ul className="w-full h-auto lg:space-y-6 ">
            {menuItems.map((item, index) => {
              return (
                <li key={index} onClick={() => setMenuOpen(!menuOpen)}>
                  {item.label !== "Logout" && (
                    <Link href={item.link}>
                      <a className="font-regular text-27 text-secondary hover:text-primary lg:text-48">
                        {item.label}
                      </a>
                    </Link>
                  )}
                  {item.label === "Logout" && (
                    <button
                      className="font-regular text-27 text-secondary hover:text-primary lg:text-48"
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                        setUser("");
                        router.push(item.link);
                        router.reload();
                      }}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="w-full mt-auto pb-24 font-regular text-tertiary">
            <p>
              Copyright &copy;{" "}
             
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
