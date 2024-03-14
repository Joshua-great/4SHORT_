// qrCodeGenerator.js


import qr from 'qrcode';
// Function to generate QR code and save it to a file
async function generateQRCode(text: any, filePath: any) {
  try {
    await qr.toFile(filePath, text);
    console.log('QR code generated successfully:', filePath);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

export default generateQRCode;
