import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes

import _dummy_table from "./dummy_table.js"

function initModels(sequelize) {
    const dummy_table = _dummy_table(sequelize, DataTypes)

    return {
        dummy_table
    }
}

export default initModels