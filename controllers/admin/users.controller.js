const models = require("../../entities");

const { check, body, validationResult, sanitizeBody } = require('express-validator');

module.exports = {

    index: async (req, res) => {
        let users = await models.User.find().sort([['created_at', 'descending']])
        .exec();
        res.render('admin/users/index', { title: 'User List', users:  users});
    },

    create_get: (req, res) => {
        res.render('admin/users/form', { title: 'Create User'});
    },
    
    create_post: async (req, res, next) => {
        try {
            const { username, email } = req.body;
            const user = await models.User.create({
                    username,
                    email,
            });
           res.redirect('/admin/users');  
        } 
        catch(err) {
          return next(err);
        }
    },
    
    update_get: async (req, res, next) => {
        let user = await models.User.findById(req.params.id);
        res.render('admin/users/form', { title: 'Update User', user: user });
    },

    update_post: async (req, res, next) => {
        try {
            const { username, email } = req.body;
            
            // await models.User.findByIdAndUpdate(req.params.id, {
            //     username,
            //     email,
            // });

            const user = await models.User.findOne({ _id: req.params.id });

            await user.updateOne({
                    username,
                    email,
                });
            res.redirect('/admin/users');  
        } catch(err) {
            return next(err);
        }
    },
    
    delete_post: async (req, res, next) => {
        try {
            const user = await models.User.findOne({ _id: req.body.id });
            await user.deleteOne();
            res.redirect('/admin/users');  
        } 
        catch(err) {
            return next(err);
        }
    },  

    // create_post: async (req, res, next) => {
    //     try {
    //        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
     
    //        if (!errors.isEmpty()) {
    //          res.status(422).json({ errors: errors.array() });
    //          return;
    //        }
    //         const { username, email } = req.body;
    //         const user = await models.User.create({
    //                 username,
    //                 email,
    //         });
    //        res.redirect('/admin/users');  
    //     } 
    //     catch(err) {
    //       return next(err);
    //     }
    // },
    // update_post: async (req, res, next) => {
    //     try {
    //            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
         
    //            if (!errors.isEmpty()) {
    //              res.status(422).json({ errors: errors.array() });
    //              return;
    //            }
    //         const { username, email } = req.body;
    //         const user = await models.User.findOne({ _id: req.params.id });

    //         await user.updateOne({
    //                 username,
    //                 email,
    //             });
    //         res.redirect('/admin/users');  
    //     } catch(err) {
    //         return next(err);
    //     }
    // },
}
