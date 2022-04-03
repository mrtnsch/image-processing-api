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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const pathToTestImage = path_1.default.join(__dirname, '../../../assets/full', 'encenadaport.jpg');
//generate random heights and widths for resize testing
const randomHeight = Math.floor(Math.random() * 100);
const randomWidth = Math.floor(Math.random() * 100);
const pathToTestImageThumb = path_1.default.join(__dirname, '../../../assets/thumb', 'encenadaport' + randomHeight.toString() + randomWidth.toString() + '.jpg');
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it('checks if the response is an image when request comes with correct parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images/?filename=encenadaport.jpg&width=200&height=200');
        expect(response.type).toBe('image/jpeg');
    }));
    describe('Test sharp resize functionality', () => {
        it('Calls the sharp resize function with encenadaport.jpg and checks if it creates a thumbnail', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, imageProcessing_1.default)(pathToTestImage, randomHeight, randomWidth, pathToTestImageThumb).then(() => __awaiter(void 0, void 0, void 0, function* () { return expect((yield fs_1.promises.access(pathToTestImageThumb)) == undefined).toBe(true); }));
        }));
    });
    // //old tests used during development when sending different responses
    // it('checks if filename, height and width are read correctly when supplied correctly', async () => {
    //     const response = await request.get('/api/images/?filename=testfilename&width=200&height=200');
    //     expect(response.body.filename).toBe("testfilename");
    //     expect(response.body.width).toBe(200);
    //     expect(response.body.height).toBe(200);
    // })
    // it('checks if user input is handled correctly if text is supplied as height and width', async () => {
    //     const response = await request.get('/api/images/?filename=123&width=abc&height=abc');
    //     expect(response.body.filename).toBe("123");
    //     expect(response.body.width).toBe(null);
    //     expect(response.body.height).toBe(null);
    // })
});
