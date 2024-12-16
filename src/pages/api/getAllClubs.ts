import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;
const ALL_CLUBS_TAB = process.env.ALL_CLUBS_TAB!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'pinnit-account-list.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: ALL_CLUBS_TAB,
    });

    const rows = response.data.values || []; // Ensure rows is an array
    const clubs: any[] = [];

    if (rows.length > 1) {
      const headers = rows[0]; // The first row contains column headers
      rows.slice(1).forEach((row) => {
        const club: Record<string, string> = {};
        headers.forEach((header, colIndex) => {
          club[header.toLowerCase().replace(/\s+/g, '_')] = row[colIndex] || '';
        });
        clubs.push(club);
      });
    }

    res.status(200).json(clubs); // Always return an array
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
}
