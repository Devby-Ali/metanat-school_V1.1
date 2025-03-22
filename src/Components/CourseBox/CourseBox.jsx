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
     
    </div>
  );
}
