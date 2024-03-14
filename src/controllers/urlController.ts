import { Request, Response } from 'express';
import urlService from '../services/urlService';
import generateQRCode from '../qrCodeGenerator';

class UrlController {
  async shortenUrl(req: Request, res: Response): Promise<void> {
    try {
      const { originalUrl } = req.body;
      
      if (!originalUrl || !/^https?:\/\//.test(originalUrl)) {
        throw new Error('Invalid URL format');
      }
  
      const shortUrl = await urlService.shortenUrl(originalUrl);
      
      res.status(200).json({ shortUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async customizeUrl(req: Request, res: Response): Promise<void> {
    try {
      // Add logic for customizing URL
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async generateQRCode(req: Request, res: Response): Promise<void> {
    try {
      const { shortUrl } = req.params;

      // Define the file path where the QR code will be saved
      const filePath = `./public/qr_codes/${shortUrl}.png`;

      // Generate QR code and save it to the file path
      await generateQRCode(shortUrl, filePath);

      // Send the file path to the client
      res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      // Add logic for getting analytics
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UrlController();
