console.clear();

const LISTENER_TYPES = {
  FOLLOWER: "follower",
  MESSAGE: "message",
  BUTTON: "widget-button",
  CHANNEL_POINTS: "channelPointsRedemption",
};
const BUTTON_TYPES = { FOLLOW: "followerButton" };
const COMMAND_TYPES = { FOLLOW: "!follower" };

const cat1ImageElement = document.getElementById("cat-1-image");
let cat1Image;
const cat2ImageElement = document.getElementById("cat-2-image");
let cat2Image;
const cat3ImageElement = document.getElementById("cat-3-image");
let cat3Image;
const mouseImageElement = document.getElementById("mouse-image");
let mouseImage;

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

const addName = (name = "") => {
  const nameElement = document.getElementById("follower");

  nameElement.textContent = `${name} followed.`;
};

const handleFollower = (name = "") => {
  if (animationCDFlag) return;

  addName(name);

  animationCDFlag = true;
  startTimer();

  animateFollower();
};

const animateFollower = () => {
  const timeline = gsap.timeline();

  timeline.fromTo("#cat-1-image", { opacity: 0 }, { opacity: 1, duration: 1 });
  timeline.fromTo("#follower", { opacity: 0 }, { opacity: 1, duration: 1 }, 1);
  timeline.to("#mouse-image", { x: 3000, duration: 3, ease: "none" });

  timeline.set("#cat-1-image", { opacity: 0 }, 3.25);
  timeline.set("#cat-2-image", { opacity: 1 }, 3.25);

  timeline.set("#cat-2-image", { opacity: 0 }, 4.0);
  timeline.set("#cat-3-image", { opacity: 1 }, 4.0);
  timeline.to("#cat-3-image", { x: 2000, duration: 1 }, 4.0);
  timeline.to("#follower", { rotate: 720, x: 2000, y: -200, duration: 0.75, ease: "none" }, 4.0);

  resetFollower();
};

const resetFollower = () => {
  gsap.set("#follower", { transformOrigin: "50% 50%", opacity: 0, x: 700, y: 500 });
  gsap.set("#cat-1-image", { x: 700, y: 25, opacity: 0 });
  gsap.set("#cat-2-image", { x: 700, y: 100, opacity: 0 });
  gsap.set("#cat-3-image", { x: 900, y: -50, opacity: 0 });
  gsap.set("#mouse-image", { x: -250, y: 350 });
};

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  const fieldData = obj.detail.fieldData;

  cat1Image = fieldData["cat1Image"];
  cat1ImageElement.src = cat1Image;

  cat2Image = fieldData["cat2Image"];
  cat2ImageElement.src = cat2Image;

  cat3Image = fieldData["cat3Image"];
  cat3ImageElement.src = cat3Image;

  mouseImage = fieldData["mouseImage"];
  mouseImageElement.src = mouseImage;

  resetFollower();
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
      if (command === FOLLOWER_TYPES.FOLLOW) {
        // handleFollower(); // moved to channel point redemption
      }
    }
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    const buttonCommand = obj.detail.event.field;

    if (buttonCommand === BUTTON_TYPES.FOLLOW) {
      handleFollower();
    }
  } else if (eventType === LISTENER_TYPES.CHANNEL_POINTS) {
    const amount = obj.detail.event.data.amount;
    const command = obj.detail.event.data.redemption;
    if (command === "Follow") {
      handleFollower();
    }
  } else if (eventType === LISTENER_TYPES.FOLLOWER) {
    handleFollower(obj.detail.event.displayName);
  }
});
