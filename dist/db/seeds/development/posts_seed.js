"use strict";

exports.seed = function (knex) {
  return knex('posts').del() // Deletes ALL existing entries
  .then(function () {
    // Inserts seed entries one by one in series
    return knex('posts').insert({
      title: 'All About Cats',
      content: "Two female cats are sitting on the fence passing the time of day when a really handsome tomcat walks by and winks at them. 'Oh darling, did you see that one?' one of the felines opines. 'I wouldn't mind sharing a dead mouse with him.' 'Oh, forget about him,' her friend tells her. 'I went out with him once, and all he did was talk about his operation.' A tomcat was heard running up and down the alley for hours. A neighbour called his owner and asked what was happening. The owner said, 'Well, I had him fixed today, and he's going around cancelling all his engagements.'",
      category_id: 2
    });
  }).then(function () {
    return knex('posts').insert({
      title: 'Two Funny Cat Jokes',
      content: "Two female cats are sitting on the fence passing the time of day when a really handsome tomcat walks by and winks at them. 'Oh darling, did you see that one?' one of the felines opines. 'I wouldn't mind sharing a dead mouse with him.' 'Oh, forget about him,' her friend tells her. 'I went out with him once, and all he did was talk about his operation.' A tomcat was heard running up and down the alley for hours. A neighbour called his owner and asked what was happening. The owner said, 'Well, I had him fixed today, and he's going around cancelling all his engagements.'",
      category_id: 3
    });
  }).then(function () {
    return knex('posts').insert({
      title: 'Ten Funny Cat One-liners',
      content: "What do you get when you cross a chick with an alley cat? A peeping tom. Why don't cats play poker in the jungle? Too many cheetahs. What is a cat's way of keeping law and order? Claw Enforcement. What is the name of the unauthorised autobiography of the cat? Hiss and Tell. What is a moggy's favourite colour? Purrrrrrrple! Did you hear about the cat that swallowed a ball of wool? She had mittens. What does a kitty like to eat for breakfast? Mice Krispies. How many cats can you put into an empty box? Only one. After that, the box isn't empty. What do you use to comb a cat? A catacomb. Why is it so hard for a leopard to hide? Because he's always spotted. Funny Cats Sayings",
      category_id: 4
    });
  }).then(function () {
    return knex('posts').insert({
      title: 'How To Give a Cat a Pill',
      content: "Pick cat up and cradle it in the crook of your left arm as if holding a baby. Position right forefinger and thumb on either side of cat's mouth and gently apply pressure to cheeks while holding pill in right hand. As cat opens mouth pop pill into mouth.  Allow cat to close mouth and swallow. Retrieve pill from floor and cat from behind sofa.  Cradle cat in left arm and repeat process. Retrieve cat from bedroom, and throw soggy pill away. Take new pill from foil wrap, cradle cat in left arm holding rear paws tightly with left hand. Force jaws open and push pill to back of mouth with right fore-finger. Hold mouth shut for a count of ten.",
      category_id: 2
    });
  });
};