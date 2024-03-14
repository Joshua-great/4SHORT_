"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const Url_1 = __importDefault(require("../models/Url"));
class UrlService {
    shortenUrl(originalUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the original URL already exists in the database
            const existingUrl = yield Url_1.default.findOne({ originalUrl });
            if (existingUrl) {
                return existingUrl.shortUrl; // Return existing short URL
            }
            // Generate a unique short ID
            const shortUrl = 'https://4short-' + shortid_1.default.generate();
            // Save the original and short URL to the database
            const newUrl = new Url_1.default({ originalUrl, shortUrl });
            yield newUrl.save();
            // Return the generated short URL
            return shortUrl;
        });
    }
    customizeUrl(shortUrl, customSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement logic to check if the custom slug is available
            // and not already used, you may check your database for this.
            const existingUrl = yield Url_1.default.findOne({ shortUrl: customSlug });
            if (existingUrl) {
                throw new Error('Custom slug is already in use');
            }
            const updatedUrl = yield Url_1.default.findOneAndUpdate({ shortUrl }, { $set: { shortUrl: customSlug } }, { new: true });
            if (!updatedUrl) {
                throw new Error('URL not found');
            }
            return customSlug;
        });
    }
    generateQrCode(shortUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder for QR code generation using a third-party API
            // You need to integrate with a QR code generator API
            // and return the URL or path to the generated QR code image
            const qrCodeImageUrl = `https://example.com/qr-code-generator?url=${encodeURIComponent(shortUrl)}`;
            return qrCodeImageUrl;
        });
    }
    getAnalytics(shortUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder for analytics data retrieval
            // Implement logic to retrieve analytics data from your database
            // You may store click count and location data in your URL model
            const url = yield Url_1.default.findOne({ shortUrl });
            if (!url) {
                throw new Error('URL not found');
            }
            // Dummy analytics data for demonstration purposes
            const clicks = url.clicks || 0;
            const locations = url.locations || [];
            return { clicks, locations };
        });
    }
    getLinkHistory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const linkHistory = yield Url_1.default.find({ userId });
            return linkHistory;
        });
    }
    trackUrlUsage(shortUrl, location) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder for tracking URL usage (clicks and location)
            // Implement logic to track URL usage and update analytics in your database
            const url = yield Url_1.default.findOne({ shortUrl });
            if (!url) {
                throw new Error('URL not found');
            }
            // Increment click count
            url.clicks = (url.clicks || 0) + 1;
            // Update location data (add the new location)
            url.locations = Array.from(new Set([...(url.locations || []), location]));
            yield url.save();
        });
    }
}
exports.default = new UrlService();
