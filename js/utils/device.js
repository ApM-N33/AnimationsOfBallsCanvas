const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches

const forTouchDevices = (btn) => {
  btn.addEventListener("touchstart", () => btn.classList.add("active"))
  btn.addEventListener("touchend", () => btn.classList.remove("active"))
}

const forDesktopDevices = (btn) => {
  btn.addEventListener("mouseenter", () => btn.classList.add("active"))
  btn.addEventListener("mouseleave", () => btn.classList.remove("active"))
}

export { isTouch, forTouchDevices, forDesktopDevices }
