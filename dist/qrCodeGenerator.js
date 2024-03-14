"use strict";
// qrCodeGenerator.js
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
const qrcode_1 = __importDefault(require("qrcode"));
// Function to generate QR code and save it to a file
function generateQRCode(text, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield qrcode_1.default.toFile(filePath, text);
            console.log('QR code generated successfully:', filePath);
        }
        catch (error) {
            console.error('Error generating QR code:', error);
        }
    });
}
exports.default = generateQRCode;
