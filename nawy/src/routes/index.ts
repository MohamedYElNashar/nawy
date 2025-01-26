import { Router } from 'express';
import  apartmentRouter from './apartment';

const router = Router();
router.use(apartmentRouter);

export default router;


