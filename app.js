const urls = [
  "./html/coronavirus.html",
  "./html/esi.html",
  "./html/dengue.html",
  "./html/cambios.html",
]
const txtTiempos = $(".tiempo-estimado")
let parrafos = 0

$("document").ready(() => {
  var fecha = new Date(),
    dia = fecha.getDate(),
    meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    mes = fecha.getMonth(),
    año = fecha.getFullYear(),
    txtFecha = $(".fecha-txt")[0]

  txtFecha.textContent =
    "Noticias del día " + dia + "/" + meses[mes] + "/" + año

  getHTML(urls[0], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal")
    funcionTotal(urls[0], 0)
  })
  getHTML(urls[1], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal")
    funcionTotal(urls[1], 1)
  })
  getHTML(urls[2], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal")
    funcionTotal(urls[2], 2)
  })
  getHTML(urls[3], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal")
    funcionTotal(urls[3], 3)
  })
})

// Tiempo estimado de lectura
function funcionTotal(url, index) {
  const palabrasPorMinuto = 200
  var tiempoEstimado = 0
  var palabrasTotales = 0
  for (i = 0; i < parrafos.length; i++) {
    palabrasTotales += parrafos[i].textContent.trim().split(/\s+/).length
  }

  var tiempoDecimal = palabrasTotales / palabrasPorMinuto
  var tiempo = Math.ceil(tiempoDecimal)
  if (tiempo == 0) {
    tiempoEstimado = "Menos de 1 minuto de lectura"
  } else if (tiempo == 1) {
    tiempoEstimado = "Aproximadamente 1 minuto de lectura"
  } else {
    tiempoEstimado = "Aproximadamente " + tiempo + " minutos de lectura"
  }
  txtTiempos[index].innerText = tiempoEstimado
  parrafos = 0
}

function getHTML(url, callback) {
  var req = new XMLHttpRequest()

  req.onload = function () {
    if (callback && typeof callback === "function") {
      callback(this.responseXML)
    }
  }

  req.open("GET", url)
  req.responseType = "document"
  req.send()
}

//Splash screen
var index = 0,
  text = "InfoTIC \n por Gonzalo Díaz de Vivar"

function Write() {
  if (index < text.length) {
    if (text.charAt(index) == "\n") {
      $("#title-splash").append("<br>")
    } else {
      $("#title-splash").append(text.charAt(index))
    }
    index++
    setTimeout(Write, 50)
  } else {
    setTimeout(() => {
      $("#splash-screen").addClass("finish")
      let cartas = $(".card")
      cartas.addClass("slide-effect")
      $(".info-personal").addClass("subir")
    }, 500)
  }
}
Write()
