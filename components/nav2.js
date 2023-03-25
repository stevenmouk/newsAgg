import Image from "next/image";
import React from "react";
import styles from "../styles/nav2.module.css";

export default function Nav2() {
  return (
    <div className={`  min-w-screen ${styles.body} flex flex-row items-center justify-between `}>
      <Image src="/images/brnlogo.png" height={125} width={125} className="ml-4"></Image>
      {/* <div className="text-white flex flex-row   space-x-10">
        <div className="hover:cursor-pointer">Blog</div>
        <div className="hover:cursor-pointer">Stock Pages</div>
        <div className="hover:cursor-pointer">Super Investors</div>
      </div>
      <div className="text-white mr-10 px-3 py-1 border rounded-full  border-[#C82703] hover:cursor-pointer">
        Donate
      </div> */}
    </div>
  );
}
