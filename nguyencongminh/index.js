const e = require("express")

const express = Require(express)
const app = new express()
app.listen(3000,() =>{
    console.log("app lis on port 3000")
})
app.use(express.static('public'))
app.get ("/",(req,res)=>{
    res.json({
        name: "nguyen cong minh",
        mail :"minhnc62@wru.com"
    })
})