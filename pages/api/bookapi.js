export default async function handler(req, res) {
  try {
    let query = req.body.split("?")[0];
    console.log(query);

    const response = await fetch(`https://12ft.io/api/proxy?ref=&q=${query}`, {
      method: "GET",
      mode: "cors",
    });

    const html = await response.text();

    res.status(200).json({ result: html });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
