import React from "react";
import styles from "../styles/nav.module.css";

export default function Nav() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-[150px] w-min-screen">
        <div
          className={`${styles.stretch_it} flex flex-grow text-9xl border-b border-l border-t border-black tracking-[.15em] hover:bg-black hover:text-white`}
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
      <div className="h-[206px] border-b border-black tracking-widest flex flex-row">
        <div
          className={`${styles.stretch_it} h-[100%] flex items-start flex-col justify-center min-w-[406px] border-r border-black text-5xl  space-y-4`}
        >
          <div> Free Finance</div>

          <div>News Aggregator</div>
        </div>
        <div
          className={` ${styles.stretch_it} w-full bg-black m-6 flex items-center justify-center text-white flex-col text-lg`}
        >
          <div className="mb-1">"If you owe the bank $100, that's your problem.</div>
          <div>If you owe the bank $100 million, that's the bank's problem."</div>
          <div className="pl-[500px] mt-2">- Jean Paul Getty</div>
        </div>
      </div>
    </div>
  );
}

//style="letter-spacing: 50px;"
