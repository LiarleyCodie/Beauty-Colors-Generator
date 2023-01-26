const valueDisplayEl = document.querySelector("#valueDisplay")
const newColorBtn = document.querySelector("#generatenew")
const copyToClipboardBtn = document.querySelector("#copytoclipboard")

const generate = {
  hex: function () {
    const hexChars = "0123456789ABCDEF"
    const hexData = []
    for (let i = 0; i <= 6; i++) {
      hexData.push(hexChars[Math.floor(Math.random() * hexChars.length)])
    }
    return hexData.join("")
  },
  rgb: function () {
    const rgbData = []
    for (let i = 0; i < 3; i++) {
      rgbData.push(Math.floor(Math.random() * 255))
    }
    return rgbData.join(", ")
  },
  simple: function() {
    const colors = ["red", "blue", "green", "brown", "chartreuse", "coral", "crimson", "darkorange", "orange", "orangered", "deeppink"]
    return colors[Math.floor([Math.random() * colors.length])]
  },
  random: function() {
    const colorData = []
    const methods = [this.hex, this.rgb, this.simple]
    for (let i = 0; i < 3; i++) {
      colorData.push(methods[i]())
    }
    return colorData[Math.floor(Math.random() * colorData.length)]
  }
}

newColorBtn.addEventListener("click", function() {
  console.log(generate.random())
})