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
const urlService_1 = __importDefault(require("../services/urlService"));
const qrCodeGenerator_1 = __importDefault(require("../qrCodeGenerator"));
const Url_1 = __importDefault(require("../models/Url"));
const fs_1 = __importDefault(require("fs"));
class UrlController {
    shortenUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { originalUrl } = req.body;
                if (!originalUrl || !/^https?:\/\//.test(originalUrl)) {
                    throw new Error("Invalid URL format");
                }
                const urlDoc = yield Url_1.default.findOne({ originalUrl });
                if (urlDoc) {
                    res.status(200).json({
                        message: "Short URL already exists",
                        shortUrl: urlDoc.shortUrl,
                    });
                    return;
                }
                const shortUrl = yield urlService_1.default.shortenUrl(originalUrl);
                // Update table with shortUrl
                yield Url_1.default.create({
                    originalUrl,
                    shortUrl,
                });
                res.status(200).json({
                    message: "Short URL generated successfully",
                    shortUrl, // Return the generated short URL
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    customizeUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortUrl, customUrl } = req.body;
                // Check if the custom URL is already in use
                const existingUrl = yield Url_1.default.findOne({ shortUrl: customUrl });
                if (existingUrl) {
                    res.status(400).json({ error: "Custom URL already in use" });
                    return;
                }
                // Update the short URL with the custom URL
                yield Url_1.default.findOneAndUpdate({ shortUrl }, { shortUrl: customUrl });
                res.status(200).json({ message: "Custom URL updated successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    generateQRCode(shortUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Define the file path where the QR code will be saved
                const filePath = `./public/qr_codes/${shortUrl}.png`;
                // Generate QR code and save it to the file path
                yield (0, qrCodeGenerator_1.default)(filePath);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortUrl } = req.params;
                // Fetch analytics data for the given short URL
                const url = yield Url_1.default.findOne({ shortUrl });
                if (!url) {
                    res.status(404).json({ error: "Short URL not found" });
                    return;
                }
                // Return the analytics data
                res.status(200).json({ clicks: url.clicks });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    downloadQRCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortUrl } = req.params;
                // Define the file path of the QR code
                const filePath = `./public/qr_codes/${shortUrl}.png`;
                // Check if the file exists
                if (!fs_1.default.existsSync(filePath)) {
                    res.status(404).json({ error: "QR Code not found" });
                    return;
                }
                // Send the file as a response
                res.sendFile(filePath);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = new UrlController();
