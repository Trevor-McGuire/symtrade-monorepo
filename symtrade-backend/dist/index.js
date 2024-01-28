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
exports.startServer = void 0;
const server_1 = __importDefault(require("./server/server"));
const connection_1 = __importDefault(require("./database/connection"));
require("dotenv/config");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const { PORT } = process.env;
    if (!PORT) {
        throw new Error('Port not defined in .env file');
    }
    const server = yield server_1.default;
    connection_1.default.on('error', console.error.bind(console, 'connection error:'));
    connection_1.default.once('open', () => {
        server.listen(PORT, () => {
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
    return server;
});
exports.startServer = startServer;
(0, exports.startServer)();
