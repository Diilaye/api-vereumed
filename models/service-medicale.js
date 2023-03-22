const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceMedicale = new Schema({


    name : {
        type: String,
    },

    description : {
        type: String,
    },

    avatar  : {
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

module.exports = mongoose.model('service_medicale', serviceMedicale);