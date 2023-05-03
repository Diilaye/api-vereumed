const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const RendezVous = new Schema({

    patient : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    hopital : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    doctor : {
        type: Schema.Types.ObjectId,
        ref: "users",
        default : ""
    },

    service : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },


    symptome  :{
        
        type:String
    },

    type : {
        type : String,
        enum :['maison','hopital','call'],
        default: 'hopital'
    },

    notes  :{
        type:String
    },

    medicaments :[{
        type: Schema.Types.ObjectId,
        ref: "medicament",
        default :  []
    }],

    prescription_rv :[{
        type: Schema.Types.ObjectId,
        ref: "rv",
        default  : []
    }],

    jour  :  {
        type:String,
    },

    tranche_horaire : {
        type :String
    },

    transactions : {
        type: Schema.Types.ObjectId,
        ref: "transactions"
    }
   

 
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

module.exports = mongoose.model('rv', RendezVous);