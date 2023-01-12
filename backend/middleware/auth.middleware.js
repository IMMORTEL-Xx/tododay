const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    //la requette recue est composée des dizaines d'info parmi celles ci il y a ce qu'on a envoyé dans le body
    const authHeader = req.headers.authorization

    if(authHeader){
        const token = authHeader.split(" ")[1]
        //le parametre user récupère le payload(la donnée cachée dans le token envoyée dans le 'header') 
        //qui est ici l'id de l'utilisateur connecté qu'on a choisit d'envoyer
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
            if(err){
                return res.sendStatus(403)
            }
            // vu que dans le modele 'task' a obligatoirement un 'user' alors il faut remplir ce champ avec
            // ce middleware grace a l'id du 'user' obtenu dans le 'header'
            req.user = user
            // console.log("requette entiere")
            // console.log(req)
            console.log("user-v")
            console.log(req.user)
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports = authMiddleware