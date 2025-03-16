import React from "react";
import Footer from "../../components/footer/Footer";
import { HiCheckCircle } from "react-icons/hi2";
import Header from "../../Components/Header/Header";

function AboutUs() {
  return (
    <>
      <Header />
      <div className="container mb-10 mt-20 md:mt-50">
        <h3 className="font-EstedadBold text-2xl md:text-3xl xs:mt-8 lg:hidden text-slate-800 dark:text-white mb-5">
          ما چه کمکی بهتون میکنیم؟
        </h3>
        <div className="flex flex-col lg:flex-row">
          <div className="relative flex-center my-16 lg:w-full -mr-86">
            <div className="absolute w-3/4 md:w-2/3 lg:w-3/4 h-[117%] lg:h-[115%] xl:h-[110%] bg-pink-400 z-0 right-0 rounded-tl-[70px]"></div>
            <img
              src="images/aboutUs.jpg"
              alt="aboutImg"
              className="rounded-tl-[70px] max-h-170 2xl:max-h-full z-10"
            />
          </div>

          <div className="space-y-4 xl:mt-10 lg:w-full mr-4">
            <h3 className="font-EstedadBold text-2xl xs:mt-8 md:text-3xl xl:text-4xl md:text-center">
              ما چه کمکی بهتون میکنیم؟
            </h3>
            <p className="text-md lg:text-sm xl:text-base text-zinc-600">
              تئوری انتخاب مدرسه فرض میکند که والدین بازیگرانی منطقی هستند که
              میتوانند اطلاعات خود را جمع آوری و مصرف کنند تا مدرسه ای پیدا کنند
              که با نیاز های فرزندشان مطابقت داشته باشد.
            </p>
            <ul className="space-y-3 text-zinc-800 xs:space-y-2 child:lg:text-sm child:xl:text-base">
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                تقویت هوشهای گاردنر
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                یادگیری با سرگرمی
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                محیط دوستانه و شاد
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                زمین بازی بزرگ با پارک کودکان
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                آموزشها آمیزه ای از اتاق بازی و کارگاه آموزشی دست ورزی هستند
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                آموزشها گروهی با همه ی گروه های سنی برای تقویت یادگیری همتا به
                همتا
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                سیستم آموزش مطابق با نیاز های منحصر به فرد دانش آموز
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                پروراندن علاقه به یادگیری در دانش آموز
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                استقلال و اعتماد به نفس و کارآفرینی اصل پایه آموزش به سبک مونته
                سوری میباشد
              </li>
              <li>
                <HiCheckCircle
                  fontSize="small"
                  className="text-pink-400 ml-1"
                />
                برگزاری کارگاه فلسفه برای کودکان
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
