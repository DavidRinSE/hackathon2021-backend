import jwt from "jsonwebtoken"
import db from "../models/index.js"
const {Provider} = db
export default async (token, username) => {
    let decoded;
    try {
        decoded = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET);
        if(decoded.username !== username){
            return false
        }
    } catch (err) {
        return false;
    }

    let provider = await Provider.findOne({where: {username}})
    if(provider.length === 0){
        return false
    }
    console.log(provider.dataValues)
    return provider.dataValues.id
}