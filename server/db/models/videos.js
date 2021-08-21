/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Videos = sequelize.define(
    'videos',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
        title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
        description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
        pub_datetime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
      tableName: 'videos',
      timestamps: false,

    }
  );
  return Videos;
};
