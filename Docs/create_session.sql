-- Fichier de requête SQL  / Session
-- Auteur : Nicolas CHALOYARD 


-- Partie 1 / création table session 
use Asimov;

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB