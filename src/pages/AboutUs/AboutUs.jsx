import React from "react";
import Footer from "../../components/footer/Footer";
import { HiCheckCircle, HiMiniCheckCircle, HiOutlineCheckCircle } from "react-icons/hi2";
import Header from "../../Components/Header/Header";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

function AboutUs() {
  return (
    <>
      <Header />
      <div className="container mb-10 mt-20 md:mt-56 text-slate-800 dark:text-white/80">
        {/* <h3 className="font-EstedadBold text-2xl md:text-3xl xs:mt-8 lg:hidden text-slate-800 dark:text-white mb-5">
          ما چه کمکی بهتون میکنیم؟
        </h3> */}
        <SectionHeader title={"ما چه کمکی بهتون میکنیم؟"} />
        <div className="container">
          <h3 className="-mt-5 mb-18 text-slate-800 dark:text-white/80 leading-13">
            روش آموزشی مونته سوری براساس تحقیقات دقیقی است که از طریق آموزش به
            معلمان منتقل شده است. این یک نظام پویای آموزشی است که در آن هر نسل
            از معلمان فرصت انتقال دانش بدست آمده از طریق آموزش و تجربه به نسل
            آینده را دارد. &nbsp; مونته سوری یک نظام آموزشی است که در آن بهترین
            ها حفظ می شود و پیشرفت و ترقی به آن افزوده و سپس منتقل می شود. این
            نظام آموزشی در فرهنگ ها و کشورهای مختلف در سراسر جهان مورد استفاده
            قرار گرفته است. اما از آن سو، روش آموزشی مونته سوری چیزی بیشتر از
            مجموعه اصولی است که به زیبایی طراحی شده و نیز بیشتر از چند تکنیک
            سودمند است. این روش یک دیدگاه جامع برای کارکردن با بچه ها براساس
            تحقیقات و آموزش های دقیق است.&nbsp; مونته سوری بر آموزش و تعلیم
            کودکان در همه زمینه ها از جمله آموزش های فیزیکی، معنوی، اجتماعی،
            ذهنی و احساسی تاکید می کند. این بدان معناست که شما ممکن است کودک ۳
            ساله ای را در مدرسه مونته سوری ببینید که می تواند روی یک خط صاف راه
            برود و در عین حال یک لیوان آب در دست داشته باشد و بدن و حرکات خود را
            کنترل کند.
          </h3>
        </div>
        <div className="container flex flex-col lg:flex-row">
          <div className="relative flex-center mt-16 mb-32 lg:mb-0 lg:w-full -mr-86 2xl:-mr-120">
            <div className="absolute w-3/4 md:w-2/3 lg:w-3/4 h-[117%] lg:h-[115%] xl:h-[110%] bg-sky-600/80 dark:bg-sky-400/40 z-0 right-0 rounded-tl-[70px]"></div>
            <img
              src="images/aboutUs.jpg"
              alt="aboutImg"
              className="rounded-tl-[70px] max-h-170 2xl:max-h-220 z-10"
            />
          </div>

          <div className="space-y-4 lg:w-full mr-4 lg:mt-17">
            <p className="mb-8 2xl:mb-12 2xl:text-3xl/14">
              تئوری انتخاب مدرسه فرض میکند که والدین بازیگرانی منطقی هستند که
              میتوانند اطلاعات خود را جمع آوری و مصرف کنند تا مدرسه ای پیدا کنند
              که با نیاز های فرزندشان مطابقت داشته باشد.
            </p>
            <ul className="space-y-4 2xl:space-y-6 *:flex *:items-center *:gap-x-2 2xl:text-3xl">
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>تقویت هوشهای گاردنر</span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>یادگیری با سرگرمی</span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>محیط دوستانه و شاد</span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span> زمین بازی بزرگ با پارک کودکان</span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>
                  {" "}
                  آموزشها آمیزه ای از اتاق بازی و کارگاه آموزشی دست ورزی هستند
                </span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>
                  آموزشها گروهی با همه ی گروه های سنی برای تقویت یادگیری همتا به
                  همتا
                </span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>
                  {" "}
                  سیستم آموزش مطابق با نیاز های منحصر به فرد دانش آموز
                </span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span> پروراندن علاقه به یادگیری در دانش آموز</span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>
                  {" "}
                  استقلال و اعتماد به نفس و کارآفرینی اصل پایه آموزش به سبک
                  مونته سوری میباشد
                </span>
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-500 text-4xl 2xl:text-5xl">
                  <HiMiniCheckCircle />
                </span>
                <span>برگزاری کارگاه فلسفه برای کودکان</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
