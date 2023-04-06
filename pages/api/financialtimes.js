export default async function handler(req, res) {
  try {
    const response = await fetch(req.body);

    const html = await response.text();

    res.status(200).json({ result: html });
  } catch (error) {
    res.status(500).send("error at fetching");
  }
}
