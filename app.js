const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 1024

onload = (e) => {
    document.getElementById("all").style.filter = "blur(0)"
    canvas.style.opacity = 1
}

var frame = 0
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    theta = frame/100
    ctx.fillStyle = "turquoise"
    ctx.beginPath()
    ctx.arc(712 + Math.cos(theta)*500, 312 + Math.sin(theta)*500, 500, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = "skyblue"
    ctx.beginPath()
    ctx.arc(212 - Math.cos(theta)*500, 612 - Math.sin(theta)*500, 500, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = "pink"
    ctx.beginPath()
    ctx.arc(312 - Math.cos(theta - Math.PI/2)*500, 312 - Math.sin(theta)*500, 500, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
    frame++
}
animate()

const searchBarContainer = document.getElementById("discoverContainer")
const searchBar = document.getElementById("discover")
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        if (document.activeElement == searchBar && searchBar.value.trim().length > 0) {
            searchBarContainer.className = "transitioned"
            canvas.style.opacity = ""
            try {
                document.getElementById("results").className = "transitionedResults"
            } catch (e) {}
            setTimeout(() => {
                window.location.href = `results.html?search=${searchBar.value.trim()}`
            }, 1500)
        }
    }
})