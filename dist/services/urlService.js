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
            const existingUrl = yield Url_1.default.findOne({ originalUrl });
            if (existingUrl) {
                return existingUrl.shortUrl;
            }
            const shortUrl = 'https://4short/' + shortid_1.default.generate();
            const newUrl = new Url_1.default({ originalUrl, shortUrl });
            yield newUrl.save();
            return shortUrl;
        });
    }
    deleteUrl(shortUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Url_1.default.deleteOne({ shortUrl });
        });
    }
    customizeUrl(shortUrl, customUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUrl = yield Url_1.default.findOne({ shortUrl: customUrl });
            if (existingUrl) {
                throw new Error('Custom slug is already in use');
            }
            yield Url_1.default.findOneAndUpdate({ shortUrl }, { $set: { shortUrl: customUrl } });
        });
    }
    getAnalytics(shortUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield Url_1.default.findOne({ shortUrl });
            if (!url) {
                throw new Error('URL not found');
            }
            return { clicks: url.clicks || 0, locations: url.locations || [] };
        });
    }
}
exports.default = new UrlService();
