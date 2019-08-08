const models = require("../../entities");

const { check, validationResult, sanitizeBody } = require('express-validator');

module.exports = {

    index: (req, res, next) => {
        models.User.find().sort([['createdAt', 'descending']])
        .exec((err, users) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/users/index', { title: 'User List', users:  users});
        });
    },

    create_get: (req, res, next) => {
        res.render('admin/users/form', { title: 'Create User'});
    },

    // find
    show_get: (req, res, next) => {
        // named john and at least 18
        models.User.find({ name: {
            first: 'john'} , age: { $gte: 18 }
        }, 
        // executes, passing results to callback
        (err, user) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/users/show', { title: 'Detail User', user:  user});
        });
        
        // // executes, name LIKE john and only selecting the "name" and "age" fields
        // models.User.find({ 
        //     name: { first: /john/i }
        //     }, 'name age', (err, docs) => { });

        // // passing options
        // models.User.find({ name: { first: /john/i }}, null, { skip: 10 })

        // // passing options and executes
        // models.User.find({ name: { first: /john/i }}, null, { skip: 10 }, function (err, docs) {});

        // // executing a query explicitly
        // var query = models.User.find({ name: { first: /john/i }}, null, { skip: 10 })
        // query.exec(function (err, docs) {});

        // // using the promise returned from executing a query
        // var query = models.User.find({ name: { first: /john/i } }, null, { skip: 10 });
        // var promise = query.exec();
        // promise.addBack(function (err, docs) {});
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