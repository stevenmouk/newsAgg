export default async function handler(req, res) {
  try {
    let response;
    let query = req.body.split("?")[0];

    console.log(query);

    if (query.includes("economist.com")) {
      response = await fetch(query, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",

          pragma: "no-cache",
          "cache-control": "no-cache",
        },

        method: "GET",
        mode: "cors",
      });
    } else {
      response = await fetch(`https://12ft.io/api/proxy?ref=&q=${query}`, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')",
          pragma: "no-cache",
          "cache-control": "no-cache",
          referer: "https://www.google.com/",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
        mode: "cors",
      });
    }
    let html = await response.text();

    if (response.status != 200) {
      response = await fetch(`${query}`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
        method: "GET",
        mode: "cors",
      });
      html = await response.text();
    }

    res.status(200).json({ result: html });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
