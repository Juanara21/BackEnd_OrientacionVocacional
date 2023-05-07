 import express,  { Application } from 'express';
 import routesUser from '../routes/user';
 import routesQuestion from '../routes/question';
 import routesCareer from '../routes/career';
 import routesAnswer from '../routes/answer';
 import routesSesion from '../routes/sesion';
import sequelize from '../db/connection';
import  cors  from "cors";
import  { Answer, Career, Question, User }  from './user';


 class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express(); 
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewaires();
        this.routes();
        this.dbConnect();
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Aplicacion corriendo en el puerto '+this.port);
        })
    }

    routes(){
        this.app.use('/api/answer', routesAnswer);
        this.app.use('/api/career', routesCareer);
        this.app.use('/api/question', routesQuestion);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/sesion', routesSesion);
        
    }

    midlewaires(){
        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await Career.sync();
            await User.sync();
            await Question.sync();
            await Answer.sync();
            
            

        }catch(error){
            console.log('Problem connecting to the database ' , error);
        }
    }

}

export default Server;