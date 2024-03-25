//********** Imports **********/
import { pool } from "./bdd";
import { Avion } from "../types/types";

//********** Model **********//
export const avionModel = {
	getAll: async () => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query("select * from Avion");
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	getByImmatriculation: async (immatriculation: string) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`select * from Avion where immatriculation = "${immatriculation}"`
			);
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	getWithFilters: async (
		params: Record<string, string | number | undefined>
	) => {
		let connection;
		try {
			connection = await pool.getConnection();
			let query = "select * from Avion where ";
			Object.keys(params).forEach((item, index) => {
				if (item === "immatriculation") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "marque") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "modele") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "heuresDeVolMin") {
					query += `heures_de_vol >= ${params[item]}`;
				}
				if (item === "heuresDeVolMax") {
					query += `heures_de_vol <= ${params[item]}`;
				}
				if (item === "derniereMaintenance") {
					query += `derniere_maintenance = "${params[item]}"`;
				}
				if (index != Object.keys(params).length - 1) {
					query += " and ";
				}
			});
			const rows = await pool.query(query);
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	addOne: async (Avion: Avion) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`insert into Avion(immatriculation, marque, modele, derniere_maintenance, heures_de_vol)
						values("${Avion.immatriculation}", "${Avion.marque}",
						"${Avion.modele}", "${Avion.derniereMaintenance}", "${Avion.heuresDeVol}");`
			);
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	delete: async (immatriculation: string) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`delete from Avion where Immatriculation = "${immatriculation}"`
			);
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	update: async (immatriculation: string, params: Record<string, string | number | undefined>) => {
		let connection;
		try {
			if (immatriculation && Object.keys(params).length > 0) {
				let query = "update Avion set ";
				
				Object.keys(params).forEach((item, index) => {
					if (item === "immatriculation") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "marque") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "modele") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "derniere_maintenance") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "heures_de_vol") {
						query += `${item} = ${params[item]}`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
				});
				query += ` where immatriculation = "${immatriculation}"`;
				connection = await pool.getConnection();
				const rows = await pool.query(query);
				
				return rows;
			}
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
};