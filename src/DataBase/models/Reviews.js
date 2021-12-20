module.exports = (sequelize, dataTypes) => {
    let alias = 'Review';
    let cols = {
        customer_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false,
            primaryKey: true
        },
        product_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false,
            primaryKey: true
        },
        review_description: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        score: {
            type: dataTypes.BIGINT(5),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'reviews'
    }

    const Review = sequelize.define(alias, cols, config);

    Review.associate= (models)=>{

        Review.belongsTo(models.Product,{
            foreignKey: 'product_id',
            as:'product'
        });

        Review.belongsTo(models.Customer,{
            foreignKey: 'customer_id',
            as:'customer'
        });


    }

    return Review;
}