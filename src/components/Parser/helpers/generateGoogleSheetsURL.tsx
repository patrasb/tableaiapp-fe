// generate an array of arrays to be added to xlsx utils in order to be exported. https://docs.sheetjs.com/docs/api/utilities/array

import axios from 'axios';

const appScriptUrl = 'https://script.google.com/macros/s/AKfycbxKQEF9uT4K5Zzqnx087CWZmQnB7VG90c5y3ylaYDn3_W-vr-DJGnlwXb2T8mR6_F6g/exec';
export default async function generateGoogleSheetsURL(arrayOfData: string[][]) {
  try {
    const appScriptResponse = await axios({
      url: appScriptUrl,
      method: 'POST',
      data: JSON.stringify(arrayOfData),
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return appScriptResponse?.data?.sheetUrl;
  } catch (error) {
    console.log(error);
  }
}
