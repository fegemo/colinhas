const router = require("express").Router();
const models = require("../models");
/*
    get Usuario, Colinha, Avaliacao,  as property of models
    eg: models.Usuario.find({})
*/

// Formato do objeto de resposta
// {
//   'totalWorks': 14,
//   'users': [
//     {
//       '_id': '',
//       'name': '',
//       'reviewsMade': 4,
//       'didWork': true,
//       'reviewsReceived': [...]
//     },
//     {
//       '_id': '',
//       'name': '',
//       'reviewsMade': 10,
//       'didWork': false
//     }
//   ]
// }

// para a parte interna (do users):
//
// db.usuario.aggregate([
//     {
//         $lookup: {
//             from: 'avaliacao',
//             localField: '_id',
//             foreignField: 'reviewer',
//             as: 'allReviewsMade'
//         }
//     },
//     {
//         $lookup: {
//             from: 'colinha',
//             localField: '_id',
//             foreignField: 'author',
//             as: 'allColinhasMade'
//         }
//     },
//     {
//         $lookup: {
//             from: 'avaliacao',
//             localField: 'allColinhasMade.reviews',
//             foreignField: '_id',
//             as: 'reviewsReceived'
//         }
//     },
//     {
//         $addFields: {
//             reviewsMade: { $size: '$allReviewsMade' },
//             didWork: { $ne: ['allColinhasMade', []] }
//         }
//     },
//     {
//         $project: {
//             allColinhasMade: false,
//             allReviewsMade: false
//         }
//     }
// ]);

router.get("/avaliacoes-por-usuario", (req, res) => {
  models.Usuario.aggregate([
    {
      $lookup: {
        from: "avaliacao",
        localField: "_id",
        foreignField: "reviewer",
        as: "allReviewsMade"
      }
    },
    {
      $lookup: {
        from: "colinha",
        localField: "_id",
        foreignField: "author",
        as: "allColinhasMade"
      }
    },
    {
      $lookup: {
        from: "avaliacao",
        localField: "allColinhasMade.reviews",
        foreignField: "_id",
        as: "reviewsReceived"
      }
    },
    {
      $addFields: {
        reviewsMade: { $size: "$allReviewsMade" },
        didWork: { $ne: ["$allColinhasMade", []] }
      }
    },
    {
      $project: {
        allColinhasMade: false,
        allReviewsMade: false,
        password: false
      }
    }
  ]).exec(function(err, usuarios) {
    // students contain WorksnapsTimeEntries
    if (err) throw err;

    const totalWorks = usuarios.filter(u => u.didWork == true).length;
    res.json({
      totalWorks,
      users: usuarios
    });
  });
});

module.exports = router;
