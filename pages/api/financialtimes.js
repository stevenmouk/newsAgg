export default async function handler(req, res) {
  const response = await fetch(`https://www.ft.com/search?q=technology&sort=date`);

  const html = await response.text();

  res.status(200).json({ result: html });
}
