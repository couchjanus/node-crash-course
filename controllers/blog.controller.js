const models = require("../entities");

module.exports = {

  index: (req, res, next) => {
    models.Post.find().find()
    .exec((err, posts) => {
        if (err) { return next(err); }
        res.render('blog/index', { title: 'Post List', posts:  posts});
    });
  },
  
    show: (req, res) => {
    models.Post.findById(req.params.id, (err, post) => {
        res.render('blog/show', { 
            title: 'Post Detail',
            post: post 
        });
    });
  },
}