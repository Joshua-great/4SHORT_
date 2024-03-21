import shortid from 'shortid';
import Url, { IUrl } from '../models/Url';

class UrlService {
  async shortenUrl(originalUrl: string): Promise<string> {
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return existingUrl.shortUrl;
    }

    const shortUrl = 'https://4short/' + shortid.generate();
    
    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();
    
    return shortUrl;
  }
  async deleteUrl(shortUrl: string): Promise<void> {
    await Url.deleteOne({ shortUrl });
  }

  async customizeUrl(shortUrl: string, customUrl: string): Promise<void> {
    const existingUrl = await Url.findOne({ shortUrl: customUrl });
    if (existingUrl) {
      throw new Error('Custom slug is already in use');
    }

    await Url.findOneAndUpdate(
      { shortUrl },
      { $set: { shortUrl: customUrl } }
    );
  }

  async getAnalytics(shortUrl: string): Promise<{ clicks: number; locations: string[] }> {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      throw new Error('URL not found');
    }

    return { clicks: url.clicks || 0, locations: url.locations || [] };
  }
}

export default new UrlService();
