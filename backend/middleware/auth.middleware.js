const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    //la requette recue est composée des dizaines d'info parmi celles ci il y a ce qu'on a envoyé dans le body
    const authHeader = req.headers.authorization

    if(authHeader){
        const token = authHeader.split(" ")[1]
        //le parametre user récupère le payload(la donnée cachée dans le token envoyée dans le 'header') 
        //qui est ici l'id de l'utilisateur connecté qu'on a choisit d'envoyer
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, userId) => {
            if(err){
                return res.sendStatus(403)
            }
            // vu que dans le modele 'task' a obligatoirement un 'user' alors il faut l'ajouter à la requête
            // grace a l'id du 'user' obtenu dans le 'header' envoyé par le front qui a reçu le token créé lors de
            // sa connexio validée
            
            //ajoute et initialise 'user' a la requête
            req.user = userId
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports = authMiddleware