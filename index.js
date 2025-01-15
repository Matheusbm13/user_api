
const express = require('express')
const app = express()
app.use(express.json())


let users = []
let nextid = 1 



//Rota para retornar todos os usuários ################################################################
app.get("/users", (req, res) => {
    res.json(users)
})



//Rota para criar um usuário ###########################################################################
app.post("/users" , (req,res) => {
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({error: "Name e email são obrigados"})
    }


    const newUser = {
        id: nextid++,
        name: name,
        email: email
    }

    users.push(newUser)
    res.status(201).json(newUser)
})



app.get("/user/:id", (req, res) => {
    const { id } = req.params 
    const user = users.find((u) => u.id === parseInt (id))
    
    if(!user){
        return res.status(404).json({error:"Usuário não encontrado"})
    }

    res.json(user)
})



//Rota para deletar um usuário pelo ID ################################################################
app.delete("/user/:id", (req,res) => {
    const {id} = req.params

    const user = users.find((u) => u.id === parseInt (id))
    
    if(!user){
        return res.status(404).json({error:"Usuário não encontrado"})
    }

    users = users.filter((u) => u.id != id)
    res.status(204).send()

})



//Rota para atualizar o usuário pelo ID ##################################################################
app.put("/user/:id", (req, res) => {
    const { id } = req.params
    const user = users.find((u) => u.id == id)
    const {name, email} = req.body

    if(!user){
        return res.status(404).json({error:"Usuário não encontrado"})
    }


    if(name){
        user.name = name
    }

    if(email){
        user.email = email
    }

    res.json(user)
})

app.listen(3000, () => {
    console.log("server is running on 3000")
})