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
exports.getAll = exports.getAllValidation = void 0;
const yup = __importStar(require("yup"));
const middleware_1 = require("../../shared/middleware");
const http_status_codes_1 = require("http-status-codes");
const cidades_1 = require("../../database/providers/cidades");
// Middleware de validação com Yup
exports.getAllValidation = (0, middleware_1.validation)((getSchema) => ({
    query: getSchema(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().moreThan(0),
        filter: yup.string().optional()
    })),
}));
// Buscar todas as cidades
// eslint-disable-next-line @typescript-eslint/ban-types
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cidades_1.CidadesProviders.GetAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id) || 0);
    const count = yield cidades_1.CidadesProviders.Count(req.query.filter);
    if (result instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    else if (count instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', count);
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
exports.getAll = getAll;
