"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knex = void 0;
const knex_1 = __importDefault(require("knex"));
require("dotenv/config");
const pg_1 = __importDefault(require("pg"));
const Environment_1 = require("./Environment");
if (process.env.NODE_ENV === 'production') {
    pg_1.default.types.setTypeParser(20, 'text', parseInt);
}
const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'test': return Environment_1.test;
        case 'production': return Environment_1.production;
        default: return Environment_1.development;
    }
};
exports.Knex = (0, knex_1.default)(getEnvironment());
