module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Transaction', {
    name: {
      type: DataTypes.STRING(255),
    },
    amount: {
      type: DataTypes.FLOAT
    }
  }, {
    tableName: 'transactions',
    timestamps: false
  });

  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: 'user_id'});
  }

  return model
}