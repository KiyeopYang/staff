import express from 'express';
import mongoose from 'mongoose';
import logging from '../../lib/logging';
import {
  fromMongo,
} from '../../lib/dbConnector';
import {
  Shop,
  Staff,
} from '../../models';
import auth from '../../auth';

const router = express.Router();

(async () => {
  if ((await Shop.find({})).length < 1) {
    await new Shop({
      userId: '00000000',
      password: '00000000',
      name: '기본계정',
    }).save();
    logging.info('[DEFAULT SHOP]', 'userId: 00000000, password: 00000000');
  }
})();

// 회원가입
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '회원 가입';
    try {
      res.json(fromMongo((await new Shop(req.body).save()).toObject()));
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
      res.json(await Shop.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: {...rest} }));
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${PROCESS}` });
    }
  },
);

// 로그인
router.post(
  '/login',
  async (req, res) => {
    const ERROR_MESSAGE = `ERROR`;
    const { userId, password } = req.body;
    try {
      const shop = await Shop.findOne({
        userId,
      }).exec();
      if (!shop) {
        return res.status(400).json({
          message: ERROR_MESSAGE,
        });
      }
      const valid = await shop.passwordIsValid(password);
      if (!valid) {
        return res.status(400).json({
          message: ERROR_MESSAGE,
        });
      }
      const result = fromMongo(shop.toObject());
      // delete result.password;
      return res.json(result);
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);

// 인증
router.get(
  '/',
  auth,
  async (req, res) => res.json(req.user),
);

router.get(
  '/list',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const shops = await Shop.find({})
        .sort({ _id: -1 });
      res.json(fromMongo(shops.map(o => o.toObject())));
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
      await Promise.all([
        Shop.deleteMany({
          _id: { $in: req.body },
        }),
        Staff.deleteMany({
          shopId: { $in: req.body },
        })
      ]);
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
