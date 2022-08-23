const Color = require('../models/Colors')

module.exports = {
    getColors: async (req,res)=>{
        try{
            const colorItems = await Color.find()
            res.render('index.ejs', {colors: colorItems})
        }catch(err){
            console.log(err)
        }
    },
    createColor: async (req, res)=>{
        try{
            await Color.create(req.body)
            console.log('Color has been added!')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    deleteColor: async (req, res)=>{
        console.log('req body ', req.body)
        try{
            await Color.findOneAndDelete({colorName: req.body.itemFromJS})
            console.log('Deleted Color')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    