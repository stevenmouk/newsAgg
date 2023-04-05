import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const result = await db
      .collection("rssFeeds")
      .find({})

      .toArray();

    res.json({ result: result });
  } catch (e) {
    console.error(e);
  }
};
