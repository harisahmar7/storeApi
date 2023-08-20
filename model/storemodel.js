const db = require('../config/db_settings');
const pg_interactor = db();

module.exports ={

    getAllProductStat(){
        return pg_interactor.query(`select * from store_api`);
    },

    getProduct(inputObj){
        if(inputObj.name){
        return pg_interactor.query(`select * from store_api where product_name='${inputObj.name}'`);
        }else if(inputObj.company){
        return pg_interactor.query(`select * from store_api where company='${inputObj.company}'`);
        }else if(inputObj.featured){
        return pg_interactor.query(`select * from store_api where featured=${inputObj.featured}`);
        }
    },

    saveProuctDump(finalStr){
        return pg_interactor.query(`insert into store_api(product_name,price,company,featured,rating)values${finalStr}`);
    }

}