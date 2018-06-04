import express from 'express';
import shop from './shop';
import staff from './staff';
import work from './work';

const router = express.Router();

router.use('/shop', shop);
router.use('/staff', staff);
router.use('/work', work);

export default router;
