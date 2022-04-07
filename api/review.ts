import { createClient } from 'redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {

  const client = createClient({ url: process.env.DB_CONNECTION });

  try {
    await client.connect();
  } catch (err) {
    return res.status(500).json({status: 'DB connection error'});
  }

  if (req.method === 'GET'){
    const keys = await client.keys("review:*");
    if (keys.length) {
      const reviews = await client.mGet(keys);
      return res.send(
        reviews.map(str => JSON.parse(str))
      );
    } else {
      return res.send([]);
    }
  }
  else if (req.method === 'POST') {
    const id = await client.incr('id');
    if(isNaN(id)) throw "Could not get id";
    try {
      const review = { id, ...req.body };
      await client.set(`review:${id}`, JSON.stringify(review));
      return res.send({status: "Review submited"});
    } catch (err) {
      return res.status(500).json({status: "Could not submit review"});
    }
  }
};
