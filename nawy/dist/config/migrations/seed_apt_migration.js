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
exports.migrate = void 0;
const schemas_1 = require("../../schemas");
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    const apts = [
        { _id: new schemas_1.ObjectId('6794c753f4e20eb0245d8c3a'), name: 'Apt 205', location: schemas_1.Locations.Tagmo3, price: 30000 },
        { _id: new schemas_1.ObjectId(), name: 'Apt 505', location: schemas_1.Locations.Tagmo3, price: 20000 },
        { _id: new schemas_1.ObjectId(), name: 'Apt 305', location: schemas_1.Locations.Tagmo3, price: 50000 },
        { _id: new schemas_1.ObjectId(), name: 'Apt 805', location: schemas_1.Locations.Tagmo3, price: 50000 },
        { _id: new schemas_1.ObjectId(), name: 'Apt 420', location: schemas_1.Locations.Mohandseen, price: 15000 },
        { _id: new schemas_1.ObjectId(), name: 'Apt 250', location: schemas_1.Locations.Maadi, price: 10000 }
    ];
    for (const apt of apts) {
        yield schemas_1.Apartment.insertOne(apt);
    }
});
exports.migrate = migrate;
