import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Gadget = sequelize.define('Gadget', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    allowNull: false,
     defaultValue: 'Available'
  }
}, { timestamps: true });

export default Gadget;
