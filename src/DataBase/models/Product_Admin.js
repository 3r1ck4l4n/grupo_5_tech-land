module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_Admin';
    let cols = {
        product_edit_admin: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true, 
            allowNull: false,            
        },
        admin_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false
        },
        date_action: {
            type: dataTypes.DATE,
            primaryKey: true,
            allowNull: false
        },
        action_description: {
            type: dataTypes.STRING,            
            allowNull: false
        }
    }

    let config = {
        timestamps: false,       
        tableName: 'product_admin'
    }

    const Product_Admin = sequelize.define(alias, cols, config);

    

    return Product_Admin;
}