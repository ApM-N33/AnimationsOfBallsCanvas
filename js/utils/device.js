const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)")

const forTouchDevices = (btn) => {
  btn.addEventListener("touchstart", () => btn.classList.add("active"))
  btn.addEventListener("touchend", () => btn.classList.remove("active"))
}

const forDesktopDevices = (btn) => {
  btn.addEventListener("mouseenter", () => btn.classList.add("active"))
  btn.addEventListener("mouseleave", () => btn.classList.remove("active"))
}

const changeDeviceEvents = (buttons, isTouch) => {
  if (isTouch) buttons.forEach((btn) => forTouchDevices(btn))
  else buttons.forEach((btn) => forDesktopDevices(btn))
}

export { mediaQuery, forTouchDevices, forDesktopDevices, changeDeviceEvents }
