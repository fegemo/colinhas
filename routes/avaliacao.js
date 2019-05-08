const router =  require("express").Router();
const models=require('../models')
/*
    get Usuario, Colinha, Avaliacao,  as property of models
    eg: models.Usuario.find({})
*/


router.get('/', (req, res) => {
  // pega quem é o usuário logado...
  const userObjectId = req.get('x-object-id-usuario');
  models.Usuario.findOne({_id: userObjectId}).exec((err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: true,
        data: {
          avaliacoes: []
        }
      });
      return;
    }

    models.Avaliacao.find({reviewer: userObjectId}).exec((err, avaliacoes) => {
      if (err) throw err;
      res.json({
        success: true,
        data: {
          avaliacoes
        }
      });
    });
  });
});


router.post('/', (req, res) => {
  // verifica se tem permissão
  const userObjectId = req.get('x-object-id-usuario');
  models.Usuario.findOne({_id: userObjectId}).exec((err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({
        success: false
      });
      return;
    }

    // pega os parâmetros da avaliação
    let completeness = req.body.completude;
    let beauty = req.body.beleza;
    let favorite = req.body.favorita;
    let towards = req.body.colinha;
    let idAvaliacao = req.body._id;

    if (beauty && completeness && favorite && towards) {
      try {
        beauty = parseInt(beauty);
        completeness = parseInt(completeness);
        favorite = favorite == 'true';

      } catch (err) {
        res.status(400).json({
          success: false,
          message: 'Erro ao converter os valores do corpo da requisição para seus tipos: ' + err
        })
        return;
      }

      const obj = {
        completeness,
        beauty,
        favorite,
        reviewer: user._id,
        towards
      };

      // faz o upsert desta avaliação
      models.Avaliacao.findOneAndUpdate({ reviewer: user._id, towards }, obj, {upsert: true, new: true}, async (err, valor) => {
        if (err) throw err;
        const insertedId = valor._id;

        // atualiza o documento da colinha que foi avaliada, em seu array de reviews
        await models.Colinha.findOneAndUpdate({ _id: towards }, {  $addToSet: { reviews: valor }});

        // ... por fim, se o usuário marcou esta colinha como favorita, precisamos
        // desmarcar como favorita de todas as outras avaliações dele
        if (favorite) {
          models.Avaliacao.updateMany({ reviewer: user._id, _id: { $ne: insertedId } }, { $set: { favorite: false }}).exec((err, valor) => {
            if (err) throw err;
            res.json({
              success: true
            });
          });
        } else {
          res.json({
            success: true
          });
        }
      });


    } else {
      res.status(400).json({
        success: false,
        message: 'O corpo da requisição não contém tudo o que é necessário'
      })
    }
  });


});



module.exports=router
