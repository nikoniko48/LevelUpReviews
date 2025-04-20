CREATE TABLE Gra (
                     id INT NOT NULL AUTO_INCREMENT,
                     tytul VARCHAR(50) NOT NULL,
                     producent VARCHAR(30) NOT NULL,
                     data_wydania DATE NOT NULL,
                     kategoria VARCHAR(30) NOT NULL,
                     img_path VARCHAR(50) NOT NULL,
                     CONSTRAINT Gra_pk PRIMARY KEY (id)
);

-- Table: Recenzja
CREATE TABLE Recenzja (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          gra_id INT NOT NULL,
                          uzytkownik_id INT NOT NULL,
                          tresc VARCHAR(300) NOT NULL,
                          ocena INT NOT NULL,
                          data_utworzenia DATE NOT NULL,
                          FOREIGN KEY (gra_id) REFERENCES Gra(id),
                          FOREIGN KEY (uzytkownik_id) REFERENCES Uzytkownik(id)
);

-- Table: Uzytkownik
CREATE TABLE Uzytkownik (
                            id INT NOT NULL AUTO_INCREMENT,
                            nazwa_uzytkownika VARCHAR(30) NOT NULL UNIQUE,
                            email VARCHAR(50) NOT NULL UNIQUE,
                            haslo VARCHAR(100) NOT NULL,
                            rola varchar(30) not null,
                            CONSTRAINT Uzytkownik_pk PRIMARY KEY (id)
);

-- Insert sample data into Gra
INSERT INTO Gra (id, tytul, producent, data_wydania, kategoria, img_path)
VALUES
    (1, 'The Witcher 3', 'CD Projekt Red', '2015-05-19', 'RPG', 'witcher.jpg'),
    (2, 'Cyberpunk 2077', 'CD Projekt Red', '2020-12-10', 'RPG', 'cyberpunk.jpg'),
    (3, 'Elden Ring', 'FromSoftware', '2022-02-25', 'RPG', 'eldenring.jpg'),
    (4, 'FIFA 23', 'EA Sports', '2022-09-30', 'Sportowe', 'fifa.jpg'),
    (5, 'Age of Empires IV', 'Relic Entertainment', '2021-10-28', 'Strategiczne', 'aoe4.jpg');

-- Insert sample data into Uzytkownik
INSERT INTO Uzytkownik (id, nazwa_uzytkownika, email, haslo, rola)
VALUES
    (1, 'user1', 'user1@example.com', 'password123', 'user'),
    (2, 'user2', 'user2@example.com', 'password456', 'user'),
    (3, 'user3', 'user3@example.com', 'password789', 'user'),
    (4, 'user4', 'user4@example.com', 'password111', 'user'),
    (5, 'user5', 'user5@example.com', 'password222', 'user'),
    (6, 'admin', 'admin@admin.admin', 'admin', 'admin');

-- Insert sample data into Recenzja
INSERT INTO Recenzja (gra_id, uzytkownik_id, ocena, tresc, data_utworzenia)
VALUES
    (1, 1, 5, 'Świetna gra z fantastyczną fabułą i grafiką!', '2023-01-01'),
    (1, 2, 4, 'Bardzo dobra gra, ale ma drobne błędy.', '2023-01-02'),
    (2, 1, 3, 'Zbyt wiele problemów technicznych.', '2023-01-05'),
    (2, 3, 4, 'Fajna gra, ale historia nie jest wciągająca.', '2023-01-07'),
    (3, 4, 5, 'Jedna z najlepszych gier w historii!', '2023-01-10'),
    (4, 2, 2, 'Powtarzalna rozgrywka, nic nowego.', '2023-01-15'),
    (5, 5, 5, 'Fantastyczna strategia! Warta każdej złotówki.', '2023-01-20');

select * from Recenzja;
select * from Uzytkownik;
select * from Gra;