import { readdir } from "fs/promises";
import { join, extname } from "path";
import Sequelize from "sequelize";
// import pg from "pg";

import config from "../config/db.js";
import associations from "./associations.js";

// pg.defaults.ssl = true;

class Database {
  _defineModel(name, schema, options) {
    this[name] = this.sequelize.define(name, schema, options);
  }

  _loadModels = async () => {
    const modelsPath = `${process.cwd()}/models`;
    const schemaFiles = await readdir(modelsPath);
    for (const schemaFile of schemaFiles) {
      const modelPath = join(modelsPath, schemaFile);
      if (extname(schemaFile) === ".js") {
        const { default: schema } = await import(modelPath);
        this._defineModel(schema.name, schema.schema, schema.options);
      }
    }
  };

  connect = async () => {
    if (!this.db) {
      this.sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
          host: config.host,
          dialect: config.dialect,
          //   dialectOptions: {
          //     ssl: true,
          //   },
          logging: false,
        }
      );

      try {
        await this.sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch ({ message }) {
        console.error("Unable to connect to the database: ", message);
      }
      await this._loadModels();
      // this.sequelize.sync({ force: true });
      this.sequelize.sync();
    }
    return (Database.db = this);
  };
}

const db = new Database().connect();

export default db;

associations();
