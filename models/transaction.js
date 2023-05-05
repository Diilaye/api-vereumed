const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionModel = new Schema({
    
    reference: {
        type: String 
    },

    amount : {
        type : String
    },



    token : {
        type : String
    },

    rendez_vous : {
        type: Schema.Types.ObjectId,
        ref: "rv"
    },


    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS','CANCELED','REFUND'],
        default: 'PENDING'
    },

    method: {
        type: String,
        enum: ['WAVE', 'OM'],
        default: 'WAVE'
    },

    date: {
        type: Date,
        default: Date.now()
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

module.exports = mongoose.model('transactions', transactionModel) ;