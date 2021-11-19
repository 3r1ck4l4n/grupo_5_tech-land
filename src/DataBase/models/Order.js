module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        order_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        amount: {
            type: dataTypes.BIGINT(20),
            allowNull: false
        }

    };
    let config = {
        timestamps: false,
        tableName: 'orders'
    };

    let Order = sequelize.define(alias, cols, config);

    Order.associate= (models)=>{
        Order.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'products'
        });

        Order.belongsToMany(models.Product,{
            through: 'order_detail',
            foreignKey: 'order_id',
            as: 'orderDetails',
            otherKey: 'product_id',
            timestamps: false,
            onUpdate: 'cascade'
        });

    }


return Order;
}