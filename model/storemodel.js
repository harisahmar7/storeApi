const db = require('../config/db_settings');
const pg_interactor = db();

module.exports = {

   getAllProductStat() {
      return pg_interactor.query(`select name, price, company, created_datetime as createdAt, rating, featured from store_api order by name desc, price asc`);
   },

   getProduct(inputObj, orderByQuery, numericFilters) {
      let whereQuery = ``;
      if (inputObj.name && inputObj.company && inputObj.featured) {
         whereQuery = `where name like '%${inputObj.name}%' and company = '${inputObj.company}' and featured = ${inputObj.featured} ${numericFilters} ${orderByQuery}`;
      } else if (inputObj.name && inputObj.company) {
         whereQuery = `where name like '%${inputObj.name}%' and company = '${inputObj.company}' ${numericFilters} ${orderByQuery}`;
      } else if (inputObj.name && inputObj.featured) {
         whereQuery = `where name like '%${inputObj.name}%' and featured = ${inputObj.featured} ${numericFilters} ${orderByQuery}`;
      } else if (inputObj.company && inputObj.featured) {
         whereQuery = `where company = '${inputObj.company}' and featured = ${inputObj.featured} ${numericFilters} ${orderByQuery}`;
      } else if (inputObj.name) {
         whereQuery = `where name like '%${inputObj.name}%' ${numericFilters} ${orderByQuery}`;
      } else if (inputObj.company) {
         whereQuery = `where company = '${inputObj.company}' ${numericFilters} ${orderByQuery}`;
      } else if (inputObj.featured) {
         whereQuery = `where featured = '${inputObj.featured}' ${numericFilters} ${orderByQuery}`;
      }else if (inputObj.rating) {
         whereQuery = `where rating = ${inputObj.rating} ${numericFilters} ${orderByQuery}`;
      }
      console.log("whereQuery-------------------->",whereQuery)
      return pg_interactor.query(`select name, price, company, created_datetime as createdAt, rating, featured from store_api ${whereQuery} ${numericFilters} ${orderByQuery} limit ${inputObj.limit} offset ${inputObj.skip}`);
   },

   getDynamicStoreData(inputObj, orderByQuery, numericFilters){
      return pg_interactor.query(`select id,${inputObj.fields} from store_api ${numericFilters} ${orderByQuery} limit ${inputObj.limit} offset ${inputObj.skip} `);
   },

   saveProuctDump(finalStr) {
      return pg_interactor.query(`insert into store_api(name,price,company,featured,rating)values${finalStr}`);
   }

}