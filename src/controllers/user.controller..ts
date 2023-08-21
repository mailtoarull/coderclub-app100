import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import path from "node:path";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";
import UserAddress from "../models/user-address.model";
import CartItem from "../models/cart-item";
import { Op } from "sequelize";
import ProductMaster from "../models/product-master.model";

export const getAllUsers = async (req: Request, res: Response) => {
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;

  try {
    const users = await User.findAll({
      attributes: {
        exclude: [
          "CreatedGUID",
          "ModifiedGUID",
          "CreatedDate",
          "ModifiedDate",
          "DeletedDate",
        ],
      },
      paranoid,
      include: [UserAddress],
    });
    users.forEach((user) => {
      user.setFullURL(req, "PhotoPath");
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { UserGUID } = req.params;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        UserGUID,
      },
      paranoid,
      include: [UserAddress],
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    user.setFullURL(req, "PhotoPath");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.body===>", JSON.stringify(req.body.user));
  res.status(200).json({ message: "User updated successfully!" });
  // const { UserGUID } = req.body.user;
  // const { deleted } = req.query;
  // const paranoid = deleted === "true" ? false : true;

  // if (req.file) {
  //   const { filename, path: tmpPath } = req.file;
  //   req.body.tmpPath = tmpPath;
  //   req.body.uploadPath = path.join(
  //     userImageUploadOptions.relativePath,
  //     filename
  //   );
  //   req.body.PhotoPath = path.join(userImageUploadOptions.directory, filename);
  // }

  // try {
  //   let user = await User.findByPk(UserGUID, {
  //     paranoid,
  //   });
  //   if (user && user.DeletedDate && !paranoid) {
  //     await user.restore();
  //     // user.DeletedDate = null;
  //   } else if (!user) {
  //     return res.status(400).json({ message: "User not found!" });
  //   }

  //   const oldPhotoPath = user.PhotoPath;

  //   delete req.body.MobileNo;
  //   delete req.body.Password;

  //   Object.keys(req.body).forEach((key: string) => {
  //     if (user) {
  //       user.setDataValue(key, req.body[key]);
  //     }
  //   });

  //   if (req.body.tmpPath && req.body.uploadPath) {
  //     fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
  //       if (err) console.log(err);
  //       else {
  //         user?.setFullURL(req, "PhotoPath");
  //       }
  //     });
  //   }

  //   if (oldPhotoPath && oldPhotoPath !== user.PhotoPath) {
  //     fs.unlink(
  //       path.join(
  //         userImageUploadOptions.relativePath,
  //         path.basename(oldPhotoPath)
  //       ),
  //       (err) => {
  //         if (err) console.log(err);
  //         else console.log("Old photo deleted successfully!");
  //       }
  //     );
  //   }
  //   await user.save();
  //   res.status(201).json({ message: "User updated successfully!", user: user });
  // } catch (error) {
  //   next(error);
  // }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { deleted } = req.query;
  const { UserGUID } = req.params;
  const paranoid = deleted === "true" ? false : true;

  try {
    const user = await User.findOne({
      where: {
        UserGUID,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    await user.destroy({
      force: !paranoid,
    });

    return res.status(200).json({
      message: "User deleted successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.CreatedGUID = req.body.user.UserGUID;

  try {
    const cartItems = await CartItem.findAll({
      where: {
        CreatedGUID: {
          [Op.eq]: req.body.CreatedGUID,
        },
      },
      include: [ProductMaster],
    });
    cartItems?.forEach((item) => {
      return item.Product?.setFullURL(req, "PhotoPath");
    });
    res.status(200).send({
      CartItem: cartItems,
      CartTotal:await cartTotal(req)

    });
  } catch (error: any) {
    console.log("message===>", error?.message);
    next(error);
  }
};
export const addCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { UserGUID } = req.body.user;
  const { Quantity, ProductGUID } = req.body;

  if (!ProductGUID || !Quantity) {
    throw Error("ProductGUID and Quantity is required to add cart item!");
  }

  try {
    //  mutating existing item
    const item = await CartItem.findOne({
      where: {
        ProductGUID,
        CreatedGUID: UserGUID,
      },
      include: [ProductMaster],
    });
    if (item) {
      item!.Quantity += req.body.Quantity;

      if (item!.Quantity! < 0) {
        throw Error(`Cart item quantity ${item!.Quantity!} not allowed!`);
      } else if (item!.Quantity! === 0) {
        item.destroy();
        return res.status(200).send({
          message: "CartItem deleted successfully!",
          CartItem: null,
          cartTotal:await cartTotal(req)

        });
      }

      await item.save();
      
      return res.status(200).send({
        message: "CartItem updated successfully!",
        CartItem: item,
        cartTotal:await cartTotal(req)
      });
    }
    //  mutating existing item

    if (req.body.Quantity < 1) {
      throw Error("Minimum Quantity is required to add cart item!");
    }
    const cartitem = await CartItem.create({
      ...req.body,
      CreatedGUID: UserGUID,
    },
    {
      include: [ProductMaster],
    });
   
   
    res.status(200).send({
      message: "CartItem added successfully!",
      CartItem: cartitem,
      cartTotal:await cartTotal(req),
    });
  } catch (error) {
    next(error);
  }
};

const cartTotal=async(req:Request)=>{
  const { UserGUID } = req.body.user;
  const items = await CartItem.findAll({
    where: {
      CreatedGUID: {
        [Op.eq]: UserGUID,
      },
    },
    include: [ProductMaster],
  });
  const total = items.reduce((acc, item) => {
    const qty = item?.getDataValue("Quantity");
    const sale_price =
      item?.Product?.getDataValue("SaleRate") ||
      item?.Product?.getDataValue("UnitPrice") ||
      item?.Product?.getDataValue("MRP");
    return acc + qty * sale_price;
  }, 0);
  return total;
}