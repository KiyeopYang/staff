import HttpBearer from 'passport-http-bearer';
import passport from 'passport';
import {
  fromMongo,
} from './lib/dbConnector';
import { Shop } from './models';

const { Strategy } = HttpBearer;

// PASSPORT SETTING
passport.use(new Strategy(async (id, cb) => {
  try {
    const shop = await Shop
      .findById(id)
      .select({ password: 0 });
    if (!shop) {
      return cb(null, { unauthorized: true });
    }
    return cb(null, fromMongo(shop.toObject()));
  } catch (error) {
    return cb(null, { unauthorized: true });
  }
}));

export default function (req, res, next) {
  passport.authenticate('bearer', { session: false }, (err, user) => {
    const userFound =
      user && !Object.hasOwnProperty.call(user, 'unauthorized') && !user.unauthorized ?
        user : null;
    if (err) { return next(err); }
    if (!userFound) { return res.status(401).json({ message: 'Unauthorized' }); }
    delete userFound.password;
    req.user = userFound;
    return next();
  })(req, res, next);
}
