// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const cameras = (
    await fetch(
      "https://api.data.gov.sg/v1/transport/traffic-images"
    ).then((r) => r.json())
  ).items[0].cameras;
  res.statusCode = 200;
  res.json(cameras);
};
