import React, { useEffect, useState } from "react";
// import cheerio from "cheerio";
import Image from "next/image";
import { ImBooks } from "react-icons/im";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

// import UserAgent from "user-agents";

export default function Test({ id }) {
  const [newData, setNewData] = useState(null);
  useEffect(() => {
    async function getArticle() {
      let article = "";
      for (let i = 0; i < id.length; i++) {
        if (i == 0) {
          article += id[i] + "//";
        } else if (i != id.length - 1) {
          article += id[i] + "/";
        } else {
          article += id[i];
        }
      }

      let res = await fetch("http://localhost:3000/api/bookapi/", {
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
    }

    getArticle();

    if (
      document.getElementsByClassName("o-cookie-message ")[0]?.classList != null &&
      document.getElementsByClassName("o-cookie-message__outer")[0].innerHTML != undefined
    ) {
      document.getElementsByClassName("o-cookie-message ")[0].classList = "";
    }
    if (
      document.getElementsByClassName("o-cookie-message__outer")[0]?.innerHTML != null &&
      document.getElementsByClassName("o-cookie-message__outer")[0]?.innerHTML != undefined
    ) {
      document.getElementsByClassName("o-cookie-message__outer")[0].innerHTML = "";
    }
  }, []);

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
        <div dangerouslySetInnerHTML={{ __html: newData }} />
      </main>

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  // const article2 = article;
  // const array = article.split("/");
  // var base = array[0] + "//" + array[2];

  // var mapObj = {
  //   'href="/': `href="${base}/`,
  //   'src="/': `src="${base}/`,
  //   'srcset="/': `srcset="${base}/`,
  //   base: `br`,
  //   'id="bN015htcoyT__google-cache-hdr"': 'style="display:none !important;"',
  // };

  // var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  // newData = newData.replace(re, function (matched) {
  //   return mapObj[matched];
  // });

  return {
    props: {
      id: id,
    },
  };
}