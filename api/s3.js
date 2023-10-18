import dotenv from "dotenv";
dotenv.config();

import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

export const addImage = async (req, res) => {
  // #swagger.tags = ['Upload']

  const params = {
    Bucket: BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3.send(command);

  res.json({
    url: `${req.file.originalname}`,
  });
};

export const getImage = async (req, res) => {
  // #swagger.tags = ['Upload']

  const key = req.params.key;

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    const { Body } = await s3.getObject(params);

    // Set appropriate headers
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", `attachment; filename="${key}"`);

    // Pipe the S3 object directly to the response
    Body.pipe(res);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
};
