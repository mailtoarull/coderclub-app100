"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_model_1 = __importDefault(require("../User.model"));
const ProductCategory_model_1 = __importDefault(require("./ProductCategory.model"));
let ProductSubCategory = class ProductSubCategory extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ProductSubCategoryGUID",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], ProductSubCategory.prototype, "ProductSubCategoryGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductCategory_model_1.default, {
        foreignKey: "ProductCategoryGUID",
        targetKey: "ProductCategoryGUID",
        as: "ProductCategory",
    }),
    (0, sequelize_typescript_1.Column)({
        field: "ProductCategoryGUID",
        allowNull: false,
        type: sequelize_typescript_1.DataType.INTEGER,
        comment: "Product Category GUID",
    }),
    __metadata("design:type", Number)
], ProductSubCategory.prototype, "ProductCategoryGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ProductSubCategoryName",
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING(100),
        comment: "Product Sub Category Name",
        unique: true,
    }),
    __metadata("design:type", String)
], ProductSubCategory.prototype, "ProductSubCategoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "IsActive",
        allowNull: false,
        type: sequelize_typescript_1.DataType.BOOLEAN,
        comment: "Is Active",
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], ProductSubCategory.prototype, "IsActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "CreatedDate",
        allowNull: false,
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], ProductSubCategory.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ModifiedDate",
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], ProductSubCategory.prototype, "ModifiedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "DeletedDate",
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], ProductSubCategory.prototype, "DeletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_model_1.default, {
        foreignKey: "CreatedGUID",
        targetKey: "UserGUID",
        as: "CreatedUser",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ProductSubCategory.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_model_1.default, {
        foreignKey: "ModifiedGUID",
        targetKey: "UserGUID",
        as: "ModifiedUser",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], ProductSubCategory.prototype, "ModifiedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_model_1.default, {
        foreignKey: "DeletedGUID",
        targetKey: "UserGUID",
        as: "DeletedUser",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        references: {
            model: "User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", Number)
], ProductSubCategory.prototype, "DeletedGUID", void 0);
ProductSubCategory = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductSubCategory",
        timestamps: true,
        updatedAt: "ModifiedDate",
        createdAt: "CreatedDate",
        deletedAt: "DeletedDate",
    })
], ProductSubCategory);
exports.default = ProductSubCategory;
