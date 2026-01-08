# Dorfromantik - Wertung

Diese Anwendung ist ein einfaches Werkzeug, um die Ergebnisse und Kampagnen des Brettspiels "Dorfromantik" zu verwalten. Es bietet eine funktionale, aber noch in Entwicklung befindliche, Benutzeroberfläche.

## Verwendete Technologien

- [Angular](https://angular.io/)
- [Playwright](https://playwright.dev/) für End-to-End-Tests

## Abhängigkeiten einrichten

```bash
npm install
```

## Entwicklungsserver

Um einen lokalen Entwicklungsserver zu starten, führe den folgenden Befehl aus:

```bash
npm start
```

Navigiere zu `http://localhost:4200/`. Die Anwendung lädt automatisch neu, wenn du Änderungen an den Quelldateien vornimmst.

## Build

Führe `npm run build` aus, um das Projekt zu kompilieren. Die Artefakte werden im `dist/` Verzeichnis abgelegt.

## Unit tests

Zur Ausführung der Unit-tests:
```bash
npm run test
```

## Linting und Formatter

Zur Überprüfung von linting-Fehlern
```bash
npm run lint
```

Zum Formatieren 
```bash
npm run format
```

## End-to-End-Tests mit Playwright

Um die End-to-End-Tests auszuführen, verwende den folgenden Befehl:

```bash
npx playwright test
```
