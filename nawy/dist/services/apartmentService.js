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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findApartments = exports.deleteApartment = exports.filterApartments = exports.updateApartment = exports.createApartment = exports.findApartment = void 0;
const apartmentSchema_1 = require("../schemas/apartmentSchema");
const findApartment = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield apartmentSchema_1.Apartment.findOne({ _id: args.id });
});
exports.findApartment = findApartment;
const createApartment = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield apartmentSchema_1.Apartment.insertOne(args);
});
exports.createApartment = createApartment;
const updateApartment = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield apartmentSchema_1.Apartment.findOneAndUpdate(query, update);
});
exports.updateApartment = updateApartment;
const filterApartments = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { minPrice, maxPrice } = filter, query = __rest(filter, ["minPrice", "maxPrice"]);
    if (minPrice || maxPrice) {
        query.price = Object.assign(Object.assign({}, (minPrice ? { $gte: minPrice } : {})), (maxPrice ? { $lte: maxPrice } : {}));
    }
    return apartmentSchema_1.Apartment.find(query);
});
exports.filterApartments = filterApartments;
const deleteApartment = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield apartmentSchema_1.Apartment.findOneAndDelete({ _id: args._id });
});
exports.deleteApartment = deleteApartment;
const findApartments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield apartmentSchema_1.Apartment.find({});
});
exports.findApartments = findApartments;
