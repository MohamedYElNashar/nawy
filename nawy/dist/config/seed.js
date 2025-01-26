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
const db_1 = require("../config/db");
const apartmentSchema_1 = require("../schemas/apartmentSchema");
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.connect)();
        const apartments = [
            { name: "Apartment A", location: "Downtown", price: 1200 },
            { name: "Apartment B", location: "Uptown", price: 1500 },
            { name: "Apartment C", location: "Suburbs", price: 1000 }
        ];
        for (const apartment of apartments) {
            yield apartmentSchema_1.Apartment.insertOne(apartment);
        }
        console.log('Seed data inserted');
        process.exit(0);
    });
}
seedData();
