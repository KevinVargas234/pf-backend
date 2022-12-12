const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    /*
    example of stock
    {
      "xxl":10,
      "s":15,
      "10":3
    }
    */ 
    stock:{
        type:DataTypes.JSON,
        allowNull:false
    },
  });
};
