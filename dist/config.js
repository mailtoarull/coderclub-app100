"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productImageUploadOptions = exports.userImageUploadOptions = exports.employeeImageUploadOptions = exports.sequelizeConnectionOptions = void 0;
const node_path_1 = __importDefault(require("node:path"));
const multer_1 = __importDefault(require("multer"));
exports.sequelizeConnectionOptions = {
    dialect: "mssql",
    host: "154.61.74.30",
    port: 1533,
    username: "gkdairy",
    password: "yinq9327YI",
    database: "GKDairy",
    dialectOptions: {
        options: {
            encrypt: false,
        },
        setTimeout: 50000,
        clearTimeout: 50000,
    },
    // models: [__dirname + "/**/*.model.ts"],
};
exports.employeeImageUploadOptions = {
    directory: node_path_1.default.join("uploads"),
    relativePath: "public/uploads/",
    limits: { fileSize: 1024 * 1024 * 1 },
};
exports.userImageUploadOptions = {
    directory: node_path_1.default.join("uploads"),
    tmpFilePath: node_path_1.default.join("public/tmp"),
    relativePath: "public/uploads/",
    limits: { fileSize: 1024 * 1024 * 1 },
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/tmp");
        },
        filename: (req, file, cb) => {
            // a unique name for the file with the original extension
            cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
        },
    }),
};
exports.productImageUploadOptions = {
    directory: node_path_1.default.join("products"),
    tmpFilePath: node_path_1.default.join("public/tmp"),
    relativePath: "public/products/",
    limits: { fileSize: 1024 * 1024 * 2 },
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/products");
        },
        filename: (req, file, cb) => {
            // a unique name for the file with the original extension
            cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
        },
    }),
};
