import { loginBad } from "../QueryResult/Credential.js";

const loginAdmin = async (req, res) => {
    try {
        
    }
    catch(err) {

    }
}

const verifySession = async (req, res) => {
    try {
        const userData = req.headers['x-access-token'];
        if(!userData){
            return res.send(loginBad);
        }
        if(!process.env.TOKEN_SECRET){
            return res.send(loginBad);
        }
        // const admin
    }
    catch(err){

    }
}

export {loginAdmin};