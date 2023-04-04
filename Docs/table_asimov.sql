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
   idMatiere INT auto_increment,
   libelle VARCHAR(50),
   PRIMARY KEY(idMatiere)
);

CREATE TABLE Section(
   idSection INT auto_increment,
   libelleSection VARCHAR(50) NOT NULL,
   anneeSection VARCHAR(50),
   idProfesseur INT NOT NULL,
   PRIMARY KEY(idSection),
   UNIQUE(libelleSection),
   FOREIGN KEY(idProfesseur) REFERENCES Professeur(idProfesseur)
);

CREATE TABLE Eleve(
   idEleve INT auto_increment,
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
   idNotes INT auto_increment,
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
INSERT INTO professeur (nomProfesseur, prenomProfesseur, mailProfesseur, estReferent, estProviseur, password) VALUES ('Louka', 'Lucas', 'louka.lucas@academ-gr.fr', '1', '1', SHA1('abcd'));

INSERT INTO professeur (nomProfesseur, prenomProfesseur, mailProfesseur, estReferent, estProviseur, password) VALUES ('lulu', 'caca', 'lulu.caca@academ-gr.fr', '0', '0', SHA1('abcd'));

INSERT INTO Section (libelleSection, anneeSection, idProfesseur) VALUES("1ere STMG", "2020", 1);

INSERT INTO Section (libelleSection, anneeSection, idProfesseur) VALUES("Term STMG", "2020", 1);

INSERT INTO Section (libelleSection, anneeSection, idProfesseur) VALUES("1ere Spé LLCER", "2023", 1);

INSERT INTO Section (libelleSection, anneeSection, idProfesseur) VALUES("2nd G", "2023", 1);

INSERT INTO Eleve (idEleve, nomEleve, prenomEleve, mailEleve, adresseEleve, login, password, idSection) VALUES (NULL, 'bobi', 'boba', 'bobi.boba@mail.com', '1 rue des licornes, 12345 LicorneVille', 'bobib', SHA1('abcd'), '1');

INSERT INTO Eleve (idEleve, nomEleve, prenomEleve, mailEleve, adresseEleve, login, password, idSection) VALUES (NULL, 'allé', 'mot', 'allé.motboba@mail.com', '1 rue des mot, 12345 motVille', 'allém', SHA1('abcd'), '1');

INSERT INTO Matiere (idMatiere, libelle) VALUES (NULL, "Français");

INSERT INTO Matiere (idMatiere, libelle) VALUES (NULL, "Anglais");

INSERT INTO Matiere (idMatiere, libelle) VALUES (NULL, "Allemand");

INSERT INTO Matiere (idMatiere, libelle) VALUES (NULL, "Mathématiques");

INSERT INTO Prof_Matiere VALUES(1, 3);

INSERT INTO Prof_Matiere VALUES (2, 1);
