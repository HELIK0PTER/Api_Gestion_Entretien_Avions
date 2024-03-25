-- Création de la base de données api-avions
CREATE DATABASE IF NOT EXISTS `api-avions`;
USE `api-avions`;

-- Création de la table Avion
CREATE TABLE Avion (
    Immatriculation VARCHAR(10) PRIMARY KEY,
    Marque VARCHAR(100),
    Modele VARCHAR(100),
    Heures_de_Vol INT,
    Derniere_Maintenance DATE
);

-- Création de la table Mecanicien
CREATE TABLE Mecanicien (
    Id_Mecanicien INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100),
    Prenom VARCHAR(100)
);

-- Création de la table Entretien
CREATE TABLE Entretien (
    Id_Maintenance INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE,
    Description VARCHAR(100),
    Immatriculation VARCHAR(10),
    Id_Mecanicien INT,
    FOREIGN KEY (Immatriculation) REFERENCES Avion(Immatriculation),
    FOREIGN KEY (Id_Mecanicien) REFERENCES Mecanicien(Id_Mecanicien)
);

-- Insertion de données d'exemple dans la table Avion
INSERT INTO Avion (Immatriculation, Marque, Modele, Heures_de_Vol, Derniere_Maintenance) VALUES
('AB123', 'Airbus', 'A320', 5000, '2021-05-01'),
('CD456', 'Boeing', '737', 7600, '2021-06-15');

-- Insertion de données d'exemple dans la table Mecanicien
INSERT INTO Mecanicien (Nom, Prenom) VALUES
('Dupont', 'Jean'),
('Martin', 'Alice');

-- Insertion de données d'exemple dans la table Entretien
INSERT INTO Entretien (Date, Description, Immatriculation, Id_Mecanicien) VALUES
('2022-07-10', 'Révision annuelle', 'AB123', 1),
('2022-08-20', 'Maintenance d''urgence', 'CD456', 2);