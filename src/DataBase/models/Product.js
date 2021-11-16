module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name_product: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        stock: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        availability: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        image_product: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        brand_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
    }

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'update_at',
        deletedAt: false,
        tableName: 'products'
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsToMany(models.Category,{
            as:'categories',
            through: 'product_categories',
            foreignKey:'product_id',
            otherKey:'category_id',
            timestamps: false,
            onUpdate: 'cascade'
        });
    }

    return Product;
}