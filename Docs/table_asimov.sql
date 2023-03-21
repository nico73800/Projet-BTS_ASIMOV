-- Fichier de requête SQL  
-- Auteur : Nicolas CHALOYARD 


-- Partie 1 / Creation BDD
DROP DATABASE IF EXISTS Asimov;
Create database Asimov;
use Asimov;

CREATE TABLE Professeur(
   idProfesseur INT auto_increment,
   nomProfesseur VARCHAR(50) NOT NULL,
   prenomProfesseur VARCHAR(50) NOT NULL,
   mailProfesseur VARCHAR(50) NOT NULL,
   estReferent boolean default false,
   estProviseur boolean NOT NULL Default false,
   password VARCHAR(1000) NOT NULL,
   PRIMARY KEY(idProfesseur),
   UNIQUE(mailProfesseur)
);

CREATE TABLE Matiere(
   idMatiere INT,
   libelle VARCHAR(50),
   PRIMARY KEY(idMatiere)
);

CREATE TABLE Section(
   idSection INT,
   libelleSection VARCHAR(50) NOT NULL,
   anneeSection VARCHAR(50),
   idProfesseur INT NOT NULL,
   PRIMARY KEY(idSection),
   UNIQUE(libelleSection),
   FOREIGN KEY(idProfesseur) REFERENCES Professeur(idProfesseur)
);

CREATE TABLE Eleve(
   idEleve INT,
   nomEleve VARCHAR(50) NOT NULL,
   prenomEleve VARCHAR(50) NOT NULL,
   mailEleve VARCHAR(50) NOT NULL,
   adresseEleve VARCHAR(50) NOT NULL,
   login VARCHAR(25),
   password VARCHAR(1000) NOT NULL,
   idSection INT NOT NULL,
   PRIMARY KEY(idEleve),
   UNIQUE(mailEleve),
   UNIQUE(login),
   FOREIGN KEY(idSection) REFERENCES Section(idSection)
);

CREATE TABLE Notes(
   idNotes INT,
   note DECIMAL(3,2) NOT NULL CHECK (note <= 100.00 AND note >= 0.00),
   idProfesseur INT NOT NULL,
   idMatiere INT NOT NULL,
   idEleve INT NOT NULL,
   PRIMARY KEY(idNotes),
   FOREIGN KEY(idProfesseur) REFERENCES Professeur(idProfesseur),
   FOREIGN KEY(idMatiere) REFERENCES Matiere(idMatiere),
   FOREIGN KEY(idEleve) REFERENCES Eleve(idEleve)
);

CREATE TABLE Prof_Matiere(
   idProfesseur INT,
   idMatiere INT,
   PRIMARY KEY(idProfesseur, idMatiere),
   FOREIGN KEY(idProfesseur) REFERENCES Professeur(idProfesseur),
   FOREIGN KEY(idMatiere) REFERENCES Matiere(idMatiere)
);


-- Partie 2 / Insertion 
INSERT INTO professeur (idProfesseur, nomProfesseur, prenomProfesseur, mailProfesseur, estReferent, estProviseur, password) VALUES ('', 'Louka', 'Lucas', 'louka.lucas@academ-gr.fr', '1', '1', SHA1('abcd'));
INSERT INTO professeur (idProfesseur, nomProfesseur, prenomProfesseur, mailProfesseur, estReferent, estProviseur, password) VALUES ('', 'lulu', 'caca', 'lulu.caca@academ-gr.fr', '0', '0', SHA1('abcd'));
