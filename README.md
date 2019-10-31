# hackday

## About

The `Express` server was originally based on [Spotify's Web Auth Examples](https://github.com/spotify/web-api-auth-examples), but most code has been changed since. See `LICENSE` for the original license.

## Get Started

Install the dependencies:

    npm i

Follow the [Spotify Web API](https://developer.spotify.com/web-api/authorization-guide/) guide to register an application with Spotify. Also register the following route as a callback route for successful authentification:

    http://localhost:8888/callback/

Use the information obtained from Spotify to create a `.env` file in the root of this directory, replacing all placeholders in `.env.mock`. Also replace the `SESSION_SECRET` placeholder with a secret string (will be used by `express-session`).

Then start the development server:

    npm run dev
