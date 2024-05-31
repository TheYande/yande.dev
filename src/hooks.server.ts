// Import required modules
import { google } from 'googleapis';
import * as e from "$env/static/private";
// import { marked } from "marked";
const env = e ?? process.env
// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: env.GOOGLE_SHEETS_PROJECT_ID,
    private_key_id: env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
    private_key: env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Replace newline characters
    client_email: env.GOOGLE_SHEETS_CLIENT_EMAIL,
    client_id: env.GOOGLE_SHEETS_CLIENT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Spreadsheet ID and range
const spreadsheetId = '1ZJRTlBq_M_s71ZChY9zOolYOODORALNlwW06onIRaSM';
const rawStatisticsRange = 'rawstatistics!A:B';
const statisticsRange = 'statistics!A:B';

// Function to update Google Sheets
async function updateGoogleSheets(visitsPerPage: Record<string, number>,path: string,event: RequestEvent) {

  try {
    // Update "rawstatistics" sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: rawStatisticsRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[path, Date.now(), event.request.headers.get("user-agent"), event.request.headers.get("referer")]],
      },
    });

    // Update "statistics" sheet
    const statisticsData = Object.entries(visitsPerPage).map(([path, visits]) => [path, visits]);
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: statisticsRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: statisticsData,
      },
    });
  } catch (error) {
    console.error('Error updating Google Sheets:', error);
  }
}

// Function to track visits and update Google Sheets
export async function trackVisit(event: RequestEvent) {
  // Track visits per page
  const visitsPerPage: Record<string, number> = {};

  // Get existing data from "statistics" sheet
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: statisticsRange,
    });
    const rows = response.data.values;
    if (rows && rows.length > 0) {
      rows.forEach(row => {
        if (row.length === 2) {
          visitsPerPage[row[0]] = parseInt(row[1], 10);
        }
      });
    }
  } catch (error) {
    console.error('Error retrieving statistics from Google Sheets:', error);
  }

  // Increment visit count for the current path
  visitsPerPage[event.url.pathname] = (visitsPerPage[event.url.pathname] || 0) + 1;

  // Update Google Sheets
  await updateGoogleSheets(visitsPerPage,event.url.pathname,event);
}

// src/hooks.server.ts

import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

 if ((!event.url.pathname.startsWith("/api")) && (!event.url.pathname.startsWith("/gh"))) trackVisit(event)

  const response = await resolve(event);

  return response;
};
