"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
