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
const sequelize_typescript_2 = require("sequelize-typescript");
const User_model_1 = __importDefault(require("./User.model"));
let UserAddress = class UserAddress extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_2.PrimaryKey,
    sequelize_typescript_2.AutoIncrement,
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "AddressGUID", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "HouseNo", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "Locality", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "Landmark", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "Country", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "CreatedGUID", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "StreetName", void 0);
__decorate([
    sequelize_typescript_2.Column,
    (0, sequelize_typescript_2.ForeignKey)(() => User_model_1.default),
    __metadata("design:type", String)
], UserAddress.prototype, "UserGUID", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "City", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "State", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", String)
], UserAddress.prototype, "Pincode", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", Date)
], UserAddress.prototype, "CreatedDate", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", Date)
], UserAddress.prototype, "UpdatedDate", void 0);
__decorate([
    sequelize_typescript_2.Column,
    __metadata("design:type", Date)
], UserAddress.prototype, "DeletedDate", void 0);
UserAddress = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_UserAddresses",
        timestamps: true,
        paranoid: true,
        createdAt: "CreatedDate",
        updatedAt: "UpdatedDate",
        deletedAt: "DeletedDate",
    })
], UserAddress);
exports.default = UserAddress;
