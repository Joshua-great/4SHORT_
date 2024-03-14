import { Document } from 'mongoose';
import shortid from 'shortid';
import Url, { IUrl } from '../models/Url';

class UrlService {
  async shortenUrl(originalUrl: string): Promise<string> {
    // Check if the original URL already exists in the database
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
        return existingUrl.shortUrl; // Return existing short URL
    }

    // Generate a unique short ID
    const shortUrl = 'https://4short-' + shortid.generate();
    
    // Save the original and short URL to the database
    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();
    
    // Return the generated short URL
    return shortUrl;
}

  async customizeUrl(shortUrl: string, customSlug: string): Promise<string> {
    // Implement logic to check if the custom slug is available
    // and not already used, you may check your database for this.

    const existingUrl = await Url.findOne({ shortUrl: customSlug });
    if (existingUrl) {
      throw new Error('Custom slug is already in use');
    }

    const updatedUrl = await Url.findOneAndUpdate(
      { shortUrl },
      { $set: { shortUrl: customSlug } },
      { new: true }
    );

    if (!updatedUrl) {
      throw new Error('URL not found');
    }

    return customSlug;
  }

  async generateQrCode(shortUrl: string): Promise<string> {
    // Placeholder for QR code generation using a third-party API
    // You need to integrate with a QR code generator API
    // and return the URL or path to the generated QR code image
    const qrCodeImageUrl = `https://example.com/qr-code-generator?url=${encodeURIComponent(shortUrl)}`;
    return qrCodeImageUrl;
  }

  async getAnalytics(shortUrl: string): Promise<{ clicks: number; locations: string[] }> {
    // Placeholder for analytics data retrieval
    // Implement logic to retrieve analytics data from your database
    // You may store click count and location data in your URL model
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      throw new Error('URL not found');
    }

    // Dummy analytics data for demonstration purposes
    const clicks = url.clicks || 0;
    const locations = url.locations || [];

    return { clicks, locations };
  }

  async getLinkHistory(userId: string): Promise<IUrl[]> {
    const linkHistory = await Url.find({ userId }) as unknown as IUrl[];
    return linkHistory;
  }

  async trackUrlUsage(shortUrl: string, location: string): Promise<void> {
    // Placeholder for tracking URL usage (clicks and location)
    // Implement logic to track URL usage and update analytics in your database
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      throw new Error('URL not found');
    }

    // Increment click count
    url.clicks = (url.clicks || 0) + 1;

    // Update location data (add the new location)
    url.locations = Array.from(new Set([...(url.locations || []), location]));

    await url.save();
  }
}

export default new UrlService();
