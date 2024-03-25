export interface Avion {
	immatriculation: string;
	marque: string;
	modele: string;
	heuresDeVol?: number;
}

export interface Pilote {
	idPilote: number;
	nom: string;
	prenom: string;
	licence: string;
	heuresDeVol: number;
}

export interface Vol {
	idVol: number;
	immatriculationAvion: string;
	idPilote: number;
	dateDepart: Date;
	dateArrivee: Date;
	destination: string;
	origine: string;
}
