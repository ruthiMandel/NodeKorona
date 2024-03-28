import mongoose from "mongoose";
import { clientModel } from "../models/client.js"
export const getAllClient = async (req, res, next) => {
    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;
    // if(req.txt)
    try {
        let allClient = await clientModel.find({
            // $or:
            //     [{ productName: txt }]
        })
        //pagination
        res.json(allClient)
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get client" })
    }
}
export const getClientById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        // return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let client = await clientModel.findById(id);
        if (!client)
            return res.status(404).json({ type: "no id", message: "no client with such id" })
        return res.json(client)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get client" })
    }

}
export const deleteClient = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let client = await clientModel.findByIdAndDelete(id);
        if (!client)
            return res.status(404).json({ type: "no client to delete", message: "no client with such id to delete" })
        client = await clientModel.findByIdAndDelete(id)
        return res.json(client)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get client" })
    }

}
export const addClient = async (req, res) => {
    let { clientFirstName, clientLastName,dateOfBirth, phone, cellPhone,
        OutComeDisease, recoveryDisease,city,street,number ,dateGet,manufacturer,img} = req.body;
        let addres={city,street,number}
        let vaccination=[{dateGet,manufacturer}]
    if (!clientFirstName)
        return res.status(404).json({ type: "missing params", message: "missing details in body clientFirstName and clientLastName " })
    try {
        const sameClient = await clientModel.findOne({
            clientFirstName: clientFirstName,
            clientLastName: clientLastName
        });
        if (sameClient)
            return res.status(409).json({ type: "same details", message: "there is already same client" })
        let newClient = new clientModel({
            clientFirstName, clientLastName,dateOfBirth, phone, cellPhone,
            OutComeDisease, recoveryDisease,addres,vaccination,img
        });
        await newClient.save();
        return res.json(newClient)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get client" })
    }
}
export const updateClient = async (req, res) => {
    let {  clientFirstName, clientLastName,dateOfBirth, phone, cellPhone,
        OutComeDisease, recoveryDisease,city,street,number ,vaccination,img} = req.body;
        let addres={city,street,number}
    // if (!mongoose.isValidObjectId(id))
    //     return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let client = await clientModel.findById(id);
        if (!client)
            return res.status(404).json({ type: "client not found", message: "no client with such id" })
        let updated = await clientModel.findByIdAndUpdate(id,clientFirstName, clientLastName,dateOfBirth, phone, cellPhone,
            OutComeDisease, recoveryDisease,addres,vaccination,img , { new: true })

        return res.json(updated);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}

