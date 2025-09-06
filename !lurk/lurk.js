console.clear();

let timerInterval;
let animationCooldown = 4; // in seconds; current animation is ~4s
let seconds = 0;

// !lurk
const LURK_TYPES = { TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" };
const lurkerImage = document.getElementById("lurk-image");
let lurkImage, lurkSound;

/////////////////////// global section - start

let LISTENER_TYPES,
  BUTTON_TYPES,
  COMMAND_TYPES,
  windowData,
  playAnimationFlag, // allow animations to be played?
  animationOnCDFlag, // are animations on CD?
  state = {};

// const tempState = {
//   playAnimationFlag: true, // allow animations to be played?
//   animationOnCDFlag: false,
//   types: {
//     LISTENER_TYPES: {
//       MESSAGE: "message",
//       BUTTON: "widget-button",
//       CHANNEL_POINTS: "channelPointsRedemption",
//     },
//     BUTTON_TYPES: {
//       LURK: "lurkButton",
//       GHOST: "ghostButton",
//       BOO: "booButton",
//       LOCAL: "localStateButton",
//       GLOBAL: "globalStateButton",
//     },
//     COMMAND_TYPES: { LURK: "!lurk", GHOST: "!ghost", BOO: "!boo" },
//   },
//   constants: {
//     windowData: { x: 1920, y: 1080 },
//   },
// };

const initializeState = () => {
  SE_API.store.get("state").then((obj) => {
    state = obj;
    LISTENER_TYPES = obj.types.LISTENER_TYPES;
    BUTTON_TYPES = obj.types.BUTTON_TYPES;
    COMMAND_TYPES = obj.types.COMMAND_TYPES;
    windowData = obj.constants.windowData;
    playAnimationFlag = obj.playAnimationFlag;
    animationOnCDFlag = obj.animationOnCDFlag;
  });
};

const setState = (obj = {}) => {
  SE_API.store.set("state", { ...state, ...obj });
};

const getState = () => {
  SE_API.store.get("state").then((obj) => {
    state = obj;
  });
};

const startTimer = () => {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    seconds++;
    if (seconds > animationCooldown) {
      seconds = 0;
      stopTimer();
      setState({ animationOnCDFlag: false });
      animationOnCDFlag = false;
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

/////////////////////// global section - end

const handleLurk = () => {
  if (animationOnCDFlag) return;

  setState({ animationOnCDFlag: true });
  animationOnCDFlag = true;

  startTimer();

  const dir = getRandomNumber(1, 4);
  if (dir === 1) startLurk(LURK_TYPES.TOP);
  else if (dir === 2) startLurk(LURK_TYPES.RIGHT);
  else if (dir === 3) startLurk(LURK_TYPES.BOTTOM);
  else if (dir === 4) startLurk(LURK_TYPES.LEFT);
};

const startLurk = (location = "") => {
  const timeline = gsap.timeline();

  lurkSound.play();

  const lurkDistance = 530;

  if (location === LURK_TYPES.TOP) {
    const randX = getRandomNumber(20, 1280);
    const lurkStart = 1200;
    timeline
      .fromTo(
        "#lurk-image",
        { rotate: 180, opacity: 1, x: randX, y: -lurkStart },
        { x: randX, y: -lurkStart + lurkDistance, duration: 1 }
      )
      .set("#lurk-image", { scaleX: -1, delay: 0.5 })
      .set("#lurk-image", { scaleX: 1, delay: 0.5 })
      .to("#lurk-image", { x: randX, y: -lurkStart, duration: 1, delay: 2 });
  } else if (location === LURK_TYPES.RIGHT) {
    const randY = getRandomNumber(-250, 175);
    const lurkStart = 2220;
    timeline
      .fromTo(
        "#lurk-image",
        { rotate: 270, opacity: 1, x: lurkStart, y: randY },
        { x: lurkStart - lurkDistance, y: randY, duration: 1 }
      )
      .set("#lurk-image", { scaleX: -1, delay: 0.5 })
      .set("#lurk-image", { scaleX: 1, delay: 0.5 })
      .to("#lurk-image", { x: lurkStart, y: randY, duration: 1, delay: 2 });
  } else if (location === LURK_TYPES.BOTTOM) {
    const randX = getRandomNumber(0, 1280);
    const lurkStart = 1080;
    timeline
      .fromTo(
        "#lurk-image",
        { rotate: 0, opacity: 1, x: randX, y: lurkStart },
        { x: randX, y: lurkStart - lurkDistance, duration: 1 }
      )
      .set("#lurk-image", { scaleX: -1, delay: 0.5 })
      .set("#lurk-image", { scaleX: 1, delay: 0.5 })
      .to("#lurk-image", { x: randX, y: lurkStart, duration: 1, delay: 2 });
  } else if (location === LURK_TYPES.LEFT) {
    const randY = getRandomNumber(-250, 175);
    const lurkStart = -900;
    timeline
      .fromTo(
        "#lurk-image",
        { rotate: 90, opacity: 1, x: lurkStart, y: randY },
        { x: lurkStart + lurkDistance, y: randY, duration: 1 }
      )
      .set("#lurk-image", { scaleX: -1, delay: 0.5 })
      .set("#lurk-image", { scaleX: 1, delay: 0.5 })
      .to("#lurk-image", { x: lurkStart, y: randY, duration: 1, delay: 2 });
  }

  resetLurk();
};

const resetLurk = () => {
  gsap.set("#lurk-image", { x: -1000, y: -1000, transformOrigin: "50% 100%" });
};

const resetAllAnimations = () => {
  resetLurk();
};

////////////////

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  initializeState();

  const fieldData = obj.detail.fieldData;

  // !lurk
  lurkImage = fieldData["lurkerImage"];
  lurkerImage.src = lurkImage;

  const lurkererSound = fieldData.lurkSound;
  lurkSound = new Audio(lurkererSound);

  resetAllAnimations();
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj) return;

  if (!playAnimationFlag) return;

  const eventListener = obj.detail.event.listener;
  const eventType = obj.detail.event.type;

  if (eventType === LISTENER_TYPES.CHANNEL_POINTS) {
    const amount = obj.detail.event.data.amount;
    const command = obj.detail.event.data.redemption;

    if (command === "Lurk") {
      handleLurk();
    }
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    const buttonCommand = obj.detail.event.field;
    if (buttonCommand === BUTTON_TYPES.LURK) {
      handleLurk();
    } else if (buttonCommand === BUTTON_TYPES.LOCAL) {
      console.log("local state = ", state);
    } else if (buttonCommand === BUTTON_TYPES.GLOBAL) {
      SE_API.store.get("state").then((obj) => {
        console.log("global state = ", obj);
      });
    }
  }
});
