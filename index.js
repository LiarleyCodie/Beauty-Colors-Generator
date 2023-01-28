const valueDisplayEl = document.querySelector("#valueDisplay")
const newColorBtn = document.querySelector("#generatenew")
const copyToClipboardBtn = document.querySelector("#copytoclipboard")
const navButtons = document.querySelectorAll("nav button")
var value = undefined

const generate = {
  methodsAllowed: {
    simple: true, hex: false, rgb: false
  },
  hex: function () {
    const hexChars = "0123456789ABCDEF"
    const hexData = []
    for (let i = 0; i < 6; i++) {
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
    const methods = []
    for (let key in this.methodsAllowed) {
      if (this.methodsAllowed[key]) {
        const func = this[key]
        methods.push(func)
      }
    }
    methods.forEach(func => {
      colorData.push(func())
    })
    
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
  checkIfAnyMethodsAllowed()
  value = generate.random()
  changeElements.background(value)
  changeElements.textElement(value)
})

copyToClipboardBtn.addEventListener("click", function() {
  navigator.clipboard.writeText(value)
  this.style.animation = "400ms ease alertCopy backwards"

  this.addEventListener("animationend", function() {
    this.style.animationName = "none"
  })
})

navButtons.forEach(button => button.addEventListener("click", function () {
  changeGeneratePropsState(button)
  checkIfAnyMethodsAllowed()
}))

function changeGeneratePropsState(element) {
  if (generate.methodsAllowed[element.getAttribute("data-mode")] === false) {
    generate.methodsAllowed[element.getAttribute("data-mode")] = true
    element.classList.add("active")
  } else {
    generate.methodsAllowed[element.getAttribute("data-mode")] = false
    element.classList.remove("active")
  }
}

function checkIfAnyMethodsAllowed() {
  let methodsEnabled = 0
  for (let state in generate.methodsAllowed) {
    if (generate.methodsAllowed[state]) {
      methodsEnabled += 1
    }
  }
  if (methodsEnabled === 0) {
    generate.methodsAllowed.simple = true
    navButtons[0].classList.add("active")
  }
}

function initialize() {
  value = generate.random()
  changeElements.background(value)
  changeElements.textElement(value)
}

initialize()