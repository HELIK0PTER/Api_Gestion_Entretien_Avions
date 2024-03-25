//********** Imports **********/
import { pool } from "./bdd";
import { Entretien } from "../types/types";

//********** Model **********//
export const entretienModel = {
	getAll: async () => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query("select * from Entretien ");
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	getLastRow: async () => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query("select * from Entretien order by id_maintenance desc limit 1 ");
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	getById: async (id: string) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`select * from Entretien where id_maintenance = "${id}" `
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
			let query = "select * from Entretien where ";
			Object.keys(params).forEach((item, index) => {
				if (item === "id") {
					query += `id_maintenance = "${params[item]}"`;
				}
				if (item === "date") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "description") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "immatriculation") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "id_mecanicien") {
					query += `${item} = "${params[item]}"`;
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
	
	addOne: async (Entretien: Entretien) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`insert into Entretien(date, description, immatriculation, id_mecanicien)
						values("${Entretien.date}", "${Entretien.description}",
						       "${Entretien.immatriculation}", "${Entretien.id_mecanicien}") ;`
			);
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	delete: async (id: string) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`delete from Entretien where id_maintenance = "${id}"`
			);
			return rows;
		} catch (error) {
			return error;
		} finally {
			if (connection) connection.release();
		}
	},
	
	update: async (id: string, params: Record<string, string | number | undefined>) => {
		let connection;
		try {
			if (id && Object.keys(params).length > 0) {
				let query = "update Entretien set ";
				
				Object.keys(params).forEach((item, index) => {
					if (item === "date") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "description") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "immatriculation") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "id_mecanicien") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
				});
				query += ` where id_maintenance = "${id}"`;
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