var express = require('express')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
})

var upload = multer({ storage: storage })

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('hello people 2a')
})

app.post('/single', upload.single('profile'), (req, res) => {
    try {
        res.send(req.file);
    } catch(err) {
        res.send(400);
    }
})

app.post('/bulk', upload.array('profiles', 4), (req, res) =>{
    try {
        res.send(req.files)
    } catch(error) {
          console.log(error)
           res.send(400)
    }
})

app.listen(port, () => {
    console.log('listening to the port: ' + port)
})

