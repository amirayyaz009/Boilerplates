import mongoose from "mongoose";
import { readdir } from "fs/promises";
import { join, extname } from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });

class Database {
  _defineModel(name, schema) {
    this[name] = mongoose.model(name, schema);
  }

  _loadModels = async () => {
    const modelsPath = `${process.cwd()}/models`;
    const schemaFiles = await readdir(modelsPath);
    for (const schemaFile of schemaFiles) {
      const modelPath = join(modelsPath, schemaFile);
      if (extname(schemaFile) === ".js") {
        const { default: schema } = await import(modelPath);
        this._defineModel(schema.name, schema.schema);
      }
    }
  };

  connect = async () => {
    if (!this.db) {
      try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB...");
      } catch (error) {
        console.error(
          `Could not connect to MongoDB: ${error.message || error}`
        );
      }
      await this._loadModels();
    }
    return (Database.db = this);
  };
}

const db = new Database().connect();

export default db;
