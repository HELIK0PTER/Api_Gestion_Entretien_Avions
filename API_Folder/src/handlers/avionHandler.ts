//********** Imports **********//
import {NextFunction, Request} from "express";
import {Avion} from "../types/types";
import {avionModel} from "../models/avionModel";

//********** Managers **********//
export const handleGetAllAvions = async (request: Request, next: NextFunction) => {
	return (await avionModel.getAll()) satisfies Avion[];
};

export const handleGetAvionByImmatriculation = async (request: Request, next: NextFunction) => {
	if (request.params.immatriculation) {
		return (await avionModel.getByImmatriculation(request.params.immatriculation)) satisfies Avion;
	}
};

export const handleGetWithFilters = async (request: Request, next: NextFunction) => {
	const params: Record<string, string | number | undefined> = {};
	if (request.query.immatriculation)
		params["immatriculation"] = request.query.immatriculation.toString();
	if (request.query.marque)
		params["marque"] = request.query.marque.toString();
	if (request.query.modele)
		params["modele"] = request.query.modele.toString();
	if (request.query.heuresDeVolMin)
		params["heuresDeVolMin"] = request.query.heuresDeVolMin.toString();
	if (request.query.heuresDeVolMax)
		params["heuresDeVolMax"] = request.query.heuresDeVolMax.toString();
	if (request.query.derniereMaintenance)
		params["derniereMaintenance"] = request.query.derniereMaintenance.toString();
	return (await avionModel.getWithFilters(params)) satisfies Avion[];
};

export const handlePostAvion = async (request: Request, next: NextFunction) => {
	try {
		const avion: Avion = {
			immatriculation: request.body.immatriculation.toString(),
			marque: request.body.marque.toString(),
			modele: request.body.modele.toString(),
			derniereMaintenance: request.body.derniereMaintenance.toString(),
			heuresDeVol: request.body.heuresDeVol.toString(),
		};
		const results = await avionModel.addOne(avion);
		if (results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else {
			const avionAjoute = await avionModel.getByImmatriculation(avion.immatriculation);
			return avionAjoute;
		}
	} catch (e) {
		next(e);
	}
};

export const handleDeleteAvion = async ( request: Request, next: NextFunction
) => {
	try {
		if (request.params.immatriculation) {
			const results = await avionModel.delete(
				request.params.immatriculation.toString()
			);
			
			if (results.affectedRows === 0) {
				throw new Error(
					"Erreur"
				);
			}
			const affectedRows = JSON.stringify({
				avionSupprime: results.affectedRows,
			});
			return JSON.parse(affectedRows);
		}
	} catch (e) {
		next(e);
	}
};

export const handlePutAvion = async (request: Request, next: NextFunction) => {
	try {
		const params: Record<string, string | number | undefined> = {};
		if (request.query.immatriculation)
			params["immatriculation"] = request.query.immatriculation.toString();
		if (request.query.marque)
			params["marque"] = request.query.marque.toString();
		if (request.query.modele)
			params["modele"] = request.query.modele.toString();
		if (request.query.derniereMaintenance)
			params["derniere_maintenance"] = request.query.derniereMaintenance.toString();
		if (request.query.heuresDeVol)
			params["heures_de_vol"] = request.query.heuresDeVol.toString();
		
		const results = await avionModel.update(request.params.immatriculation,params);
		if (results && results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else if (request.params.immatriculation) {
			return await avionModel.getByImmatriculation(
				request.params.immatriculation.toString()
			);
		} else {
		
		}
	} catch (e) {
		next(e);
	}
};