import { corePapr } from '../config/db';
import { schema , types } from 'papr';


export const Locations = {
  Tagmo3: 'Tagmo3',
  Mohandseen: 'Mohandseen',
  Zamalek: 'Zamalek',
  SheikhZayed: 'SheikhZayed',
  Maadi: 'Maadi',
} as const
export type Locations = (typeof Locations)[keyof typeof Locations]


export const apartmentSchema = schema({
  name: types.string({required: true }),
  location: types.enum(Object.values(Locations),{required: true }),
  price: types.number({required: true }),
});

export type TApartment = typeof apartmentSchema[0]
export const Apartment = corePapr.model('apartment', apartmentSchema)


