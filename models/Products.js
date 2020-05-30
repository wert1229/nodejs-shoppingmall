const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    var Products = sequelize.define('Products',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            thumbnail : { type: DataTypes.STRING },
            price : { type: DataTypes.INTEGER },
            description : { type: DataTypes.TEXT }
        }
    );

    Products.associate = (models) => {
        Products.hasMany(models.ProductsMemo, {
            as: 'Memo',
            foreignKey: 'product_id',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });

        Products.belongsTo(models.User, { as :'Owner',  foreignKey: 'user_id', targetKey: 'id'} );

        // 즐겨찾기 구현
        Products.belongsToMany(models.User,{
            through: {
                model: 'LikesProducts',
                unique: false
            },
            as: 'LikeUser',
            foreignKey: 'product_id',
            sourceKey: 'id',
            constraints: false
        });

        Products.belongsToMany(models.Tag, {
            through: {
                model: 'TagProduct',
                unique: false
            },
            as: 'Tag',
            foreignKey: 'product_id',
            sourceKey: 'id',
            constraints: false
        });
    };

    Products.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')
    );

    return Products;
}