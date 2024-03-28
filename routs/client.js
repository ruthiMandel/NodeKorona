import express from "express";
import { addClient, getAllClient,deleteClient, updateClient,getClientById } from "../controllers/client.js";
const router = express.Router();

router.get("/", getAllClient);
router.get("/:id", getClientById);
router.delete("/:id", deleteClient);
router.post("/", addClient);
router.put("/:id", updateClient);
export default router;