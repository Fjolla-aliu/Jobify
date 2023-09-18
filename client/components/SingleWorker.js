import Link from "next/link";
import useStore from "../stores/defaultStore";
import { useRouter } from "next/router";

const SingleWorker = ({ item, setApplyWork, setApplyModal }) => {
  const user = useStore((state) => state.user);
  const router = useRouter();

  return (
    <li className="w-full border-2 border-tertiaryBackground rounded-xl flex flex-col">
      <Link href={"/worker/" + item.id}>
        <a className="p-4">
          <p className="w-full text-center text-21 font-semibold text-secondary">
            {item.title}
          </p>
          <p className="w-full text-center text-16 font-regular text-tertiary">
            {item.technologies}
          </p>
          <p className="w-full text-center text-16 font-regular text-tertiary">
            {item.experience}
          </p>
          <p className="w-full capitalize text-left text-16 font-regular text-secondary mt-2">
            Degree: {item.degree}
          </p>
          <p className="w-full capitalize text-left text-16 font-regular text-secondary">
            Category: {item.category}
          </p>
          <p className="w-full text-left text-16 font-regular text-secondary">
            Available until: {item.untilDate}
          </p>
          <p className="w-full capitalize text-left text-16 font-regular text-secondary">
            Name: {item.userName}
          </p>
        </a>
      </Link>
      <div className="p-4 w-full border-t border-tertiaryBackground mt-2 pt-2 flex items-center gap-4 text-16 font-regular text-secondary">
        <p className="whitespace-nowrap">{item.hours}</p>
        {item.remote && <p className="whitespace-nowrap">· Remote</p>}
        {(user.role === "company" || user.role === undefined) && (
          <button
            type="button"
            onClick={() => {
              user.role === "company"
                ? (setApplyModal(true), setApplyWork(item))
                : router.push("/login");
            }}
            className="ml-auto px-3 py-1 border-2 rounded-lg font-regular text-buttonHover hover:bg-buttonHover hover:text-white border-buttonHover"
          >
            Apply
          </button>
        )}
      </div>
    </li>
  );
};
export default SingleWorker;
