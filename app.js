const urls = ["coronavirus.html", "esi.html", "dengue.html", "cambios.html"];
const txtTiempos = $(".tiempo-estimado");
let parrafos = 0;

$("document").ready(() => {
  var fecha = new Date(),
    dia = fecha.getDate(),
    meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    mes = fecha.getMonth(),
    año = fecha.getFullYear(),
    txtFecha = document.getElementsByClassName("fecha-txt")[0];

  txtFecha.textContent =
    "Noticias del día " + dia + "/" + meses[mes] + "/" + año;
  getHTML(urls[0], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal");
    funcionTotal(urls[0], 0);
  });
  getHTML(urls[1], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal");
    funcionTotal(urls[1], 1);
  });
  getHTML(urls[2], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal");
    funcionTotal(urls[2], 2);
  });
  getHTML(urls[3], function (response) {
    parrafos = response.documentElement.getElementsByClassName("txt-principal");
    funcionTotal(urls[3], 3);
  });
});

// Tiempo estimado de lectura
function funcionTotal(url, index) {
  const palabrasPorMinuto = 200;
  var tiempoEstimado = 0;
  var palabrasTotales = 0;
  for (i = 0; i < parrafos.length; i++) {
    palabrasTotales += parrafos[i].textContent.trim().split(/\s+/).length;
  }

  var tiempoDecimal = palabrasTotales / palabrasPorMinuto;
  var tiempo = Math.ceil(tiempoDecimal);
  if (tiempo == 0) {
    tiempoEstimado = "Menos de 1 minuto de lectura";
  } else if (tiempo == 1) {
    tiempoEstimado = "Aproximadamente 1 minuto de lectura";
  } else {
    tiempoEstimado = "Aproximadamente " + tiempo + " minutos de lectura";
  }
  txtTiempos[index].innerText = tiempoEstimado;
  parrafos = 0;
}

function getHTML(url, callback) {
  var req = new XMLHttpRequest();

  req.onload = function () {
    if (callback && typeof callback === "function") {
      callback(this.responseXML);
    }
  };

  req.open("GET", url);
  req.responseType = "document";
  req.send();
}

//Splash screen
var index = 0,
  text = "InfoTIC \n por Gonzalo Díaz de Vivar";

function Write() {
  if (index < text.length) {
    if (text.charAt(index) == "\n") {
      document.getElementById("title-splash").innerHTML += "<br>";
    } else {
      document.getElementById("title-splash").innerHTML += text.charAt(index);
    }
    index++;
    setTimeout(Write, 50);
  } else {
    setTimeout(() => {
      document.getElementById("splash-screen").classList.add("finish");
      var cartas = document.getElementsByClassName("card");
      for (i = 0; i < cartas.length; i++) {
        cartas[i].classList.add("slide-effect");
      }
      document
        .getElementsByClassName("info-personal")[0]
        .classList.add("subir");
    }, 500);
  }
}
Write();
