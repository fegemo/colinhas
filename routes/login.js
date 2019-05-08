const router =  require("express").Router();
const models=require('../models')
/*
    get Usuario, Colinha, Avaliacao,  as property of models
    eg: models.Usuario.find({})
*/



router.post('/', (req,res) => {
  // pega os campos
  const username = req.body.username;
  const password = req.body.password;

  // verifica se existe um usuário que bata com a senha
  const users = models.Usuario.findOne({
    username,
    password
  }).exec((err, user) => {
    if (err) throw err;

    if (user) {
      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } else {
      res.status(401).json({
        success: false
      });
    }
  });
});

router.get('/logout', (req, res) => {
  res.json({
    success: true
  });
});

router.get('/todos', (req, res) => {
  const usuarios = models.Usuario.find({});
  usuarios.exec((err, usuarios) => {
    if (err) throw err;
    res.json(usuarios);
  })
});



module.exports=router
