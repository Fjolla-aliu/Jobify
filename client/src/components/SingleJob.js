/* eslint-disable no-unused-expressions */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../stores/defaultStore';
import { useHistory } from 'react-router-dom';

const SingleJob = ({ item, setApplyJob, setApplyModal }) => {
  const addToFavorites = useDispatch(addToFavorites);
  const jobsListSaved = useSelector((state) => state.jobsListSaved);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <li className="w-full border-2 border-tertiaryBackground rounded-xl flex flex-col">
      <Link to={"/job/" + item.id}>
        <a className="p-4">
          <p className="w-full text-center text-21 font-semibold text-secondary">
            {item.title}
          </p>
          <p className="w-full truncate text-center text-16 font-regular text-tertiary">
            {item.description}
          </p>
          <p className="w-full text-left text-16 font-regular text-secondary mt-2">
            Category: <span className="capitalize">{item.category}</span>
          </p>
          <p className="w-full text-left text-16 font-regular text-secondary">
            Company: {item.company}
          </p>
          <p className="w-full text-left text-16 font-regular text-secondary">
            Available until: {item.untilDate}
          </p>
        </a>
      </Link>
      <div className="p-4 w-full border-t border-tertiaryBackground mt-2 pt-2 flex items-center gap-4 text-16 font-regular text-secondary">
        <p>{item.hours}</p>
        {item.remote && <p>· Remote</p>}
        {(user.role === "user" || user.role === undefined) && (
          <button
            type="button"
            onClick={() => {
              user.role === "user"
                ? (setApplyModal(true), setApplyJob(item))
                : history.push("/login");
            }}
            className="ml-auto px-3 py-1 border-2 rounded-lg font-regular text-buttonHover hover:bg-buttonHover hover:text-white border-buttonHover"
          >
            Apply
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            addToFavorites(item);
          }}
          className={`${
            JSON.stringify(jobsListSaved).includes(item.id)
              ? "bg-primary text-white hover:text-primary hover:bg-white"
              : "bg-white text-primary hover:text-white hover:bg-primary"
          } px-3 py-1 border-2 border-primary rounded-lg font-regular`}
        >
          {JSON.stringify(jobsListSaved).includes(item.id)
            ? "Unsave"
            : "Save job"}
        </button>
      </div>
    </li>
  );
};

export default SingleJob;