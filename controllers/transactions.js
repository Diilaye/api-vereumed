const transactionModel = require('../models/transactions');

const orderid = require('order-id')('diikaanedevVerumed');

const  populateObject = [{
    path : 'rendez_vous'
}];


exports.store = async (req, res ,next ) => {
    try {

        let { amount,rv } = req.body ;

        const id = orderid.generate();

        
        const transaction = transactionModel();

        transaction.reference = orderid.getTime(id);

        transaction.token = id;

        transaction.amount = amount;

        transaction.rendez_vous  = rv;

        const saveTransaction = await  transactionModel.save();

        const findTransaction = await transactionModel.findById(saveTransaction.id).populate(populateObject).exec();

        return message.response(res,message.createObject('Transaction'),201,{
            url:req.url,
            transaction : findTransaction
           });
       
    } catch (error) {

        return message.reponse(res,message.error  ,400,error);

    }
    
}

exports.all = async (req  , res ,next ) => {
    
    try {
        const transactions = await transactionModel.find(req.query).populate(populateObject).exec(); 

        return message.reponse(res,message.findObject('transaction') ,200,transactions);

    } catch (error) {
        return message.reponse(res,message.error  ,400,error);

    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const transaction = await transactionModel.findById(req.params.id).populate(populateObject).exec(); 
        return message.reponse(res,message.findObject('transaction') ,200,transactions);

        
    } catch (error) {
        return message.reponse(res,message.error  ,400,error);

    }
}

exports.update = async  (req  , res ,next ) => {
    

  
   try {

    let   { status  } = req.body ;

    const transactions = transactionModel.findById(req.params.id).populate(populateObject).exec();

    

   

    if (status!=undefined) {
        transactions.status = status;
    }   

    const saveTransaction = await transactions.save();

    return  message.reponse(res,message.updateObject('User'),200,saveTransaction);

   } catch (error) {
    
    return message.reponse(res,message.error  ,400,error);

   }



}

exports.delete = (req  , res ,next ) => transactionModel.findByIdAndDelete(req.params.id).then(result => {
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