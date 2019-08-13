const models = require("../../entities");

const { check, body, validationResult, sanitizeBody } = require('express-validator');

// module.exports = {

//     index: async (req, res) => {
//         let posts = await models.Post.find().sort([['created_at', 'descending']])
//         .exec();
//         res.render('admin/posts/index', { title: 'Post List', posts:  posts});
//     },

//     create_get: async (req, res, next) => {
//         try {
//             let categories = await models.Category.find();
//             res.render('admin/posts/form', { title: 'Create Post', categories:categories, errors: []});
//         } catch(err) {
//             return next(err);
//         }
//     },

//     create_post: async (req, res, next) => {
//         try {
//             const { title, content, status, category} = req.body;
//             let user = await models.User.find().limit(1).exec();    
//             const author = user._id;
            
//             const post = await models.Post.create({
//                 title, content, status, category, author
//             });
//             res.redirect('/admin/posts');
//         } 
//         catch(err) {
//           return next(err);
//         }
//     },  
    
//     update_get: async (req, res, next) => {
//         try {
//             let categories = await models.Category.find();
//             let post = await models.Post.findById(req.params.id);
//             res.render('admin/posts/form', { title: 'Create Post', post: post, categories:categories, errors: []});
//         } catch(err) {
//             return next(err);
//         }
//     },

//     update_post: async (req, res, next) => {
//         try {
//             const post = await models.Post.findOne({ _id: req.params.id });
//             const { title, content, status, category} = req.body;
//             await post.updateOne({
//                 title, content, status, category
//             });
//             res.redirect('/admin/posts');  
//         } catch(err) {
//             return next(err);
//         }
//     },

//     delete_post: async (req, res, next) => {
//         try {
//             const post = await models.Post.findOne({ _id: req.body.id });
//             await post.deleteOne();
//             res.redirect('/admin/posts');  
//         } 
//         catch(err) {
//             return next(err);
//         }
//     },  
// };


module.exports = {

    index: async (req, res) => {
        let posts = await models.Post.find().sort([['created_at', 'descending']])
        .exec();
        res.render('admin/posts/index', { title: 'Post List', posts:  posts});
    },

    create_get: async (req, res, next) => {
        try {
            let categories = await models.Category.find();
            res.render('admin/posts/form', { title: 'Create Post', categories:categories, errors: []});
        } catch(err) {
            return next(err);
        }
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

    create_post: async (req, res, next) => {
        try {
            const { title, content, status, category} = req.body;
            let user = await models.User.find().limit(1).exec();    
            const author = user._id;
            
            const post = await models.Post.create({
                title, content, status, category, author
            });
            res.redirect('/admin/posts');
        } 
        catch(err) {
          return next(err);
        }
    },  
    
    update_get: async (req, res, next) => {
        try {
            let categories = await models.Category.find();
            let post = await models.Post.findById(req.params.id);
            res.render('admin/posts/form', { title: 'Create Post', post: post, categories:categories, errors: []});
        } catch(err) {
            return next(err);
        }
    },

    update_post: async (req, res, next) => {
        try {
            const post = await models.Post.findOne({ _id: req.params.id });
            const { title, content, status, category} = req.body;

            await post.updateOne({
                title, content, status, category
            });
            res.redirect('/admin/posts');  
        } catch(err) {
            return next(err);
        }
    },

    delete_post: async (req, res, next) => {
        try {
            const post = await models.Post.findOne({ _id: req.body.id });
            await post.deleteOne();
            res.redirect('/admin/posts');  
        } 
        catch(err) {
            return next(err);
        }
    },  
};