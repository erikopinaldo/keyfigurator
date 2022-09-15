const Color = require('../models/Colors')

module.exports = {
    getColors: async (req,res)=>{
        try{
            const colorItems = await Color.find()
            console.log(colorItems)
            res.render('index.ejs', {colors: colorItems})
        }catch(err){
            console.log(err)
        }
    }
}    