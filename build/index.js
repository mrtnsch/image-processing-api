"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
// import sharp from 'sharp';
const app = (0, express_1.default)();
const port = 3000;
//use the routes defined in the routes folder
app.use('/api', index_1.default);
//image processing logic can be found in routes/api/imagesRoute
//start the server
app.listen(port, () => {
    console.log(`Server started and listening at port ${port}`);
});
//export app object for testing
exports.default = app;
