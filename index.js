const valueDisplayEl = document.querySelector("#valueDisplay")
const newColorBtn = document.querySelector("#generatenew")
const copyToClipboardBtn = document.querySelector("#copytoclipboard")
const navButtons = document.querySelectorAll("nav button")

const generate = {
  methodsAllowed: {
    hex: false, rgb: false, text: true
  },
  hex: function () {
    const hexChars = "0123456789ABCDEF"
    const hexData = []
    for (let i = 0; i <= 6; i++) {
      hexData.push(hexChars[Math.floor(Math.random() * hexChars.length)])
    }
    hexData.unshift("#")
    return hexData.join("")
  },
  rgb: function () {
    const rgbData = []
    for (let i = 0; i < 3; i++) {
      rgbData.push(Math.floor(Math.random() * 255))
    }
    rgbData.join(", ")
    const codeFormat = `rgb(${rgbData})`
    return codeFormat
  },
  simple: function () {
    const colors = ["red", "blue", "green", "brown", "chartreuse", "coral", "crimson", "darkorange", "orange", "orangered", "deeppink"]
    return colors[Math.floor([Math.random() * colors.length])]
  },
  random: function () {
    const colorData = []
    const methods = [this.hex, this.rgb, this.simple]
    for (let i = 0; i < 3; i++) {
      colorData.push(methods[i]())
    }
    return colorData[Math.floor(Math.random() * colorData.length)]
  }
}

const changeElements = {
  background: function (value) {
    document.body.style.backgroundColor = value
  },
  textElement: function (string) {
    valueDisplayEl.innerText = string
  }
}

newColorBtn.addEventListener("click", function () {
  const value = generate.random()
  changeElements.background(value)
  changeElements.textElement(value)
  console.log(value)
})

navButtons.forEach(button => button.addEventListener("click", function () {
  if (generate.methodsAllowed[button.getAttribute("data-mode")] === false) {
    generate.methodsAllowed[button.getAttribute("data-mode")] = true
    button.classList.add("active")
  } else {
    generate.methodsAllowed[button.getAttribute("data-mode")] = false
    button.classList.remove("active")
  }
}))