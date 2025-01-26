
import { Apartment, Locations, ObjectId } from '../../schemas'

export const migrate = async () => {
  
  const apts = [
    { _id: new ObjectId('6794c753f4e20eb0245d8c3a') , name: 'Apt 205', location: Locations.Tagmo3, price: 30000 },
    { _id: new ObjectId() , name: 'Apt 505', location: Locations.Tagmo3, price: 20000 },
    { _id: new ObjectId() , name: 'Apt 305', location: Locations.Tagmo3, price: 50000 },
    { _id: new ObjectId() , name: 'Apt 805', location: Locations.Tagmo3, price: 50000 },
    { _id: new ObjectId(), name: 'Apt 420', location: Locations.Mohandseen, price: 15000 },
    { _id: new ObjectId() , name: 'Apt 250', location: Locations.Maadi, price: 10000 }
  ]


  for(const apt of apts){
    await Apartment.insertOne(apt);
  }
}


