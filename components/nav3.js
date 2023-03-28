import Image from "next/image";
import React from "react";
import styles from "../styles/nav3.module.css";

export default function Nav3() {
  return (
    <div className=" min-h-[70vh] w-full ">
      <div className={`${styles.banner} text-2xl pt-5 pl-5 sm:pt-10 sm:pl-24 `}>Bankrun News</div>
      <div className=" h-[70vh] w-full flex flex-col items-center justify-center ">
        <div className={`${styles.banner} text-[32px] xs:text-[42px] sm:text-[62px] text-center `}>
          Free Finance News <br />
          Aggregator
        </div>
        <div className={`${styles.secondary} mt-10 text-gray-600 text-xl text-center px-5`}>
          Latest and best free financial news from the top websites
        </div>
      </div>
    </div>
  );
}
