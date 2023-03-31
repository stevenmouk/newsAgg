import React from "react";
import styles from "/styles/news.module.css";

export default function NewsItem({ title, link, time }) {
  let src = "";
  let url = "";
  let href = "";
  if (link != undefined) {
    if (link.includes("ft.com")) {
      url = "Financial Times";
      src = "/images/njjn.jpeg";
    } else if (link.includes("economist.com")) {
      url = "The Economist";
      src = "/images/ec.png";
    } else if (link.includes("reuters.com") || link.includes("reutersagency.com")) {
      url = "Reuters";
      src = "/images/reuters.jpeg";
    } else if (link.includes("finance.yahoo.com")) {
      url = "Yahoo Finance";
      src = "/images/yahoo.png";
    } else if (link.includes("foxbusiness.com")) {
      url = "Fox Business";
      src = "/images/fox.jpeg";
    } else if (link.includes("nytimes.com")) {
      url = "The New York Times";
      src = "/images/nytimes.png";
    } else if (link.includes("marketwatch.com")) {
      url = "MarketWatch";
      src = "/images/mw.jpeg";
    }
  }

  time = new Date(time);
  let month = time.toLocaleString("default", { month: "short" });
  let day = time.getDate();
  let year = time.getFullYear();
  let Newtime = time.toLocaleTimeString();
  getArticle(link);

  async function getArticle(article) {
    if (
      article.includes("yptr=yahoo") ||
      article.includes("finance.yahoo.com") ||
      article.includes("foxbusiness.com")
    ) {
      href = article;
    } else {
      href = "/currentArticle";
    }
  }

  async function setData() {
    let res = await fetch("/api/bookapi/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(`${link}`),
    });
    let data = await res.json();
    let newData = data.result;

    const array = link.split("/");
    var base = array[0] + "//" + array[2];

    var mapObj = {
      'href="/': `href="${base}/`,
      'src="/': `src="${base}/`,
      'srcset="/': `srcset="${base}/`,
      base: `br`,
      'id="bN015htcoyT__google-cache-hdr"': 'style="display:none !important;"',
    };

    var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    newData = newData.replace(re, function (matched) {
      return mapObj[matched];
    });

    localStorage.setItem("newData", JSON.stringify(newData));
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <div className="w-full flex items-center justify-center" onClick={setData}>
        <div
          className={`${styles.yY3Lee}  w-[350px] sm:w-[500px] md:w-[640px]`}
          jscontroller="ZpnVYd"
          data-article-source-name="The New York Times"
        >
          <div className={styles.nkXTJ}>
            <div className={`${styles.z4rs2b} w-[200px]`}>
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
                <img
                  alt=""
                  className={`${styles.Z4idke} w-[60px] h-[40px] sm:w-[120px] sm:h-[80px]`}
                  src={src}
                  data-iml="2145.4000000953674"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
