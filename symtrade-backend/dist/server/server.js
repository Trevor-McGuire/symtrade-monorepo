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
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const path_1 = __importDefault(require("path"));
const schemas_1 = require("./schemas");
// import authMiddleware from '../middleware/auth';
const app = (0, express_1.default)();
const server = new server_1.ApolloServer({
    typeDefs: schemas_1.typeDefs,
    resolvers: schemas_1.resolvers,
});
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
    // context: authMiddleware,
    }));
    if (process.env.NODE_ENV === 'production') {
        const clientDistPath = path_1.default.join(__dirname, '../frontend/dist');
        app.use(express_1.default.static(clientDistPath));
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(clientDistPath, 'index.html'));
        });
    }
    return app;
});
exports.default = startApolloServer();
