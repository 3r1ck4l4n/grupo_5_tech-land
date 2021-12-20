module.exports = (sequelize, dataTypes) => {
    let alias = 'Admin';
    let cols = {
        admin_id: {
            type: dataTypes.BIGINT(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        admin_email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        admin_full_name: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        admin_password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        admin_profile_image: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        admin_number_phone: {
            type: dataTypes.STRING(20)
        }
    };
    let config = {
        timestamps: false,
        tableName: 'admins'
    };

    let Admin = sequelize.define(alias, cols, config);

    Admin.associate = (models) => {
        Admin.belongsToMany(models.Product,{
            as: 'products',
            through: 'product_admin',
            foreignKey: 'admin_id',
            foreignKeyConstraint: true,
            otherKey: 'product_id',
            timestamps: false,
            onUpdate: 'cascade'
        });
    };

    return Admin;
};