1. gameController
    1.1 getAllGames:
        1.1.1 Odpowiada za pobranie wszystkich gier recenzowanych na stronę główną
    1.2 getGameDetails
        1.2.1 Odpowiada za pobranie listy recenzji dla danej gry na strone GameDetails
    1.3 addGame
        1.3.1 Odpowiada za dodanie gry, dostepne tylko dla admina.
    1.4 addReview
        1.4.1 Odpowiada za dodanie recenzji do gry, dostepne tylko dla uzytkownika zalogowanego

2. reviewController
    2.1 deleteReview:
        2.1.1 Odpowiada za usunieie recenzji, dostepne w dwoch przypadkach:
            2.1.1.1 Użytkownik zalogowany usuwa swoja recenzje
            2.1.1.2 Admin usuwa dowolna recenzje

3. userController
    3.1 registerUser
        3.1.1 Odpowiada za rejestracje uzytkownika
    3.2 loginUser
        3.2.1 Odpowiada za logowanie uzytkownika
    3.3 getProfile
        3.3.1 Odpowiada za pobranie profilu i wyliczenie bazowych wartosci levelowania i xp dla uzytkownika
    3.4 updateUsername
        3.4.1 Odpowiada za zupdatowanie nazwy uzytkownika

4. jwtMiddleware
    4.1 odpowiada za przekazanie tokenu

Baza danych: MySQL, DockerContainer

