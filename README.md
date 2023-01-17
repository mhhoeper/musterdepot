# musterdepot

## Demo

Auf https://mhhoeper.github.io/musterdepot/ läuft der letzte Stand des `main` Branches.

## Erstellung der Projektbasis

Erstellung des Projektes mit folgenden Schritten:
* Projektrumpf mit create-react-app erzeugt (`yarn create react-app musterdepot --template typescript`).
* React-Grid-Layout (https://github.com/react-grid-layout/react-grid-layout) hinzugefügt
  * `yarn add react-grid-layout`
  * `yarn add -D @types/react-grid-layout`
* Der Anleitung auf https://github.com/react-grid-layout/react-grid-layout folgen

## Merge-Konflikte auflösen

* Ggf. Mergekonflikte in Dateien manuell auflösen
* Merge-Konflikte in `package.json` manuell auflösen
* `yarn install` aufrufen (Konflikte in `yarn.lock` werden so automatisch aufgelöst) 
[[Stackoverflow](https://stackoverflow.com/questions/42939113/how-do-you-resolve-git-conflicts-in-yarn-lock)]

## Pipeline vorbereiten

* https://github.com/gitname/react-gh-pages
* https://github.com/peaceiris/actions-gh-pages

## Mögliche Windowmanager

* https://reactgrid.com/ - Aktuell umgesetzt, auch mit Mobilgerät nutzbar
* https://github.com/RickoNoNo3/react-winbox - Sieht aus wie ein vollständiger
Window-Manager, Demo passt sich nicht gut auf Mobilgeräten an
* https://github.com/caplin/FlexLayout - Sieht gut aus und kann mit Mobilgeräten umgehen.
Ist auf festen Bildschirmbereich ausgelegt und nicht unendlich scrollbar
* https://github.com/xcfox/react-tile-pane - Sieht gut aus, kann einigermaßen mit Mobilgeräten, ist auf festen Bildschirmbereich ausgelegt und nicht unendlich scrollbar
* https://github.com/AndreiTelteu/solidjs-window-manager - Beispiel läuft nicht, jedoch
kann dieser Window Manager sein Layout lokal speichern

## Mögliche Komponenten

* https://reactgrid.com/ - Für Depotansicht und Watchlist

## Links to start

* Tutorial: Intro to React - https://reactjs.org/tutorial/tutorial.html
* Thinking in React - https://reactjs.org/docs/thinking-in-react.html
* State variables - https://www.seanmcp.com/articles/storing-data-in-state-vs-class-variable/

### Data Sources

* Import JSON data - https://www.learnbestcoding.com/post/81/3-ways-to-import-a-json-file-in-react
* Access data from external API - https://www.pluralsight.com/guides/access-data-from-an-external-api-into-a-react-component
* Another import data from external API - https://dev.to/olenadrugalya/ways-of-getting-data-from-api-in-react-2kpf

### Stock Data Management

* ISIN-Ticker-Database - https://www.openfigi.com
  * OpenFigi does not resolve ISIN to Ticker correctly
  * https://www.lemon.markets/blog/mapping-a-ticker-symbol-to-isin-using-openfigi-and-lemonmarkets
* Stock Exchange Codes - https://stockmarketmba.com/globalstockexchanges.php

## Next Steps

* Get data from yahoo: https://github.com/ViktorMS/yahoo/blob/master/src/App.js

