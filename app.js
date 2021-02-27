const express=require('express');
const app=express();
let path=require('path');
let port=7000;

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine' ,'ejs');

app.use(express.static('./public'));

app.listen(port, () => {console.log("Look at the "+port+" port!")});

app.get('/', (req, res) => {
    res.render('index');
});