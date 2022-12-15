const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('product', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
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
       /*
    example of rate
    {
      "juan@gmail.com":5,
      "jose@gmail.com":1,
      "rosa@gmail.com":3
    }
    */ 
    rate:{
      type:DataTypes.JSON,
     
    }
  });
};
