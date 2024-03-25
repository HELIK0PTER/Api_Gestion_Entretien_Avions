export interface Avion {
	immatriculation: string;
	marque: string;
	modele: string;
	derniereMaintenance: Date;
	heuresDeVol?: number;
}

export interface Mecanicien {
	id?: number;
	nom: string;
	prenom: string;
}

export interface Entretien {
	id?: number;
	date: Date;
	description: string;
	immatriculation: string;
	id_mecanicien: number;
}