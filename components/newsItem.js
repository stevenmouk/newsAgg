import React from "react";
import styles from "/styles/news.module.css";

export default function NewsItem({ title, link, time }) {
  let src = "";
  let url = "";
  if (link.includes("ft.com")) {
    url = "Financial Times";
    src = "/images/njjn.jpeg";
  } else if (link.includes("economist.com")) {
    url = "The Economist";
    src = "/images/ec.png";
  } else if (link.includes("reutersagency.com")) {
    url = "Reuters";
  } else {
    url = "The New York Times";
    src = "/images/nytimes.png";
  }

  let month = time.toLocaleString("default", { month: "short" });
  let day = time.getDate();
  let year = time.getFullYear();
  let Newtime = time.toLocaleTimeString();

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`${styles.yY3Lee}    w-[640px]`}
        jscontroller="ZpnVYd"
        data-article-source-name="The New York Times"
      >
        <div className={styles.nkXTJ}>
          <div className={`${styles.z4rs2b} w-[504px]`}>
            <div className="hover:cursor-pointer">
              <div className={styles.Tfehrf}>
                <div className={`${styles.nkXTJ} ${styles.W8knGc}`} jsname="GvmPSb">
                  <div className={styles.sfyJob}>{url}</div>
                  <div className={styles.cCEUJe}>
                    <div className={styles.Adak}>
                      {month} {day}
                      {", "}
                      {year} {Newtime}
                    </div>
                    <div className={styles.hVmHve} jsname="iwaAEc">
                      <div
                        jsaction="dcnbp:g97fl;FzgWvd:y31ice"
                        jsname="ua2Wv"
                        data-ved="0CAYQw-MJahcKEwiAovGQydT9AhUAAAAAHQAAAAAQAg"
                        jslog="160195;ved:0CAYQw-MJahcKEwiAovGQydT9AhUAAAAAHQAAAAAQAg;track:click"
                      >
                        <div
                          jsaction="JIbuQc:aj0Jcf(WjL7X); keydown:uYT2Vb(WjL7X);iFFCZc:oNPcuf;Rld2oe:li9Srb"
                          jsshadow=""
                          className={`${styles.VfPpkdxl07ObXxIAqeOWXEXeoYxtQd} ${styles.hi8qbc}`}
                          jscontroller="wg1P6b"
                          jsname="P0upg"
                          data-is-menu-dynamic="true"
                        >
                          <div jsname="WjL7X" jsslot="">
                            <span data-is-tooltip-wrapper="true">
                              <button
                                className={`${styles.VfPpkdBz112cLgbsSe} ${styles.yHy1rc} ${styles.eT1oJ} ${styles.mN1ivc} ${styles.rA8zGe}`}
                                jscontroller="soHxf"
                                jsaction="click:cOuCgd(preventDefault=true); mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;mlnRJb:fLiPzd"
                                data-idom-class="yHy1rc eT1oJ mN1ivc rA8zGe"
                                aria-label="News Preferences Menu"
                                data-tooltip-enabled="true"
                                data-tooltip-id="tt-c1"
                                aria-expanded="false"
                                aria-haspopup="menu"
                              >
                                <div jsname="s3Eaab" class="VfPpkd-Bz112c-Jh9lGc"></div>
                                <div className={styles.VfPpkdBz112cJ1UkfcLhBDec}></div>
                                <i
                                  className="google-material-icons VfPpkd-kBDsod YFTGP m4RXFd"
                                  aria-hidden="true"
                                >
                                  more_vert
                                </i>
                              </button>
                              <div
                                className={styles.EY8ABdOWXEXeTAWMXe}
                                role="tooltip"
                                aria-hidden="true"
                                id="tt-c1"
                              >
                                News Preferences Menu
                              </div>
                            </span>
                          </div>
                          <div jsname="U0exHf" jsslot=""></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.Yfwt5}>{title}</div>
              </div>
            </div>
          </div>
          <div>
            <a
              target="_blank"
              jslog="106424;ved:0CAUQuL8GahcKEwiAovGQydT9AhUAAAAAHQAAAAAQAg;track:click"
              href="https://www.nytimes.com/2023/03/11/technology/silicon-valley-bank-crypto-investing.html"
            >
              <img alt="" className={styles.Z4idke} src={src} data-iml="2145.4000000953674" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
