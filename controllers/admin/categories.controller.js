const models = require("../../entities");

const { check, validationResult, sanitizeBody } = require('express-validator');


module.exports = {

    all: (req, res, next) => {
        models.Category.find({}, (err, categories) => {
            if (err) { 
                return next(err); 
            }
            res.render('admin/categories/index', { title: 'Category List', categories:  categories});
        });
    },

    index: (req, res, next) => {
        models.Category.find().sort([['name', 'ascending']])
    .exec((err, categories) => {
        if (err) { return next(err); }
        res.render('admin/categories/index', { title: 'Category List', categories:  categories});
    });
    },

    create_get: (req, res, next) => {
        res.render('admin/categories/form', { title: 'Create Category', breadcrumb: 'Add New Category'});
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

        check(req.body.name).not().isEmpty();
        
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } 

        models.Category.findOne({ 'name': req.body.name }).then((category) => {
            if (category) {
                return res.redirect('/admin/categories'); 
            }
        });

        models.Category.create({
                name: req.body.name,
            }).then(
                () => {
                    res.redirect('/admin/categories');
                }
        );
    },

    update_get: (req, res, next) => {
        models.Category.findById(req.params.id, (err, category) => {
            if (err) { return next(err); }
            res.render('admin/categories/form', { title: 'Update Category',  category: category });
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