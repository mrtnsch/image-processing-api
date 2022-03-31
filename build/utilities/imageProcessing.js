"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
//contains image resizing logic using sharp
const sharpResizeImage = (requestedPath, width, height, requestedPathThumb) => {
    return (0, sharp_1.default)(requestedPath)
        .resize(width, height)
        .toFile(requestedPathThumb, (err) => { })
        .toBuffer();
};
exports.default = sharpResizeImage;
