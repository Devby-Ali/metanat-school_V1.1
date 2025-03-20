import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import { BiSupport } from "react-icons/bi";
import { MdOutlineContentCopy } from "react-icons/md";
import { GiCutDiamond } from "react-icons/gi";
import { IoCodeWorking } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { HiHome } from "react-icons/hi2";
import { MdOutlinePlayLesson } from "react-icons/md";

export default function AboutUs() {
  return (
    <div className="relative container">
      <SectionHeader
        title="ما چه کمکی بهتون میکنیم؟"
        desc="از اونجایی که متانت یک مدرسه ی مونته سوری هست"
        Page={"Index"}
      />

      <div className="grid grid-rows-2 md:grid-cols-2 gap-8 sm:gap-10 cursor-default mb-36">
        <AboutUsBox
          title="تقویت هوشهای گاردنر"
          desc="کودکانی که هیجان رشد و یادگیری مادام العمر دارند می توانند از حداکثر مغز خود استفاده کنند، این در حالی است که  با احساسات مثبت نسبت به آموزش و یادگیری رشد می کنند، آنها دانش را می آموزند و زیر سوال می برند و انتقاد می کنند، تعصبات و الگوها را کنار می گذارند و تفکرات را در زندگی واقعی بکار می برند."
          icon={<GiBrain className="text-emerald-400" />}
        />
        <AboutUsBox
          title="محیط دوستانه و شاد"
          desc="فضای آموزشی ما با امکانات مناسب و امنیتی مطلوب، یک محیط دلنشین و پر از انرژی مثبت برای کودکان ایجاد می‌کند که در آنها احساس امنیت و راحتی می‌کنند."
          icon={<HiHome className="text-amber-400" />}
        />
        <AboutUsBox
          title="سراغ حرفه ای ها رفتیم"
          desc="به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید."
          icon={<GiCutDiamond className="text-sky-400" />}
        />
        <AboutUsBox
          title="برگزاری کارگاه فلسفه برای کودکان"
          desc="فلسفه برای کودکان (فبک) برنامه‌ای است که به پرورش قدرت استدلال و قضاوت کودکان می‌پردازد. این برنامه زیر مجموعه ای از برنامه‌های بهبود تفکر است که در دهه‌های گذشته جهت ایجاد تغییر در نظام آموزشی تدوین شدند."
          icon={<MdOutlinePlayLesson className="text-purple-400" />}
        />
      </div>
      <div className="hidden lg:block absolute right-0 -top-40 translate-x-1/3 -translate-y-6/10 size-75 bg-red-500 opacity-25 blur-[125px] -z-10 rounded-full"></div>
    </div>
  );
}
