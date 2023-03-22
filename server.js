const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // var dir = './uploads';

        // if(!fs.existsSync(dir)){
        //     fs.mkdirSync(dir,{recursive: true});
        // }

        // cb(null, 'uploads')
        if(file.mimetype == "image/jpeg"
        ||file.mimetype == "image/jpg"
        ||file.mimetype == "image/png"
        ){
            cb(null, 'uploads')
        }

    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.jpeg');
    }
})

var upload = multer({ storage: storage , limits:{fileSize:2*1024*1024} });

var upload = upload.single('myFile');

app.post('/uploads', function(req, res) {
    upload(req,res , function(err){
        const file = req.file
        if( err instanceof multer.MulterError){
            return res.send('Kích thước lớn hơn 1 MB');
        }else if(!file){
            return res.send('Tệp không xác định');
        }else{
            res.send(file);
        }

    })    
})

//Uploading multiple files

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});