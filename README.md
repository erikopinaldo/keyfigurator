# Keyfigurator (WIP) - a way to preview different color combinations for your keyboard case and keycaps

I enjoy collecting mechanical keyboards. When it comes to the outward appearance of these keyboards, I have to choose a keyboard case color and the keycap colors/design. To make it easier to visualize what these color combinations might look like before I commit to buying them, I set out to create this visualizer tool.  This website features a 2D keyboard that you can modify. You can change the keyboard case and keycap color (you can also change the background canvas color).

**Link to project:** https://keyfigurator.fly.dev/

![keyfiguratordemo](https://user-images.githubusercontent.com/9390013/193426175-bc5fd0f4-3c8b-4b8b-8f42-a6779f87cb5a.gif)


## How It's Made:

**Dependencies used:** bcrypt, body-parser, connect-mongo, dotenv, ejs, express-flash, express-session, express, mongodb, mongoose, morgan, nodemon, passport-local, passport, validator 

### The Keyboard

The current 2D version of this keyboard was created by CodePen user MikeEsto. You can find this pen here: https://codepen.io/Mickel07/pen/YdONYK

This will be changed to a 3D model in the future. See the `Opportunities` section further below.

### Color Pickers

The color picker elements on the page were created by Github user taufik-nurrohman. This project can be found here: https://github.com/taufik-nurrohman/color-picker

### HTML templates

Visitors to the website that are not logged in are able to modify the keyboard, but they are unable to save their color combinations. Logged in users are able to save their color combinations. Each user can only view their own saved color combinations. 

To help achieve some of these customized views, I'm using `ejs` to create HTML templates populated with user-specific information.

### DB

I'm using MongoDB to store data. Mongoose is being used to intialize and interact with the DB.

### Auth

The other key tool that is helping serve customized views is authorization.

* This project uses [passport.js](https://www.passportjs.org/packages/passport-local/) to manage user account creation. I'm using passport's `passport-local` strategy, which requires an email address and password for auth. 
  * Passwords are hashed via `bcrypt`.
  * User entities are saved to the DB.
* Email address and password fields on the website have basic validation via [validatorjs](https://github.com/validatorjs/validator.js).
  * Basic temporary validation errors appear on the login and signup pages using `express-flash`.
* Sessions are saved to DB using `express-session`.
* Users that are not logged in are always redirected to a basic home page that lacks the "save color" feature.
* For logged in users: user IDs are passed with each request to the server, so color combinations from the DB that match a logged in user's ID are populated in the HTML.

### Saving color combinations

 * I initially started saving color combination requests via a form submission, and then had the page reload to visually list out all of the saved colors, including the newest one. However, I realized that I didn't want to reload the page because I wanted to make sure that the user's currently selected color was still displayed on the page. Preventing a page reload seemed like the most straightforward way to handle this (as opposed to reloading the page and serving new HTML with the latest saved color).
* To override the default behavior of reloading the page after a form submission, I set up client-side JS to listen for the form "submission" event on the page. This handles the actual request to server (instead of the form doing that itself). After a color combination is successfully saved to the DB, the client-side JS then takes the response from the server and builds out a new `li` element to display the newly saved color in the HTML without a page reload.
* Users can click on any of the saved colors listed on the page to show them on the keyboard model.

### Service Hosting

This service is hosted on [Render](https://render.com/). I'm using their Free tier, so this means that the service goes to sleep after 15 minutes of inactivity. If you are the first user to interact with the service during this sleeping period, the page may take a few seconds to load.

## Lessons Learned:

* This was a big opportunity for me to learn how to set up MongoDB collections via Mongoose.
* Auth via `passport.js` was really new to me. It was a pleasant surprise seeing how easy it was to implement.
  * Related to this, I was always scared of learning about handling user credentials. However, seeing easy ways to implement password hashing (e.g. via `bcrypt`) has eased me into building apps with user accounts.
* I also did not know how to handle user sessions before this project! 

## Opportunities

* Learn three.js - I want to show a 3D keyboard model instead of the current 2D model.
* Make the site look good. Its current state is more of an MVP. 
* Explore other hosting services - Render's free plan (which I am using) currently spins down the bot after 15 minutes of inactivity. This means that any user interacting with or installing the bot for the first time after it's spun down will experience some lag as the bot spins back up.

## Acknowledgements

* MikeEsto for their 2D keyboard model.
* taufik-nurrohman for their color picker elements.
* While I'm not working with them or using their code, here's a simlar keyboard visiaulizer that already exists: https://keyboardsimulator.xyz/
