import express, { NextFunction, Request, Response } from "express";
import { Avion } from "../../types/types";
import { handleGetAllAvions, handlePostAvion, handleDeleteAvion } from "../../handlers/avionHandler";

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

// POST - Créer un nouvel avion
router.post("/", async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
	try {
		const newAvion = await handlePostAvion(request, next);
		response.status(201).json(newAvion);
	} catch (error) {
		next(error);
	}
});

// DELETE - Supprimer un avion par son ID
router.delete("/:id", async (request: Request, response: Response<string>, next: NextFunction) => {
	try {
		await handleDeleteAvion(request, next);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

export default router;