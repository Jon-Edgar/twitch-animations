console.clear();

const LISTENER_TYPES = {
  FOLLOWER: "follower",
  MESSAGE: "message",
  BUTTON: "widget-button",
  CHANNEL_POINTS: "channelPointsRedemption",
};
const BUTTON_TYPES = { GHOST: "ghostButton" };
const COMMAND_TYPES = { GHOST: "!ghost" };
const GHOST_TYPES = { CW: "cw", CCW: "ccw" };

const windowData = { x: 1920, y: 1080 };

const ghostImageElement = document.getElementById("ghost-image");
let ghostImage;

let timerInterval;
let animationCooldown = 1; // in seconds
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

const handleGhost = () => {
  if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  const typeRNG = getRandomNumber(1, 2);
  if (typeRNG === 1) handleGhostAnimation(GHOST_TYPES.CW);
  else if (typeRNG === 2) handleGhostAnimation(GHOST_TYPES.CCW);
};

const handleGhostAnimation = (version = "") => {
  const timeline = gsap.timeline();

  const randX = getRandomNumber(0, 1000); // 0 - 1000
  const randY = getRandomNumber(-100, 100); // -100 - 100
  const randScale = getRandomNumber(0.8, 1.2);
  const randRotateStart = getRandomNumber(-25, -10);
  const randRotateEnd = getRandomNumber(10, 25);
  const totalRotate = Math.abs(randRotateStart) + Math.abs(randRotateEnd);

  if (version === GHOST_TYPES.CW) {
    timeline.set("#ghost-image", {
      opacity: 0,
      scale: 0.1,
      x: randX,
      y: randY,
      rotate: randRotateStart,
    });
    timeline.to("#ghost-image", {
      opacity: 1,
      duration: 2.5,
      scale: randScale / 2,
      ease: "power2.in",
      rotate: randRotateStart + totalRotate / 2,
    });
    timeline.to("#ghost-image", {
      opacity: 0,
      duration: 2.5,
      scale: randScale,
      ease: "power2.out",
      rotate: randRotateEnd,
    });
  } else if (version === GHOST_TYPES.CCW) {
    timeline.set("#ghost-image", {
      opacity: 0,
      scale: 0.1,
      x: randX,
      y: randY,
      rotate: randRotateEnd,
    });
    timeline.to("#ghost-image", {
      opacity: 1,
      duration: 2.5,
      scale: randScale / 2,
      ease: "power2.in",
      rotate: randRotateEnd - totalRotate / 2,
    });
    timeline.to("#ghost-image", {
      opacity: 0,
      duration: 2.5,
      scale: randScale,
      ease: "power2.out",
      rotate: randRotateStart,
    });
  }
};

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  const fieldData = obj.detail.fieldData;
  ghostImage = fieldData["ghostImage"];
  ghostImageElement.src = ghostImage;
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
      if (command === COMMAND_TYPES.GHOST) {
        handleGhost(); // moved to channel point redemption
      }
    }
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    const buttonCommand = obj.detail.event.field;

    if (buttonCommand === BUTTON_TYPES.GHOST) {
      handleGhost();
    }
  } else if (eventType === LISTENER_TYPES.CHANNEL_POINTS) {
    const amount = obj.detail.event.data.amount;
    const command = obj.detail.event.data.redemption;
    if (command === "Ghost") {
      handleGhost();
    }
  }
});
