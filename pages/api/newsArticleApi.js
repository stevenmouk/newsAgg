export default async function handler(req, res) {
  const response = await fetch(`https://finviz.com/news.ashx`);

  const html = await response.text();

  res.status(200).json({ result: html });
}
