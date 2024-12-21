import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const SPREADSHEET_ID = '1pm9R5SRNKUf_QLf4oYUF1jSlsjqwYXDX3qMdc0x_TaE';
const CATEGORIES_TAB = 'Categories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'pinnit-account-list.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: CATEGORIES_TAB,
    });

    const rows = response.data.values || [];
    const categories: Record<string, string[]> = {};

    if (rows.length > 1) {
      const headers = rows[0]; // First row as category headers
      headers.forEach((header, colIndex) => {
        categories[header] = rows.slice(1).map((row) => row[colIndex]).filter(Boolean); // Filter empty cells
      });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
