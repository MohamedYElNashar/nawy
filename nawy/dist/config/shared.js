"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodObjectId = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
const zodObjectId = () => zod_1.z
    .string()
    .length(24)
    .transform((str) => new mongodb_1.ObjectId(str));
exports.zodObjectId = zodObjectId;
