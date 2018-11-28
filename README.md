# Translation doctor

Aplikacja wspomagająca naprawę plików z tłumaczeniami.
Umożliwia naprawę/uzupełnienie plików z tłumaczeniami
na podstawie istniejącego, PRAWIDŁOWEGO pliku w formacie json.

[Przkładowe źródlowe tłumaczenie]()

[Przkładowe tłumaczenie do porpawy]()

# Instalacja:

Repozytorium zawiera backend oraz fronted aplikacji.


## Backend (`translations-api`)

Wymagania: `python3.6, virtualenv`


1. W katalogu głównym wpisujemy `virtualenv venv -p python3.6`
2. ... a następnie `source venv/bin/activate && pip install -r requirements.txt`
3. Uruchamiamy serwer: `flask run`


## Frontend (`translations-ui`):

Wymagania: `npm`

1. W katalogu głównym wpisujemy `npm install`
2. Uruchamiamy serwer `npm start`
3. Upewniamy się, że backend aplikacji został już wcześniej uruchomiony, a następnie otwieramy okno przeglądarki i wpisujemy `http://localhost:4200 `
