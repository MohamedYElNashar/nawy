"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.papr = exports.contentPapr = exports.corePapr = exports.client = void 0;
exports.connect = connect;
exports.disconnect = disconnect;
const mongodb_1 = require("mongodb");
const papr_1 = __importStar(require("papr")), papr = papr_1;
exports.papr = papr;
let client;
const corePapr = new papr_1.default();
exports.corePapr = corePapr;
const contentPapr = new papr_1.default();
exports.contentPapr = contentPapr;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            return;
        }
        const uri = process.env.MONGO_URI || 'mongodb://nawy:nawypassword@localhost:27017/core?authSource=admin';
        if (!uri) {
            throw new Error('MONGO_URI is not defined in the environment variables.');
        }
        try {
            exports.client = client = yield mongodb_1.MongoClient.connect(uri, {
                ignoreUndefined: true,
            });
            corePapr.initialize(client.db('core'));
            contentPapr.initialize(client.db('content'));
            console.log('Successfully connected to MongoDB.');
        }
        catch (err) {
            console.error('Failed to connect to MongoDB:', err);
            process.exit(1);
        }
    });
}
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            yield client.close();
            console.log('Disconnected from MongoDB.');
        }
    });
}
