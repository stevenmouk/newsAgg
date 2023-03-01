import axios from "axios";
import cheerio from "cheerio";
import Head from "next/head";
import Image from "next/image";
import TradingViewWidget from "../components/trading";

import Link from "next/link";
import Router, { useRouter } from "next/router";

import { useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState();
  const [newData, setNewData] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await fetch("/api/newsArticleApi/", {
      method: "POST",
      mode: "cors",
    });

    let res2 = await fetch("/api/financialtimes/", {
      method: "POST",
      mode: "cors",
    });
    let data2 = await res2.json();

    let arr = [];
    let $3 = cheerio.load(data2.result);
    $3("#site-content a", data2.result).each(function () {
      if ($3(this)?.attr("href")?.includes("content")) {
        arr.push({ url: $3(this).attr("href"), title: $3(this).text() });
      }
    });

    setNews(arr);
    $3(this).attr("href");
    let data = await res.json();

    // console.log(data.result);
    let $ = cheerio.load(data.result);

    $(".table-fixed ", data.result)
      .first()
      .each(function () {
        $(this)
          .find(".nn")
          .each(function () {
            let url = $(this).find("a").attr("href");
            if (url != undefined && !url.includes("bloomberg")) {
              // arr.push(url);
            }
          });
      });

    let $2 = cheerio.load(data.result);

    let arr2 = [];
    $2(".table-fixed ", data.result)
      .last()
      .each(function () {
        $(this)
          .find(".nn")
          .each(function () {
            let url = $(this).find("a").attr("href");
            if (url != undefined && !url.includes("bloomberg")) {
              arr2.push(url);
            }
          });
      });

    setBlogs(arr2);
  }

  // async function search(article) {
  //   let res = await fetch("/api/bookapi/", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(`${article}`),
  //   });
  //   let data = await res.json();
  //   let newData = data.result;

  //   const article2 = article;
  //   const array = article2.split("/");
  //   var base = array[0] + "//" + array[2];

  //   var mapObj = {
  //     'href="/': `href="${base}/`,
  //     'src="/': `src="${base}/`,
  //     'srcset="/': `srcset="${base}/`,
  //     base: `br`,
  //     'id="bN015htcoyT__google-cache-hdr"': 'style="display:none !important;"',
  //   };

  //   var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  //   newData = newData.replace(re, function (matched) {
  //     return mapObj[matched];
  //   });
  //   console.log(newData);
  // }

  async function getArticle(article) {
    // for (let i = 0; i < id.length; i++) {
    //   if (i == 0) {
    //     article += id[i] + "//";
    //   } else if (i != id.length - 1) {
    //     article += id[i] + "/";
    //   } else {
    //     article += id[i];
    //   }
    // }

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
    setNewData(newData);

    localStorage.setItem("newData", JSON.stringify(newData));
    router.push(`/${article}`);
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
            <p className="text-black w-[80%] sm:w-[50%]">
              Free Scholarly Articles works by scraping open access content from over 50,000
              publishers and repositories, making it easy to read and use. Simply enter the DOI code
              of the article and hit search.
            </p>
            <form onSubmit={handleSubmit} className="flex justify-center mt-20">
              <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-row items-stretch w-full mb-4">
                  <input
                    type="text"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
                    required
                  />
                  <button
                    className="btn inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-800 hover:shadow-lg   focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="submit"
                    id="button-addon2"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <div>News</div>
            {news
              ? news.map((article) => {
                  return (
                    <div
                      className="mb-10"
                      onClick={() => getArticle(`https://www.ft.com${article.url}`)}
                    >
                      {article.title}
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
