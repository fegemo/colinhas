const router =  require("express").Router();
const models=require('../models')
/*
    get Usuario, Colinha, Avaliacao,  as property of models
    eg: models.Usuario.find({})
*/



router.get('/', function(req,res){
    const colinhas = models.Colinha.find({}).populate(['author', 'reviews']).exec((err, valor) => {
      if (err) throw (err);
      valor = valor.map(colinha => {
        const reviews = colinha.reviews || [];
        colinha.favorites = reviews.filter(r => r.favorite).length;
        return colinha;
      });
      res.json(valor);
    });
})



module.exports=router
