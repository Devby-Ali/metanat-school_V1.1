import React, { useState } from "react";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { FaStar } from "react-icons/fa";
import { LiaUserSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImageLoaded = () => setIsImgShow(true);

  const onImageError = () => {
    // Codes
  };

  return (
    <div className="course flex flex-col bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg h-full">
      {/* <!-- Course Banner --> */}
      <div className="relative h-[25rem] group">
        <Link
          className="block w-full h-full rounded-t-lg overflow-hidden"
          to={`/course-info/${props.shortName}`}
          title={props.name}
        >
          <img
            className="block w-full h-full object-cover"
            src={`/public/images/classes/${props.cover}`}
            alt={props.name}
            onLoad={onImageLoaded}
            onError={onImageError}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        {/* <!-- Offer percent  --> */}
        {/* {props.price && props.discount !== 0 ? (
          <span className="absolute right-2.5 top-2.5 flex-center w-18 h-10 bg-sky-700/70 text-white font-EstedadBold text-2xl rounded-sm">
            {props.discount}%
          </span>
        ) : null} */}
      </div>
      {/* <!-- Course Title & Description --> */}
      <div
        className={`grow mx-6 py-6 mb-6 pb-5 border-b border-b-gray-300 dark:border-b-white/10 ${
          props.isSlider && "h-48"
        }`}
      >
        {/* <!-- Course Title --> */}
        <h3 className="font-EstedadMedium text-[1.75rem] line-clamp-2 mb-5">
          <Link to={`/course-info/${props.shortName}`} href="">
            {props.name}
          </Link>
        </h3>
        {/* <!-- Course Description --> */}
        <p className="text-2xl/10 line-clamp-2 opacity-70">
          {props.description}
        </p>
      </div>
      {/* <!-- Course Footer --> */}

      <div className="flex justify-between gap-5 text-blue-gray-600 dark:text-white/70 text-xl px-6 pb-6">
        <div className="flex items-center gap-x-1 hover:text-purple-400 transition-colors">
          <div className="text-3xl">
            <LiaUserSolid />
          </div>
          <a href="https:/">{props.creator}</a>
        </div>
        {/* <!-- Rating --> */}
        <div className="flex items-center gap-x-1 text-3xl opacity-65 font-EstedadMedium mt-1">
          {props.age}
        </div>
      </div>
    </div>
  );
}
