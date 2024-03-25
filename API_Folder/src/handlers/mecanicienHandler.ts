//********** Imports **********//
import {NextFunction, Request} from "express";
import {Mecanicien} from "../types/types";
import {mecanicienModel} from "../models/mecanicienModel";

//********** Managers **********//
export const handleGetAllMecaniciens = async (request: Request, next: NextFunction) => {
	return (await mecanicienModel.getAll()) satisfies Mecanicien[];
};

export const handleGetMecanicienById = async (request: Request, next: NextFunction) => {
	if (request.params.id) {
		return (await mecanicienModel.getById(request.params.id.toString())) satisfies Mecanicien;
	}
};

export const handleGetWithFilters = async (request: Request, next: NextFunction) => {
	const params: Record<string, string | number | undefined> = {};
	if (request.query.id)
		params["id"] = request.query.id.toString();
	if (request.query.nom)
		params["nom"] = request.query.nom.toString();
	if (request.query.prenom)
		params["prenom"] = request.query.prenom.toString();
	return (await mecanicienModel.getWithFilters(params)) satisfies Mecanicien[];
};

export const handlePostMecanicien = async (request: Request, next: NextFunction) => {
	try {
		const mecanicien: Mecanicien = {
			nom: request.body.nom.toString(),
			prenom: request.body.prenom.toString(),
		};
		const results = await mecanicienModel.addOne(mecanicien);
		if (results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else {
			const mecanicienAjoute = await mecanicienModel.getLastRow();
			return mecanicienAjoute;
		}
	} catch (e) {
		next(e);
	}
};

export const handleDeleteMecanicien = async ( request: Request, next: NextFunction
) => {
	try {
		if (request.params.id) {
			const results = await mecanicienModel.delete(
				request.params.id.toString()
			);
			
			if (results.affectedRows === 0) {
				throw new Error(
					"Erreur"
				);
			}
			const affectedRows = JSON.stringify({
				mecanicienSupprime: results.affectedRows,
			});
			return JSON.parse(affectedRows);
		}
	} catch (e) {
		next(e);
	}
};

export const handlePutMecanicien = async (request: Request, next: NextFunction) => {
	try {
		const params: Record<string, string | number | undefined> = {};
		if (request.query.nom)
			params["nom"] = request.query.nom.toString();
		if (request.query.prenom)
			params["prenom"] = request.query.prenom.toString();
		
		const results = await mecanicienModel.update(request.params.id,params);
		if (results && results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else if (request.params.id) {
			return await mecanicienModel.getById(
				request.params.id.toString()
			);
		} else {
		
		}
	} catch (e) {
		next(e);
	}
};