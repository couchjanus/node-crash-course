const models = require("../../entities");

const { check, body, validationResult, sanitizeBody } = require('express-validator');

module.exports = {

    index: (req, res, next) => {
        models.Post.find().sort([['created_at', 'ascending']])
        .exec((err, posts) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        });
    },

    create_get: (req, res, next) => {
        models.Category.find({}, (err, categories) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/posts/form', { title: 'Create Post', categories:categories, errors: []});
        });
    },

    validate:  (method) => {
      switch (method) {
        case 'create': {
         return [ 
            body('title', "title doesn't exists").exists().isAlpha().withMessage('title must be alphabet letters.'),
            body('content', "content doesn't exists").exists(),
           ]   
        }
      }
    },
    
    create_post: (req, res, next) => {
        let user = models.User.find({}, (err) => {
            if (err) { 
                return next(err); 
            }
        }).limit(1).exec();
    
        models.Post.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            author: user._id,
            category: (typeof req.body.category==='undefined') ? [] : req.body.category.split(","),
                _id:req.params.id
        }).then(
            () => {
                res.redirect('/admin/posts');
            }
        );
    },
    
    update_get: (req, res, next) => {
        models.Post.findById(req.params.id, (err, post) => {
            if (err) { 
                return next(err); 
            }
            models.Category.find({}, (err, categories) => {
                if (err) { 
                    return next(err); 
                }
                res.render('admin/posts/form', { title: 'Update Post', categories:categories, post: post
            });    
            });
        });
    },

    update_post: (req, res, next) => {
        models.Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            category: req.body.category
        },  
        (err) => {
            if (err) { 
                return next(err); 
            }
            res.redirect('/admin/posts');
        });
    },
    
    delete_post: (req, res, next) => {
        models.Post.findByIdAndRemove(req.body.id, (err) => {
            if (err) { 
                    return next(err); 
            }
            res.redirect('/admin/posts');
        });
    },  
};