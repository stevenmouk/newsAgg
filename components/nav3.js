import Image from "next/image";
import React from "react";
import styles from "../styles/nav3.module.css";

export default function Nav3() {
  return (
    <div className="min-h-screen">
      <div className=" w-full h-screen text-[200px] absolute z-1 font-bold flex items-center justify-center">
        <div>Bankrun News</div>
      </div>
      <div className=" w-[50%] h-screen absolute inset-0 z-0 ">
        <Image src="/images/newspaper.png" fill />
      </div>
    </div>
  );
}
