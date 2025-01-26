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
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const utils_1 = require("../utils");
const services_1 = require("../services");
const shared_1 = require("../config/shared");
const schemas_1 = require("../schemas");
const apartmentRouter = (0, utils_1.createRouter)({
    baseUrl: '/apartment',
    routes: [
        {
            method: 'get',
            path: '/all',
            body: zod_1.z.object({}),
            handler: () => __awaiter(void 0, void 0, void 0, function* () {
                return yield (0, services_1.findApartments)();
            })
        },
        {
            method: 'get',
            path: '/:id',
            params: zod_1.z.object({
                id: (0, shared_1.zodObjectId)(),
            }),
            handler: (_a) => __awaiter(void 0, [_a], void 0, function* ({ body }) {
                return (0, services_1.findApartment)(body);
            }),
        },
        {
            method: 'post',
            path: '/',
            body: zod_1.z.object({
                name: zod_1.z.string(),
                location: zod_1.z.nativeEnum(schemas_1.Locations),
                price: zod_1.z.number()
            }),
            handler: (_a) => __awaiter(void 0, [_a], void 0, function* ({ body }) {
                return (0, services_1.createApartment)(body);
            })
        },
        {
            method: 'patch',
            path: '/:id',
            params: zod_1.z.object({
                id: (0, shared_1.zodObjectId)()
            }),
            body: zod_1.z.object({
                price: zod_1.z.number()
            }),
            handler: (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, body }) {
                return yield (0, services_1.updateApartment)({ _id: params.id }, { $set: body });
            })
        },
        {
            method: 'get',
            path: '/filter',
            body: zod_1.z.object({
                name: zod_1.z.string().optional(),
                maxPrice: zod_1.z.number().optional(),
                minPrice: zod_1.z.number().optional(),
                location: zod_1.z.nativeEnum(schemas_1.Locations).optional(),
            }),
            handler: (_a) => __awaiter(void 0, [_a], void 0, function* ({ body }) {
                return yield (0, services_1.filterApartments)(body);
            }),
        },
        {
            method: 'delete',
            path: '/',
            body: zod_1.z.object({
                _id: (0, shared_1.zodObjectId)()
            }),
            handler: (_a) => __awaiter(void 0, [_a], void 0, function* ({ body }) {
                yield (0, services_1.deleteApartment)(body);
                return {};
            })
        },
    ],
});
exports.default = apartmentRouter;
