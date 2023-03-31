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
  const [newData, setNewData] = useState(null);
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
        // let res = await fetch("/api/newsArticleApi/", {
        //   method: "POST",
        //   mode: "cors",
        // });

        let arr = [];

        let parser = new Parser();
        let feed;

        let res = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://www.ft.com/technology?format=rss",
        });
        let data = await res.json();

        feed = await parser.parseString(data.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

        // if (econ == true) {
        //   let res2 = await fetch("/api/financialtimes/", {
        //     method: "POST",
        //     mode: "cors",
        //     body: "https://www.economist.com/finance-and-economics/rss.xml",
        //   });
        //   let data2 = await res2.json();

        //   feed = await parser.parseString(data2.result);

        //   feed.items.forEach((item) => {
        //     arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        //   });
        // }

        let res3 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
        });
        let data3 = await res3.json();

        feed = await parser.parseString(data3.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

        let res4 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://finance.yahoo.com/news/rss",
        });
        let data4 = await res4.json();

        feed = await parser.parseString(data4.result);

        feed.items.forEach((item) => {
          if (item.link.includes("finance.yahoo.com")) {
            arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
          }
        });

        // if (reuters == true) {
        //   let res5 = await fetch("/api/financialtimes/", {
        //     method: "POST",
        //     mode: "cors",
        //     body: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best",
        //   });
        //   let data5 = await res5.json();

        //   feed = await parser.parseString(data5.result);

        //   feed.items.forEach((item) => {
        //     arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        //   });
        // }

        // if (reuters == true) {
        //   let res6 = await fetch("/api/financialtimes/", {
        //     method: "POST",
        //     mode: "cors",
        //     body: "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com/business&ceid=US:en&hl=en-US&gl=US",
        //   });
        //   let data6 = await res6.json();

        //   feed = await parser.parseString(data6.result);

        //   feed.items.forEach((item) => {
        //     let newUrl = "";
        //     if (item.guid.toString().includes("_SAQA")) {
        //       newUrl = atob(item.guid.toString().substring(0, item.guid.toString().length - 5));

        //       if (
        //         newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
        //         "h"
        //       ) {
        //         newUrl = newUrl.toString().trim().replace(/\s/, "").substring(5, newUrl.length);
        //       } else {
        //         newUrl = newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length);
        //       }
        //     } else {
        //       newUrl = atob(item.guid);
        //       if (
        //         newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
        //         "h"
        //       ) {
        //         newUrl = newUrl
        //           .toString()
        //           .trim()
        //           .replace(/\s/, "")
        //           .substring(5, newUrl.length - 4);
        //       } else {
        //         newUrl = newUrl
        //           .toString()
        //           .trim()
        //           .replace(/\s/, "")
        //           .substring(4, newUrl.length - 4);
        //       }
        //     }

        //     arr.push({ url: newUrl, title: item.title, time: new Date(item.pubDate) });
        //   });
        // }

        let res7 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://www.ft.com/companies?format=rss",
        });
        let data7 = await res7.json();

        feed = await parser.parseString(data7.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });
        // let res8 = await fetch("/api/financialtimes/", {
        //   method: "POST",
        //   mode: "cors",
        //   body: "https://www.ft.com/us?format=rss",
        // });
        // let data8 = await res8.json();

        // feed = await parser.parseString(data8.result);

        // feed.items.forEach((item) => {
        //   // console.log(item);
        //   arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        // });

        let res9 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        });
        let data9 = await res9.json();

        feed = await parser.parseString(data9.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

        let res10 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://rss.nytimes.com/services/xml/rss/nyt/economy.xml",
        });
        let data10 = await res10.json();

        feed = await parser.parseString(data10.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

        // if (nytimes == true) {
        //   let res11 = await fetch("/api/financialtimes/", {
        //     method: "POST",
        //     mode: "cors",
        //     body: "https://rss.nytimes.com/services/xml/rss/nyt/yourmoney.xml",
        //   });
        //   let data11 = await res11.json();

        //   feed = await parser.parseString(data11.result);

        //   feed.items.forEach((item) => {
        //     arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        //   });
        // }

        let res12 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://moxie.foxbusiness.com/google-publisher/latest.xml",
        });
        let data12 = await res12.json();

        feed = await parser.parseString(data12.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.guid, title: item.title, time: new Date(item.pubDate) });
        });

        let res13 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://moxie.foxbusiness.com/google-publisher/economy.xml",
        });
        let data13 = await res13.json();

        feed = await parser.parseString(data13.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.guid, title: item.title, time: new Date(item.pubDate) });
        });

        let res14 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://moxie.foxbusiness.com/google-publisher/markets.xml",
        });
        let data14 = await res14.json();

        feed = await parser.parseString(data14.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.guid, title: item.title, time: new Date(item.pubDate) });
        });

        // let res15 = await fetch("/api/financialtimes/", {
        //   method: "POST",
        //   mode: "cors",
        //   body: "https://moxie.foxbusiness.com/google-publisher/personal-finance.xml",
        // });
        // let data15 = await res15.json();

        // feed = await parser.parseString(data15.result);

        // feed.items.forEach((item) => {
        //   arr.push({ url: item.guid, title: item.title, time: new Date(item.pubDate) });
        // });

        let res16 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://moxie.foxbusiness.com/google-publisher/technology.xml",
        });
        let data16 = await res16.json();

        feed = await parser.parseString(data16.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.guid, title: item.title, time: new Date(item.pubDate) });
        });

        let res17 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://moxie.foxbusiness.com/google-publisher/small-business.xml",
        });
        let data17 = await res17.json();

        feed = await parser.parseString(data17.result);

        // let res18 = await fetch("/api/financialtimes/", {
        //   method: "POST",
        //   mode: "cors",
        //   body: "https://moxie.foxbusiness.com/google-publisher/real-estate.xml",
        // });
        // let data18 = await res18.json();

        // feed = await parser.parseString(data18.result);

        // feed.items.forEach((item) => {
        //   arr.push({ url: item.guid, title: item.title, time: new Date(item.pubDate) });
        // });

        // if (reuters == true) {
        //   let res19 = await fetch("/api/financialtimes/", {
        //     method: "POST",
        //     mode: "cors",
        //     body: "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com/technology&ceid=US:en&hl=en-US&gl=US",
        //   });
        //   let data19 = await res19.json();

        //   feed = await parser.parseString(data19.result);

        //   feed.items.forEach((item) => {
        //     let newUrl = "";
        //     if (item.guid.toString().includes("_SAQA")) {
        //       newUrl = atob(item.guid.toString().substring(0, item.guid.toString().length - 5));

        //       if (
        //         newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
        //         "h"
        //       ) {
        //         newUrl = newUrl.toString().trim().replace(/\s/, "").substring(5, newUrl.length);
        //       } else {
        //         newUrl = newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length);
        //       }
        //     } else {
        //       newUrl = atob(item.guid);
        //       if (
        //         newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
        //         "h"
        //       ) {
        //         newUrl = newUrl
        //           .toString()
        //           .trim()
        //           .replace(/\s/, "")
        //           .substring(5, newUrl.length - 4);
        //       } else {
        //         newUrl = newUrl
        //           .toString()
        //           .trim()
        //           .replace(/\s/, "")
        //           .substring(4, newUrl.length - 4);
        //       }
        //     }

        //     arr.push({ url: newUrl, title: item.title, time: new Date(item.pubDate) });
        //   });
        // }

        let res20 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US",
        });
        let data20 = await res20.json();

        feed = await parser.parseString(data20.result);

        feed.items.forEach((item) => {
          let newUrl = "";
          if (item.guid.toString().includes("_SAQA")) {
            newUrl = atob(item.guid.toString().substring(0, item.guid.toString().length - 5));

            if (
              newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length).charAt(0) !=
              "h"
            ) {
              newUrl = newUrl.toString().trim().replace(/\s/, "").substring(5, newUrl.length);
            } else {
              newUrl = newUrl.toString().trim().replace(/\s/, "").substring(4, newUrl.length);
            }
          } else {
            newUrl = atob(item.guid);
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

          arr.push({ url: newUrl, title: item.title, time: new Date(item.pubDate) });
        });

        // if (market == true) {
        //   let res21 = await fetch("/api/financialtimes/", {
        //     method: "POST",
        //     mode: "cors",
        //     body: "http://feeds.marketwatch.com/marketwatch/bulletins",
        //   });
        //   let data21 = await res21.json();

        //   feed = await parser.parseString(data21.result);

        //   feed.items.forEach((item) => {
        //     const regex = /https?:\/\/[\w-]+(\.[\w-]+)+([/?#][\w\-\.\?\,\/\+&=%!:#\(\)]*)?/;
        //     let url = item.link.toString().match(regex)[0];
        //     arr.push({ url: url, title: item.title, time: new Date(item.pubDate) });

        //     console.log(url);
        //   });
        // }

        // let res22 = await fetch("/api/financialtimes/", {
        //   method: "POST",
        //   mode: "cors",
        //   body: "https://www.bing.com/news/search?q=reuters.com&format=rss",
        // });
        // let data22 = await res22.json();

        // feed = await parser.parseString(data22.result);

        // feed.items.forEach((item) => {
        //   // console.log(item);

        //   arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        // });

        let sortedArray = arr.sort((a, b) => b.time - a.time);

        var final = sortedArray.reduce(function (p, c) {
          if (
            !p.some(function (el) {
              return el.title === c.title;
            })
          )
            p.push(c);

          return p;
        }, []);

        setNews(final);

        setFinal(final);
      } catch (error) {
        console.log(error);
      }
    }
    x();
    const interval = setInterval(() => {
      x();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function getArticle(article) {
    if (
      article.includes("yptr=yahoo") ||
      article.includes("finance.yahoo.com") ||
      article.includes("foxbusiness.com")
    ) {
      window.open(article);
    } else {
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

      setNewData(newData);

      localStorage.setItem("newData", JSON.stringify(newData));
      window.open(`/${article}`);
    }
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
                  <div className="" onClick={() => getArticle(`${article.url}`)}>
                    <NewsItem title={article.title} link={article.url} time={article.time} />
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
