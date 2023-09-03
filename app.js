const express = require('express');
const app = express();
const morgran = require('morgan');
const port = 4000;
const dbConnection = require('./config/db_settings');
const storeController = require('./controller/storecontroller');

app.use(morgran('dev'));
app.use(express.json());
app.use(express.static('public'));

app.get('/products', storeController.getProduct);
app.get('/product/static',storeController.getAllProductStatic);
app.post('/saveProductData',storeController.saveProductAtOnce);

const start = async()=>{
	try{
		await dbConnection();
		app.listen(port, ()=>{
		console.log(`Server is connected at port:${port}`);
	})		
	}catch(err){
		console.log(err);
	}
}

start();

