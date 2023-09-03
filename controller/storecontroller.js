let storeModel = require('../model/storemodel');

module.exports = {
	getAllProductStatic(req, res){
       storeModel.getAllProductStat().then((staticData)=>{
        res.send({
            products: staticData.rows
        })
       });
    },

   getProduct(req, res) {
   let inputObj = {};
   inputObj.name = req.query.name;
   inputObj.company = req.query.company;
   inputObj.featured = req.query.featured;
   inputObj.rating = req.query.rating;

   console.log("req.query-------------------->",req.query)

   inputObj.page = req.query.page || 1;
   inputObj.limit = req.query.limit || 10;
   inputObj.skip = (inputObj.page - 1) * inputObj.limit;

   inputObj.sort = req.query.sort;
   inputObj.fields = req.query.fields;
   inputObj.numericFilters = req.query.numericFilters;

   let query = `order by `;
   let orderByQuery =``;
   if (inputObj.sort) {
      let isMultiple = false;
      if (inputObj.sort.length > 1) {
         isMultiple = true;
      }
      let splitValue = inputObj.sort.split(',');
      console.log(`splitValue------------------->`, splitValue)

      for (let index of splitValue) {
         if (index == 'price') {
            if (isMultiple) {
               query += `price, `;
            } else {
               query += `price`;
            }

         } else if (index == '-price') {
            if (isMultiple) {
               query += `price desc, `;
            } else {
               query += `price desc`;
            }

         } else if (index == 'name') {
            if (isMultiple) {
               query += `name, `;
            } else {
               query += `name`;
            }

         } else if (index == '-name') {
            if (isMultiple) {
               query += `name desc, `;
            } else {
               query += `name desc`;
            }

         }
      }
      if (isMultiple) {
         orderByQuery = query.slice(0, -2);
      } else {
         orderByQuery = query;
      }
   }

   let numericFilters = ``;
   if(inputObj.numericFilters){
    console.log("inputObj.numericFilters---------------->",inputObj.numericFilters.split(',').join(' and '));
    numericFilters = `and ${inputObj.numericFilters.split(',').join(' and ')}`;
   }

   console.log("orderByQuery--------------------->",orderByQuery)


   if(inputObj.fields){
    console.log("INNNNNNNNNNNNNNNNN11111111111")
    storeModel.getDynamicStoreData(inputObj, orderByQuery, numericFilters).then((storeData)=>{
     res.send({
         products: storeData.rows,
         nbHits: storeData.rows.length
      })   
    })
   }else{
    console.log("INNNNNNNNNNNNNNNNN2222222222",inputObj)
    if(inputObj.numericFilters){
    numericFilters = `where ${inputObj.numericFilters.split(',').join(' and ')}`;
   }
   storeModel.getProduct(inputObj, orderByQuery, numericFilters).then((productData) => {
      res.send({
         products: productData.rows,
         nbHits: productData.rows.length
      })
   })
   }

},

    saveProductAtOnce(req, res){
        let productData = req.body.productData;
        // console.log("productData-------------->",productData);
        let valueStr =``;
        for(let index of productData){
            valueStr += `('${index.name}',${index.price},'${index.company}',${index.featured?index.featured:false},${index.rating?index.rating:0.0}),`
        }

        const finalStr = valueStr.slice(0, -1);
        console.log("valueStr----------------->",finalStr)
        storeModel.saveProuctDump(finalStr).then((saveData)=>{
            res.send({
                result: "Data Save Successfully"
            })
        })
    }
}