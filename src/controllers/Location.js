// import Sequelize from "sequelize"
// const { Op } = Sequelize
import db from "../models/index.js"
import testToken from "./testToken.js"
const { Location } = db;

export default {
    async create(req, res) {
        const {username, streetAddress, zipCode, city, state} = req.body;
        if(!username || !streetAddress || !zipCode || !city || !state) {
            return res.status(400).send({
                message: "Request body missing one of: username, streetAddress, zipCode, city, state."
            })
        }
        try {
            const providerId = await testToken(req.headers.authorization, username)
            if(!providerId) {
                return res.status(400).send("Bad token")
            }
            const location = new Location({
                streetAddress: streetAddress.toLowerCase(),
                zipCode: parseInt(zipCode),
                city: city.toLowerCase(),
                state: state.toLowerCase(),
                providerId
            })
            const savedLocation = await location.save()
            return res.json(savedLocation)
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: "Could not perform operation at this time, kindly try again later - or try something different you may be totally wrong."
            })
        }
    },
    async get(req, res) {
        const {city} = req.query
        let locationSearch = {}
        if(city) {
            locationSearch = {city: city.toLowerCase()}
        }
        try {
            const locations = []
            const locationsQuery = await Location.findAll({where: locationSearch})
            for(const location of locationsQuery) {
                locations.push(location['dataValues'])
            }
            return res.json(locations)
        } catch(err) {
            console.log(err)
            return res.status(500).send({
                message: "Could not perform operation at this time, kindly try again later - or try something different you may be totally wrong."
            })
        }
    }
}