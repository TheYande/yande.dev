import { json } from "@sveltejs/kit";
import { google } from 'googleapis';
import { env as e } from "$env/dynamic/private";
import { marked } from "marked";
const env = e ?? process.env
let lastFetch = 0

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
  
  // Create Google Sheets API client
  const sheets = google.sheets({ version: 'v4', auth });
  
  const spreadsheetId = '1ZJRTlBq_M_s71ZChY9zOolYOODORALNlwW06onIRaSM';
  const range = 'Sheet1!A:B';
  
  async function updateAndGetData() {
    console.log("fetching data")
    try {
      // Read the data from the specified range
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      });
      const values = response.data.values || [];
  
      const updatedValues = [];
      const result = [];
  
      for (let i = 0; i < values.length; i++) {
        const row = values[i];
        const content = row[0];
        let date = row[1];
  
        if (!date) {
          // If the date is not present, add the current Unix timestamp
          date = new Date().toISOString();
          updatedValues.push([content, date]);
        } else {
          updatedValues.push([content, date]);
        }
  
        result.push({ content: marked.parse(content.replace("\\n","\n")), date });
      }
  
      // Update the spreadsheet with the new values if there were any changes
      if (updatedValues.length > 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          resource: {
            values: updatedValues
          }
        });
      }
  
      // Return the result array
      return result;
    } catch (error) {
      console.error('The API returned an error:', error);
      return [];
    }
  }
  
let data = []
data = await updateAndGetData()
// setInterval(async ()=>{data = await updateAndGetData()},10*1000)
export async function GET() {
    data = await updateAndGetData()

        return json({
               posts : data.sort((a,b) => new Date(b.date) - new Date(a.date))
        })
}
