const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    
    phone: {
        type: String,
        required : true,
        unique : true
    },

    email: {
        type: String,
    },


    password: {
        type: String,
    },

    passwords : {
        type : Array
    },

    active : {
        type : Boolean,
        default : true
    },


    father : {
        type: Schema.Types.ObjectId,
        ref: "users",
    },

   
    role: {
        type : String,
        enum: ['patient', 'super', 'pharmacie', 'doctor', 'hopital','service-hopital', 'ambulance','clinique','service-clinique','laboratoire','spa','entreprise','ipm','regroupement-ipm'],
        default: 'patient'
    },

    NameofIDCard  : {       
        type : String,
        enum: ['National', 'Voter', 'Driver', 'Passport', ],
        default: 'National'
    },

    NumberfIDCard: {
        type: String,
        default :""
    },

    MaritalStatut  : {
        type : String,
        enum: ['marrie', 'celibataire' ],
        default: 'celibataire'
    },

    sexe: {
        type : String,
        enum: ['homme', 'femme'],
        default: 'homme'
    },

    description : {
        type: String,
        default :""
    },


    avatar : {
        type: Schema.Types.ObjectId,
        ref: "file"
    },

    cover :  {
        type: Schema.Types.ObjectId,
        ref: "file"
    },

    firstName  : {
        type : String,
        default :""
    },

    lastName  : {
        type : String,
        default :""
    },

    matricule  : {
        type : String,
        default : ""
    },

    contry : {
        type : String,
        default :"senegal"
    },

    city : {
        type : String,
        default :""
    },

    address : {
        type: Schema.Types.ObjectId,
        ref: "addresse"
    },

    
    rv : [{
        type: Schema.Types.ObjectId,
        ref: "rv",
        default :[]
    }],



    prescription_service  :  [{
        type: Schema.Types.ObjectId,
        ref: "prescription_service",
        default :[]
    }],

    
    prescription_medicale  :  [{
        type: Schema.Types.ObjectId,
        ref: "prescription_medicale",
        default :[]
    }],
    

    services : [{
        type: Schema.Types.ObjectId,
        ref: "service",
        default :[]
    }],

    factures : [{
        type: Schema.Types.ObjectId,
        ref: "facture",
        default :[]
    }],

    transactions : [{
        type: Schema.Types.ObjectId,
        ref: "transaction"
    }],


    callFund : [{
        type: Schema.Types.ObjectId,
        ref: "callFund",
        default : []
    }],


    token : {
        type : String,
        default : ""
    },
    
    
},{
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.passwords;
        delete  ret.token;
        delete ret.__v;
      },
    },
  },{
    timestamps: true  
  });

module.exports = mongoose.model('users', UserModel) ;