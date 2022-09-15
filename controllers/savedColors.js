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
    },
    createColor: async (req, res)=>{
        try{
            console.log(req.body)
            await Color.create(
                {
                    backgroundColor: req.body.backgroundColor, 
                    caseColor: req.body.caseColor, 
                    keysColor: req.body.keysColor, 
                    colorName: req.body.colorName
                })
            console.log('Color has been added!')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    deleteColor: async (req, res)=>{
        console.log('req body ', req.body)
        try{
            await Color.findOneAndDelete({_id: req.body.itemFromJS})
            console.log('Deleted Color')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    