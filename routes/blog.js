const router = require('express').Router();
const controllers = require('../controllers');

// Определяем роутеры

// router.use("/:id", function (request, response){
//     response.send("Отдельная публикация");
// });

// router.use("/", function(request, response){
//     response.send("Список публикаций");
// });

router.get('/', controllers.blog_controller.index);

router.get('/:id', controllers.blog_controller.show);

module.exports = router;
