module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_Type_Component';
    let cols = {
        
        type_component_id: {
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
        tableName: 'product_type_component'
    }

    const Product_Type_Component = sequelize.define(alias, cols, config);

    
    return Product_Type_Component;
}