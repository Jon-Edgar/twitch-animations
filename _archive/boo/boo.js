console.clear();

const LISTENER_TYPES = {
  FOLLOWER: "follower",
  MESSAGE: "message",
  BUTTON: "widget-button",
  CHANNEL_POINTS: "channelPointsRedemption",
};
const BUTTON_TYPES = { BOO: "booButton" };
const COMMAND_TYPES = { BOO: "!boo" };
const BOO_TYPES = {
  TOP_RIGHT_T1: "top-right-t1",
  TOP_RIGHT_T2: "top-right-t2",
  BOTTOM_RIGHT_T1: "bottom-right-t1",
  BOTTOM_RIGHT_T2: "bottom-right-t2",
  BOTTOM_LEFT_T1: "bottom-left-t1",
  BOTTOM_LEFT_T2: "bottom-left-t2",
  TOP_LEFT_T1: "top-left-t1",
  TOP_LEFT_T2: "top-left-t2",
};
const CAMERA_TYPES = {
  TOP_RIGHT: "top-right",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  TOP_LEFT: "top-left",
};
let cameraLocation;

const windowData = { x: 1920, y: 1080 };

const booBodyImageElement = document.getElementById("boo-body-image");
let booBodyImage;
const booArmImageElement = document.getElementById("boo-arm-image");
let booArmImage;

const booTomato1ImageElement = document.getElementById("boo-tomato-1-image");
let booTomato1Image;
const booSplat1ImageElement = document.getElementById("boo-splat-1-image");
let booSplat1Image;

const booTomato2ImageElement = document.getElementById("boo-tomato-2-image");
let booTomato2Image;
const booSplat2ImageElement = document.getElementById("boo-splat-2-image");
let booSplat2Image;

let timerInterval;
let animationCooldown = 7; // in seconds
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

const handleBoo = () => {
  if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  const typeRNG = getRandomNumber(1, 2);

  if (cameraLocation === CAMERA_TYPES.TOP_RIGHT && typeRNG === 1)
    handleBooAnimation(BOO_TYPES.TOP_RIGHT_T1);
  else if (cameraLocation === CAMERA_TYPES.TOP_RIGHT && typeRNG === 2)
    handleBooAnimation(BOO_TYPES.TOP_RIGHT_T2);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_RIGHT && typeRNG === 1)
    handleBooAnimation(BOO_TYPES.BOTTOM_RIGHT_T1);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_RIGHT && typeRNG === 2)
    handleBooAnimation(BOO_TYPES.BOTTOM_RIGHT_T2);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_LEFT && typeRNG === 1)
    handleBooAnimation(BOO_TYPES.BOTTOM_LEFT_T1);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_LEFT && typeRNG === 2)
    handleBooAnimation(BOO_TYPES.BOTTOM_LEFT_T2);
  else if (cameraLocation === CAMERA_TYPES.TOP_LEFT && typeRNG === 1)
    handleBooAnimation(BOO_TYPES.TOP_LEFT_T1);
  else if (cameraLocation === CAMERA_TYPES.TOP_LEFT && typeRNG === 2)
    handleBooAnimation(BOO_TYPES.TOP_LEFT_T2);
};

const resetBoo = () => {
  gsap.set("#boo-group", { transformOrigin: "20% 40%", x: 720, y: 700, scale: 0.1 });
  gsap.set("#boo-arm-image", { x: 0, y: -570, rotate: 120 });
  gsap.set("#boo-tomato-1-image", { x: 1000, y: 800, rotate: 0, scale: 0, opacity: 1 });
  gsap.set("#boo-splat-1-image", { opacity: 1, x: 1700, y: 100, scale: 0, opacity: 0 });
  gsap.set("#boo-tomato-2-image", { x: 1000, y: 800, rotate: 0, scale: 0, opacity: 1 });
  gsap.set("#boo-splat-2-image", { opacity: 1, x: 1700, y: 100, scale: 0, opacity: 0 });
};

