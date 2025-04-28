import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import Trip from './Trip';

export interface ActivityAttributes {
  activity_id: number;
  trip_id: number;
  activity_name: string;
  activity_description?: string;
  activity_datetime: Date;
  pickup_location?: string;
  is_completed?: boolean;
  created_at?: Date;
}

export interface ActivityCreationAttributes extends Optional<ActivityAttributes, 'activity_id' | 'activity_description' | 'pickup_location' | 'is_completed' | 'created_at'> {}

class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
  public activity_id!: number;
  public trip_id!: number;
  public activity_name!: string;
  public activity_description?: string;
  public activity_datetime!: Date;
  public pickup_location?: string;
  public is_completed?: boolean;
  public created_at?: Date;
}

Activity.init(
  {
    activity_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'trips', key: 'trip_id' },
    },
    activity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    activity_description: {
      type: DataTypes.TEXT,
    },
    activity_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pickup_location: {
      type: DataTypes.STRING(255),
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
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: false,
  }
);

Activity.belongsTo(Trip, { foreignKey: 'trip_id' });
Trip.hasMany(Activity, { foreignKey: 'trip_id' });

export default Activity; 