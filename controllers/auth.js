
const authModel = require('../models/auth');

const codeModel = require('../models/code-phone');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');

const axios = require('axios').default;

const axiosOrange = require('axios');



require('dotenv').config({
    path: './.env'
});

const message  =  require('../uitls/message');

exports.store = async (req,res) => {
    
    try {

        let { phone , firstName , lastName , avatar} = req.body;

        const auth  =  authModel();

        auth.phone  =  phone  ;

        auth.firstName = firstName;

        auth.lastName = lastName;

        auth.avatar = avatar;

        const authSave = await auth.save();

       return message.reponse(res,message.createObject('users') ,201,authSave);
        
    } catch (error) {

        return message.reponse(res,message.error  ,400,error);
        
    }


}

exports.login = async (req , res )  => {

}

exports.sendCode  = async (req,res) => {

   try {
    
    const min = 100000;

    const max = 999999;

    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    const phoneV = await authModel.findOne({
        phone :req.body.telSender
    })

    if(phoneV =null) {
        const newCode  = codeModel();

        newCode.code = num;

        newCode.phone =  req.query.phone;

        const codeSave = await newCode.save();
        

        const updateCode = async () => {

            const i = await codePhoneModel.findById(codeSave._id);

            i.is_treat = true;

            const j = await i.save();
        }

        setTimeout(updateCode, 180000);

        let data = JSON.stringify({
            "from": "InfoSMS",
            "to": req.query.phone,
            "text": "Votre code de validation Verumed est le suivant: "+num 
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.freebusiness.sn/sms/1/text/single',
            headers: { 
            'authorization': 'Basic '+process.env.KEY_FREE+'==', 
            'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios.request(config)
        .then((_) => message.reponse(res , message.createObject('Code') ,201 , num))
        .catch((error) => message.reponse(res,message.error() ,400 , error));
    } else {
        return message.reponse(res , message.findObject('Telephone') ,200 , phoneV);
    }
   

   } catch (error) {
    message.reponse(res,message.error() ,400 , error);
   }

}

exports.verifCode = async (req,res) =>  {

    try {

        const codes = await codeModel.findOne({
            code : req.body.code,
            is_treat : false
        }) ;

        if(codes){

            codes.is_treat = true ;

            await codes.save();
            
            return message.reponse(res , message.findObject('Code') ,200 , {});
            
        }

        return message.reponse(res , message.notFindObject('Code') ,400 , {});


    } catch (error) {

        message.reponse(res,message.error() ,400 , error);

    }

    
} 

