console.clear();

const LISTENER_TYPES = { FOLLOWER: "follower", MESSAGE: "message", BUTTON: "widget-button", CHANNEL_POINTS: "channelPointsRedemption" };
const BUTTON_TYPES = { LURK: "lurkButton" };
const COMMAND_TYPES = { LURK: "!lurk" };
const LURK_TYPES = { TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" };

const windowData = { x: 1920, y: 1080 };

const lurkerImage = document.getElementById("lurk-image");
let lurkImage;

let timerInterval;
let animationCooldown = 4; // in seconds; current animatino is ~4s
let seconds = 0;
let animationCDFlag = false;

const startTimer = () => {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    seconds++;
    if (seconds > animationCooldown) {
      seconds = 0;
      animationCDFlag = false;
      stopTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const getRandomNumber = (low = 1, high = 4) => {
  low = Math.ceil(low);
  high = Math.floor(high);
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

const handleLurk = () => {
  if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  const dir = getRandomNumber(1, 4);
  if (dir === 1) handleLurkAnimation(LURK_TYPES.TOP);
  else if (dir === 2) handleLurkAnimation(LURK_TYPES.LEFT);
  else if (dir === 3) handleLurkAnimation(LURK_TYPES.BOTTOM);
  else if (dir === 4) handleLurkAnimation(LURK_TYPES.RIGHT);
};

const handleLurkAnimation = (location = "") => {
  const timeline = gsap.timeline();

  if (location === LURK_TYPES.TOP) {
    const randX = getRandomNumber(0, 1280); 
    timeline.fromTo( "#lurk-image", { rotate: 180, opacity: 1, x: randX, y: -600 }, { x: randX, y: -70, duration: 1 } );
    timeline.set("#lurk-image", { scaleX: -1, delay: 0.5 });
    timeline.set("#lurk-image", { scaleX: 1, delay: 0.5 });
    timeline.to("#lurk-image", { x: randX, y: -600, duration: 1, delay: 2 });
  } else if (location === LURK_TYPES.RIGHT) {
    const randY = getRandomNumber(0, 450); 
    timeline.fromTo( "#lurk-image", { rotate: 270, opacity: 1, x: windowData.x + 0, y: randY }, { x: windowData.x - 525, y: randY, duration: 1 } );
    timeline.set("#lurk-image", { scaleX: -1, delay: 0.5 });
    timeline.set("#lurk-image", { scaleX: 1, delay: 0.5 });
    timeline.to("#lurk-image", { x: windowData.x + 300, y: randY, duration: 1, delay: 2 });
  } else if (location === LURK_TYPES.BOTTOM) {
    const randX = getRandomNumber(0, 1280); 
    timeline.fromTo( "#lurk-image", { rotate: 0, opacity: 1, x: randX, y: windowData.y }, { x: randX, y: windowData.y - 525, duration: 1 } );
    timeline.set("#lurk-image", { scaleX: -1, delay: 0.5 });
    timeline.set("#lurk-image", { scaleX: 1, delay: 0.5 });
    timeline.to("#lurk-image", { x: randX, y: windowData.y, duration: 1, delay: 2 });
  } else if (location === LURK_TYPES.LEFT) {
    const randY = getRandomNumber(0, 450); 
    timeline.fromTo( "#lurk-image", { rotate: 90, opacity: 1, x: -700, y: randY }, { x: -70, y: randY, duration: 1 } );
    timeline.set("#lurk-image", { scaleX: -1, delay: 0.5 });
    timeline.set("#lurk-image", { scaleX: 1, delay: 0.5 });
    timeline.to("#lurk-image", { x: -700, y: randY, duration: 1, delay: 2 });
  }
};

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  const fieldData = obj.detail.fieldData;
  lurkImage = fieldData["lurkerImage"];
  lurkerImage.src = lurkImage;
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj) return;

  // console.log("obj = ", obj.detail) // keep for received events

  const listener = obj.detail.listener;
  const eventListener = obj.detail.event.listener;
  const eventType = obj.detail.event.type;

  if (listener === LISTENER_TYPES.MESSAGE) {
   
    const message = obj.detail.event.data.text;

    if (message[0] === "!") {
      const data = obj.detail.event.data;
      const command = data.text.split(" ")[0].toLowerCase();

      // commands
      if (command === COMMAND_TYPES.LURK) {
        // handleLurk(); // moved to channel point redemption
      }
    }
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    
    const buttonCommand = obj.detail.event.field;

    if (buttonCommand === BUTTON_TYPES.LURK) {
      handleLurk();
    }
  } else if (eventType === LISTENER_TYPES.CHANNEL_POINTS) {
    const amount = obj.detail.event.data.amount
    const command = obj.detail.event.data.redemption
    if (command === "Lurk") {
      handleLurk();
    }
  }
});
