console.clear();

const LISTENER_TYPES = { FOLLOWER: "follower", MESSAGE: "message", BUTTON: "widget-button", SUBSCRIBE: "subscriber", };
const BUTTON_TYPES = { SUBSCRIBE: "subButton" };

const pawImageElement = document.getElementById("paw-image");
const fishImageElement = document.getElementById("fish-image");
const splatImageElement = document.getElementById("splat-image");

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

const resetAnimation = () => {
  gsap.set("#fish-and-paw", { rotation: 0, x: 0, y: 0 });
  gsap.set("#paw-image", { transformOrigin: "50% 100%", rotate: 180, x: 500, y: -1200 });
  gsap.set("#fish-image", { x: 500, y: 250, scale: 0 });

  gsap.set("#splat-image", { x: 500, y: 250, scale: 0, opacity: 0.5 });

  gsap.set("#sub-name", { transformOrigin: "0 0", rotate: -20, opacity: 0, x: 600, y: 500 });
  gsap.set("#subscribed", { transformOrigin: "0 0", opacity: 0, x: 600, y: 600 });
};

const startAnimation = (name = "") => {
  if (animationCDFlag || !name) return;

  addName(name);

  startTimer();
  animationCDFlag = true;
  const timeline = gsap.timeline();

  timeline.to("#fish-image", { scale: 1, duration: 1.0, rotate: 5 });
  timeline.to("#splat-image", { scale: 1, duration: 0.1 });
  timeline.to("#sub-name", { opacity: 1, duration: 1 }, 1);
  timeline.to("#subscribed", { opacity: 1, duration: 1, delay: 1 });
  timeline.fromTo( "#paw-image", { rotate: 180, x: 500, y: -1000, scale: 0 }, { rotate: 160, x: 400, y: -700, scale: 1, duration: 0.2, delay: 2 } );
  timeline.to("#paw-image", { rotate: 150, x: 500, y: -650, scale: 0.5, delay: 1, duration: 0.2 });
  timeline.to("#paw-image", { rotate: 200, x: 500, y: -600, scale: 1, duration: 0.2 });
  timeline.to("#paw-image", { rotate: 190, x: 500, y: -700, scale: 0.5, duration: 0.2 });
  timeline.to("#paw-image", { rotate: 180, x: 500, y: -400, scale: 1, duration: 0.2 });
  timeline.to("#fish-and-paw", { y: -1200, duration: 3, delay: 2 });
  timeline.to("#splat-image", { opacity: 0, duration: 1 }, 10);
  timeline.to("#sub-name", { opacity: 0, y: -400, duration: 2 }, 10);
  timeline.to("#subscribed", { opacity: 0, duration: 2 }, 9);

  resetAnimation();
};

const addName = (name = "") => {
  const nameElement = document.getElementById("sub-name");

  nameElement.textContent = name;
};

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  const fieldData = obj.detail.fieldData;

  const pawImage = fieldData["pawImage"];
  pawImageElement.src = pawImage;

  const fishImage = fieldData["fishImage"];
  fishImageElement.src = fishImage;

  const splatImage = fieldData["splatImage"];
  splatImageElement.src = splatImage;

  resetAnimation();
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj) return;

  const eventListener = obj.detail.event.listener;
  const eventType = obj.detail.event.type;

  if (eventType === LISTENER_TYPES.SUBSCRIBE) {
    const name = obj.detail.event.name;
    startAnimation(name);
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    const buttonCommand = obj.detail.event.field;
    if (buttonCommand === BUTTON_TYPES.SUBSCRIBE) {
      startAnimation();
    }
  }
});
