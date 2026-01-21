// backend-auth/src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class user extends Model {
  public id!: number;
  public nombres!: string;
  public apellidos!: string;
  public alias!: string;
  public fechaNacimiento!: string;
  public password!: string;
}

user.init({
  nombres: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  alias: { type: DataTypes.STRING, allowNull: false, unique: true },
  fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'user',
  tableName:'users'
});

export default user;