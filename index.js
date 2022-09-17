const express = require("express");
const ejs = require("ejs");
const qrcode = require("qrcode")
const path = require("path");
const app = express();

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.use(express.json);
app.use(express.urlencoded({ extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.get('/', (res,req, next) => {
    res.render('index');
})

app.post('/scan', (req, res, next) => {
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text, (err,src) => {
        res.render("scan", {
            qr_code: src,
        });
    })
})

app.listen(port, function() {
    console.log("Server started on port 3000");
  });