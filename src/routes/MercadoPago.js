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
	items: [
		{
		title: 'Mi producto',
		unit_price: 100,
		quantity: 1,
		}
	]
	};
	mercadopago.preferences.create(preference)
	.then(function(response){
	// Este valor reemplazará el string "<%= global.id %>" en tu HTML
	global.id = response.body.id;
	}).catch(function(error){
	console.log(error);
	});
		

})
module.exports = router;