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

export default function Home() {
  const [news, setNews] = useState([]);
  // const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState();
  const [newData, setNewData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function x() {
      try {
        // let res = await fetch("/api/newsArticleApi/", {
        //   method: "POST",
        //   mode: "cors",
        // });

        let res = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://www.ft.com/technology?format=rss",
        });
        let data = await res.json();

        let arr = [];
        // let $3 = cheerio.load(data2.result);
        // $3("#site-content .o-teaser__heading a", data2.result).each(function () {
        //   if ($3(this)?.attr("href")?.includes("content")) {
        //     arr.push({ url: $3(this).attr("href"), title: $3(this).text() });
        //   }
        // });

        let parser = new Parser();

        let feed = await parser.parseString(data.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

        let res2 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://www.economist.com/finance-and-economics/rss.xml",
        });
        let data2 = await res2.json();

        feed = await parser.parseString(data2.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

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

        // let res4 = await fetch("/api/financialtimes/", {
        //   method: "POST",
        //   mode: "cors",
        //   body: "https://finance.yahoo.com/news/rss",
        // });
        // let data4 = await res4.json();

        // feed = await parser.parseString(data4.result);

        // feed.items.forEach((item) => {
        //   arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        // });

        let res5 = await fetch("/api/financialtimes/", {
          method: "POST",
          mode: "cors",
          body: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best",
        });
        let data5 = await res5.json();

        feed = await parser.parseString(data5.result);

        feed.items.forEach((item) => {
          arr.push({ url: item.link, title: item.title, time: new Date(item.pubDate) });
        });

        const sortedArray = arr.sort((a, b) => b.time - a.time);

        setNews(sortedArray);

        // let data = await res.json();

        // console.log(data2.result);
        // let $ = cheerio.load(data.result);

        // $(".table-fixed ", data.result)
        //   .first()
        //   .each(function () {
        //     $(this)
        //       .find(".nn")
        //       .each(function () {
        //         let url = $(this).find("a").attr("href");
        //         if (url != undefined && !url.includes("bloomberg")) {
        //           // arr.push(url);
        //         }
        //       });
        //   });

        // let $2 = cheerio.load(data.result);

        // let arr2 = [];
        // $2(".table-fixed ", data.result)
        //   .last()
        //   .each(function () {
        //     $(this)
        //       .find(".nn")
        //       .each(function () {
        //         let url = $(this).find("a").attr("href");
        //         if (url != undefined && !url.includes("bloomberg")) {
        //           arr2.push(url);
        //         }
        //       });
        //   });

        // setBlogs(arr2);
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
    if (article.includes("yptr=yahoo") || article.includes("finance.yahoo.com")) {
      router.push(article);
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
      router.push(`/${article}`);
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

      <main className=" min-h-screen  flex flex-col ">
        <div className="w-full flex flex-col">
          <div className="mt-3 pl-4  h-16 flex flex-row justify-between ">
            <Link href="/">
              <h1 className="font-serif text-3xl font-bold pl-8 sm:pl-0 hidden sm:inline">
                Free Scholarly Articles
              </h1>
            </Link>
            <div></div>
          </div>

          <div className="w-full min-h-screen flex items-center flex-col mt-5  ">
            <h1 className="w-[80%] sm:w-full pt-20  pb-7  max-w-screen-md  text-4xl sm:text-5xl md:text-7xl font-extrabold sm:tracking-tight text-center">
              Search over 30 million scholarly
            </h1>

            <Ticker />

            {news
              ? news.map((article) => {
                  return (
                    <div className="" onClick={() => getArticle(`${article.url}`)}>
                      <NewsItem title={article.title} link={article.url} time={article.time} />
                    </div>
                  );
                })
              : ""}

            <div>Blogs</div>
            {/* {blogs
              ? blogs.map((article) => {
                  return (
                    <div
                    // onClick={() => {
                    //   search(article);
                    // }}
                    >
                      {article}
                    </div>
                  );
                })
              : ""} */}

            {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
            <div className="">
              <TradingViewWidget />
            </div>
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
