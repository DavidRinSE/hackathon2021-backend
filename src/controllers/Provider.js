import Sequelize from "sequelize"
const { Op } = Sequelize
import db from "../models/index.js"
import validator from "email-validator"
import bcrypt from "bcrypt"
const { Provider } = db;

export default {
    async create(req, res) {
        const {username, password, email} = req.body;
        if(!username || !password || !email || !validator.validate(email)) {
            return res.status(400).send({
                message: "Request body is missing one or more of: username, password, email. Email must be valid"
            })
        }
        try {
            const providerSearch = await Provider.findAll({
                where: {
                    [Op.or]: [
                        { email: email },
                        { username: username },
                      ],
                }
            })
            if(providerSearch.length === 0){
                const hashedPassword = await bcrypt.hash(password, 10)
                console.log(hashedPassword)
                const provider = new Provider({
                    username: username,
                    email: email,
                    hashedPassword: hashedPassword
                })
                const savedProvider = await provider.save()
                return res.json(savedProvider)
            } else {
                return res.status(400).send({
                    message: "Provider with email or username already exists"
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: "Could not perform operation at this time, kindly try again later - or try something different you may be totally wrong."
            })
        }
    }
}