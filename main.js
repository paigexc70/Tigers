let timer
let deletefirstdelay


async function start (){
     const response = await fetch("https://dog.ceo/api/breeds/list/all")
     const data = await response.json()
     createbreedlist(data.message)
}


start()

function createbreedlist(breedlist){
document.getElementById("breed").innerHTML = `
<select onchange="loadbybreed(this.value)">
<option>
    choose a breed
</option>
${Object.keys(breedlist).map(function (breed) {
  return `<option>${breed}<option>`
}).join('')}
</select>
`
}

async function loadbybreed(breed) {
if (breed !="choose a breed"){
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
  const data = await response.json()
  createslideshow(data.message)
}
}

function createslideshow(images) {
let currentposition = 0
clearInterval(timer)
clearTimeout(deletefirstdelay)
document.getElementById("slideshow").innerHTML = `
<div class="slide" style ="background-image: url('${images[0]}')"></div>
<div class="slide" style ="background-image: url('${images[1]}')"></div>
`
currentposition += 2
timer = setInterval(nextslide, 3000)

function nextslide(){
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style ="background-image: url('${images[currentposition]}')"></div>`)
    deletefirstdelay = setTimeout(function(){
        document.querySelector(".slide").remove()
    }, 1000)
    if (currentposition + 1 >= images.length) {
       currentposition = 0
    } else {
        currentposition++
    }
}
}