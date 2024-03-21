import QRCode from "qrcode";

async function generateQRCode(text: string): Promise<Buffer> {
  try {
    // Generate QR code as a buffer
    const qrCodeBuffer = await QRCode.toBuffer(text);
    return qrCodeBuffer;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

export default generateQRCode;
