module.exports = (sequelize, dataTypes) => {
    let alias = 'TypeComponent';
    let cols = {
        type_component_id: {
            primaryKey: true,
            type: dataTypes.BIGINT(10),
            autoIncrement: true
        },
        name_type_component: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description_type_component: {
            type: dataTypes.STRING(150),
            allowNull: true
        }
    }
    let config = {
        timestamps: false,
        tableName: 'type_component'
    }

    let TypeComponent = sequelize.define(alias, cols, config);

    TypeComponent.associate = (models) => {
        TypeComponent.belongsToMany(models.Product,{
            as: 'products',
            through: 'product_type_component',
            foreignKey: 'type_component_id',
            otherKey: 'product_id',
            timestamps: false,
            onUpdate: 'cascade'
        });
    };

    return TypeComponent;
}