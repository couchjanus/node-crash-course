"use strict";

var router = require('express').Router();

var queries = require('../db/queries');

var models = require('../db/models');

router.get('/categories', function (req, res) {
  models.category.all().then(function (categories) {
    res.render('admin/categories/index', {
      title: 'All Categories',
      categories: categories
    });
  })["catch"](function (error) {
    next(error);
  });
});
router.get('/category/create', function (req, res) {
  res.render('admin/categories/form', {
    title: 'Add New Category'
  });
}); // *** add category *** //
// router.post('/category/create', (req, res, next) => {
//   models.category.create(req.body)
//   .then((categoryID) => {
//     return models.category.get(categoryID);
//   })
//   .then((category) => {
//     res.status(200).json(category);
//   })
//   .catch((error) => {
//     next(error);
//   });
// });

router.post('/category/create', function (req, res, next) {
  models.category.create(req.body).then(function () {
    return res.redirect('/admin/categories');
  })["catch"](function (error) {
    next(error);
  });
});
router.get('/posts', function (req, res) {
  models.post.all().then(function (posts) {
    res.render('admin/posts/index', {
      title: 'All My Cats',
      posts: posts
    });
  })["catch"](function (error) {
    next(error);
  });
});
router.get('/post/create', function (req, res) {
  models.category.all().then(function (categories) {
    res.render('admin/posts/form', {
      title: 'Add New Cat',
      categories: categories
    });
  })["catch"](function (error) {
    next(error);
  });
}); // *** add post *** //

router.post('/post/create', function (req, res, next) {
  models.post.create(req.body).then(function (id) {
    return models.post.get(id);
  }).then(function (post) {
    res.status(200).json(post);
  })["catch"](function (error) {
    next(error);
  });
}); // *** update post *** //

router.get('/post/:id/update', function (req, res, next) {
  models.post.get(req.params.id).then(function (post) {
    models.category.all().then(function (categories) {
      res.render('admin/posts/form', {
        title: 'Edit Post',
        post: post,
        categories: categories
      });
    })["catch"](function (error) {
      next(error);
    });
  })["catch"](function (error) {
    next(error);
  });
});
router.post('/post/:id/update', function (req, res, next) {
  models.post.update(req.params.id, req.body).then(function () {
    return models.post.get(req.params.id);
  }).then(function (post) {
    res.status(200).json(post);
  })["catch"](function (error) {
    next(error);
  });
}); // *** delete post *** //

router.post('/post/delete/:id', function (req, res, next) {
  models.post.get(req.params.id).then(function (post) {
    models.post["delete"](req.params.id).then(function () {
      res.status(200).json(post);
    })["catch"](function (error) {
      next(error);
    });
  })["catch"](function (error) {
    next(error);
  });
});
module.exports = router;