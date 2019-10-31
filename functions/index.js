const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const { google } = require('googleapis');
const { promisify } = require('util');

function sameDay(d1, d2) {
  if (!(d1 instanceof Date)) return false; // if not a date, make a new day
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

exports.main = functions.https.onRequest(async (req, res) => {
  try {
    const value = await req.body;
    const NAME = value.name;
    const PHONE = value.phone;
    const LOCATION = value.location;
    const ORDER = value.order;

    // const oldTime = new Date();

    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const api = google.sheets({ version: 'v4', auth });
    const getSheets = promisify(api.spreadsheets.get.bind(api.spreadsheets));
    const sheetData = await getSheets({
      spreadsheetId: '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
    });
    const allSheets = sheetData.data.sheets;
    // res.send(sheetData);
    const lastSheetTitle = allSheets[allSheets.length - 1].properties.title;
    const currentTime = new Date();
    const keepSheet = sameDay(lastSheetTitle, currentTime); // if false, make new sheet for orders...
    // first order will make a new order sheet for the new day
    if (!keepSheet) {
      const addSheet = promisify(
        api.spreadsheets.batchUpdate.bind(api.spreadsheets)
      );
      // just make a new sheet so that we can get its sheetId
      const add_tab_request = {
        auth: auth,
        spreadsheetId: '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: currentTime,
                },
              },
            },

            // {
            //   valueInputOption: 'USER_ENTERED',
            //   data: {
            //     values: [
            //       [
            //         'Timestamp',
            //         'Name',
            //         'Delivery Location',
            //         'Phone Number',
            //         'What can we get for ya?',
            //         'Den Cost',
            //         'Total',
            //         'red=ordered\nyellow=bagged\ngreen=delivered',
            //       ],
            //     ],
            //   },
            // },
          ],
        },
      };

      await addSheet(add_tab_request);
      // res.status(200).send('newSheetData3'); // this send works!
      const getNewSheets = promisify(
        api.spreadsheets.get.bind(api.spreadsheets)
      );
      const newSheetData = await getNewSheets({
        spreadsheetId: '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
      });
      const newSheetList = newSheetData.data.sheets;
      const newSheetId =
        newSheetList[newSheetList.length - 1].properties.sheetId;

      const formatNewSheet = {
        auth: auth,
        spreadsheetId: '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
        resource: {
          requests: [
            {
              insertRange: {
                range: {
                  sheetId: newSheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                shiftDimension: 'ROWS',
              },
            },
            {
              pasteData: {
                data:
                  'Timestamp, Name, Delivery Location, Phone Number, Order, Den Cost, Total, red=ordered yellow=bagged green=delivered',
                type: 'PASTE_NORMAL',
                delimiter: ',',
                coordinate: {
                  sheetId: newSheetId,
                  rowIndex: 0,
                },
              },
            },
            // {
            //   range: {
            //     sheetId: newSheetId,
            //     startRowIndex: 0,
            //     endRowIndex: 1,
            //     startColumnIndex: 0,
            //     endColumnIndex: 8,
            //   },
            // updateWrapStrategy: 'WRAP',
            // },
            {
              repeatCell: {
                range: {
                  sheetId: newSheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 8,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.0,
                      green: 1.0,
                      blue: 0.0,
                    },
                    wrapStrategy: 'WRAP',
                    textFormat: {
                      foregroundColor: {
                        red: 0.0,
                        green: 0.0,
                        blue: 0.0,
                      },
                      fontSize: 12,
                      bold: true,
                    },
                  },
                },
                fields:
                  'userEnteredFormat(backgroundColor,textFormat,wrapStrategy)',
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: newSheetId,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: 'gridProperties.frozenRowCount',
              },
            },
          ],
        },
      };
      const addFormat = promisify(
        api.spreadsheets.batchUpdate.bind(api.spreadsheets)
      );
      // add formatting to new sheet now that we have sheetId ref
      await addFormat(formatNewSheet, err => {
        if (err) {
          // Handle error.
          console.log(err);
        } else {
          // console.log(`Spreadsheet ID: ${spreadsheet.spreadsheetId}`);
          console.log('Sheet updated.');
        }
      });

      // const newSheet = await addSheet(
      //   {
      // auth: auth,
      // 'Spreadsheet ID': '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
      // range: currentTime,
      // resource: {
      //   spreadsheetId: '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
      //   addSheet: {
      //     properties: {
      //       title: 'currentTime',
      //     },
      //   },
      // },
      //     },
      //     (err, spreadsheet) => {
      //       if (err) {
      //         // Handle error.
      //         console.log(err);
      //       } else {
      //         console.log(`Spreadsheet ID: ${spreadsheet.spreadsheetId}`);
      //       }
      //     }
      //   );
    }
    res.status(200).send(keepSheet);

    // const appendRows = promisify(
    //   api.spreadsheets.values.append.bind(api.spreadsheets)
    // );
    // await appendRows({
    //   auth: auth,
    //   spreadsheetId: '1rehng5R3a5ShueeUWMUDde_wpXQKfGfQ57xugkBIFzI',
    //   range: '1',
    //   valueInputOption: 'USER_ENTERED',
    //   resource: {
    //     values: [[new Date(), NAME, PHONE, LOCATION, ORDER]],
    //   },
    // });
    // res.status(200).send('OK');
  } catch (err) {
    res.status(500).send({ err });
  }
});

// function newSheet() {
// [
// 'Timestamp',
// 'Name',
// 'Delivery Location',
// 'Phone Number',
// 'What can we get for ya?',
// 'Den Cost',
// 'Total',
// 'red=ordered\nyellow=bagged\ngreen=delivered',
// ],
// }
