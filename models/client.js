import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
export const addresClient = mongoose.Schema({
city:String,
street:String,
number:Number
})
export const VaccinationDetails = mongoose.Schema({
    dateGet:String,
    manufacturer:String,
})

 export const clientSchema = mongoose.Schema({
    // userId:String,
    clientFirstName:  String ,
    clientLastName:  String ,
    addres:addresClient,
    dateOfBirth:String,
    phone:String,
    cellPhone:String,
    vaccination:[VaccinationDetails],
    OutComeDisease:String,
    img:String
})
// export const generateToken = (_id, role, userName) => {

//     let token = jwt.sign({ _id, userName, role }, process.env.SECRET_JWT, {
//         expiresIn: "1h"
//     });
//     return token;

// }
export const clientModel = mongoose.model("clients", clientSchema);
export const userValidator = (_user) => {
    const userValidationSchema = Joi.object().keys({
        clientFirstName: Joi.string().min(3).max(12).required(),
        clientLastName: Joi.string().min(3).max(12).required(),
        dateOfBirth:Joi.string(),
        phone:Joi.string(),
        cellPhone:Joi.string(),
        OutComeDisease:Joi.string(),
        img:Joi.string(),
        img:Joi.string(),

    })
    return userValidationSchema.validate(_user);
  }
