import db from "../models/index.js";

const { dummy_table } = db;

export default {
    async create(req, res) {
        const {name} = req.body;
        try {
            const dummy = await dummy_table.create({name})
            return res.status(201).send({message: 'New dummy entry created'})
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: "Could not perform operation at this time, kindly try again later - or try something different you may be totally wrong."
            })
        }
    }
}