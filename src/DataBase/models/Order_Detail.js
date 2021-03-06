module.exports = (sequelize, dataTypes) => {
    let alias = 'Order_Detail';
    let cols = {
        order_detail_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true, 
            allowNull: false,
            autoIncrement: true
        },
        order_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,            
            allowNull: true
        },
        customer_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false
        },
        unity_price: {
            type: dataTypes.BIGINT(10),            
            allowNull: false
        },
        quantity: {
            type: dataTypes.BIGINT(10),            
            allowNull: false
        },
        total_price: {
            type: dataTypes.BIGINT(10),            
            allowNull: false
        }
    }

    let config = {
        timestamps: false,       
        tableName: 'order_detail'
    }
    
    const Order_Detail = sequelize.define(alias, cols, config);
    
    Order_Detail.associate = (models) => {
        Order_Detail.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'products'
        });
    }
    

    return Order_Detail;
}