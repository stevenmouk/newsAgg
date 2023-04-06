import axios from "axios";
import cheerio from "cheerio";
import Head from "next/head";
import Image from "next/image";
import TradingViewWidget from "../components/trading";
import Parser from "rss-parser";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Ticker from "../components/ticker";
import NewsItem from "../components/newsItem";
import Script from "next/script";

import Nav2 from "../components/nav2";
import Loading from "../components/loading";
import Nav3 from "../components/nav3";

export default function Home() {
  const [news, setNews] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState();

  const router = useRouter();

  const [final, setFinal] = useState([]);

  // const getData = async () => {
  //   try {
  //     const res = await axios.get("https://geolocation-db.com/json/");
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getData();

  useEffect(() => {
    async function x() {
      try {
        const res = await fetch("/api/mongoapi/");
        let result = await res.json();

        let arr = result.result;

        for (let i = 0; i < arr.length; i++) {
          arr[i].pubDate = new Date(arr[i].pubDate);

          if (arr[i].link?.toString().includes("google.com")) {
            const regex = /\/articles\/(.+)/;
            const match = arr[i].link.toString().match(regex)[1];

            let newUrl = "";
            if (match.includes("_SAQA")) {
              newUrl = atob(match.toString().substring(0, match.toString().length - 10));
              // console.log(newUrl);
              if (
                newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
                "h"
              ) {
                newUrl = newUrl.toString().trim().replace(/\s/, "").substring(5, newUrl.length);
              } else {
                newUrl = newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length);
              }
            } else {
              let newMatch = match.substring().substring(0, match.toString().length - 5);

              newUrl = atob(newMatch);
              if (
                newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
                "h"
              ) {
                newUrl = newUrl
                  .toString()
                  .trim()
                  .replace(/\s/, "")
                  .substring(5, newUrl.length - 4);
              } else {
                newUrl = newUrl
                  .toString()
                  .trim()
                  .replace(/\s/, "")
                  .substring(4, newUrl.length - 4);
              }
            }
            arr[i].link = newUrl;
          }
        }

        let final = arr.reduce(function (p, c) {
          if (
            !p.some(function (el) {
              return el.title === c.title || el.link === c.link;
            })
          )
            p.push(c);

          return p;
        }, []);
        let sortedArray = final.sort((a, b) => b.pubDate - a.pubDate);
        if (sortedArray.length > 100) {
          sortedArray.splice(100);
        }

        setNews(sortedArray);
      } catch (error) {
        console.log(error);
      }
    }
    x();
  }, []);

  async function setDataFunc(article) {
    if (
      article.includes("yptr=yahoo") ||
      article.includes("finance.yahoo.com") ||
      article.includes("foxbusiness.com")
    ) {
      router.push(article);
    }
    let res = await fetch("/api/bookapi/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(`${article}`),
    });
    let data = await res.json();
    let newData = data.result;

    const array = article.split("/");
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

    router.push("/currentArticle");
  }

  return (
    <div>
      <Head>
        <title>Free Scholarly Articles | Read published articles without the paywall</title>
        <meta
          name="description"
          content="Free Scholarly Articles, get published works without the paywall. Read over 30 million scholarly articles without needing to pay or login. All scholarly works are open access from over 50,000 publishers.  "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav3 />

      <main className=" min-h-screen  flex flex-col ">
        <div className="w-full flex flex-col">
          <div className="w-full min-h-screen flex items-center flex-col  ">
            {news ? (
              news.map((article) => {
                return (
                  <div
                    className=""
                    onClick={() => {
                      setDataFunc(article.link);
                    }}
                  >
                    <NewsItem title={article.title} link={article.link} time={article.pubDate} />
                  </div>
                );
              })
            ) : (
              <Loading />
            )}
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center mt-[50px]">
          <div className="sm:w-[60%] w-[90%]  flex flex-col items-center justify-center text-black font-serif  mb-28">
            <h1 className="text-2xl font-bold">FAQ</h1>
            <div className="w-[80%]">
              <h2 className="mt-3 font-bold">What?</h2>
              <p className="mt-3">
                Search for any scholarly aticle in seconds. We use over 50,000 publishers to scrape
                free and open scholarly articles. This means all you have to do is enter the DOI
                code and read the article without the annoying price tag.
              </p>
              <h2 className="mt-5 font-bold">Why?</h2>
              <p className="mt-3">
                We believe education is a basic human right and should be available to anyone for no
                cost. As such, we worked to create a site where people can find and read any
                scholarly article they want without worrying about paying.
              </p>
              <p className="mt-3">
                You should be able to enjoy reading published research without worrying about
                affording it.
              </p>
              <h2 className="mt-5 font-bold">How does it work?</h2>
              <p className="mt-3">
                The idea is pretty simple, we scrape open publishers and put the free versions of
                the articles in one website. We allow users to find any of those scholarly articles
                if they encounter a paywall on other websites. You can download any pdf and store it
                locally. To download, simply search for the article and press the download button on
                the top right corner.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
