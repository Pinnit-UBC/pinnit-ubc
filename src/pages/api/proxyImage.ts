// src/pages/api/proxyImage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    res.status(400).send('Image URL is required');
    return;
  }

  try {
    const response = await fetch(url);
    const imageBuffer = await response.buffer();

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Failed to fetch image');
  }
}
