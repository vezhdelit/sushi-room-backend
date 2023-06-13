import fs from 'fs';
import { fileURLToPath } from 'url';

import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const uploadFile = async(req, res) => {
    res.json({
      url:`/uploads/${req.file.originalname}`,
    })
  }
