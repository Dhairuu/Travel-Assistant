import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import Trip from './Trip';

export interface HotelAttributes {
  hotel_id: number;
  trip_id: number;
  hotel_name: string;
  city?: string;
  address?: string;
  checkin_date?: string;
  checkout_date?: string;
  booking_ref?: string;
  created_at?: Date;
}

export interface HotelCreationAttributes extends Optional<HotelAttributes, 'hotel_id' | 'city' | 'address' | 'checkin_date' | 'checkout_date' | 'booking_ref' | 'created_at'> {}

class Hotel extends Model<HotelAttributes, HotelCreationAttributes> implements HotelAttributes {
  public hotel_id!: number;
  public trip_id!: number;
  public hotel_name!: string;
  public city?: string;
  public address?: string;
  public checkin_date?: string;
  public checkout_date?: string;
  public booking_ref?: string;
  public created_at?: Date;
}

Hotel.init(
  {
    hotel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'trips', key: 'trip_id' },
    },
    hotel_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.TEXT,
    },
    checkin_date: {
      type: DataTypes.DATEONLY,
    },
    checkout_date: {
      type: DataTypes.DATEONLY,
    },
    booking_ref: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Hotel',
    tableName: 'hotels',
    timestamps: false,
  }
);

Hotel.belongsTo(Trip, { foreignKey: 'trip_id' });
Trip.hasMany(Hotel, { foreignKey: 'trip_id' });

export default Hotel; 