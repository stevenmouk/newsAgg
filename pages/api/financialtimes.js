export default async function handler(req, res) {
  // console.log(req.body);
  const response = await fetch(req.body);

  //https://www.ft.com/search?q=technology&sort=date
  const html = await response.text();

  res.status(200).json({ result: html });
}
