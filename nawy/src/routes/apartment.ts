import { z } from 'zod';
import { createRouter } from '../utils';
import { createApartment, findApartment , updateApartment , filterApartments , deleteApartment, findApartments} from '../services';
import { zodObjectId } from '../config/shared';
import { Locations } from '../schemas';


const apartmentRouter = createRouter({
  baseUrl: '/apartment',
  routes: [
    {
      method: 'get',
      path: '/all',
      body: z.object({}),
      handler: async() => {
        return await findApartments()
      }
    },
    {
      method: 'get',
      path: '/locations',
      body: z.object({}),
      handler: async() => {
        return Locations 
      }
    },
    {
      method: 'get',
      path: '/:id',
      params:  z.object({
        id: zodObjectId(),
      }),
      handler: async ({params}) => {
        return findApartment(params)
      },
    },
    {
      method: 'post',
      path: '/',
      body: z.object({
        name: z.string(),
        location: z.nativeEnum(Locations),
        price: z.number()
      }),
      handler: async({body})=> {
        return createApartment(body)
      }
    },
    {
      method: 'patch',
      path: '/:id',
      params: z.object({
        id: zodObjectId()
      }),
      body: z.object({
        price: z.number().optional(),
        location: z.nativeEnum(Locations).optional()
      }),
      handler: async({params, body})=> {
        return await updateApartment({_id: params.id},{$set: body})
      }
    },
    {
      method: 'get',
      path: '/filter',
      body: z.object({
        name: z.string().optional(),
        maxPrice: z.number().optional(),
        minPrice: z.number().optional(),
        location: z.nativeEnum(Locations).optional(),
      }),
      handler: async ({ body }) => {
        return await filterApartments(body);
      },
    },
    {
      method: 'delete',
      path: '/',
      body: z.object({
        _id: zodObjectId()
      }),
      handler: async({body}) => {
        await deleteApartment(body)
        return {}
      }
    },
  ],
});

export default apartmentRouter;
