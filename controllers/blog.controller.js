const models = require('../models');

// module.exports = {

//   index: (req, res) => {
//     res.render('blog/index', { title: 'Blog List', posts: '' });
//   },

//   show: (req, res) => {
//     res.render('blog/show', { title: 'Show Blog', post: '' });
//   },
  
// }

module.exports = {
  index: (req, res) => {
    models.Post.all((err, docs) => {
        res.render('blog/index', { 
            title: 'Post List',
            posts: docs 
        });
    });
  },

  show: (req, res) => {
    models.Post.detail(req.params.id, (err, docs) => {
        res.render('blog/show', { 
            title: 'Post Detail',
            post: docs 
        });
    });
  },
}