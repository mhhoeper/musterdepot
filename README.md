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


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
