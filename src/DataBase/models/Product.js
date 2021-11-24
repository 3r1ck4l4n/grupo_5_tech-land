module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
        Product.belongsToMany(models.Category, {
            as: 'categories',
            through: 'product_categories',
            foreignKey: 'product_id',
            foreignKeyConstraint: true,
            otherKey: 'category_id',
            timestamps: false,
            onUpdate: 'cascade'
        });

        Product.belongsTo(models.Brand, {
            foreignKey: 'brand_id',
            as: 'brands'
        });

        Product.hasMany(models.Review,{
            foreignKey: 'product_id',
            as:'reviews'
        });

        Product.belongsToMany(models.TypeComponent, {
            as: 'typeComponent',
            through: 'product_type_component',
            foreignKey: 'product_id',
            otherKey: 'type_component_id',
            timestamps: false,
            onUpdate: 'cascade'
        });

        Product.belongsToMany(models.Order, {
            through: 'order_detail',
            foreignKey: 'product_id',
            as: 'orderDetails',
            otherKey: 'order_id',
            timestamps: false,
            onUpdate: 'cascade'
        });


        Product.belongsToMany(models.Admin, {
            as: 'products',
            through: 'product_admin',
            foreignKey: 'product_id',
            foreignKeyConstraint: true,
            otherKey: 'admin_id',
            timestamps: false,
            onUpdate: 'cascade'
        });
    }

    return Product;
}