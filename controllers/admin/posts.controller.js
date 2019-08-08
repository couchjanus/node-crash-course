const models = require("../../entities");

const { check, validationResult, sanitizeBody } = require('express-validator');

module.exports = {

    all: (req, res, next) => {
        models.Post.find({}, (err, posts) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        });
    },
    
    // sorting
    index: (req, res, next) => {
        models.Post.find().sort([['createdAt', 'ascending']])
        .exec((err, posts) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        });
        // models.Post.find({}).sort('-createdAt').exec((err, posts) => {
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // models.Post.find({}).sort({createdAt: -1}).exec(function(err, posts) =>  {
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // models.Post.find({}).sort({createdAt: 'desc'}).exec(function(err, posts) => {
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // models.Post.find({}).sort({createdAt: 'descending'}).exec(function(err, posts) =>{
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // models.Post.find({}).sort([['createdAt', -1]]).exec(function(err, posts) =>{
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // models.Post.find({}, null, {sort: '-createdAt'}, function(err, posts) =>{
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // models.Post.find({}, null, {sort: {createdAt: -1}}, function(err, posts) =>{
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
        // // With multiple sort fields
        // models.Post.find({}).sort({title: 1, createdAt: 1}).exec(function(err, posts) =>{
        //     if (err) { 
        //         return next(err); 
        //     }
        //     res.render('admin/posts/index', { title: 'Post List', posts:  posts});
        // });
    
    },

    create_get: (req, res, next) => {
        res.render('admin/posts/form', { title: 'Create Post'});
    },

// create_post: (req, res, next) => {
//     let category = new models.Category(
//       { name: req.body.name }
//     );
//     models.Category.findOne({ 'name': req.body.name })
//     .exec( function(err, found_category) {
//         console.log('found_category: '+found_category);
//         if (err) { return next(err); }
//         if (found_category) {
//             res.redirect(found_category.url);
//         } else {
//             category.save(function (err) {
//                 if (err) { return next(err); }
//                 res.redirect('/admin/categories');
//             });
//         }
//     });
// },

// create_post: (req, res, next) => {
//     // name must be not empty
//     check(req.body.name).exists();
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }
    
//     models.Category.create({
//             name: req.body.name,
//     }).then(
//         () => {
//             res.redirect('/admin/categories');
//         }
//     );
// },

    create_post: (req, res, next) => {
        check(req.body.title).not().isEmpty()
        .trim()
        .escape(),
        sanitizeBody('notifyOnReply').toBoolean();
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        models.Post.create({
                title: req.body.title,
        }).then(
            () => {
                res.redirect('/admin/posts');
            }
        );
    },

    update_get: (req, res, next) => {
        models.Category.findById(req.params.id, (err, category) => {
            if (err) { return next(err); }
            res.render('admin/categories/form', { title: 'Update Category', breadcrumb: 'Edit Category', category: category });
        });
    },

    update_post: (req, res, next) => {
        check(req.body.name).not().isEmpty()
        .trim()
        .escape(),
        sanitizeBody('notifyOnReply').toBoolean();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let category = new models.Category({
            name: req.body.name,
            _id: req.params.id
        });

        models.Category.findByIdAndUpdate(req.params.id, category, {},  (err,thecategory) => {
            if (err) { return next(err); }
            res.redirect('/admin/categories');
        });
    },

    delete_get: (req, res, next) => {
        models.Category.findById(req.params.id)
          .exec((err, category) => {
           if (err) { 
               return next(err); 
            }
           res.render('admin/categories/delete', { title: 'Delete Category', category: category } );
        });
    },

    delete_post: (req, res, next) => {
        models.Category.findById(req.params.id).exec((err, results) => {
            if (err) { 
                return next(err); 
            }
            models.Category.findByIdAndRemove(req.body.id, function deleteCat(err) {
                if (err) { 
                    return next(err); 
                }
                res.redirect('/admin/categories');
            });
        });
    },  
};