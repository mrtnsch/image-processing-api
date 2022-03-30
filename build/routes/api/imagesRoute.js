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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imagesRoutes = express_1.default.Router();
const currentdir = __dirname;
//helper function which gets the file name
const getFileName = (name) => {
    try {
        const returnName = name.slice(0, name.indexOf("."));
        return returnName;
    }
    catch (_a) {
        return name;
    }
};
//helper function which gets the file extension
const getFileExtension = (name) => {
    try {
        const returnName = name.substring(name.indexOf("."));
        return returnName;
    }
    catch (_a) {
        return "";
    }
};
imagesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    //Read filename, width and height from query
    const imageProps = {
        filename: (_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.toString(),
        width: parseInt(req.query.width),
        height: parseInt(req.query.height),
        filenameWithoutExtension: getFileName((_b = req.query.filename) === null || _b === void 0 ? void 0 : _b.toString()),
        fileExtension: getFileExtension((_c = req.query.filename) === null || _c === void 0 ? void 0 : _c.toString())
    };
    const requestedPath = path_1.default.join(__dirname, '../../../assets/full', imageProps.filename);
    const requestedPathThumb = path_1.default.join(__dirname, '../../../assets/thumb', (imageProps.filenameWithoutExtension +
        imageProps.width.toString() +
        imageProps.height.toString() +
        imageProps.fileExtension));
    //add: if filename is not valid, then return error message
    try {
        if ((yield fs_1.promises.access(requestedPath)) != undefined) {
            res.status(400).send("The requested image does not exist on the server.");
        }
    }
    catch (_d) {
        console.error(`User requested file "${imageProps.filename}" which does not exist on the server`);
        res.status(400).send("The requested image does not exist on the server.");
    }
    //add: if height or width are not specificed, then return the full image
    if (!(imageProps.height && imageProps.width)) {
        res.status(200).sendFile(requestedPath);
    }
    //if filename is valid, and height and width are specified, check if resized image exists. if it does, send it.
    try {
        if ((yield fs_1.promises.access(requestedPathThumb)) == undefined) {
            //image exists
            res.status(200).sendFile(requestedPathThumb);
        }
    }
    catch (_e) {
        //if it does not exist, resize using sharp, save to thumb and send resized image
        (0, sharp_1.default)(requestedPath)
            .resize(imageProps.width, imageProps.height)
            .toFile(requestedPathThumb, (err) => {
        })
            .toBuffer()
            .then(data => res.type('jpg').send(data));
        //unable to get the code working with this snippet, using above workaround
        // res.status(200).sendFile(requestedPathThumb); 
    }
}));
exports.default = imagesRoutes;
