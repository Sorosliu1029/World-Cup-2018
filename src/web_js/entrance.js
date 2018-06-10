$(document).ready(function() {
  var oMain = new CMain({
    area_goal: [
      { id: 0, probability: 100 },
      { id: 1, probability: 80 },
      { id: 2, probability: 60 },
      { id: 3, probability: 80 },
      { id: 4, probability: 100 },
      { id: 5, probability: 75 },
      { id: 6, probability: 60 },
      { id: 7, probability: 50 },
      { id: 8, probability: 60 },
      { id: 9, probability: 75 },
      { id: 10, probability: 80 },
      { id: 11, probability: 65 },
      { id: 12, probability: 70 },
      { id: 13, probability: 65 },
      { id: 14, probability: 80 },
    ], //PROBABILITY AREA GOALS START TO LEFT UP TO RIGHT DOWN
    //0  1  2  3  4
    //5  6  7  8  9
    //10 11 12 13 14
    num_of_penalty: 5, //MAX NUMBER OF PENALTY FOR END GAME
    multiplier_step: 0.1, //INCREASE MULTIPLIER EVERY GOAL
    fullscreen: false, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
    check_orientation: false, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
  })

  if (isIOS()) {
    setTimeout(function() {
      sizeHandler()
    }, 200)
  } else {
    sizeHandler()
  }
})
