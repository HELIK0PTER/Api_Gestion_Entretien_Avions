//********** Imports **********/
import { pool } from "./bdd";
import { Mecanicien } from "../types/types";

//********** Model **********//
export const mecanicienModel = {
	getAll: async () => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query("select * from Mecanicien");
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
			const rows = await pool.query("select * from Mecanicien order by id_mecanicien desc limit 1");
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
				`select * from Mecanicien where id_mecanicien = "${id}"`
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
			let query = "select * from Mecanicien where ";
			Object.keys(params).forEach((item, index) => {
				if (item === "id") {
					query += `id_mecanicien = "${params[item]}"`;
				}
				if (item === "nom") {
					query += `${item} = "${params[item]}"`;
				}
				if (item === "prenom") {
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
	
	addOne: async (Mecanicien: Mecanicien) => {
		let connection;
		try {
			connection = await pool.getConnection();
			const rows = await pool.query(
				`insert into Mecanicien(nom, prenom)
						values("${Mecanicien.nom}", "${Mecanicien.prenom}") ;`
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
				`delete from Mecanicien where id_mecanicien = "${id}"`
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
				let query = "update Mecanicien set ";
				
				Object.keys(params).forEach((item, index) => {
					if (item === "nom") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
					if (item === "prenom") {
						query += `${item} = "${params[item]}"`;
						if (index != Object.keys(params).length - 1) {
							query += ", ";
						}
					}
				});
				query += ` where id_mecanicien = "${id}"`;
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