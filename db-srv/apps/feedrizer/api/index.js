import { compose } from 'compose-middleware';
import express from 'express';
const router =  express.Router();

import api from './auth.api';

router.use(api);

export default router;