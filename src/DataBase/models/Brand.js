module.exports = (sequelize, dataTypes)=>{
    let alias= 'Brand';
    let cols={
        brand_id: {
            primaryKey: true,
            type: dataTypes.BIGINT(10),
            allowNull: false,
            autoIncrement:true
        },
        name_brand:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description_brand:{
            type: dataTypes.STRING(150),
            allowNull:true
        }
    }
    let config={
        timestamps: false,
        tableName: 'brands'
    }

    let Brand = sequelize.define(alias, cols, config);

    Brand.associate=(models)=>{
        Brand.hasMany(models.Product,{
            as:'products',
            foreignKey: 'brand_id'
        })
    }
    return Brand;
}