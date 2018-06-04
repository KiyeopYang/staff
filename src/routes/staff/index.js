import express from 'express';
import mongoose from 'mongoose';
import logging from '../../lib/logging';
import {
  fromMongo,
} from '../../lib/dbConnector';
import {
  Staff,
} from '../../models';
import auth from '../../auth';

const router = express.Router();

// 생성
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '생성';
    try {
      res.json(fromMongo((await new Staff(req.body).save()).toObject()));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${PROCESS}` });
    }
  },
);

// 수정
router.put(
  '/',
  async (req, res) => {
    const PROCESS = '수정';
    try {
      const { id, ...rest } = req.body;
      res.json(await Staff.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: {...rest} }));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${PROCESS}` });
    }
  },
);

router.get(
  '/list',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const staffs = await Staff.find({})
        .sort({ _id: -1 })
        .populate('shopId');
      res.json(fromMongo(staffs.map(o => o.toObject()).map(o => ({
        ...o,
        shop: o.shopId,
        shopId: o.shopId._id,
      }))));
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);

// 삭제
router.delete(
  '/',
  async (req, res) => {
    const PROCESS = '삭제';
    try {
      await Staff.deleteMany(
        {
          _id: { $in: req.body },
        },
      );
      res.json({ success: true });
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${PROCESS} 에러`,
      });
    }
  },
);
export default router;
