export default class KeySettings {
  constructor() {
    this.exit = false;
    this.pause = false;
    this.player1Up = false;
    this.player1Down = false;
    this.player2Up = false;
    this.player2Down = false;
    //these are if I want to add a button to add balls
    // this.extraball1 = false;
    // this.extraball2 = false;
    //these are if I want to add buttons to shoot from paddles.
    // this.player1shoot = false;
    // this.player2shoot = false;
  }
  // checks what keys were pressed and passes them down to a boolean variable for easy handling
  getKeyesPressed(pressed, setting) {
    if (pressed[setting.pause] === true) {
      this.pause = !this.pause;
    }
    if (pressed[setting.playerOneDown] === true) {
      this.player1Down = true;
    } else {
      this.player1Down = false;
    }
    if (pressed[setting.playerOneUp] === true) {
      this.player1Up = true;
    } else {
      this.player1Up = false;
    }
    if (pressed[setting.playerTwoDown] === true) {
      this.player2Down = true;
    } else {
      this.player2Down = false;
    }
    if (pressed[setting.playerTwoUp] === true) {
      this.player2Up = true;
    } else {
      this.player2Up = false;
    }
    if (pressed[setting.exit] === true) {
      this.exit = true;
    }
  }
}
