//********** Imports **********//
import {NextFunction, Request} from "express";
import {Entretien} from "../types/types";
import {entretienModel} from "../models/entretienModel";

//********** Managers **********//
export const handleGetAllEntretiens = async (request: Request, next: NextFunction) => {
	return (await entretienModel.getAll()) satisfies Entretien[];
};

export const handleGetEntretienById = async (request: Request, next: NextFunction) => {
	if (request.params.id) {
		return (await entretienModel.getById(request.params.id.toString())) satisfies Entretien;
	}
};

export const handleGetWithFilters = async (request: Request, next: NextFunction) => {
	const params: Record<string, string | number | undefined> = {};
	if (request.query.id)
		params["id"] = request.query.id.toString();
	if (request.query.date)
		params["date"] = request.query.date.toString();
	if (request.query.description)
		params["description"] = request.query.description.toString();
	if (request.query.immatriculation)
		params["immatriculation"] = request.query.immatriculation.toString();
	if (request.query.id_mecanicien)
		params["id_mecanicien"] = request.query.id_mecanicien.toString();
	return (await entretienModel.getWithFilters(params)) satisfies Entretien[];
};

export const handlePostEntretien = async (request: Request, next: NextFunction) => {
	try {
		const entretien: Entretien = {
			date: request.body.date.toString(),
			description: request.body.description.toString(),
			immatriculation: request.body.immatriculation.toString(),
			id_mecanicien: request.body.id_mecanicien.toString(),
		};
		const results = await entretienModel.addOne(entretien);
		if (results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else {
			const entretienAjoute = await entretienModel.getLastRow();
			return entretienAjoute;
		}
	} catch (e) {
		next(e);
	}
};

export const handleDeleteEntretien = async ( request: Request, next: NextFunction
) => {
	try {
		if (request.params.id) {
			const results = await entretienModel.delete(
				request.params.id.toString()
			);
			
			if (results.affectedRows === 0) {
				throw new Error(
					"Erreur"
				);
			}
			const affectedRows = JSON.stringify({
				entretienSupprime: results.affectedRows,
			});
			return JSON.parse(affectedRows);
		}
	} catch (e) {
		next(e);
	}
};

export const handlePutEntretien = async (request: Request, next: NextFunction) => {
	try {
		const params: Record<string, string | number | undefined> = {};
		if (request.query.date)
			params["date"] = request.query.date.toString();
		if (request.query.description)
			params["description"] = request.query.description.toString();
		if (request.query.immatriculation)
			params["immatriculation"] = request.query.immatriculation.toString();
		if (request.query.id_mecanicien)
			params["id_mecanicien"] = request.query.id_mecanicien.toString();
		
		const results = await entretienModel.update(request.params.id,params);
		if (results && results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else if (request.params.id) {
			return await entretienModel.getById(
				request.params.id.toString()
			);
		} else {
		
		}
	} catch (e) {
		next(e);
	}
};