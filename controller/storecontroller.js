let storeModel = require('../model/storemodel');

module.exports = {
	getAllProductStatic(req, res){
       storeModel.getAllProductStat().then((staticData)=>{
        res.send({
            products: staticData.rows
        })
       });
    },

    getProduct(req, res){
        let inputObj ={};
        inputObj.name = req.query.name;
        inputObj.company = req.query.company;
        inputObj.featured = req.query.featured;

        storeModel.getProduct(inputObj).then((productData)=>{
            res.send({
                products: productData.rows,
                nbHits : productData.rows.length
            })
        })
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