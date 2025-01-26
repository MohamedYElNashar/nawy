"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartment = exports.apartmentSchema = exports.Locations = void 0;
const db_1 = require("../config/db");
const papr_1 = require("papr");
exports.Locations = {
    Tagmo3: 'Tagmo3',
    Mohandseen: 'Mohandseen',
    Zamalek: 'Zamalek',
    SheikhZayed: 'SheikhZayed',
    Maadi: 'Maadi',
};
exports.apartmentSchema = (0, papr_1.schema)({
    name: papr_1.types.string({ required: true }),
    location: papr_1.types.enum(Object.values(exports.Locations), { required: true }),
    price: papr_1.types.number({ required: true }),
});
exports.Apartment = db_1.corePapr.model('apartment', exports.apartmentSchema);
