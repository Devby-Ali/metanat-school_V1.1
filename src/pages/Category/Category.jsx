import React, { useEffect, useState } from "react";
import Header from "./../../Components/Header/Header";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import Footer from "./../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { categoryData } from "../../datas";

export default function Category() {
  const [courses, setCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [overlay, setOverlay] = useState(false);

  const { categoryName } = useParams();

  let sectionHeaderTitle = null

  switch (categoryName) {
    case "speedReading": {
      sectionHeaderTitle = "کلاس های پیش‌خوانی";
      break;
    }
    case "specialClasses": {
      sectionHeaderTitle = "کلاس های ویژه";
      break;
    }
    case "PublicClasses": {
      sectionHeaderTitle = "دوره های عمومی";
      break;
    }
    case "educationalWorkshop": {
      sectionHeaderTitle = "کارگاه آموزشی";
      break;
    }
    default: {
      sectionHeaderTitle = 'کلاس ها'
    }
  }

  const overlayOnClick = () => {
    setOverlay(false);
  };

  useEffect(() => {
    setCourses(categoryData[categoryName]);
    setOrderedCourses(categoryData[categoryName]);
    console.log(categoryData[categoryName]);
  }, [categoryName]);

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value);
    const filtredCourses = courses.filter((course) =>
      course.name.includes(event.target.value)
    );
    setOrderedCourses(filtredCourses);
  };

  return (
    <>
      {/* <Topbar /> */}
      <Header />
      <section className="pt-16 md:pt-52">
        {courses.length ? (
          <>
            <div className="container">
              <SectionHeader
                title={sectionHeaderTitle}
                titleValue={`${courses.length} دوره ی آموزشی`}
              />

              <section className="grid grid-cols-12 gap-y-5 md:gap-x-12 text-slate-900 dark:text-white">
                {/* <!-- Sidebar --> */}
                <aside className="col-span-full top-6 space-y-6 mb-8">
                  {/* <!-- SearchBox --> */}
                  <form id="archive_filters" className="space-y-9">
                    <div className="h-[6.8rem] bg-white dark:bg-slate-800 rounded-xl p-7 md:px-8">
                      <div className="flex items-center gap-x-8 justify-between h-full text-slate-400 dark:text-white text-[1.7rem]">
                        <input
                          type="text"
                          value={searchValue}
                          onChange={searchValueChangeHandler}
                          className="tracking-tight py-2 placeholder-slate-400 bg-transparent grow outli"
                          placeholder="جستجو بین دوره ها"
                        />
                        <button type="submit">
                          <div className="text-5xl">
                            <HiMagnifyingGlass />
                          </div>
                        </button>
                      </div>
                    </div>
                  </form>
                </aside>
                {/* <!-- Content --> */}
                <section className="col-span-full">
                  {/* <!-- Course List --> */}

                  {shownCourses.length !== 0 ? (
                    <>
                      <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-11">
                        {shownCourses.map((course) => (
                          <CourseBox {...course} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="archive_empty items-center justify-center flex-col px-7 py-8 md:py-20 rounded-2xl border border-slate-400 border-dashed">
                      <p className="text-2xl md:text-3xl text-center text-slate-400 dark:text-white my-8 md:my-12">
                        دوره ای مطابق با جستجوی شما پیدا نشد!
                      </p>
                    </div>
                  )}
                  {/* <!-- Show more Button --> */}
                  <Pagination
                    items={orderedCourses}
                    itemsCount={8}
                    pathName={`/category-info/${categoryName}`}
                    setShownItems={setShownCourses}
                  />
                </section>
              </section>
            </div>
          </>
        ) : (
          <div className="container">
            <div className="archive_empty items-center justify-center flex-col px-7 py-8 md:py-20 rounded-2xl border border-slate-400 border-dashed">
              <p className="text-2xl md:text-3xl text-center text-slate-400 dark:text-white my-8 md:my-12">
                هنوز دوره ای به دسته‌بندی {categoryName} اضافه نشده
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />

      <div
        onClick={overlayOnClick}
        className={
          overlay ? "overlay overlay--visible backdrop-blur-[2px]" : "overlay"
        }
      ></div>
    </>
  );
}
