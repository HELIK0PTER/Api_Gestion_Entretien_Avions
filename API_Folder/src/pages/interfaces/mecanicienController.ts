import express, { NextFunction, Request, Response } from "express";
import { Mecanicien } from "../../types/types";
import {
	handleGetAllMecaniciens,
	handlePostMecanicien,
	handleDeleteMecanicien,
	handlePutMecanicien,
	handleGetWithFilters,
	handleGetMecanicienById,
} from "../../handlers/mecanicienHandler";

const router = express.Router();
// redirige en fonction des endpoints

// GET - Récupérer tous les mecaniciens
router.get("", async (request: Request, response: Response<Mecanicien[] | string>, next: NextFunction) => {
	try {
		response.status(200).json(await handleGetAllMecaniciens(request, next));
	} catch (error) {
		next(error);
	}
});

// GET - Récupérer un mecanicien avec des filtres
router.get("/recherche", async (request: Request, response: Response<Mecanicien[] | string>, next: NextFunction) => {
	try {
		response.status(200).json(await handleGetWithFilters(request, next));
	} catch (error) {
		next(error);
	}
});

// GET - Récupérer un mecanicien par son id
router.get("/:id", async (request: Request, response: Response<Mecanicien | string>, next: NextFunction) => {
	try {
		const mecanicien = await handleGetMecanicienById(request, next);
		response.status(200).json(mecanicien);
	} catch (error) {
		next(error);
	}
});

// POST - Créer un nouveau mecanicien
router.post("", async (request: Request, response: Response<Mecanicien | string>, next: NextFunction) => {
	try {
		const newMecanicien = await handlePostMecanicien(request, next);
		response.status(201).json(newMecanicien);
	} catch (error) {
		next(error);
	}
});

// PUT - Mettre à jour un mecanicien par son id
router.put("/:id", async (request: Request, response: Response<Mecanicien | string>, next: NextFunction) => {
	try {
		const updatedMecanicien = await handlePutMecanicien(request, next);
		response.status(200).json(updatedMecanicien);
	} catch (error) {
		next(error);
	}
});

// DELETE - Supprimer un mecanicien par son id
router.delete("/:id", async (request: Request, response: Response<string>, next: NextFunction) => {
	try {
		await handleDeleteMecanicien(request, next);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

export default router;