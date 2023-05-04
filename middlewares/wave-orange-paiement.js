const axios = require('axios');




module.exports = async (req,res,next) =>  {

  let configOrangoMoney = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.sandbox.orange-sonatel.com/api/eWallet/v4/qrcode',
    headers: { 
      'Authorization': 'Bearer '+req.tokenOM, 
      'Content-Type': 'application/json'
    },
    data :JSON.stringify({
      "amount": {
        "unit": "XOF",
        "value": amount
      },
      "callbackCancelUrl": "https://api.verumed.sn/api/v1/transactions/errorOrange",
      "callbackSuccessUrl": "https://api.verumed.sn/api/v1/transactions/successOrange",
      "code": 159515,
      "metadata": {},
      "name": "Verumed",
      "validity": 15
    })
  };
  
  
    if(req.body.method =="OM")  {
      axios.request(configOrangoMoney)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        req.url =  response.data['deepLink'];
        next();
      })
      .catch((error) => {
        console.log(error);
      });
    }else  {

      let WaveConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.wave.com/v1/checkout/sessions',
        headers: { 
          'Authorization': 'Bearer wave_sn_prod_U6G70A-tfpBnH8ZQ9WRkJScYe9lrEA_UQWvPqA6Qi-kA-pITtiQ9bWaiBeMzFUK5A59bSNC93h821gBFg-jmvDw4azSNz7pE8g', 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
          "amount": req.body.amount,
          "currency": "XOF",
          "error_url": "https://api.verumed.sn/api/v1/transactions/errorWave",
          "success_url": "https://api.verumed.sn/api/v1/transactions/successWave"
        })
      };
      

      axios.request(WaveConfig)
      .then((response) => {
            req.url =  response.data['wave_launch_url'];
            console.log(JSON.stringify(response.data));
            next();
      })
      .catch((error) => {
        res.json({
          message: 'unauthorized authentication required',
          statusCode: 401,
          data: error,
          status: 'NOT OK'
      });
      });
    }
    
}