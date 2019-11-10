# Clockify

## About

This repo contains the source files for a simple web service (`Clockify`) that generates and saves user-specific **Spotify playlists** with a given total duration. In other words, you tell the service how long the playlist should be and a new list with the name `clockify` will automagically appear in your private playlists, containing all your favourite songs.

See `clockify` in action on **[Heroku](https://clockify-mp.herokuapp.com/)**!

## Attribution

The `express` server is inspired by [Spotify's Web Auth Examples](https://github.com/spotify/web-api-auth-examples), although it has been altered heavily over the course of the project. See `LICENSE` for the original license.

## Get Started

Install the dependencies:

    npm i

Follow the [Spotify Web API](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) guide to register an application with Spotify. Also register the following route as a callback route for successful authentification:

    http://localhost:8888/callback/

Use the information obtained from Spotify to create a `.env` file in the root of this directory, replacing all placeholders in `.env.mock`. Also replace the `SESSION_SECRET` placeholder with a secret string (will be used by `express-session`).

Next, compile the TypeScript files:

    npm run build

Then start the development server:

    npm run dev

Happy hacking!
