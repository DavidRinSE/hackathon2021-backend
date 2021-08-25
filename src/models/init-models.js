import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes

import _dummy_table from "./dummy_table.js"
import _item from "./item.js"
import _location from "./location.js"
import _provider from "./provider.js"

function initModels(sequelize) {
    const dummy_table = _dummy_table(sequelize, DataTypes)
    const Item = _item(sequelize, DataTypes)
    const Location = _location(sequelize, DataTypes)
    const Provider = _provider(sequelize, DataTypes)

    Item.belongsTo(Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
    })
    Item.belongsTo(Provider, {
        foreignKey: 'providerId',
        onDelete: 'CASCADE'
    })
    Location.hasMany(Item, {
        foreignKey: 'locationId'
    })
    Provider.hasMany(Item, {
        foreignKey: 'providerId'
    })

    Location.belongsTo(Provider, {
        foreignKey: 'providerId',
        onDelete: 'CASCADE'
    })
    Provider.hasOne(Location, {
        foreignKey: 'providerId',
    })

    return {
        dummy_table,
        Item,
        Location,
        Provider
    }
}

export default initModels