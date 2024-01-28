"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
    throw new Error('MongoDB URI not defined in .env file');
}
mongoose_1.default.connect(MONGODB_URI);
mongoose_1.default.set('debug', true);
exports.default = mongoose_1.default.connection;
