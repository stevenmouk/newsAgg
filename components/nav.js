import React from "react";
import styles from "../styles/nav.module.css";

export default function Nav() {
  return (
    <div className="flex flex-row h-[150px] w-full">
      <div
        class={`${styles.stretch_it} flex flex-grow text-9xl border-b border-l border-t border-black tracking-[.15em] w-fit hover:bg-black hover:text-white`}
      >
        Bankrun News
      </div>
      <div className="h-[100%]  font-light tracking-wide flex flex-col border border-black items-center  w-fit">
        <div className=" w-full text-center px-10 border-b border-black py-3 hover:bg-black hover:text-white hover:cursor-pointer">
          FEATURES
        </div>
        <div className=" w-full text-center px-10 border-b border-black py-3 hover:bg-black hover:text-white hover:cursor-pointer">
          SERVICES
        </div>
        <div className="w-full text-center px-10 py-3 hover:bg-black hover:text-white hover:cursor-pointer">
          PRICES
        </div>
      </div>

      <div className="h-[100%]  border-b border-r border-t border-black  justify-center flex items-center w-[16em] hover:bg-black hover:text-white hover:cursor-pointer">
        <div className="font-light tracking-wide">CONTACT</div>
      </div>
    </div>
  );
}

//style="letter-spacing: 50px;"
