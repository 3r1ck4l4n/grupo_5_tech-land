module.exports = (sequelize, dataTypes) => {
    let alias = 'Order_Detail';
    let cols = {
        order_detail_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true, 
            allowNull: false,            
        },
        order_id: {
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

    

    return Order_Detail;
}