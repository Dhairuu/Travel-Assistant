import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import Trip from './Trip';
import User from '../models/User';

export interface TransportAttributes {
  transport_id: number;
  trip_id: number;
  transport_type: 'car' | 'bus' | 'train' | 'plane';
  service_provider?: string;
  vehicle_type?: string;
  booking_ref?: string;
  transport_name?: string;
  seat?: string;
  boarding_time?: string;
  departure_city?: string;
  arrival_city?: string;
  departure_date?: Date;
  arrival_date?: Date;
  created_at?: Date;
}

export interface TransportCreationAttributes extends Optional<TransportAttributes, 'transport_id' | 'service_provider' | 'vehicle_type' | 'booking_ref' | 'transport_name' | 'seat' | 'boarding_time' | 'departure_city' | 'arrival_city' | 'departure_date' | 'arrival_date' | 'created_at'> {}

class Transport extends Model<TransportAttributes, TransportCreationAttributes> implements TransportAttributes {
  public transport_id!: number;
  public trip_id!: number;
  public transport_type!: 'car' | 'bus' | 'train' | 'plane';
  public service_provider?: string;
  public vehicle_type?: string;
  public booking_ref?: string;
  public transport_name?: string;
  public seat?: string;
  public boarding_time?: string;
  public departure_city?: string;
  public arrival_city?: string;
  public departure_date?: Date;
  public arrival_date?: Date;
  public created_at?: Date;
}

Transport.init(
  {
    transport_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'trips', key: 'trip_id' },
    },
    transport_type: {
      type: DataTypes.ENUM('car', 'bus', 'train', 'plane'),
      allowNull: false,
    },
    service_provider: {
      type: DataTypes.STRING(100),
    },
    vehicle_type: {
      type: DataTypes.STRING(100),
    },
    booking_ref: {
      type: DataTypes.STRING(100),
    },
    transport_name: {
      type: DataTypes.STRING(100), // train_name, bus_name, or flight_number
    },
    seat: {
      type: DataTypes.STRING(20),
    },
    boarding_time: {
      type: DataTypes.TIME, // nullable, only for flights
    },
    departure_city: {
      type: DataTypes.STRING(100),
    },
    arrival_city: {
      type: DataTypes.STRING(100),
    },
    departure_date: {
      type: DataTypes.DATE,
    },
    arrival_date: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Transport',
    tableName: 'transports',
    timestamps: false,
  }
);

Transport.belongsTo(Trip, { foreignKey: 'trip_id' });
Trip.hasMany(Transport, { foreignKey: 'trip_id' });

export default Transport; 