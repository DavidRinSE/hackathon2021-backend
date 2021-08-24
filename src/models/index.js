import Sequelize from 'sequelize';
import initModels from './init-models.js';

const env = process.env.NODE_ENV || 'development';
import { readFile } from 'fs/promises';
const configObj = JSON.parse(
  await readFile(
    new URL('../config/config.json', import.meta.url)
  )
);
const config = configObj[env];
let db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db = initModels(sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;