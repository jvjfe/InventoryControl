import express from "express";
import createUser from "../user/createUser.js";
import { getUsers, getUserById } from "../user/getUser.js";
import updateUser from "../user/updateUser.js";
import deleteUser from "../user/deleteUser.js";

const router = express.Router();

export default function userRoutes(prisma) {
    router.post('/', (req, res) => createUser(req, res, prisma));
    router.get('/', (req, res) => getUsers(req, res, prisma));
    router.get('/:id', (req, res) => getUserById(req, res, prisma));
    router.put('/:id', (req, res) => updateUser(req, res, prisma));
    router.delete('/:id', (req, res) => deleteUser(req, res, prisma));

    return router;
}
