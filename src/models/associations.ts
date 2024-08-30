import {User} from './user';
import {Career} from './career';
import {Question} from './question';
import {Answer} from './answer';

// Relación entre Question y Career
   
Question.belongsTo(Career);
Career.hasMany(Question);

Question.belongsTo(Career, { foreignKey: 'CareerId' });
Career.hasMany(Question, { foreignKey: 'CareerId' });

Answer.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Answer, { foreignKey: 'UserId' });

Answer.belongsTo(Question, { foreignKey: 'QuestionId' });
Question.hasMany(Answer, { foreignKey: 'QuestionId' });


export { User, Career, Question, Answer };
