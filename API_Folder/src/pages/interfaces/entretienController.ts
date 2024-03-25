import express, { NextFunction, Request, Response } from "express";
import { Entretien } from "../../types/types";
import {
	handleGetAllEntretiens,
	handlePostEntretien,
	handleDeleteEntretien,
	handlePutEntretien,
	handleGetWithFilters,
	handleGetEntretienById,
} from "../../handlers/entretienHandler";

const router = express.Router();
// redirige en fonction des endpoints

// GET - Récupérer tous les entretiens
router.get("", async (request: Request, response: Response<Entretien[] | string>, next: NextFunction) => {
	try {
		response.status(200).json(await handleGetAllEntretiens(request, next));
	} catch (error) {
		next(error);
	}
});

// GET - Récupérer un entretien avec des filtres
router.get("/recherche", async (request: Request, response: Response<Entretien[] | string>, next: NextFunction) => {
	try {
		response.status(200).json(await handleGetWithFilters(request, next));
	} catch (error) {
		next(error);
	}
});

// GET - Récupérer un entretien par son id
router.get("/:id", async (request: Request, response: Response<Entretien | string>, next: NextFunction) => {
	try {
		const entretien = await handleGetEntretienById(request, next);
		response.status(200).json(entretien);
	} catch (error) {
		next(error);
	}
});

// POST - Créer un nouveau entretien
router.post("", async (request: Request, response: Response<Entretien | string>, next: NextFunction) => {
	try {
		const newEntretien = await handlePostEntretien(request, next);
		response.status(201).json(newEntretien);
	} catch (error) {
		next(error);
	}
});

// PUT - Mettre à jour un entretien par son id
router.put("/:id", async (request: Request, response: Response<Entretien | string>, next: NextFunction) => {
	try {
		const updatedEntretien = await handlePutEntretien(request, next);
		response.status(200).json(updatedEntretien);
	} catch (error) {
		next(error);
	}
});

// DELETE - Supprimer un entretien par son id
router.delete("/:id", async (request: Request, response: Response<string>, next: NextFunction) => {
	try {
		await handleDeleteEntretien(request, next);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

export default router;