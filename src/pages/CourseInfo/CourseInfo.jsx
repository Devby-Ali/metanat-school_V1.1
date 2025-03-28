import React, { useEffect, useState } from "react";
// import Topbar from "./../../Components/Topbar/Topbar";
import Header from "./../../Components/Header/Header";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Button from "../../Components/Form/Button";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Footer from "./../../Components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HiChevronDown,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlinePlay,
} from "react-icons/hi2";
import { PiBriefcase, PiStarBold } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { BsInfoCircle } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";
import { FaRegObjectGroup } from "react-icons/fa";
import { BiSolidLeftArrow } from "react-icons/bi";

export default function CourseInfo() {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const [courseTeacher, setCourseTeacher] = useState({});
  const [category, setCategory] = useState({});
  const [price, setPrice] = useState("");
  const [relatedCourses, setRelatedCourses] = useState([]);

  const { courseName } = useParams();

  useEffect(() => {
    getCourseDetails();

    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRelatedCourses(data);
      });
  }, []);

  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        setCourseDetails(courseInfo);
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseTeacher(courseInfo.creator);
        setCategory(courseInfo.categoryID);
        setPrice(courseInfo.price);
        console.log(courseInfo);
      });
  }

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "کامنت ثبت شد",
          icon: "success",
          confirmButtonText: "تایید",
        });
      });
  };

  const registerInCourse = (course) => {
    if (course.price === 0) {
      fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: course.price,
        }),
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          Swal.fire({
            title: "ثبت نام با موفقیت انجام شد",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            getCourseDetails();
          });
        }
      });
    } else {
      Swal.fire({
        title: "در صورت داشتن کد تخفیف وارد کنید:",
        input: "text",
        confirmButtonText: "ثبت‌نام",
        showDenyButton: true,
        denyButtonText: "نه",
      }).then((code) => {
        console.log(code);
        if (code.isConfirmed) {
          if (code.value === "") {
            fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).token
                }`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                price: course.price,
              }),
            }).then((res) => {
              console.log(res);
              if (res.ok) {
                Swal.fire({
                  title: "ثبت نام با موفقیت انجام شد",
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  getCourseDetails();
                });
              }
            });
          } else {
            fetch(`http://localhost:4000/v1/offs/${code.value}`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).token
                }`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                course: course._id,
              }),
            })
              .then((res) => {
                console.log(res);

                if (res.status == 404) {
                  Swal.fire({
                    title: "کد تخفیف معتبر نیست",
                    icon: "error",
                    confirmButtonText: "Ok",
                  });
                } else if (res.status == 409) {
                  Swal.fire({
                    title: "کد تخفیف قبلا استفاده شده!",
                    icon: "error",
                    confirmButtonText: "Ok",
                  });
                } else {
                  return res.json();
                }
              })
              .then((code) => {
                fetch(
                  `http://localhost:4000/v1/courses/${course._id}/register`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      price: course.price - (course.price * code.percent) / 100,
                    }),
                  }
                ).then((res) => {
                  console.log(res);
                  if (res.ok) {
                    Swal.fire({
                      title: "ثبت نام با موفقیت انجام شد",
                      icon: "success",
                      confirmButtonText: "Ok",
                    }).then(() => {
                      getCourseDetails();
                    });
                  }
                });
              });
          }
        }
      });
    }
  };

  return (
    <>
      {/* <Topbar /> */}
      <Header />
      <main className="max-w-[1920px] mx-auto overflow-x-hidden pt-14 md:pt-52 2xl:pt-56">
        <div className="container">
          <Breadcrumb
            links={[
              {
                id: 2,
                title: category.title,
                to: `category-info/${category.name}/1`,
              },
              {
                id: 3,
                title: courseDetails.name,
                to: `course-info/${courseDetails.shortName}`,
              },
            ]}
          />
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-7 gap-x-6 sm:gap-x-7 lg:items-center xl:items-stretch mt-12 md:mt-15 rounded-3xl p-7 lg:p-0 bg-white dark:bg-slate-800 lg:bg-transparent! border border-gray-100 dark:border-none lg:border-none">
            <div className="flex flex-col lg:gap-56 justify-between order-2 lg:order-1 text-slate-900 dark:text-white">
              <div>
                <h1 className="font-EstedadBold text-4xl sm:text-5xl mb-7">
                  {courseDetails.name}
                </h1>
                <p className="text-[1.6rem]/relaxed sm:text-3xl line-clamp-4 sm:line-clamp-3 mb-12 lg:mb-0">
                  {courseDetails.description}
                </p>
              </div>
              <div className="space-y-4 lg:space-y-8 lg:mt-4 lg:px-12">
                {courseDetails.isUserRegisteredToThisCourse === true ? (
                  <div className="flex justify-center lg:items-center lg:justify-between gap-y-4 gap-x-14">
                    <div className="flex items-center gap-x-2">
                      <LiaUserSolid className="text-6xl mb-1" />
                      <p className="font-EstedadBold text-3xl">
                        شما دانشجوی دوره هستید
                      </p>
                    </div>
                    <Button
                      to={"/"}
                      className="button-primary hover:  py-4 text-white lg:w-80"
                    >
                      <MdOutlineLaptopChromebook className="text-4xl" />
                      مشاهده دوره
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center lg:items-center lg:justify-between gap-y-4 gap-x-14">
                    <Button
                      className="button-primary hover:  h-[4.5rem] lg:h-20 lg:px-14 sm:text-3xl w-full sm:w-auto cursor-pointer"
                      onClick={() => registerInCourse(courseDetails)}
                    >
                      <div className="text-4xl sm:text-5xl">
                        <HiOutlineAcademicCap />
                      </div>
                      ثبت نام
                    </Button>
                    <div className="flex items-end gap-x-5">
                      {price === 0 ? (
                        <div>رایگان</div>
                      ) : (
                        <div className="flex-center gap-x-3">
                          {courseDetails.discount ? (
                            <>
                              <span className="text-4xl text-blue-gray-600 dark:text-white/70 -mb-1.5 line-through">
                                {price.toLocaleString()}
                              </span>
                              <span className="flex gap-x-1 text-green-500 font-EstedadMedium text-5xl">
                                {(
                                  price -
                                  (price * courseDetails.discount) / 100
                                ).toLocaleString()}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="none"
                                  viewBox="0 0 14 16"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M1.149 6.918q.443 0 .775-.14.343-.142.575-.383.232-.243.352-.565.12-.312.141-.664H1.985q-.514 0-.846-.111a1.2 1.2 0 0 1-.524-.323 1.2 1.2 0 0 1-.272-.503 3 3 0 0 1-.07-.675q0-.382.11-.726t.323-.604q.21-.262.523-.413.322-.162.736-.161.332 0 .634.11a1.4 1.4 0 0 1 .534.353q.232.232.363.615.141.372.141.906v.836h.967q.12 0 .161.091.05.081.05.252 0 .181-.05.272-.04.08-.16.08h-.988q-.02.495-.202.937a2.4 2.4 0 0 1-.483.776 2.3 2.3 0 0 1-.746.524 2.3 2.3 0 0 1-.977.201H.141l-.06-.685zM.897 3.513q0 .252.05.434.06.18.192.302.141.11.372.171.233.05.585.05h.906v-.755q0-.745-.292-1.068-.292-.322-.806-.322-.483 0-.745.322-.262.323-.262.866m5.372.957q.13 0 .171.091.05.081.05.252 0 .181-.05.272-.04.08-.171.08H4.607q-.132 0-.172-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.172-.09zm1.663 0q.13 0 .17.091.051.081.051.252 0 .181-.05.272-.04.08-.171.08H6.269q-.13 0-.17-.08a.5.5 0 0 1-.051-.252q0-.18.05-.272.04-.09.171-.09zm1.662 0q.131 0 .171.091.05.081.05.252 0 .181-.05.272-.04.08-.17.08H7.931q-.13 0-.171-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.17-.09zm1.663 0q.13 0 .171.091.05.081.05.252 0 .181-.05.272-.04.08-.171.08H9.595q-.132 0-.172-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.172-.09zm.907 0q.393 0 .624-.211.242-.212.242-.584v-1.39h.655v1.39q0 .715-.403 1.108-.393.383-1.078.383h-.947q-.13 0-.171-.081a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.171-.09zM13.786.995h-.806V.28h.806zm-1.28 0H11.7V.28h.806zm-6.864 11.97q0 .542-.171 1.017a2.42 2.42 0 0 1-1.28 1.41 2.4 2.4 0 0 1-1.027.212h-.595q-1.128 0-1.753-.696-.624-.695-.624-1.904v-1.763h.644v1.743q0 .433.101.786.111.353.333.604.232.263.574.403t.826.141h.443q.474 0 .826-.16.352-.152.585-.414a1.6 1.6 0 0 0 .352-.614q.12-.352.121-.736v-2.71h.645zm-2.428-2.902h-.846v-.736h.846zm5.031 3.103q-.261 0-.503-.071a1.16 1.16 0 0 1-.434-.262 1.3 1.3 0 0 1-.292-.473 2.2 2.2 0 0 1-.11-.746V6.92h.654v4.573q0 .423.182.705.19.273.614.272h.171q.222 0 .222.343 0 .353-.222.353zm.448-.696q.393 0 .595-.191a.68.68 0 0 0 .201-.514v-.383q0-.875.443-1.37.454-.493 1.25-.493.413 0 .725.13.313.132.514.374.21.24.312.574.1.332.1.735 0 .867-.453 1.35t-1.239.484q-.402 0-.775-.152a1.2 1.2 0 0 1-.585-.564q-.09.232-.221.373a1.2 1.2 0 0 1-.272.222q-.141.07-.303.1-.15.02-.292.02h-.16q-.132 0-.172-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.171-.09zm3.496-1.078q0-.523-.232-.846-.232-.332-.796-.332-1.047 0-1.047 1.219 0 .512.282.776.292.261.745.261.514 0 .776-.282.272-.282.272-.796"
                                    className="text-green-500"
                                  ></path>
                                </svg>
                              </span>
                            </>
                          ) : (
                            <span className="flex gap-x-1 text-green-500 font-EstedadMedium text-5xl">
                              {price.toLocaleString()}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="none"
                                viewBox="0 0 14 16"
                              >
                                <path
                                  fill="currentColor"
                                  d="M1.149 6.918q.443 0 .775-.14.343-.142.575-.383.232-.243.352-.565.12-.312.141-.664H1.985q-.514 0-.846-.111a1.2 1.2 0 0 1-.524-.323 1.2 1.2 0 0 1-.272-.503 3 3 0 0 1-.07-.675q0-.382.11-.726t.323-.604q.21-.262.523-.413.322-.162.736-.161.332 0 .634.11a1.4 1.4 0 0 1 .534.353q.232.232.363.615.141.372.141.906v.836h.967q.12 0 .161.091.05.081.05.252 0 .181-.05.272-.04.08-.16.08h-.988q-.02.495-.202.937a2.4 2.4 0 0 1-.483.776 2.3 2.3 0 0 1-.746.524 2.3 2.3 0 0 1-.977.201H.141l-.06-.685zM.897 3.513q0 .252.05.434.06.18.192.302.141.11.372.171.233.05.585.05h.906v-.755q0-.745-.292-1.068-.292-.322-.806-.322-.483 0-.745.322-.262.323-.262.866m5.372.957q.13 0 .171.091.05.081.05.252 0 .181-.05.272-.04.08-.171.08H4.607q-.132 0-.172-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.172-.09zm1.663 0q.13 0 .17.091.051.081.051.252 0 .181-.05.272-.04.08-.171.08H6.269q-.13 0-.17-.08a.5.5 0 0 1-.051-.252q0-.18.05-.272.04-.09.171-.09zm1.662 0q.131 0 .171.091.05.081.05.252 0 .181-.05.272-.04.08-.17.08H7.931q-.13 0-.171-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.17-.09zm1.663 0q.13 0 .171.091.05.081.05.252 0 .181-.05.272-.04.08-.171.08H9.595q-.132 0-.172-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.172-.09zm.907 0q.393 0 .624-.211.242-.212.242-.584v-1.39h.655v1.39q0 .715-.403 1.108-.393.383-1.078.383h-.947q-.13 0-.171-.081a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.171-.09zM13.786.995h-.806V.28h.806zm-1.28 0H11.7V.28h.806zm-6.864 11.97q0 .542-.171 1.017a2.42 2.42 0 0 1-1.28 1.41 2.4 2.4 0 0 1-1.027.212h-.595q-1.128 0-1.753-.696-.624-.695-.624-1.904v-1.763h.644v1.743q0 .433.101.786.111.353.333.604.232.263.574.403t.826.141h.443q.474 0 .826-.16.352-.152.585-.414a1.6 1.6 0 0 0 .352-.614q.12-.352.121-.736v-2.71h.645zm-2.428-2.902h-.846v-.736h.846zm5.031 3.103q-.261 0-.503-.071a1.16 1.16 0 0 1-.434-.262 1.3 1.3 0 0 1-.292-.473 2.2 2.2 0 0 1-.11-.746V6.92h.654v4.573q0 .423.182.705.19.273.614.272h.171q.222 0 .222.343 0 .353-.222.353zm.448-.696q.393 0 .595-.191a.68.68 0 0 0 .201-.514v-.383q0-.875.443-1.37.454-.493 1.25-.493.413 0 .725.13.313.132.514.374.21.24.312.574.1.332.1.735 0 .867-.453 1.35t-1.239.484q-.402 0-.775-.152a1.2 1.2 0 0 1-.585-.564q-.09.232-.221.373a1.2 1.2 0 0 1-.272.222q-.141.07-.303.1-.15.02-.292.02h-.16q-.132 0-.172-.08a.5.5 0 0 1-.05-.252q0-.18.05-.272.04-.09.171-.09zm3.496-1.078q0-.523-.232-.846-.232-.332-.796-.332-1.047 0-1.047 1.219 0 .512.282.776.292.261.745.261.514 0 .776-.282.272-.282.272-.796"
                                  className="text-green-500"
                                ></path>
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="course_intro_wrap order-1 rounded-2xl overflow-hidden">
              <video
                src=""
                poster={`http://localhost:4000/courses/covers/${courseDetails.cover}`}
                className="w-full h-[34rem] rounded-2xl"
                controls
              ></video>
            </div>
          </section>

          <section className="grid grid-cols-12 gap-6 sm:gap-11 mt-10 lg:mt-28">
            <div className="col-span-12 lg:col-span-8">
              {/* <!-- Course Box Info | Summary --> */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                <CourseDetailBox
                  icon={<BsInfoCircle />}
                  title={"وضعیت دوره"}
                  text={`${
                    courseDetails.status === "presell"
                      ? "پیش فروش"
                      : courseDetails.isComplete === 1
                      ? "تکمیل شده"
                      : "در حال برگزاری"
                  }`}
                />
                <CourseDetailBox
                  icon={<BsClock />}
                  title={"زمان برگزاری"}
                  text={createdAt.slice(0, 10)}
                />
                <CourseDetailBox
                  icon={<IoCalendarOutline />}
                  title={"بروزرسانی"}
                  text={updatedAt.slice(0, 10)}
                />
                <CourseDetailBox
                  icon={<PiUsersThree />}
                  title={"روش پشتیبانی"}
                  text={`${courseDetails.support || "واتساپ"}`}
                />
                <CourseDetailBox
                  icon={<PiBriefcase />}
                  title={"پیش نیاز"}
                  text={"JS"}
                />
                <CourseDetailBox
                  icon={<PiEye />}
                  title={"نوع مشاهده"}
                  text={"آنلاین"}
                />
              </div>
              {/* <!-- Description --> */}
              <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl p-7 sm:p-10 mt-12">
                <div className="mt-2 sm:mt-0 flex items-center gap-x-3 mb-16 sm:mb-20 relative">
                  <span className="absolute -right-8 sm:-right-11 block w-1 h-16 bg-sky-600 rounded-r-full shadowLightBlue"></span>
                  <span className="hidden md:inline-block text-sky-700 dark:text-sky-500 text-6xl">
                    <HiOutlineDocumentText />
                  </span>
                  <div className="font-EstedadBold text-3xl md:text-4xl">
                    توضیحات
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div className="course-content wp-content max-h-[800px] text-[1.6rem]/loose">
                    <meta charset="utf8" />
                    <p>
                      تا حالا به این فکر کردید چرا توسعه تکنولوژی در سال های
                      اخیر انقدر سریع بوده؟ یکی از دلایل اون موضوع آموزش همین
                      دوره هست. یعنی <strong>NPM</strong>
                    </p>
                    <p>
                      اینکه چرا و چطوری این تاثیرو گذاشته به مرور بررسی میکنیم
                      ولی فعلا در همین حد بدونید که در گذشته به خاطر ساده تر
                      بودن ساختار برنامه نویسی و پروژه ها، اضافه کردن کتابخانه
                      ها به پروژه کار سختی نبود چون تعدادشون به اندازه الان نبود
                      و مشکلی در این فرآیند احساس نمیشد.تا اینکه با گذشت زمان،
                      هم تعداد کتابخانه ها به طور شگفت انگیزی زیاد شد و هم
                      استفاده و رواج اونها در جهان به دلیل افزایش رقابت و تنوع
                      سلیقه کاربران، بیشتر شد.
                    </p>
                    <p>
                      از طرفی بعضی از کتابخانه ها به کتابخانه های دیگه ای وابسته
                      بودن و قبلش باید اونهارو نصب میکردید و این مسئله باعث
                      ایجاد سردرگمی و افزایش حجم پروژه میشد.
                    </p>
                    <p>
                      مهندسان به این فکر افتادن که یک پلتفرم برای نصب و مدیریت
                      کتابخانه ها، به روزرسانی، کنترل وابستگی و … نیاز هست تا
                      این اتفاقات برای برنامه نویسان سراسر دنیا راحت تر کنترل
                      بشه و نیازی به دخالت دستی برنامه نویس نباشه. این شد که{" "}
                      <strong>NPM</strong> خلق شد!
                    </p>
                    <p>
                      چند مورد از مزایا و <strong>کاربردهای NPM</strong> رو به
                      طور خلاصه براتون لیست می کنیم:
                    </p>
                    <ol>
                      <li>&nbsp;افزودن پکیج های مختلف به پروژه</li>
                      <li>
                        &nbsp;اجرا کردن پکیج ها بدون دانلود با استفاده از اجرای
                        دستور در CLI (command line)
                      </li>
                      <li>&nbsp;کنترل آسان ورژن پروژه</li>
                      <li>
                        &nbsp;اشتراک گذاری پروژه و کدها با سایر برنامه نویسان
                      </li>
                      <li>&nbsp;بروزرسانی آسان تر و سریع تر کتابخانه ها</li>
                    </ol>
                    <p>
                      از اونجایی که اسکای لرن تصمیم گرفته در کنار دوره های جامع
                      خودش و برای جبران کوتاهی دانشجوها در انجام تمرینات منظم و
                      تحقیق و مطالعه برای توسعه مهارتشون، یک دوره جداگانه رایگان
                      برای آشنایی با <strong>NPM</strong>{" "}
                      <strong>(Node Package Manager</strong> ) یا همون مدیر پکیج
                      طراحی و تولید کنه تا دانشجوها خیلی بیشتر از قبل با نحوه
                      مدیریت پکیج ها و کار با این پلتفرم بین المللی آشنا بشن.
                    </p>
                    <p>
                      در ادامه سعی می کنیم پرتکرارترین سوالات و دغدغه های شمارو
                      جواب بدیم تا با خیال راحت تری در این دوره ثبت نام کنید. پس
                      تا انتها با ما همراه باشید.
                    </p>
                    <h2 id="h_1">
                      <strong>
                        چه زمانی باید از NPM استفاده کنیم؟ آیا ضروری هست؟
                      </strong>
                    </h2>
                    <p>
                      فقط در یک حالت هست که میتونید از<strong> NPM</strong>{" "}
                      استفاده نکنید اون هم در صورتیه که تصمیم بگیرید صفر تا صد
                      پروژه رو خودتون از اول کدنویسی کنید و هیچ نیازی به
                      کتابخانه و ابزار کمکی از قبل آماده شده ندارید. البته این
                      وضعیت با توجه به اهمیت سرعت کدنویسی و اتمام پروژه ها در
                      دنیای امروز به ندرت پیش میاد و در حال حاضر اکثر برنامه
                      نویسان مبتدی و حرفه ای از <strong>NPM</strong> استفاده
                      میکنن.
                    </p>
                    <h2 id="h_2">تو این دوره قراره چی یاد بگیریم؟</h2>
                    <p>قسمتی از سرفصل های آموزشی دوره به صورت خلاصه :</p>
                    <h3>1 – آشنایی با مفاهیم پایه</h3>
                    <p>
                      درک مفاهیم اصلی مثل پکیج ها، وابستگی ها، ورژن ها و دستورات
                      اصلی که میتونه به شما کمک کند تا اساسی ترین قسمت های{" "}
                      <strong>NPM</strong> رو متوجه بشید و آمادگی بیشتری برای
                      مراحل بعدی پیدا کنید.
                    </p>
                    <h3>2 – آموزش نصب Node.js</h3>
                    <p>
                      <strong>NPM</strong> به صورت تعاملی با Node.js کار میکنه
                      که پلتفرم بک اند جاوا اسکریپت هست. بنابراین برای استفاده
                      از <strong>NPM</strong> باید Node.js رو نصب کنید. بعد از
                      نصب Node.js، <strong>NPM</strong> به طور خودکار به همراه
                      اون نصب میشه.
                    </p>
                    <h3>
                      3 – نحوه مدیریت پکیج ها و استفاده از دستورات اصلی (کامند
                      ها)
                    </h3>
                    <p>
                      یادگیری نحوه نصب، حذف و به روزرسانی پکیج ها به عنوان
                      ابزارهای کلیدی در تسلط به <strong>NPM</strong> محسوب میشه
                      و اون رو به بهترین شکل یاد می گیرید. دستورات مهمی مثل `npm
                      install` برای نصب پکیج ها، `npm update` برای به روزرسانی
                      پکیج ها، و `npm start` برای اجرای پروژه ها از جمله
                      محتواهای این بخش هستن.
                    </p>
                    <h3>4 – پیاده سازی آموزش ها در قالب ایجاد یک پروژه جدید</h3>
                    <p>
                      با ایجاد یک پروژه جدید، می تونید نحوه ساختاردهی پروژه و
                      مدیریت پکیج ها رو به صورت عملی تجربه کنید.
                    </p>
                    <h3>5 – نشر پکیج های شخصی</h3>
                    <p>
                      اگه قصد دارید پکیج های خودتون رو با دیگران به اشتراک
                      بگذارید، باید یاد بگیرید چطور اونهارو در ریپازیتوری{" "}
                      <strong>NPM</strong> منتشر کنید.
                    </p>
                    <h3>6 – استفاده از پکیج های خارجی</h3>
                    <p>
                      یادگیری نحوه جستجو، انتخاب و استفاده از پکیج هایی که توسط
                      دیگران توسعه داده شدن، خیلی خیلی مهم هست و یاد می گیرید
                      چطور از این ظرفیت های عالی برای پیشبرد کارتون استفاده
                      کنید.
                    </p>
                    <h3>7 – مفاهیم پیشرفته</h3>
                    <p>
                      بعد از مسلط شدن به مفاهیم پایه، میتونید به موارد پیشرفته
                      تر مثل تنظیمات پکیج، ایجاد اسکریپت ها، مدیریت اشتراک ها و
                      مشارکت در پروژه های عمومی بپردازید.
                    </p>
                    <p>
                      با پیگیری این مراحل و تمرین های عملی، تسلط به{" "}
                      <strong>NPM</strong> رو زودتر و بهتر از تصورتون به دست
                      میارید.
                    </p>
                    <h2 id="h_3">این دوره برای چه کسانی مناسب هست؟</h2>
                    <p>
                      یادگیری کار با <strong>NPM</strong> برای تمامی برنامه
                      نویسان و توسعه دهنده هایی که با زبان برنامه نویسی جاوا
                      اسکریپت (JavaScript) یا زبان هایی که از اکوسیستم Node.js
                      پشتیبانی میکنن، سروکار دارن خیلی ضروری هست. از جمله :
                    </p>
                    <ol>
                      <li>برنامه نویسان وب</li>
                      <li>توسعه دهندگان Front-end و Back-end</li>
                      <li>توسعه دهندگان Mobile</li>
                      <li>توسعه دهندگان پلاگین و کتابخانه</li>
                      <li>
                        توسعه دهندگان پروژه های Open Source : افرادی که علاقه به
                        مشارکت در پروژه های متن باز دارن و میخوان با توسعه دهنده
                        های سراسر دنیا تبادل اطلاعات و تجربه داشته باشن.
                      </li>
                    </ol>
                    <h2 id="h_4">
                      چرا اسکای لرن بهترین گزینه برای یادگیری هست؟
                    </h2>
                    <p>
                      حتما برای شما هم پیش اومده که گاهی فرصت ها و پروژه های
                      بزرگ رو از دست میدید فقط به خاطر اینکه در ظاهر فکر میکنید
                      آمادگی کار در اون سطح رو ندارید و هنوز سرعت و تسلط لازم
                      برای پیاده سازی اونهارو بدست نیاوردید. یکی از دلایل میتونه
                      عدم آشنایی شما با اکوسیستم اون زبان برنامه نویسی باشه. مثل
                      فریم ورک ها، کتابخانه ها و …
                    </p>
                    <p>
                      تفاوت اسکای لرن در همین هست که علاوه بر دوره های آموزشی
                      اصلی، مجموعه ای از دوره های مکمل فوق العاده هم برای
                      دانشجوهای خودش تدارک میبینه ( اکثرا رایگان! ) تا مطمئن بشه
                      فاصله شون با تسلط کامل و کسب درآمدهای بالا فقط و فقط اراده
                      و جدیت اون ها باشه نه مسائل فنی!
                    </p>
                    <p>
                      این دوره با محتوای جذاب و مفید خودش میتونه به شما کمک کنه
                      با سرعت و کیفیت بیشتری پروژه های خودتون رو به سرانجام
                      برسونید.
                    </p>
                    <h2 id="h_5">بعد از اتمام دوره به چه نتیجه ای می رسیم؟</h2>
                    <h3>1 – توانایی مدیریت کامل پکیج ها</h3>
                    <p>
                      با استفاده از <strong>NPM</strong>، میتونید به راحتی پکیج
                      ها و کتابخانه های آماده رو در پروژه های خود نصب کنید و از
                      اونها استفاده کنید. این کمک میکنه تا امکانات مختلفی رو
                      بدون نیاز به نوشتن کدها از صفر، پیاده سازی کنید.
                    </p>
                    <h3>2 – بروزرسانی و مدیریت وابستگی ها</h3>
                    <p>
                      با یادگیری NPM میتونید به روزرسانی پکیج هارو به راحتی
                      انجام داده و وابستگی های پروژه رو به روز نگه دارید. این
                      اتفاق باعث میشه تا از نسخه های جدیدتر پکیج ها و امکانات
                      بهتر آنها بهتر استفاده کنید و سردرگم نشید.
                    </p>
                    <h3>3 – کارایی و بهره وری</h3>
                    <p>
                      با استفاده از پکیج های آماده در <strong>NPM</strong>،
                      میتونید توسعه رو سریع تر انجام داده و کارهای تکراری رو
                      کمتر کنید. در واقع حوصله تون هیچوقت از نوشتن صفر تا صد کد
                      برای هر چیز کوچیکی سر نخواهد رفت.
                    </p>
                    <h3>4 – جامعه بزرگ توسعه دهندگان</h3>
                    <p>
                      اکوسیستم <strong>NPM</strong> یک جامعه بزرگ و پویا از
                      توسعه دهندگان داره که به شما کمک میکنه از تجربیات دیگران
                      به راحتی استفاده کرده و با پروژه های مشابه در ارتباط
                      باشید.
                    </p>
                    <h3>5 – نشر پکیج های شخصی</h3>
                    <p>
                      اگه دوست دارید پکیج های خودتون رو با دیگران به اشتراک
                      بذارید، <strong>NPM</strong> به شما این امکان رو میده که
                      پکیج های شخصی خودتون رو منتشر کنید و بازخورد و مشارکت
                      دیگران رو در بهبود اونها، به دست بیارید.
                    </p>
                    <p>
                      به طور کلی، یادگیری <strong>NPM</strong> به شما کمک میکنه
                      تا توسعه سریع تر و منظم تری رو تجربه کنید. زمانی که شما در
                      یک پروژه به صورتی تیمی کار میکنید یا زمانی که در یک شرکت
                      استخدام شدید، اونجا حتما نیاز هست که با ابزارهای package
                      manager &nbsp;کار کرده باشید تا مشکلی برای اجرا پروژه ها
                      مدیریت پکیج ها نداشته باشید.
                    </p>
                    <p>
                      شما بعد از دیدن این دوره توانایی کار با{" "}
                      <strong>NPM</strong> رو به صورت کامل و حرفه ای خواهید داشت
                      و میتونید به صورت تیمی با برنامه نویس های دیگه کار کنید.
                    </p>
                    <h2 id="h_6">
                      این دوره پیش نیاز خاصی داره که باید قبلش بلد باشم؟
                    </h2>
                    <p>
                      آشنایی و تسلط به زبان برنامه نویسی جاوا اسکریپت که پای
                      ثابت پروژه های برنامه نویسی به خصوص تحت وب هست، مهمترین
                      پیش نیاز ورود به این دوره محسوب میشه. چون تا وقتی به اون
                      مسلط نباشید، دیدن این دوره هم کمکی به شما نخواهد کرد.
                    </p>
                    <p>
                      حتما میدونید که یاد گرفتن پیش نیازی که اشاره شد، در اسکای
                      لرن کاملا رایگان هست دیگه ؟؟؟!{" "}
                      <Button href="">این هم لینک دوره ش…</Button>
                    </p>
                    <h2 id="h_7">وقتی این دوره رو دیدم قدم بعدیم چیه؟</h2>
                    <p>
                      شما بعد از دیدن دوره و تسلط به <strong>NPM</strong>{" "}
                      میتونید در مورد تنظیمات پکیج های مختلف تحقیق کنید و یا
                      پکیج های شخصی سازی خودتون رو در اختیار دیگران در هرجای
                      دنیا بذارید. در کنار اینها میتونید به راحتی در پروژه های
                      متن باز بین المللی یا داخلی هم مشارکت کنید و تجربیات
                      خودتون رو به دیگران منتقل کنید یا از تجربیات ارزشمند اونها
                      استفاده کنید.
                    </p>
                    <h2 id="h_8">در این دوره چه نوع پروژه هایی کار میکنیم ؟</h2>
                    <p>
                      در جلسه اخر این دوره یک پروژه کوچیک پیاده سازی میکنیم و در
                      اون با نصب چندتا پکیج و استفاده از اونها در پروژه به صورت
                      عملی یاد خواهید گرفت که در پروژه های واقعی چطور باید از{" "}
                      <strong>npm</strong> &nbsp;استفاده کرد.
                    </p>
                    <h2 id="h_9">چه تضمینی هست که خوب و کامل یاد بگیرم؟</h2>
                    <p>
                      چندین دلیل هست که معمولا باعث عدم نتیجه گیری شما از هر
                      دوره ای میشه :
                    </p>
                    <ol>
                      <li>کیفیت پایین محتوای آموزشی و سبک و تسلط مدرس</li>
                      <li>عدم اشتیاق و علاقه مندی کافی برای یادگیری</li>
                      <li>نبود پشتیبانی در دسترس و قوی در طول آموزش</li>
                      <li>
                        عدم مرور و تمرین مطالب (انبار کردن اونها برای روز مبادا
                        !)
                      </li>
                    </ol>
                    <p>
                      دو مورد اینها بر عهده شماست و دو مورد هم بر عهده اسکای
                      لرن. ما به شما قول میدیم این آموزش رو با بالاترین کیفیت و
                      موثرترین پشتیبانی در اختیار شما قرار بدیم. شما قول می دید
                      که با علاقه و پشتکار تمام تمرینات رو انجام بدید تا به
                      نتیجه برسید؟!
                    </p>
                    <p>پس همه چی حله…</p>
                  </div>

                  <div className="absolute bottom-0 right-0 left-0 h-44 bg-linear-to-t from-white dark:from-slate-800 from-0% via-white/[55%] dark:via-slate-800/[55%] via-70% to-white/0 dark:to-slate-800/0 to-100%"></div>
                </div>
                <Button
                  type="button"
                  className="button-primary hover:  text-white py-4 w-full sm:w-auto mx-auto mt-14"
                >
                  <span>مشاهده بیشتر مطلب</span>
                  <div className="text-5xl">
                    <GoTriangleDown />
                  </div>
                </Button>
              </div>
              {/* <!-- Headlines --> */}
              <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl p-7 sm:p-10 mt-12">
                <div className="mt-2 sm:mt-0 flex items-center gap-x-3 mb-16 sm:mb-20 relative">
                  <span className="absolute -right-8 sm:-right-11 block w-1 h-16 bg-sky-600 rounded-r-full shadowLightBlue"></span>
                  <div className="hidden md:inline-block ml-1 text-sky-700 dark:text-sky-500 text-7xl">
                    <HiOutlineAcademicCap />
                  </div>
                  <div
                    id="lessons"
                    className="font-EstedadBold text-3xl md:text-4xl"
                  >
                    سرفصل ها
                  </div>
                </div>
                <div className="space-y-4 md:space-y-5">
                  <div open={open === 1}>
                    <div
                      className={`flex items-center justify-between cursor-pointer pr-6 pl-8 py-7 rounded-2xl border-none ${
                        open === 1
                          ? "rounded-b-none bg-sky-400 dark:bg-sky-800"
                          : "bg-gray-200 dark:bg-[#333c4c]"
                      }`}
                      onClick={() => handleOpen(1)}
                    >
                      <span className="topic__title text-[1.6rem] text-slate-900 dark:text-white inline-block font-EstedadLight lg:line-clamp-3">
                        جلسات دوره
                      </span>
                      <div className="flex items-center gap-x-2.5 shrink-0">
                        <div className="topic__time ltr-text hidden lg:flex items-center gap-x-1.5 text-xl font-EstedadThin -tracking-tighter text-slate-900 dark:text-white *:transition-colors">
                          <span>23 lesson</span>
                          <span className="topic__time-dot block size-1 bg-slate-500/50 dark:bg-white/50 rounded-full"></span>
                          <span>3h 39m </span>
                        </div>
                      </div>
                      <span
                        className={`text-4xl transition-all ${
                          open === 1 && "rotate-180"
                        }`}
                      >
                        <HiChevronDown />
                      </span>
                    </div>
                    <div
                      className={`${
                        open === 1 ? "block visible" : "hidden invisible"
                      } divide-y divide-gray-600 -mt-1`}
                    >
                      {sessions.map((session, index) => (
                        <div
                          key={session._id}
                          className="flex last:rounded-b-2xl items-center justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-7 py-8 group bg-stone-100 dark:bg-[#333c4c] text-slate-900 dark:text-white font-EstedadLight"
                        >
                          {session.free === 1 ||
                          courseDetails.isUserRegisteredToThisCourse ? (
                            <>
                              <div className="flex items-center grow gap-x-3 md:gap-x-3.5 *:transition-colors">
                                <div className="flex-center w-12 h-9 md:h-10 text-xl font-EstedadBold bg-white dark:bg-white/10 group-hover:bg-blue-400 group-hover:text-white rounded-xs">
                                  {index + 1}
                                </div>
                                <Link
                                  to={`/${courseName}/${session._id}`}
                                  className="inline-block mb-1 lg:max-w-3/4 text-xl md:text-2xl group-hover:text-blue-400 "
                                >
                                  {session.title}
                                </Link>
                              </div>
                              <div className="flex items-center gap-x-3 mr-auto group-hover:text-blue-400 *:transition-colors">
                                <span className="text-xl md:2xl">
                                  {session.time}
                                </span>
                                <div className="text-3xl">
                                  <HiOutlinePlay />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center grow gap-x-3 md:gap-x-3.5 *:transition-colors">
                                <div className="flex-center w-12 h-9 md:h-10 text-xl font-EstedadBold bg-white dark:bg-white/10 group-hover:bg-blue-400 group-hover:text-white rounded-xs">
                                  {index + 1}
                                </div>
                                <span className="inline-block mb-1 lg:max-w-3/4 text-xl md:text-2xl group-hover:text-blue-400 ">
                                  {session.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-x-3 mr-auto group-hover:text-blue-400 *:transition-colors">
                                <span className="text-xl md:2xl">
                                  {session.time}
                                </span>
                                <div className="text-3xl">
                                  <HiOutlineLockClosed />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div open={open === 2}>
                    <div
                      className={`flex items-center justify-between cursor-pointer pr-6 pl-8 py-7 rounded-2xl border-none ${
                        open === 2
                          ? "rounded-b-none bg-sky-400 dark:bg-sky-800"
                          : "bg-gray-200 dark:bg-[#333c4c]"
                      }`}
                      onClick={() => handleOpen(2)}
                    >
                      <span className="topic__title text-[1.6rem] text-slate-900 dark:text-white inline-block font-EstedadLight lg:line-clamp-3">
                        سرفصل ها
                      </span>
                      <div className="flex items-center gap-x-2.5 shrink-0">
                        <div className="topic__time ltr-text hidden lg:flex items-center gap-x-1.5 text-xl font-EstedadThin -tracking-tighter text-slate-900 dark:text-white *:transition-colors">
                          <span>23 lesson</span>
                          <span className="topic__time-dot block size-1 bg-slate-500/50 dark:bg-white/50 rounded-full"></span>
                          <span>3h 39m </span>
                        </div>
                      </div>
                      <span
                        className={`text-4xl transition-all ${
                          open === 2 && "rotate-180"
                        }`}
                      >
                        <HiChevronDown />
                      </span>
                    </div>
                    <div
                      className={`${
                        open === 2 ? "block visible" : "hidden invisible"
                      } divide-y divide-gray-600 -mt-1`}
                    >
                      <div className="flex last:rounded-b-2xl items-center justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-7 py-8 group bg-stone-100 dark:bg-[#333c4c] text-slate-900 dark:text-white font-EstedadLight">
                        <div className="flex items-center grow gap-x-3 md:gap-x-3.5 *:transition-colors">
                          <div className="flex-center w-12 h-9 md:h-10 text-xl font-EstedadBold bg-white dark:bg-white/10 group-hover:bg-blue-400 group-hover:text-white rounded-xs">
                            1
                          </div>
                          <a
                            href=""
                            className="inline-block mb-1 lg:max-w-3/4 text-xl md:text-2xl group-hover:text-blue-400 "
                          >
                            ویدیوی معرفی
                          </a>
                        </div>
                        <div className="flex items-center gap-x-3 mr-auto group-hover:text-blue-400 *:transition-colors">
                          <span className="text-xl md:2xl">08:26 </span>
                          <div className="text-3xl">
                            <HiOutlinePlay />
                          </div>
                        </div>
                      </div>
                      <div className="flex first:rounded-t-2xl last:rounded-b-2xl items-center justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-7 py-8 group bg-stone-100 dark:bg-[#333c4c] text-slate-900 dark:text-white font-EstedadLight">
                        <div className="flex items-center grow gap-x-3 md:gap-x-3.5 *:transition-colors">
                          <div className="flex-center w-12 h-9 md:h-10 text-xl font-EstedadBold bg-white dark:bg-white/10 group-hover:bg-blue-400 group-hover:text-white rounded-xs">
                            1
                          </div>
                          <a
                            href=""
                            className="inline-block mb-1 lg:max-w-3/4 text-xl md:text-2xl group-hover:text-blue-400 "
                          >
                            ویدیوی معرفی
                          </a>
                        </div>
                        <div className="flex items-center gap-x-3 mr-auto group-hover:text-blue-400 *:transition-colors">
                          <span className="text-xl md:2xl">08:26 </span>
                          <div className="text-3xl">
                            <HiOutlinePlay />
                          </div>
                        </div>
                      </div>
                      <div className="flex first:rounded-t-2xl last:rounded-b-2xl items-center justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-7 py-8 group bg-stone-100 dark:bg-[#333c4c] text-slate-900 dark:text-white font-EstedadLight">
                        <div className="flex items-center grow gap-x-3 md:gap-x-3.5 *:transition-colors">
                          <div className="flex-center w-12 h-9 md:h-10 text-xl font-EstedadBold bg-white dark:bg-white/10 group-hover:bg-blue-400 group-hover:text-white rounded-xs">
                            1
                          </div>
                          <a
                            href=""
                            className="inline-block mb-1 lg:max-w-3/4 text-xl md:text-2xl group-hover:text-blue-400 "
                          >
                            ویدیوی معرفی
                          </a>
                        </div>
                        <div className="flex items-center gap-x-3 mr-auto group-hover:text-blue-400 *:transition-colors">
                          <span className="text-xl md:2xl">08:26 </span>
                          <div className="text-3xl">
                            <HiOutlinePlay />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Related Courses --> */}
              {relatedCourses.length !== 0 && (
                <div className="hidden lg:block bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl p-10 mt-12">
                  <div className="mt-2 sm:mt-0 flex items-center gap-x-3 mb-16 sm:mb-20 relative">
                    <span className="absolute -right-11 block w-1 h-16 bg-sky-600 rounded-r-full shadowLightBlue"></span>
                    <span className="text-sky-700 dark:text-sky-500 mx-2 text-[3.4rem]">
                      <FaRegObjectGroup />
                    </span>
                    <div className="font-EstedadBold text-3xl md:text-4xl">
                      دوره های مرتبط
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-5 text-slate-900 dark:text-white">
                    {relatedCourses.map((course) => (
                      <>
                        <div className="flex items-center justify-between flex-wrap bg-gray-200 dark:bg-[#333c4c] rounded-lg py-3.5 pr-3.5 pl-6">
                          <div className="flex items-center gap-x-4 w-4/5">
                            <img
                              className="w-36 rounded-md aspect-video"
                              src={`http://localhost:4000/courses/covers/${course.cover}`}
                              alt="Course Cover"
                            />
                            <span className="line-clamp-2">{course.name}</span>
                          </div>
                          <Button
                            className="flex items-center justify-between sm:justify-normal text-sky-700 dark:text-sky-500 font-EstedadMedium text-xl"
                            to={`/course-info/${course.shortName}`}
                          >
                            مشاهده
                            <div className="text-2xl mr-2">
                              <BiSolidLeftArrow />
                            </div>
                          </Button>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}

              {/* <!-- Comments --> */}
              <CommentsTextArea
                comments={comments}
                submitComment={submitComment}
              />
            </div>

            {/* <!-- Aside --> */}
            <aside className="col-span-12 lg:col-span-4 space-y-12">
              {/* <!-- Students & Rating & Progress --> */}
              <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl p-7">
                <div className="flex gap-x-6">
                  <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-3 gap-x-7 grow p-4 sm:p-6 bg-gray-200 dark:bg-[#333c4c] rounded-xl">
                    <div className="text-6xl md:text-7xl text-blue-500">
                      <PiUsersThree />
                    </div>
                    <div>
                      <span className="block font-bold text-xl md:text-2xl">
                        {courseDetails.courseStudentsCount}
                      </span>
                      <span className="block text-2xl opacity-70">دانشجو</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-3 gap-x-7 grow p-4 sm:p-6 bg-gray-200 dark:bg-[#333c4c] rounded-xl">
                    <div className="text-5xl md:text-6xl text-amber-500">
                      <PiStarBold />
                    </div>
                    <div>
                      <span className="block font-bold text-xl md:text-2xl">
                        5.0
                      </span>
                      <span className="block text-2xl opacity-70">رضایت</span>
                    </div>
                  </div>
                </div>
                <div className="mt-7 sm:mt-12">
                  <div className="flex items-center justify-between font-EstedadMedium text-2xl sm:text-[1.6rem] mb-5">
                    <span>درصد تکمیل دوره</span>
                    <span>100%</span>
                  </div>
                  <progress value="100" max="100"></progress>
                </div>
              </div>
              {/* <!-- Course Teacher --> */}
              <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl pt-10 px-7 pb-12 text-center">
                <img
                  className="block mb-6 mx-auto object-cover rounded-full"
                  width="90"
                  height="90"
                  src={courseTeacher.profile}
                  alt="teache img"
                />
                <span className="block font-EstedadMedium text-2xl sm:text-3xl mb-8">
                  {courseTeacher.name} | مدرس دوره
                </span>
                <p className="mt-2"></p>
                <Button
                  to="#"
                  className="button-primary hover:  mx-auto mt-4 w-77 py-3"
                >
                  مشاهده پروفایل من
                </Button>
              </div>
              {/* <!-- Course Short Link --> */}
              <div className="hidden lg:block bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl p-7 text-center">
                <span className="font-EstedadMedium text-2xl">
                  لینک کوتاه آموزش
                </span>
                <div className="flex items-center justify-between gap-x-3 p-4 mt-7 bg-sky-50 dark:bg-sky-500/10 text-sky-500 border border-dashed border-sky-500 rounded-lg">
                  <button>
                    <svg className="w-8 h-8">
                      <use href="#clipboard-document"></use>
                    </svg>
                  </button>
                  <span className="font-EstedadMedium text-lg w-64 text-ltr text-left truncate">
                    skylearn.ir/?p=78
                  </span>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
