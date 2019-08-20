const router = require('express').Router();
const models = require('../db/models');

router.get('/', (req, res) => {
  models.post.all()
    .then((posts) => {
        // res.status(200).json(posts);
        res.render('blog/index', { title: 'My Cats Blog Page', posts: posts});
    })
    .catch(function(error) {
        next(error);
    });
});

// *** GET single post *** //
router.get('/:id', function(req, res, next) {
  models.post.get(req.params.id)
    .then((post) => {
      // res.status(200).json(post);
      res.render('blog/show', { title: 'My Cats Blog Page', post: post});
    })
    .catch(function(error) {
      next(error);
    });
  });

module.exports = router;
