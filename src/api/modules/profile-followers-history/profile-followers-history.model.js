const mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;
const GlobalConfig = require('./../../config/config');

const schema = new Schema({

  // Todo: ref to profile
  profile_id: {
    type: Number,
    ref: GlobalConfig.COLLECTION_PROFILES,
    null: false,
    required: true
  },

  // Todo: ref to the user (if we decide to keep the user)
  user_id: {
    type: Number,
    null: false,
    required: true
  },

  // Todo: rename to s5r_date_from (to be consistent)
  date_from: {
    type: Date,
    null: false,
    default: new Date().setUTCHours(0, 0, 0, 0)
  },

  // Todo: rename to s5r_date_to (to be consistent)
  date_to: {
    type: Date,
    null: true,
    required: false
  },

  // Todo: rename to s5r_last_check (to be consistent)
  last_check: {
    type: Date,
    null: false,
    default: new Date().setUTCHours(0, 0, 0, 0)
  }
}, {collection: GlobalConfig.COLLECTION_PREFIX + GlobalConfig.COLLECTION_PROFILE_FOLLOWERS_HISTORY});

// eslint-disable-next-line func-names
schema.pre('findOneAndUpdate', function (next) {
  this._update.last_check = new Date();
  return next();
});

schema.index({profile_id: 1, user_id: 1, date_from: 1});
schema.plugin(timeStamps, {createdAt: 's5r_created_at', updatedAt: 's5r_updated_at'});

module.exports.Schema = schema;
module.exports.Model = mongoose.model(GlobalConfig.COLLECTION_PROFILE_FOLLOWERS_HISTORY, schema);
