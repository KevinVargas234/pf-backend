const mercadopago = require("mercadopago");
const { Router } = require("express");
const router = Router();

mercadopago.configure({
  access_token: "APP_USR-f716fcfe-261f-4d67-8c02-5ebd614ae2f2",
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
		items:[
			{
				title: "titulo",
				unit_price: 212,
				quantity: 1,
			}
		],
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
		  console.log(resp.body)
		  res.status(200).send(resp.body.id)
	  })
		.catch(err=>{
		  console.log(err)
		  res.status(400).send(err)
	  })


		

})
module.exports = router;