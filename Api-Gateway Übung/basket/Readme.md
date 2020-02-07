Lokale Datenbank

- Postgres installieren
- "basketDb" erstellen
- mit psql Shell zu "basketDb" navigieren
- \i path/initdb.sql ausführen (path = pfad an welchem sich die Datei befindet)

Docker
- docker build -t basketimage .
- docker run -p 5000:80 basketimage

Test:
- localhost:5000/basket

Get:
- localhost:5000/1  
-- Gibt den Warenkorb mit der CustomerId 1 zurück

Post:
- localhost:5000/1 + Body: { "productId": 1, "count": 2 }  
-- Prüft ob ein Warenkorb für CustomerId 1 bereits vorhanden ist. Falls nein wird dieser erstellt und das Produkt mit der ProductId 1 hinzugefügt  
-- Mehrmaliges hinzufügen setzt den Count hoch



