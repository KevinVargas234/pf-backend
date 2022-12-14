const mercadopago = require("mercadopago");
const { Router } = require("express");
const router = Router();

mercadopago.configure({
  access_token: "APP_USR-1898948534499873-121318-943008c60c6f41ae6fb4f31b5514aa67-1262866903",
});


router.post("/generar", async (req, res) => {

	console.log()
	const {Ncart}  = req.body;

	let itemsC = Ncart.map((el=> {return({
		id: el.id,
		title: el.name,
		currency_id: "ARS",
		picture_url: el.image,
		description: el.description,
		quantity: 1,
		unit_price: el.price

    })}))
	
    let preference = {
		items:itemsC,
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
      //  notification_url:'http://localhost:8080/notificacion'
	};

      /*mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.json(response.body.init_point)
		  
        })
        .catch(function (error) {
          console.log('el error', error);
        });*/
		await mercadopago.preferences.create(preference)
		.then(resp=>{
		  console.log(resp.body.init_point)
		  res.status(200).send(resp.body.init_point)
	  })
		.catch(err=>{
		  console.log(err)
		  res.status(400).send(err)
	  })


		

})
module.exports = router;








