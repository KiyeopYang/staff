import express from 'express';
import mongoose from 'mongoose';
import logging from '../../lib/logging';
import {
  fromMongo, toMongo,
} from '../../lib/dbConnector';
import {
  Work,
  Staff,
} from '../../models';
import auth from '../../auth';

const router = express.Router();

// 생성
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '생성';
    const { staff, shop, ...rest } = req.body;
    try {
      res.json(fromMongo((await new Work({
        staff: {
          _id: mongoose.Types.ObjectId(staff.id),
          ...(toMongo(staff)),
        },
        shop: {
          _id: mongoose.Types.ObjectId(shop.id),
          ...(toMongo(shop)),
        },
        ...rest,
      }).save()).toObject()));
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
      const { id, endDatetime, staff, shop, ...rest } = req.body;
      res.json(await Work.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set:
            {
              ...rest,
              staff: {
                _id: mongoose.Types.ObjectId(staff.id),
                ...toMongo(staff),
              },
              shop: {
                _id: mongoose.Types.ObjectId(shop.id),
                ...toMongo(shop),
              },
              endDatetime: endDatetime ? endDatetime : Date.now(),
            },
        }));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${PROCESS}` });
    }
  },
);
router.put(
  '/end',
  async (req, res) => {
    const PROCESS = '수정';
    try {
      const { id, endDatetime, ...rest } = req.body;
      res.json(await Work.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set:
            {
              ...rest,
              endDatetime: Date.now(),
            },
        }));
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
      const works = await Work.find({
        endDatetime: { '$exists': true }
      });
      res.json(fromMongo(works.map(o => ({
        ...o.toObject(),
        staff: fromMongo(o.staff.toObject()),
        shop: fromMongo(o.shop.toObject()),
      }))));
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);
router.get(
  '/:id',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const { id } = req.params;
      const staff = await Staff.findById(id).populate('shopId');
      if (!staff) {
        res.json({ success: false });
      } else {
        const work = await Work.findOne({
          'staff._id': mongoose.Types.ObjectId(id),
          endDatetime: null,
        });
        res.json({
          success: true,
          work: work ? fromMongo(work.toObject()) : null,
          staff: {
            ...(fromMongo(staff.toObject())),
            shop: staff.shopId,
            shopId: staff.shopId._id,
          },
        });
      }
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
      await Work.deleteMany(
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
