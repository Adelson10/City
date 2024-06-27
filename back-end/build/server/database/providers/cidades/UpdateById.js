"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateById = void 0;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
const UpdateById = (id, cidade) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.Knex)(ETableNames_1.ETableNames.cidade)
            .update(cidade)
            .where('id', '=', id);
        if (result > 0)
            return;
        return Error('Não foi possivel editar');
    }
    catch (error) {
        console.log(error);
        return Error('Não foi possivel editar');
    }
});
exports.UpdateById = UpdateById;
