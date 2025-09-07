import {
  ROOT_INITIAL_COLORS,
  ROOT_COLORS_VERIABLES,
} from "./utils/constants.js"
import { isTouch, forTouchDevices, forDesktopDevices } from "./utils/device.js"

function AnimationsOfBalls() {
  const canvas = document.getElementById("canvas")
  const createBallBtn = document.getElementById("create-ball-btn")
  const deleteBallBtn = document.getElementById("delete-ball-btn")
  const setColorsBtn = document.getElementById("set-colors-btn")
  const canvasContainerWrapper = document.getElementById(
    "canvas-container-wrapper"
  )

  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d")

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const state = { balls: [] }

  const Ball = () => {
    const radius = Math.floor(Math.random() * 30) + 10
    return {
      radius,
      posX: Math.random() * (canvas.width - radius * 2) + radius,
      posY: Math.random() * (canvas.height - radius * 2) + radius,
      xSpeed: (Math.random() - 0.5) * 10,
      ySpeed: (Math.random() - 0.5) * 10,
      color: `rgb(
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)})`,
      paintBall() {
        ctx.beginPath()
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
      },
      refreshBall() {
        this.posX += this.xSpeed
        this.posY += this.ySpeed

        if (
          this.posX >= canvas.width - this.radius ||
          this.posX < this.radius
        ) {
          this.xSpeed = this.xSpeed * -1
        }
        if (
          this.posY >= canvas.height - this.radius ||
          this.posY < this.radius
        ) {
          this.ySpeed = this.ySpeed * -1
        }
      },
    }
  }

  document.querySelectorAll(".voltage-button button").forEach((btn) => {
    isTouch ? forTouchDevices(btn) : forDesktopDevices(btn)
  })

  const createBalls = () => {
    const ball = Ball()
    state.balls = [...state.balls, ball]
  }

  const deleteBalls = () => {
    if (state.balls.length === 0) return
    const randIndex = Math.floor(Math.random() * state.balls.length)
    state.balls.splice(randIndex, 1)
  }

  const paintScene = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    state.balls.forEach((ball) => ball.paintBall())
  }

  const refreshScene = () => {
    state.balls.forEach((ball) => ball.refreshBall())
  }

  const resizeCanvas = () => {
    const oldWidth = canvas.width
    const oldHeight = canvas.height

    const newWidth = canvas.offsetWidth
    const newHeight = canvas.offsetHeight

    if (oldWidth === newWidth && oldHeight === newHeight) return

    const scaleX = newWidth / oldWidth
    const scaleY = newHeight / oldHeight

    state.balls.forEach((ball) => {
      ball.posX = Math.min(
        Math.max(ball.radius, ball.posX * scaleX),
        newWidth - ball.radius
      )
      ball.posY = Math.min(
        Math.max(ball.radius, ball.posY * scaleY),
        newHeight - ball.radius
      )
    })

    canvas.width = newWidth
    canvas.height = newHeight
  }
  resizeCanvas()

  const animateScene = () => {
    requestAnimationFrame(animateScene)
    refreshScene()
    paintScene()
  }
  animateScene()

  const RandomColors = () => ({
    setAngle: (deg) => Math.floor(Math.random() * deg),
    setRGB: (number1, number2, number3) => `rgb(
  ${Math.floor(Math.random() * number1)},
  ${Math.floor(Math.random() * number2)},
  ${Math.floor(Math.random() * number3)})`,
  })

  const c = RandomColors()
  const Colors = () => ({
    randomGradient: `linear-gradient(
  ${c.setAngle(360)}deg,
  ${c.setRGB(256, 256, 256)},
  ${c.setRGB(256, 256, 256)},
  ${c.setRGB(256, 256, 256)})`,
    randomColor: c.setRGB(256, 256, 256),
  })

  const setRootInitialColors = (rootInitialColors = ROOT_INITIAL_COLORS) => {
    Object.entries(rootInitialColors).forEach(([colorVeriable, colorValue]) => {
      document.documentElement.style.setProperty(colorVeriable, colorValue)
    })
  }

  const setRootNewColorsValues = (
    rootColorsVeriables = ROOT_COLORS_VERIABLES
  ) => {
    rootColorsVeriables.forEach((colorVeriable) => {
      const { randomGradient, randomColor } = Colors()
      if (colorVeriable === "--main-bg" || colorVeriable === "--canvas-bg") {
        document.documentElement.style.setProperty(
          colorVeriable,
          randomGradient
        )
      } else {
        document.documentElement.style.setProperty(colorVeriable, randomColor)
      }
    })
  }

  let totalSets = 0
  const setColors = () => {
    totalSets = (totalSets + 1) % 6
    if (totalSets === 0) setRootInitialColors()
    else setRootNewColorsValues()
  }

  let frameCount = 0
  const refreshCanvasGlow = () => {
    frameCount++
    if (frameCount % 5 === 0) {
      const { randomColor } = Colors()
      canvas.style.boxShadow = `
    0 0 10px ${randomColor},
    0 0 20px ${randomColor},
    0 0 40px ${randomColor}`
      canvasContainerWrapper.style.boxShadow = `
    0 0 10px ${randomColor},
    0 0 20px ${randomColor},
    0 0 40px ${randomColor}`
    }
    requestAnimationFrame(refreshCanvasGlow)
  }
  refreshCanvasGlow()

  createBallBtn.addEventListener("click", createBalls)
  deleteBallBtn.addEventListener("click", deleteBalls)
  setColorsBtn.addEventListener("click", setColors)
  window.addEventListener("resize", resizeCanvas)
}

AnimationsOfBalls()
