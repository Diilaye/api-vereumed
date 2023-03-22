const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressModel = new Schema({


    lat : {
        type: String,
    },

    long : {
        type: String,
    },

    lieux  : {
        type: String,
    },

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

 
},{
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
  },{
    timestamps: true
  });

module.exports = mongoose.model('addresse', addressModel);