const handleBooAnimation = (location = "") => {
  const timeline = gsap.timeline();

  if (location === BOO_TYPES.TOP_RIGHT_T1) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-1-image",
      { scale: 1, x: 1000, y: 800, rotate: 0 },
      { scale: 0.9, x: 1700, y: 100, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: 1700, y: 0, scale: 4 });
    timeline.fromTo("#boo-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.TOP_RIGHT_T2) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-2-image",
      { scale: 1, x: 1000, y: 800, rotate: 0 },
      { scale: 0.9, x: 1700, y: 0, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: 1700, y: -100, scale: 4 });
    timeline.fromTo("#boo-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_RIGHT_T1) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-1-image",
      { scale: 1, x: 1000, y: 800, rotate: 0 },
      { scale: 0.9, x: 1700, y: 900, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: 1700, y: 750, scale: 4 });
    timeline.fromTo("#boo-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_RIGHT_T2) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-2-image",
      { scale: 1, x: 1000, y: 800, rotate: 0 },
      { scale: 0.9, x: 1700, y: 750, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: 1700, y: 650, scale: 4 });
    timeline.fromTo("#boo-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_LEFT_T1) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-1-image",
      { scale: 1, x: 800, y: 800, rotate: 0 },
      { scale: 0.9, x: 100, y: 900, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: 100, y: 750, scale: 4 });
    timeline.fromTo(
      "#boo-group",
      { scaleX: -1, scaleY: 1 },
      { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 }
    );
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_LEFT_T2) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-2-image",
      { scale: 1, x: 800, y: 800, rotate: 0 },
      { scale: 0.9, x: 100, y: 850, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: 100, y: 750, scale: 4 });
    timeline.fromTo(
      "#boo-group",
      { scaleX: -1, scaleY: 1 },
      { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 }
    );
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.TOP_LEFT_T1) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-1-image",
      { scale: 1, x: 800, y: 800, rotate: 0 },
      { scale: 0.9, x: 100, y: 100, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: 100, y: 0, scale: 4 });
    timeline.fromTo(
      "#boo-group",
      { scaleX: -1, scaleY: 1 },
      { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 }
    );
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.TOP_LEFT_T2) {
    timeline.fromTo("#boo-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo(
      "#boo-tomato-2-image",
      { scale: 1, x: 800, y: 800, rotate: 0 },
      { scale: 0.9, x: 100, y: 100, rotate: 360, duration: 0.5, ease:"none" }
    );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: 100, y: 0, scale: 4 });
    timeline.fromTo(
      "#boo-group",
      { scaleX: -1, scaleY: 1 },
      { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 }
    );
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  }

  resetBoo();
};

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  const fieldData = obj.detail.fieldData;

  cameraLocation = fieldData.cameraDropdown;

  booBodyImage = fieldData["booBodyImage"];
  booBodyImageElement.src = booBodyImage;

  booArmImage = fieldData["booArmImage"];
  booArmImageElement.src = booArmImage;

  booTomato1Image = fieldData["booTomato1Image"];
  booTomato1ImageElement.src = booTomato1Image;

  booSplat1Image = fieldData["booSplat1Image"];
  booSplat1ImageElement.src = booSplat1Image;

  booTomato2Image = fieldData["booTomato2Image"];
  booTomato2ImageElement.src = booTomato2Image;

  booSplat2Image = fieldData["booSplat2Image"];
  booSplat2ImageElement.src = booSplat2Image;

  resetBoo();
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj) return;

  // console.log("obj = ", obj.detail); // keep for received events

  const listener = obj.detail.listener;
  const eventListener = obj.detail.event.listener;
  const eventType = obj.detail.event.type;

  if (listener === LISTENER_TYPES.MESSAGE) {
    const message = obj.detail.event.data.text;

    if (message[0] === "!") {
      const data = obj.detail.event.data;
      const command = data.text.split(" ")[0].toLowerCase();

      // commands
      if (command === COMMAND_TYPES.BOO) {
        handleBoo(); // moved to channel point redemption
      }
    }
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    const buttonCommand = obj.detail.event.field;

    if (buttonCommand === BUTTON_TYPES.BOO) {
      handleBoo();
    }
  } else if (eventType === LISTENER_TYPES.CHANNEL_POINTS) {
    const amount = obj.detail.event.data.amount;
    const command = obj.detail.event.data.redemption;
    if (command === "Boo") {
      handleBoo();
    }
  }
});
