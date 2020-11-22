// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { orderBy, filter } from "lodash";

export default async (req, res) => {
  let cameras = (
    await fetch(
      "https://api.data.gov.sg/v1/transport/traffic-images"
    ).then((r) => r.json())
  ).items[0].cameras;
  let newcameras = orderBy(
    cameras.slice(
      0,
      cameras.length -
        filter(
          cameras,
          (camera) =>
            camera["image_metadata"].md5 === "b5fb3395e22ca1564fc5c16ef746e8a9"
        ).length
    ),
    "camera_id"
  );
  newcameras = newcameras.concat(
    filter(
      cameras,
      (camera) =>
        camera["image_metadata"].md5 === "b5fb3395e22ca1564fc5c16ef746e8a9"
    )
  );
  res.statusCode = 200;
  console.log(newcameras);
  res.json(newcameras);
};
