# Pong Game Starter

A starter project for a basic pong game using SVGs.

## Setup

Ensure you have [Node.js](https://nodejs.org/en/) installed first.

**Install dependencies:**

`$ npm install`

**Run locally with the Parcel dev server:**

`$ npm start`

Once you run the start command you can access your project at http://localhost:3000.

Read more about the [Parcel web application bundler here](https://parceljs.org/).

## Deploy

The deployment workflow for this project will be a bit different from what you've used when deploying simple static websites.

To deploy your finished Pong project as a GitHub page, you must first **update the `predeploy` script in the `package.json` file with the name of your repo.**

For example, if your repo URL is:

https://github.com/bob/pong-project

Update the `predeploy` script as follows:

```json
"predeploy": "rm -rf dist && parcel build index.html --public-url /pong-project",
```

Once you have done this, you can run:

`$ npm run deploy`

Now check out your deployed site 🙂

### ######################################## Game Notes

### Player Advantage

Advantage is random.

### Game End

The game is set to end once a player reaches a certain score. currently set to 10.

### Final Score Display

displays an announcement of who the winner is and the final scores. all in red.

### multikey press

multikey puts keyspressed in an object that is used to to turn on and off variables for easy haterndling. these variables will get checked to move the paddles, pause the game, end the game. multiballs and shooting are implemented so once coded the keys will work.

### Canceling game screen

created a end screen with instrustions to refresh page in order to restart

### multiball thru scoring

balls will increase with every time the total score hits a multiple of 5.

### ball collision

work in progress.. code in place but there is a memory leak. comming soon

### prompt to press spacebar to start.

added instructions to the game.

### bullet collision

### Settings Change

### ################################ Developer Diary

After doing the code along and thus getting everything going at base level, I left the programming for the weekend. The next day I encountered issues with the program that I tryed to resolve but anything I did resulted in nothing chaging; even after making drastic changes. After cheking the sources in chrome inspector I realized that chrome was not updating the source files; every change I made was not taking effect. I ended up reaching to staff but I was able to get it going with a reboot before Anvit got back to me. Sadly this set me back an hour and a bit.

I am still making a few spelling or cap errors that are setting me back a bit of time. I tried tweaking the paddles a bit and ended up putting a capital letter in one of them by mistake... sigh..
