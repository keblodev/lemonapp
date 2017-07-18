import express from 'express';
const router =  express.Router();

import feedrizerApi from './feedrizer/api';

router.use('/feedrizer', feedrizerApi);

export default router;

