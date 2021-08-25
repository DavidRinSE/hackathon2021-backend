// import Sequelize from "sequelize"
// const { Op } = Sequelize
import db from "../models/index.js"
import testToken from "./testToken.js"
const { Item, Location } = db;

export default {
    async create(req, res) {
        const {username, locationId, name} = req.body;
        if(!username || !locationId || !name) {
            return res.status(400).send({
                message: "Request body missing one of: username, locationId, name."
            })
        }
        try {
            const providerId = await testToken(req.headers.authorization, username)
            if(!providerId) {
                return res.status(400).send("Bad token")
            }

            const locationSearch = await Location.findOne({where: {id: parseInt(locationId)}})
            if(!locationSearch) {
                return res.status(404).send("Could not find location with provided id")
            }

            const item = new Item({
                name,
                providerId,
                locationId,
                pending: false
            })
            const savedItem = await item.save()
            return res.json(savedItem)
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: "Could not perform operation at this time, kindly try again later - or try something different you may be totally wrong."
            })
        }
    },
}