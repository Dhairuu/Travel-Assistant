import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import User from './User';

export interface TripAttributes {
  trip_id: number;
  user_id: number;
  destination: string;
  start_date: string;
  end_date: string;
  group_size?: number;
  is_completed?: boolean;
  created_at?: Date;
}

export interface TripCreationAttributes extends Optional<TripAttributes, 'trip_id' | 'is_completed' | 'created_at'> {}

class Trip extends Model<TripAttributes, TripCreationAttributes> implements TripAttributes {
  public trip_id!: number;
  public user_id!: number;
  public destination!: string;
  public start_date!: string;
  public end_date!: string;
  public group_size?: number;
  public is_completed?: boolean;
  public created_at?: Date;
}

Trip.init(
  {
    trip_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'user_id' },
    },
    destination: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    group_size: {
      type: DataTypes.INTEGER,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    timestamps: false,
  }
);

Trip.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Trip, { foreignKey: 'user_id' });

export default Trip; 