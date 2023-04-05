import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("rssFeeds");

    const result = await db
      .collection("rssFeeds")
      .find({})

      .toArray();

    res.json({ result: result });
  } catch (e) {
    console.error(e);
  }
};
