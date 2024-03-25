import express, { NextFunction, Request, Response } from "express";
import { Avion } from "../../types/types";
import {
	handleGetAllAvions,
	handlePostAvion,
	handleDeleteAvion,
	handlePutAvion,
	handleGetWithFilters,
	handleGetAvionByImmatriculation,
} from "../../handlers/avionHandler";

const router = express.Router();
// redirige en fonction des endpoints

// GET - Récupérer tous les avions
router.get("", async (request: Request, response: Response<Avion[] | string>, next: NextFunction) => {
	try {
		response.status(200).json(await handleGetAllAvions(request, next));
	} catch (error) {
		next(error);
	}
});

// GET - Récupérer un avion avec des filtres
router.get("/recherche", async (request: Request, response: Response<Avion[] | string>, next: NextFunction) => {
	try {
		response.status(200).json(await handleGetWithFilters(request, next));
	} catch (error) {
		next(error);
	}
});

// GET - Récupérer un avion par son immatriculation
router.get("/:immatriculation", async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
	try {
		const avion = await handleGetAvionByImmatriculation(request, next);
		response.status(200).json(avion);
	} catch (error) {
		next(error);
	}
});

// POST - Créer un nouvel avion
router.post("", async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
	try {
		const newAvion = await handlePostAvion(request, next);
		response.status(201).json(newAvion);
	} catch (error) {
		next(error);
	}
});

// PUT - Mettre à jour un avion par son immatriculation
router.put("/:immatriculation", async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
	try {
		const updatedAvion = await handlePutAvion(request, next);
		response.status(200).json(updatedAvion);
	} catch (error) {
		next(error);
	}
});

// DELETE - Supprimer un avion par son immatriculation
router.delete("/:immatriculation", async (request: Request, response: Response<string>, next: NextFunction) => {
	try {
		await handleDeleteAvion(request, next);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

export default router;