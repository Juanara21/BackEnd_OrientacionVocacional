import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bd_orientacion','root','Juanaraujo21',{
    host: 'localhost',
    dialect:'mysql',
    
});

export default sequelize;