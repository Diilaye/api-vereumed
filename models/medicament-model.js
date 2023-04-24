const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicamentModel = new Schema({
    
    forme: {
        type: String,
        default :""
    },

    indications: {
        type: String,
    },


    posologie_mode_emploie: {
        type: String,
    },

    remarques : {
        type : String
    },

    autres_remarque : {
        type : String,
    },

    avatar : {
        type: Schema.Types.ObjectId,
        ref: "file"
    },


    propriete : {
        type: String,
    },

   
    contre_indications_interactions: {
        type : String,
       
    },

    effet_secondaire_majeur_indesirable  : {       
        type : String,
    },

    precaution_emploi: {
        type: String,
        default :""
    },

    specialite : [{
        type: Schema.Types.ObjectId,
        ref: "medicament",
        default : []
    }],

    prix : {
        type: String,
        default :"" 
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

module.exports = mongoose.model('medicament', medicamentModel) ;