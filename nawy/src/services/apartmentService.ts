  import type { papr } from '../config/db';
  import type { apartmentSchema, ObjectId, TApartment } from '../schemas';
  import { Apartment } from '../schemas/apartmentSchema';


  export const findApartment = async (args: {id: ObjectId}) => {
    return await Apartment.findOne({_id: args.id})
  }

  export const createApartment = async (args: papr.DocumentForInsert<TApartment, (typeof apartmentSchema)[1]>)=>{
    return await Apartment.insertOne(args)
  }

  export const updateApartment = async (
    query: papr.PaprFilter<TApartment>,
    update: papr.PaprUpdateFilter<TApartment>,
  ) => {
    return await Apartment.findOneAndUpdate(query, update)
  }


  export const filterApartments = async (
    filter: papr.PaprFilter<TApartment> & {
      minPrice?: number;
      maxPrice?: number;
    }
  ) => {
    const { minPrice, maxPrice, ...query } = filter

    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice ? { $gte: minPrice } : {}),
        ...(maxPrice ? { $lte: maxPrice } : {}),
      };
    }

    return Apartment.find(query);
  }

  export const deleteApartment = async (args: {_id: ObjectId}) => {
    return await Apartment.findOneAndDelete({_id: args._id})
  }

  export const findApartments = async ()=> {
    return await Apartment.find({})
  }

