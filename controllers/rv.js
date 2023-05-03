
const rvModel = require('../models/rendez_vous');

const message  =  require('../utils/message');

const populateObject = [
    {
        path :'patient',
        populate : [
            {
                path :"avatar"
            },
            {
                path :"FileofIDCard"
            },
            {
                path :'address'
            },{
                path :'rendez_vous'
            },
            {
                path : 'services',
                populate : [
                    {
                        path :"avatar"
                    },
        
                   
                ]
            }
        ]
    },
    {
        path :'service',
        populate : [
            {
                path :"avatar"
            },
            {
                path :"FileofIDCard"
            },
            {
                path :'address'
            },{
                path :'rendez_vous'
            },
            {
                path : 'services',
                populate : [
                    {
                        path :"avatar"
                    },
        
                   
                ]
            }
        ]
    },
    {
        path :'hopital',
        populate : [
            {
                path :"avatar"
            },
            {
                path :"FileofIDCard"
            },
            {
                path :'address'
            },{
                path :'rendez_vous'
            },
            {
                path : 'services',
                populate : [
                    {
                        path :"avatar"
                    },
        
                   
                ]
            }
        ]
    },
    {
        path :'doctor',
        populate : [
            {
                path :"avatar"
            },
            {
                path :"FileofIDCard"
            },
            {
                path :'address'
            },{
                path :'rendez_vous'
            },
            {
                path : 'services',
                populate : [
                    {
                        path :"avatar"
                    },
        
                   
                ]
            }
        ]
    },
    // {
    //     path :'medicaments'
    // }
];

exports.store = async (req, res ,next ) => {

    
    try {
        const {
            hopital,service,symptome,jour,tranche_horaire, type
        }
           
        = req.body;
    
        const rvFind = await   rvModel.find({
            jour : jour,
            tranche_horaire : tranche_horaire,
        }).exec();
    
        if (rvFind.length > 4) {
            return message.reponse(res,message.error  ,400,"Choisir une autre tranche horiare celui-ci est pleine prendre la suivante pour voir ");
        }
    
        const rv =  rvModel();
    
        rv.patient =  req.user.id_user;
    
        rv.hopital = hopital;
    
        rv.type = type;
    
        rv.service = service;
    
        rv.symptome = symptome;
    
        rv.jour = jour;
    
        rv.tranche_horaire = tranche_horaire;
    
        const rvSave = await rv.save();

        const findRv = await rvModel.findById(rvSave.id).populate(populateObject).exec();
    
        return message.reponse(res,message.createObject('rv') ,201,findRv);


    } catch (error) {
        return message.reponse(res,message.error()  ,400,error);
    }
}



exports.all = async (req  , res ,next ) => {
    
    try {
        
        const rvFind = await rvModel.find(req.query).populate(populateObject).exec();

        return message.reponse(res,message.findObject('rv') ,200,rvFind);


    } catch (error) {
        return message.reponse(res,message.error()  ,400,error);
    }
    
}

exports.one = async (req  , res ,next ) => {
    try {
        
        const rvFind =  rvModel.findById(req.params.id).populate(populateObject).exec();

        return message.reponse(res,message.findObject('rv') ,200,rvFind);


    } catch (error) {
        return message.reponse(res,message.error()  ,400,error);
    }
}

exports.update = async  (req  , res ,next ) => {

    try {
        let {
            doctor,symptome,notes,medicaments,prescription_rv
        } = req.body ;

        const findRv = await rvModel.findById(req.params.id).exec();

        if(doctor != undefined) {
            findRv.doctor  = doctor ;
        }

        if (symptome != undefined ) {
            findRv.symptome  = symptome ; 
        }

        if (notes != undefined) {
            findRv.notes  = notes ;
        }

        if (medicaments !=undefined) {
            findRv.medicaments.push(medicaments)  ;   
        }

        if (prescription_rv !=undefined) {
            findRv.prescription_rv.push(prescription_rv)  ;
        }

        const saveRv =  await  findRv.save();

        const fRv = await  rvModel.findById(saveRv.id).populate(populateObject).exec();


        return message.reponse(res,message.updateObject('rv') ,200,fRv);



    } catch (error) {
        
        return message.reponse(res,message.error()  ,400,error);

    }
   
}


exports.delete =  async (req,res,next) => rvModel.findByIdAndDelete(req.params.id).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch( error => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));