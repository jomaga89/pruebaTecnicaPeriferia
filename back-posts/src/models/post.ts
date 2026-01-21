import { DataTypes, Model } from "sequelize";
import sequelize from "../../../back-auth/src/database.js";

class post extends Model {
  public id!: number;
  public mensaje!: string;
  public autorAlias!: string;
  public likes!: number;
  public readonly createdAt!: Date;
}

post.init(
  {
    mensaje: { type: DataTypes.TEXT, allowNull: false },
    autorAlias: { type: DataTypes.STRING, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: "post",
  },
);

export default post;
