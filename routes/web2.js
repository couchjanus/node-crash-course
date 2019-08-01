// routes/web2.js
const express = require('express');
const path = require('path');

const router = new express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Me And My Cats Main Page' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Me And My Cats' });
});
  
router.get('/contact', (req, res) => {
    res.render("contact", {
        title: "Contact Me or My Cats",
        emailsVisible: true,
        emails: ["gavgav@my.cat", "mioaw@my.dog"],
        phone: "+1234567890"
    });
});

router.get('/helper', (req, res) => {
    res.render("helpers", {
        title: "Custom Helpers",
        fruit: [ "apple", "lemon", "banana", "grape"]
    });
});

router.get('/catsblog', (req, res) => {
    res.render("catsblog.hbs", {
        title: "Peculiar Cats Blog",
        items: [
            {
                title: "Two Funny Cat Jokes",
                story: {
                  intro: "Two female cats are sitting on the fence passing the time",
                  body: "Two female cats are sitting on the fence passing the time of day when a really handsome tomcat walks by and winks at them. 'Oh darling, did you see that one?' one of the felines opines. 'I wouldn't mind sharing a dead mouse with him.' 'Oh, forget about him,' her friend tells her. 'I went out with him once, and all he did was talk about his operation.' A tomcat was heard running up and down the alley for hours. A neighbour called his owner and asked what was happening. The owner said, 'Well, I had him fixed today, and he's going around cancelling all his engagements.'"
                },
                comments: [

                ]
              },
              {
                title: "Ten Funny Cat One-liners",
                story: {
                  intro: "What do you get when you cross a chick with an alley cat?",
                  body: "What do you get when you cross a chick with an alley cat? A peeping tom. Why don't cats play poker in the jungle? Too many cheetahs. What is a cat's way of keeping law and order? Claw Enforcement. What is the name of the unauthorised autobiography of the cat? Hiss and Tell. What is a moggy's favourite colour? Purrrrrrrple! Did you hear about the cat that swallowed a ball of wool? She had mittens. What does a kitty like to eat for breakfast? Mice Krispies. How many cats can you put into an empty box? Only one. After that, the box isn't empty. What do you use to comb a cat? A catacomb. Why is it so hard for a leopard to hide? Because he's always spotted. Funny Cats Sayings"
                },
                comments: [
                    
                ]
              },
              {
                title: "How To Give a Cat a Pill",
                story: {
                  intro: "Pick cat up and cradle it in the crook of your left arm as if holding a baby",
                  body: "Pick cat up and cradle it in the crook of your left arm as if holding a baby. Position right forefinger and thumb on either side of cat's mouth and gently apply pressure to cheeks while holding pill in right hand. As cat opens mouth pop pill into mouth.  Allow cat to close mouth and swallow. Retrieve pill from floor and cat from behind sofa.  Cradle cat in left arm and repeat process. Retrieve cat from bedroom, and throw soggy pill away. Take new pill from foil wrap, cradle cat in left arm holding rear paws tightly with left hand. Force jaws open and push pill to back of mouth with right fore-finger. Hold mouth shut for a count of ten."
                },
                comments: [
                {
                    subject: "Before the jump Last Post",
                    body: "After the jump Last Post"
                },
                {
                    subject: "Before the jump Last Post",
                    body: "After the jump Last Post"
                }
                    
                ]
              }
              
        ],
    });
});



router.get('/500', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/500.html'));
});

router.get('/errors', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/errors.html'));
});



module.exports = router;
