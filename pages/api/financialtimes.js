export default async function handler(req, res) {
  const response = await fetch(req.body);

  const html = await response.text();

  res.status(200).json({ result: html });
}
