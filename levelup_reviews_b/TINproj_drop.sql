-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-01-10 22:09:28.865

-- foreign keys
ALTER TABLE Recenzja
    DROP FOREIGN KEY Table_3_Gra;

ALTER TABLE Recenzja
    DROP FOREIGN KEY Table_3_Uzytkownik;

-- tables
DROP TABLE Gra;

DROP TABLE Recenzja;

DROP TABLE Uzytkownik;

-- End of file.

