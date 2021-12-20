module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        category_id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        name_category: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description_category: {
            type: dataTypes.STRING(150),
            allowNull: true
        }

    }

    let config = {
        timestamps: false,
        tableName: 'categories'
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.belongsToMany(models.Product, {
            as: 'products',
            through: 'product_categories',
            foreignKey: 'category_id',
            otherKey: 'product_id',
            timestamps: false,
            onUpdate: 'cascade'
        });
    }


    return Category;
};
