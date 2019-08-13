const mongoose = require('mongoose'),
      assert = require('assert');
const models = require("../entities");

let url = 'mongodb://localhost:27017/peculiar'; 

describe("Use connect method to connect to the Server", function() {

    it("Тестируем соединение с MongoDB", function() {
        mongoose.connect(url, { useNewUrlParser: true }, (err) => {
            assert.equal(null, err);
        });
    });
    it("Тестируем User successfully saved", function() {
        mongoose.connect(url, { useNewUrlParser: true }, (err) => {

            let doeUser = new models.User({
                name: {
                    first: 'John',
                    last: 'Doe'
                },
                biography: 'John is a hypothetical "everyman" in other contexts, in a manner similar to "John Q. Public" or "Joe Public".',
                email: 'johndoe@my.com',
                username: 'johndoe',
                twitter: 'https://twitter.com/johndou',
                facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
            });
            
            doeUser.save(function(err) {
                assert.equal(null, err);
            });  
        });  
    });
    //

    it("Тестируем Category successfully saved", function() {
        mongoose.connect(url, { useNewUrlParser: true }, (err) => {

            let postCategory = new models.Category({
                name: 'Doe'
            });
            postCategory.save(function(err) {
                assert.equal(null, err);
            }); 
        });
    });
    
    it("Тестируем Post 1 successfully saved", function() {
        mongoose.connect(url, { useNewUrlParser: true }, (err) => {

            let doeUser = models.User.find({
                username: "johndoe"
            })
            .limit(1)
            .exec();

            let postCategory = models.Category.find({
                name: 'Doe'
            })
            .limit(1)
            .exec();
            
            let post1 = new models.Post({
                    title: 'This particular use became obsolete in the UK in 1852',
                    content: 'As is well known, the device of involving real people as notional lessees and ejectors was used to enable freeholders to sue the real ejectors. These were then replaced by the fictional characters John Doe and Richard Roe. Eventually the medieval remedies were (mostly) abolished by the Real Property Limitation Act of 1833; the fictional characters of John Doe and Richard Roe by the Common Law Procedure Act 1852; and the forms of action themselves by the Judicature Acts 1873–75." Secretary of State for Environment, Food, and Rural Affairs (Respondent) v Meier and another(FC) (Appellant) and others and another (FC)(Appellant) and another (2009).',
                    author: doeUser._id,
                    category: postCategory._id,
                    ratings:[{
                        summary: 'Great read'
                    }]
            });

            post1.save(function(err) {
                assert.equal(null, err);
            });  
        });
    });

    it("Тестируем Post 2 successfully saved", function() {
        mongoose.connect(url, { useNewUrlParser: true }, (err) => {
            let doeUser = models.User.find({
                username: "johndoe"
            })
            .limit(1)
            .exec();
            let postCategory = models.Category.find({
                name: 'Doe'
            }).limit(1)
            .exec();
            let post2 = new models.Post({
                    title: 'In the UK, usage of "John Doe" survives mainly in the form of John Doe Injunction or John Doe Order.',
                    content: 'If an unknown person has possession of the confidential personal information and is threatening to disclose it, a John Doe injunction may be sought against that person. The first time this form of injunction was used since 1852 in the United Kingdom was in 2005 when lawyers acting for JK Rowling and her publishers obtained an interim order against an unidentified person who had offered to sell chapters of a stolen copy of an unpublished Harry Potter novel to the media.',
                    author: doeUser._id,
                    category: postCategory._id,
                    ratings:[{
                        summary: 'Great read'
                    }]
            });
            post2.save(function(err) {
                assert.equal(null, err);
            });  
        });
    });
});
