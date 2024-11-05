import { Router } from 'express';
import { getUsers, getUser, postUser } from '../controllers/userController';

const router = Router();
router.get('/', getUsers);
router.get('/:cognitoId', getUser);
router.post('/create-user', postUser);

export default router;
