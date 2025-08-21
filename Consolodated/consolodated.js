console.clear();

const LISTENER_TYPES = { FOLLOWER: "follower", MESSAGE: "message", BUTTON: "widget-button", CHANNEL_POINTS: "channelPointsRedemption", SUBSCRIBE: "subscriber", };
const BUTTON_TYPES = { LURK: "lurkButton", SUBSCRIBE: "subButton", GHOST: "ghostButton", FOLLOW: "followerButton", BOO: "booButton", };
const COMMAND_TYPES = { LURK: "!lurk", GHOST: "!ghost", FOLLOW: "!follower", BOO: "!boo", SUBSCRIBE: "!subscribe" };

const windowData = { x: 1920, y: 1080 };

let timerInterval;
let animationCooldown = 4; // in seconds; current animatino is ~4s
let seconds = 0;
let animationCDFlag = false;

// !lurk
const LURK_TYPES = { TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" };
const lurkerImage = document.getElementById("lurk-image");
let lurkImage;
let lurkSound;

// !ghost
const GHOST_TYPES = { CW: "cw", CCW: "ccw" };

const ghostImageElement = document.getElementById("ghost-image");
let ghostImage;
let ghostSound;

// !boo
const BOO_TYPES = { TOP_RIGHT_T1: "top-right-t1", TOP_RIGHT_T2: "top-right-t2", BOTTOM_RIGHT_T1: "bottom-right-t1", BOTTOM_RIGHT_T2: "bottom-right-t2", BOTTOM_LEFT_T1: "bottom-left-t1", BOTTOM_LEFT_T2: "bottom-left-t2", TOP_LEFT_T1: "top-left-t1", TOP_LEFT_T2: "top-left-t2", };
const CAMERA_TYPES = { TOP_RIGHT: "top-right", BOTTOM_RIGHT: "bottom-right", BOTTOM_LEFT: "bottom-left", TOP_LEFT: "top-left", };
let cameraLocation;

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

let booSound

// --follow--
const cat1ImageElement = document.getElementById("cat-1-image");
let cat1Image;
const cat2ImageElement = document.getElementById("cat-2-image");
let cat2Image;
const cat3ImageElement = document.getElementById("cat-3-image");
let cat3Image;
const mouseImageElement = document.getElementById("mouse-image");
let mouseImage;
let followSound;

// --subscribe--
const pawImageElement = document.getElementById("paw-image");
const fishImageElement = document.getElementById("fish-image");
const splatImageElement = document.getElementById("splat-image");
let subSound;

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

const addName = (name = "", type = "") => {
  if (type === LISTENER_TYPES.SUBSCRIBE) {
    const nameElement = document.getElementById("sub-name");

    nameElement.textContent = name;
  } else if (type === LISTENER_TYPES.FOLLOWER) {
    const nameElement = document.getElementById("follower");

    nameElement.textContent = `${name} followed.`;
  }
};

// -- !commands and animations -- \\

const handleLurk = () => {
  if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  const dir = getRandomNumber(1, 4);
  if (dir === 1) startLurk(LURK_TYPES.TOP);
  else if (dir === 2) startLurk(LURK_TYPES.LEFT);
  else if (dir === 3) startLurk(LURK_TYPES.BOTTOM);
  else if (dir === 4) startLurk(LURK_TYPES.RIGHT);
};

const startLurk = (location = "") => {
  const timeline = gsap.timeline();

  lurkSound.play()

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

  resetLurk();
};

const resetLurk = () => {
  gsap.set("#lurk-image", { x: -1000, y: -1000 });
};

////////////////

const handleGhost = () => {
  if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  const typeRNG = getRandomNumber(1, 2);
  if (typeRNG === 1) startGhost(GHOST_TYPES.CW);
  else if (typeRNG === 2) startGhost(GHOST_TYPES.CCW);
};

const startGhost = (version = "") => {
  const timeline = gsap.timeline();

  ghostSound.play()

  const randX = getRandomNumber(0, 1000); // 0 - 1000
  const randY = getRandomNumber(-100, 100); // -100 - 100
  const randScale = getRandomNumber(0.8, 1.2);
  const randRotateStart = getRandomNumber(-25, -10);
  const randRotateEnd = getRandomNumber(10, 25);
  const totalRotate = Math.abs(randRotateStart) + Math.abs(randRotateEnd);

  if (version === GHOST_TYPES.CW) {
    timeline.set("#ghost-image", { opacity: 0, scale: 0.1, x: randX, y: randY, rotate: randRotateStart, });
    timeline.to("#ghost-image", { opacity: 1, duration: 2.5, scale: randScale / 2, ease: "power2.in", rotate: randRotateStart + totalRotate / 2, });
    timeline.to("#ghost-image", { opacity: 0, duration: 2.5, scale: randScale, ease: "power2.out", rotate: randRotateEnd, });
  } else if (version === GHOST_TYPES.CCW) {
    timeline.set("#ghost-image", { opacity: 0, scale: 0.1, x: randX, y: randY, rotate: randRotateEnd, });
    timeline.to("#ghost-image", { opacity: 1, duration: 2.5, scale: randScale / 2, ease: "power2.in", rotate: randRotateEnd - totalRotate / 2, });
    timeline.to("#ghost-image", { opacity: 0, duration: 2.5, scale: randScale, ease: "power2.out", rotate: randRotateStart, });

    resetGhost()
  }
};

const resetGhost = () => {
    gsap.set("#ghost-image", {opacity: 0, scale: 0.1})
}

////////////////

const handleBoo = () => {
  if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  const typeRNG = getRandomNumber(1, 2);

  if (cameraLocation === CAMERA_TYPES.TOP_RIGHT && typeRNG === 1)
    startBoo(BOO_TYPES.TOP_RIGHT_T1);
  else if (cameraLocation === CAMERA_TYPES.TOP_RIGHT && typeRNG === 2)
    startBoo(BOO_TYPES.TOP_RIGHT_T2);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_RIGHT && typeRNG === 1)
    startBoo(BOO_TYPES.BOTTOM_RIGHT_T1);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_RIGHT && typeRNG === 2)
    startBoo(BOO_TYPES.BOTTOM_RIGHT_T2);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_LEFT && typeRNG === 1)
    startBoo(BOO_TYPES.BOTTOM_LEFT_T1);
  else if (cameraLocation === CAMERA_TYPES.BOTTOM_LEFT && typeRNG === 2)
    startBoo(BOO_TYPES.BOTTOM_LEFT_T2);
  else if (cameraLocation === CAMERA_TYPES.TOP_LEFT && typeRNG === 1)
    startBoo(BOO_TYPES.TOP_LEFT_T1);
  else if (cameraLocation === CAMERA_TYPES.TOP_LEFT && typeRNG === 2)
    startBoo(BOO_TYPES.TOP_LEFT_T2);
};

