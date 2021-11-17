module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_Category';
    let cols = {
        category_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true, 
            allowNull: false,            
        },
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false
        }     
    }

    let config = {
        timestamps: false,       
        tableName: 'product_categories'
    }

    const Product_Category = sequelize.define(alias, cols, config);

    
    return Product_Category;
}