//********** Imports **********//
import { NextFunction, Request } from "express";
import { Avion } from "../types/types";
import { avionModel } from "../models/avionModel";

//********** Managers **********//
export const handleGetAllAvions = async (request: Request, next: NextFunction) => {
	return (await avionModel.getAll()) satisfies Avion[];
};

export const handlePostAvion = async (request: Request, next: NextFunction) => {
	try {
		const avion: Avion = {
			immatriculation: request.body.immatriculation.toString(),
			marque: request.body.marque.toString(),
			modele: request.body.modele.toString(),
			heuresDeVol: Number(request.body.heuresDeVol.toString()),
		};
		const results = await avionModel.addOne(avion);
		if (results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else {
			const avionAjoute = await avionModel.getByImmatriculation(
				avion.immatriculation
			);
			return avionAjoute;
		}
	} catch (e) {
		next(e);
	}
};

export const handleDeleteAvion = async ( request: Request, next: NextFunction
) => {
	try {
		if (request.query.immatriculation) {
			const results = await avionModel.delete(
				request.query.immatriculation.toString()
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
		if (request.query.heuresDeVol)
			params["heuresDeVol"] = Number(request.query.heuresDeVol.toString());
		
		const results = await avionModel.update(params);
		if (results.affectedRows === 0) {
			throw new Error(
				"Erreur"
			);
		} else if (params["immatriculation"]) {
			const updatedAvion = await avionModel.getByImmatriculation(
				params["immatriculation"].toString()
			);
			return updatedAvion;
		}
	} catch (e) {
		next(e);
	}
};