const startBoo = (location = "") => {
  const timeline = gsap.timeline();

  booSound.play()
  
  if (location === BOO_TYPES.TOP_RIGHT_T1) {
    const tomatoStart = {x: 1000, y: -450}
    const tomatoEnd = {x: 1750, y: -1100}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-1-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo("#boo-cat-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.TOP_RIGHT_T2) {
    const tomatoStart = {x: 1000, y: -500}
    const tomatoEnd = {x: 1750, y: -1150}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-2-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo("#boo-cat-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_RIGHT_T1) {
    const tomatoStart = {x: 1000, y: -450}
    const tomatoEnd = {x: 1750, y: -400}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-1-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9,  x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo("#boo-cat-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_RIGHT_T2) {
    const tomatoStart = {x: 1000, y: -500}
    const tomatoEnd = {x: 1750, y: -450}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scale: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-2-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo("#boo-cat-group", { scale: 1 }, { scale: 0.1, duration: 1, delay: 1.5 });
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_LEFT_T1) {
    const tomatoStart = {x: 800, y: -450}
    const tomatoEnd = {x: 100, y: -400}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-1-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo( "#boo-cat-group", { scaleX: -1, scaleY: 1 }, { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 } );
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.BOTTOM_LEFT_T2) {
    const tomatoStart = {x: 800, y: -550}
    const tomatoEnd = {x: 100, y: -450}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-2-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo( "#boo-cat-group", { scaleX: -1, scaleY: 1 }, { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 } );
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.TOP_LEFT_T1) {
    const tomatoStart = {x: 800, y: -450}
    const tomatoEnd = {x: 100, y: -1050}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-1-image", { scale: 1, x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-1-image", { opacity: 0 });
    timeline.set("#boo-splat-1-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo( "#boo-cat-group", { scaleX: -1, scaleY: 1 }, { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 } );
    timeline.fromTo("#boo-splat-1-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  } else if (location === BOO_TYPES.TOP_LEFT_T2) {
    const tomatoStart = {x: 800, y: -500}
    const tomatoEnd = {x: 100, y: -1150}
    timeline.fromTo("#boo-cat-group", { scale: 0.1 }, { scaleX: -1, scaleY: 1, duration: 1 });
    timeline.fromTo("#boo-arm-image", { rotate: 120 }, { rotate: 480, duration: 0.35, delay: 1.0 });
    timeline.fromTo( "#boo-tomato-2-image", { scale: 1,  x: tomatoStart.x, y: tomatoStart.y, rotate: 0 }, { scale: 0.9, x: tomatoEnd.x, y: tomatoEnd.y, rotate: 360, duration: 0.5, ease: "none" } );
    timeline.set("#boo-tomato-2-image", { opacity: 0 });
    timeline.set("#boo-splat-2-image", { opacity: 1, x: tomatoEnd.x, y: tomatoEnd.y - 100, scale: 4 });
    timeline.fromTo( "#boo-cat-group", { scaleX: -1, scaleY: 1 }, { scaleX: -0.1, scaleY: 0.1, duration: 1, delay: 1.5 } );
    timeline.fromTo("#boo-splat-2-image", { opacity: 1 }, { opacity: 0, duration: 2 });
  }

  resetBoo();
};

const resetBoo = () => {
  gsap.set("#boo-cat-group", { transformOrigin: "20% 40%", x: 720, y: 700, scale: 0.1 });
  gsap.set("#boo-arm-image", { x: 0, y: -570, rotate: 120 });
  gsap.set("#boo-tomato-1-image", { x: 1000, y: 800, rotate: 0, scale: 0, opacity: 1 });
  gsap.set("#boo-splat-1-image", { opacity: 1, x: 1700, y: 100, scale: 0, opacity: 0 });
  gsap.set("#boo-tomato-2-image", { x: 1000, y: 800, rotate: 0, scale: 0, opacity: 1 });
  gsap.set("#boo-splat-2-image", { opacity: 1, x: 1700, y: 100, scale: 0, opacity: 0 });
};

// -- events -- \\

const handleSubscribe = (name = "test subscribe") => {
    if (animationCDFlag) return;

  animationCDFlag = true;
  startTimer();

  startSubscribe(name)
};

const startSubscribe = (name) => {
  addName(name, LISTENER_TYPES.SUBSCRIBE);

  startTimer();
  animationCDFlag = true;
  const timeline = gsap.timeline();

  subSound.play()

  timeline.to("#fish-image", { scale: 1, duration: 1.0, rotate: 5 });
  timeline.to("#splat-image", { scale: 1, duration: 0.1 });
  timeline.to("#sub-name", { opacity: 1, duration: 1 }, 1);
  timeline.to("#subscribed", { opacity: 1, duration: 1, delay: 1 });
  timeline.fromTo( "#paw-image", { rotate: 180, x: 500, y: -1100, scale: 0 }, { rotate: 160, x: 400, y: -800, scale: 1, duration: 0.2, delay: 2 } );
  timeline.to("#paw-image", { rotate: 150, x: 500, y: -750, scale: 0.5, delay: 1, duration: 0.2 });
  timeline.to("#paw-image", { rotate: 200, x: 500, y: -700, scale: 1, duration: 0.2 });
  timeline.to("#paw-image", { rotate: 190, x: 500, y: -800, scale: 0.5, duration: 0.2 });
  timeline.to("#paw-image", { rotate: 180, x: 500, y: -500, scale: 1, duration: 0.2 });
  timeline.to("#fish-and-paw", { y: -1300, duration: 3, delay: 2 });
  timeline.to("#splat-image", { opacity: 0, duration: 1 }, 10);
  timeline.to("#sub-name", { opacity: 0, y: -500, duration: 2 }, 10);
  timeline.to("#subscribed", { opacity: 0, duration: 2 }, 9);

  resetSubscribe();
};

const resetSubscribe = () => {
  gsap.set("#fish-and-paw", { rotation: 0, x: 200, y: -100 });
  gsap.set("#paw-image", { transformOrigin: "50% 100%", rotate: 180, x: 500, y: -1300 });
  gsap.set("#fish-image", { x: 500, y: 150, scale: 0 });

  gsap.set("#splat-image", { x: 700, y: 50, scale: 0, opacity: 0.5 });

  gsap.set("#sub-name", { transformOrigin: "0 0", rotate: -20, opacity: 0, x: 800, y: 300 });
  gsap.set("#subscribed", { transformOrigin: "0 0", opacity: 0, x: 800, y: 300 });
};

////////////////

const handleFollower = (name = "test follow") => {
  if (animationCDFlag) return;

  addName(name, LISTENER_TYPES.FOLLOWER);

  animationCDFlag = true;
  startTimer();

  startFollower();
};

const startFollower = () => {
  const timeline = gsap.timeline();

  followSound.play()

  timeline.fromTo("#cat-1-image", { opacity: 0 }, { opacity: 1, duration: 1 });
  timeline.fromTo("#follower", { opacity: 0 }, { opacity: 1, duration: 1 }, 1);
  timeline.to("#mouse-image", { x: 3000, duration: 3, ease: "none" });

  timeline.set("#cat-1-image", { opacity: 0 }, 3.25);
  timeline.set("#cat-2-image", { opacity: 1 }, 3.25);

  timeline.set("#cat-2-image", { opacity: 0 }, 4.0);
  timeline.set("#cat-3-image", { opacity: 1 }, 4.0);
  timeline.to("#cat-3-image", { x: 2000, duration: 1 }, 4.0);
  timeline.to("#follower", { rotate: 720, x: 2200, y: -1200, duration: 0.75, ease: "none" }, 4.0);

  resetFollower();
};

const resetFollower = () => {
  gsap.set("#follower", { transformOrigin: "50% 50%", rotate: 0, opacity: 0, x: 1100, y: -900 });
  gsap.set("#cat-1-image", { x: 700, y: 25, opacity: 0 });
  gsap.set("#cat-2-image", { x: 700, y: 100, opacity: 0 });
  gsap.set("#cat-3-image", { x: 900, y: -50, opacity: 0 });
  gsap.set("#mouse-image", { x: -250, y: 350 });
};

////////////////

const resetAllAnimations = () => {
    // events
    resetSubscribe()
    resetFollower()

    // commands
    resetLurk()
    resetGhost()
    resetBoo()
}

////////////////

window.addEventListener("onWidgetLoad", function (obj) {
  if (!obj) return;

  const fieldData = obj.detail.fieldData;

  // !subscribe
  const pawImage = fieldData["pawImage"];
  pawImageElement.src = pawImage;

  const fishImage = fieldData["fishImage"];
  fishImageElement.src = fishImage;

  const splatImage = fieldData["splatImage"];
  splatImageElement.src = splatImage;

  const subscribeSound = fieldData.subSound
  subSound = new Audio(subscribeSound)

  // !follow
  cat1Image = fieldData["cat1Image"];
  cat1ImageElement.src = cat1Image;

  cat2Image = fieldData["cat2Image"];
  cat2ImageElement.src = cat2Image;

  cat3Image = fieldData["cat3Image"];
  cat3ImageElement.src = cat3Image;

  mouseImage = fieldData["mouseImage"];
  mouseImageElement.src = mouseImage;

  const followerSound = fieldData.followSound
  followSound = new Audio(followerSound)

  // !lurk
  lurkImage = fieldData["lurkerImage"];
  lurkerImage.src = lurkImage;

  const lurkererSound = fieldData.lurkSound
  lurkSound = new Audio(lurkererSound)

  // !ghost
  ghostImage = fieldData["ghostImage"];
  ghostImageElement.src = ghostImage;

  const ghosterSound = fieldData.ghostSound
  ghostSound = new Audio (ghosterSound)

  // !boo
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

  const booerSound = fieldData.booSound
  booSound = new Audio (booerSound)

  resetAllAnimations();
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj) return;

  console.log("incoming event")
  console.log(obj)

  const listener = obj.detail.listener;
  const eventListener = obj.detail.event.listener;
  const eventType = obj.detail.event.type;

  if (eventType === LISTENER_TYPES.SUBSCRIBE) {
    const name = obj.detail.event.displayName;
    if (name) handleSubscribe(name);
  } else if (eventType === LISTENER_TYPES.FOLLOWER) {
    const name = obj.detail.event.displayName;
    handleFollower(name);
  } else if (eventType === LISTENER_TYPES.CHANNEL_POINTS) {
    const amount = obj.detail.event.data.amount;
    const command = obj.detail.event.data.redemption;

    if (command === "Ghost") {
      handleGhost();
    } else if (command === "Boo") {
      handleBoo();
    } else if (command === "Lurk") {
      handleLurk();
    } else if (command === "Follow") {
      handleFollower();
    }
  } else if (eventListener === LISTENER_TYPES.BUTTON) {
    const buttonCommand = obj.detail.event.field;
    if (buttonCommand === BUTTON_TYPES.GHOST) {
      handleGhost();
    } else if (buttonCommand === BUTTON_TYPES.LURK) {
      handleLurk();
    } else if (buttonCommand === BUTTON_TYPES.BOO) {
      handleBoo();
    }
  } else if (listener === LISTENER_TYPES.MESSAGE) {
    const message = obj.detail.event.data.text;

    if (message[0] === "!") {
      const data = obj.detail.event.data;
      const command = data.text.split(" ")[0].toLowerCase();

      // commands
      if (command === COMMAND_TYPES.GHOST) {
        handleGhost();
      } else if (command === COMMAND_TYPES.FOLLOW) {
        handleFollower();
      } else if (command === COMMAND_TYPES.LURK) {
        handleLurk();
      } else if (command === COMMAND_TYPES.BOO) {
        handleBoo();
      } else if (command === COMMAND_TYPES.SUBSCRIBE) {
        handleSubscribe()
      }
    }
  }
});
