"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getById = exports.getByIdValidation = void 0;
const yup = __importStar(require("yup"));
const middleware_1 = require("../../shared/middleware");
const http_status_codes_1 = require("http-status-codes");
const pessoa_1 = require("../../database/providers/pessoa");
// Middleware de validação com Yup
exports.getByIdValidation = (0, middleware_1.validation)((getSchema) => ({
    params: getSchema(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));
// Buscar uma cidade pelo id
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            erros: {
                default: 'O parametro "id" e preciso ser informado.'
            }
        });
    const result = yield pessoa_1.PessoasProviders.GetById(Number(req.params.id));
    if (result instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
exports.getById = getById;
