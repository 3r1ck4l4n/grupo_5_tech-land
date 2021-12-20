module.exports = (sequelize, dataTypes) => {
    let alias = 'Customer';
    let cols = {
        customer_id:{
            primaryKey:true,
            allowNull:false,
            type: dataTypes.BIGINT(10),
            autoIncrement:true
        },
        email:{
            allowNull: false,
            type: dataTypes.STRING(50)
        },
        passwd:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        full_name:{
            type: dataTypes.STRING(60),
            allowNull: false
        },
        address:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        customer_profile_image:{
            type: dataTypes.STRING(150),
            allowNull: false
        },
        customer_number_phone:{
            allowNull:true,
            type: dataTypes.STRING(20)
        },
        nationality:{
            type: dataTypes.STRING(40),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'customers'
    };

    let Customer = sequelize.define(alias, cols, config);

    Customer.associate=(models)=>{
        Customer.hasMany(models.Order,{
            as:"orders",
            foreignKey: "customer_id"
        });

        Customer.hasMany(models.Review,{
            as:"review",
            foreignKey: "customer_id"
        });

    };
    return Customer;
};