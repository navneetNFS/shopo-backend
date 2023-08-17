const path = require('path');
const express = require('express')
const app = express()
const port = process.env.port || 3000
const cors = require('cors');
const bparser = require('body-parser');
const ui_route = require('./routes/ui');
const api_route = require('./routes/api');
const db = require('./utils/db');
const multer = require('multer');

app.set("view engine","ejs")
app.set("views","views")

app.use(cors());

const fileStorage = multer.diskStorage({
	destination: (req,file,cb) => {
		cb(null,'images')
	},
	filename: (req,file,cb) => {
		const today = new Date();
		const current_time = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}.${today.getHours()}.${today.getMinutes()}.${today.getSeconds()}`;
		cb(null, current_time + '-' + file.originalname);
	}
})

const fileFilterCheck = (req,file,cb) => {
    if(file.mimetype === "image/png" || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

app.use(bparser.urlencoded({extended: false}));
app.use(multer({storage: fileStorage, fileFilter: fileFilterCheck}).single('slide_image'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));

app.use('/', ui_route)
app.use('/api', api_route)
app.listen(port, () => console.log(`app listening on port ${port}!`))