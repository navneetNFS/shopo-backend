const db = require('../utils/db')

module.exports.getSlider = (req,res) => {
    const query = `SELECT * FROM slider`
    db.execute(query)
    .then(result => {
        const [data,...rest] = result
        //console.log(data)
        res.send(data)
    })
}

module.exports.postSlider = (req,res) => {
    const slideContent = req.body.slide_content
    const imageUrl = req.file;
    const imageName = imageUrl.filename;
    const query = `INSERT INTO slider(content,image) value('${slideContent}','${imageName}')`;
    // console.log(slideContent)
    //console.log(imageName);
    db.execute(query)
    .then(() => {
        console.log("Slidered Successfully...")
        res.redirect('/slider')
    })
    .catch(err => {
        console.log(err)
    })
}
