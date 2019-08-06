const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const posts = [
    {
        title: 'Two Funny Cat Jokes',
        content: "Two female cats are sitting on the fence passing the time of day when a really handsome tomcat walks by and winks at them. 'Oh darling, did you see that one?' one of the felines opines. 'I wouldn't mind sharing a dead mouse with him.' 'Oh, forget about him,' her friend tells her. 'I went out with him once, and all he did was talk about his operation.' A tomcat was heard running up and down the alley for hours. A neighbour called his owner and asked what was happening. The owner said, 'Well, I had him fixed today, and he's going around cancelling all his engagements.'",
        updated_at: new Date()
    } , 
    {
        title: 'Ten Funny Cat One-liners',
        content: "What do you get when you cross a chick with an alley cat? A peeping tom. Why don't cats play poker in the jungle? Too many cheetahs. What is a cat's way of keeping law and order? Claw Enforcement. What is the name of the unauthorised autobiography of the cat? Hiss and Tell. What is a moggy's favourite colour? Purrrrrrrple! Did you hear about the cat that swallowed a ball of wool? She had mittens. What does a kitty like to eat for breakfast? Mice Krispies. How many cats can you put into an empty box? Only one. After that, the box isn't empty. What do you use to comb a cat? A catacomb. Why is it so hard for a leopard to hide? Because he's always spotted. Funny Cats Sayings",
        updated_at: new Date()
    }, 
    {
        title: 'How To Give a Cat a Pill',
        content: "Pick cat up and cradle it in the crook of your left arm as if holding a baby. Position right forefinger and thumb on either side of cat's mouth and gently apply pressure to cheeks while holding pill in right hand. As cat opens mouth pop pill into mouth.  Allow cat to close mouth and swallow. Retrieve pill from floor and cat from behind sofa.  Cradle cat in left arm and repeat process. Retrieve cat from bedroom, and throw soggy pill away. Take new pill from foil wrap, cradle cat in left arm holding rear paws tightly with left hand. Force jaws open and push pill to back of mouth with right fore-finger. Hold mouth shut for a count of ten.",
        updated_at: new Date()
    },
    {
        title: 'Lorem Ipsum',
        content: 'Lorem Ipsum - це текст-риба, що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба" не тільки успішно пережила п\'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп\'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.',
        updated_at: new Date()
    },
    {
        title: '  Де собі взяти трохи?',
        content: 'Існує багато варіацій уривків з Lorem Ipsum, але більшість з них зазнала певних змін на кшталт жартівливих вставок або змішування слів, які навіть не виглядають правдоподібно. Якщо ви збираєтесь використовувати Lorem Ipsum, ви маєте упевнитись в тому, що всередині тексту не приховано нічого, що могло б викликати у читача конфуз. Більшість відомих генераторів Lorem Ipsum в Мережі генерують текст шляхом повторення наперед заданих послідовностей Lorem Ipsum. Принципова відмінність цього генератора робить його першим справжнім генератором Lorem Ipsum. Він використовує словник з більш як 200 слів латини та цілий набір моделей речень - це дозволяє генерувати Lorem Ipsum, який виглядає осмислено. Таким чином, згенерований Lorem Ipsum не міститиме повторів, жартів, нехарактерних для латини слів і т.ін.',
        updated_at: new Date()
    }
];

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client){

    if (err) throw err;
     
    const db = client.db("peculiar");
    const collection = db.collection("posts");
    
    collection.insertMany(posts, function(err, results){
             
        console.log(results);
        client.close();
    });
});
