
const authModel = require('../models/auth');

const codeModel = require('../models/code-phone');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');

const axios = require('axios').default;

require('dotenv').config({
    path: './.env'
});

const message  =  require('../utils/message');

const  populateObject = [
    {
        path :"avatar"
    }
];

exports.store = async (req,res) => {
    
    try {

        let { phone , firstName , lastName , avatar ,role,password , name } = req.body;

        const auth  =  authModel();

        auth.name  =  name  ;

        auth.phone  =  phone  ;

        auth.role  =  role  ;

        if(password != undefined) {

            const passwordCrypt = bcrytjs.hashSync(password, salt);
    
            auth.password = passwordCrypt;
        }

        if(firstName != undefined) {
            auth.firstName = firstName;
        }

       if(lastName !=undefined){
            auth.lastName = lastName;
       }

        if(avatar !=undefined){
            auth.avatar = avatar;
        }

        const authSave = await auth.save();

       return message.reponse(res,message.createObject('users') ,201,authSave);
        
    } catch (error) {

        return message.reponse(res,message.error  ,400,error);
        
    }


}

exports.all = async (req,res,next) =>  {

    

    try {
        const user  = await authModel.find(req.query).populate(populateObject).exec();

        return  message.reponse(res,message.findObject('User'),200,user);
    } catch (error) {
       return message.reponse(res,message.error() ,400 , error);
    }

}

exports.update = async (req, res, next) => {

    

    try {
        let {  
            password ,
            email,
            active,
            father,
            role,
            NameofIDCard,
            NumberfIDCard,
            MaritalStatut,
            sexe,
            description,
            avatar,
            cover,
            firstName,
            lastName,
            matricule,
            contry,
            city,
            address,
            rv,
            prescription_service,
            prescription_medicale,
            services,
            factures,
            transactions,
            callFund
        
        } = req.body;
    
        const auth  = await authModel.findById(req.params.id);
    
        console.log(auth);
    
            if (password !=undefined) {
    
                const passwordCrypt = bcrytjs.hashSync(password, salt);
    
                auth.password = passwordCrypt;
                
            }
    
            if(firstName != undefined) {
                auth.firstName = firstName;
            }
    
            if(email != undefined) {
                auth.email = email;
            }
    
            if(active != undefined) {
                auth.active = active;
            }
            if(father != undefined) {
                auth.father = father;
            }
            if(role != undefined) {
                auth.role = role;
            }
            if(NameofIDCard != undefined) {
                auth.NameofIDCard = NameofIDCard;
            }
            if(NumberfIDCard != undefined) {
                auth.NumberfIDCard = NumberfIDCard;
            }
            if(MaritalStatut != undefined) {
                auth.MaritalStatut = MaritalStatut;
            }
            if(sexe != undefined) {
                auth.sexe = sexe;
            }
            if(description != undefined) {
                auth.description = description;
            }
            if(cover != undefined) {
                auth.cover = cover;
            }
    
            if(matricule != undefined) {
                auth.matricule = matricule;
            }
    
    
            if(contry != undefined) {
                auth.contry = contry;
            }
    
            if(city != undefined) {
                auth.city = city;
            }
    
            if(address != undefined) {
                auth.address = address;
            }
    
            if(rv != undefined) {
                auth.rv.push(rv) ;
            }
    
            if(prescription_service != undefined) {
                auth.prescription_service.push(prescription_service) ;
            }
    
            if(prescription_medicale != undefined) {
                auth.prescription_medicale.push(prescription_medicale) ;
            }
    
            if(services != undefined) {
                auth.services.push(services) ;
            }
    
            if(factures != undefined) {
                auth.factures.push(factures) ;
            }
    
            if(transactions != undefined) {
                auth.transactions.push(transactions) ;
            }
    
            if(callFund != undefined) {
                auth.callFund.push(callFund) ;
            }
    
    
            if(lastName !=undefined){
                    auth.lastName = lastName;
            }
    
            if(avatar !=undefined){
                auth.avatar = avatar;
            }
    
            const authSave = await auth.save();
            
            return  message.reponse(res,message.updateObject('User'),200,authSave);
    } catch (error) {
       return message.reponse(res,message.error() ,400 , error);
    }


}

exports.login = async (req , res )  => {

    

    try {
        
        const  {phone , password } = req.body;
    
        if(phone !=undefined) {
    
            const auth = await authModel.findOne({
                phone : phone
            }).exec();
    
            if(bcrytjs.compareSync(password, auth.password)) {
                const token = jwt.sign({
                    id_user: auth.id,
                    role_user : auth.role , 
                    phone_user : auth.phone
                }, process.env.JWT_SECRET, { expiresIn: '8784h' });
    
                return message.reponse(res,message.findObject('User'),200,{
                    user : auth ,
                    token : token
                });
    
    
            }else {
                return message.reponse(res,message.login('2'),400,{});
            }
    
        }

    } catch (error) {
        return message.reponse(res,message.error(),400,error);
    }

}

exports.sendCode  = async (req,res) => {

    

   try {
    
    const min = 1000;

    const max = 9999;

    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    const phoneV = await authModel.findOne({
        phone :req.query.phone
    })

    if(phoneV ==null) {
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
            phone : req.body.phone,
            is_treat : false
        }) ;
    
        if(codes){
    
            codes.is_treat = true ;
    
            const auth = authModel();
    
            auth.phone = req.body.phone;
    
           const authSave =  await auth.save();
    
            await codes.save();
            
            return message.reponse(res , message.findObject('Code') ,200 , authSave);
            
        }
    
        return message.reponse(res , message.notFindObject('Code') ,400 , {});


    } catch (error) {

        message.reponse(res,message.error() ,400 , error);

    }

    
} 

