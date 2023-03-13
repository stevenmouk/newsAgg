export default async function handler(req, res) {
  try {
    let response;
    let query = req.body.split("?")[0];

    console.log(query);

    if (query.includes("economist.com")) {
      response = await fetch(query, {
        method: "GET",
        mode: "cors",
      });
    } else if (query.includes("https://www.nytimes.com")) {
      response = await fetch("https://web.archive.org/" + query, {
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
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",

          pragma: "no-cache",
          "cache-control": "no-cache",
        },
        mode: "cors",
      });
    }
    const html = await response.text();

    res.status(200).json({ result: html });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
