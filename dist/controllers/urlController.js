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
class UrlController {
    shortenUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { originalUrl } = req.body;
                if (!originalUrl || !/^https?:\/\//.test(originalUrl)) {
                    throw new Error('Invalid URL format');
                }
                const shortUrl = yield urlService_1.default.shortenUrl(originalUrl);
                res.status(200).json({ shortUrl });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    customizeUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Add logic for customizing URL
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    generateQRCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortUrl } = req.params;
                // Define the file path where the QR code will be saved
                const filePath = `./public/qr_codes/${shortUrl}.png`;
                // Generate QR code and save it to the file path
                yield (0, qrCodeGenerator_1.default)(shortUrl, filePath);
                // Send the file path to the client
                res.sendFile(filePath);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Add logic for getting analytics
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new UrlController();
