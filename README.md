# Random Image Bank App

Just simple app to show you some random photos from [Unsplash](https://unsplash.com). ⚡️

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Build with

1. [ReactJS](https://reactjs.org/)
2. [React Router](https://reactrouter.com/)
3. [TailwindCSS](https://tailwindcss.com/)
4. [Axios](https://axios-http.com/)
5. [Google Font](https://fonts.google.com/)
6. [Font Awesome](https://fontawesome.com/)

## Install

Clone this repository.

Enter root directory

Then run these syntax `npm install`

> Make sure you already have ACCESS_KEY from Unsplash. If you haven't, please create an app on Unsplash account and grab the ACCESS_KEY. [Here's](https://unsplash.com/documentation#creating-a-developer-account) the instruction.

Create `.env ` file in the root folder. Then, just copy these following **Environment Variable** below :

```
[Required]
REACT_APP_UNSPLASH_API_ACCESS_KEY = (Your ACCESS_KEY)

[Optional]
REACT_APP_GTM_ID = GTM_ID
REACT_APP_GTM_AUTH_DEVELOPMENT = (Your GTM Auth code Dev Environment)
REACT_APP_GTM_AUTH_PRODUCTION = (Your GTM Auth code Prod Environment)
REACT_APP_GTM_PREVIEW_DEVELOPMENT = (Your Preview code Dev Environment)
REACT_APP_GTM_PREVIEW_PRODUCTION = (Your Preview code Prod Environment)
```

**Environment Variable** that related with GTM is optional. It's aiming for tracking the website. If you want it, make sure you already setup your GA & GTM. If you don't want it just leave it and remove the dependency code related with `TagManager` on `index.js`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
