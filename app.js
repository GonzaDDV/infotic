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

// Leer datos de notas desde JSON - Agregar el body de las notas para lograr SPA
const cardTitles = $(".title-card")
const cardDescriptions = $(".description-card")
const containerNotas = $(".notas")
const containerTitulares = $(".titulares")
const notaCards = $(".card")

let jsonFile

$(document).ready(() => {
  // Para conseguir la fecha del día de hoy
  var fecha = new Date(),
    dia = fecha.getDate(),
    meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    mes = fecha.getMonth(),
    año = fecha.getFullYear(),
    txtFecha = $(".fecha-txt")[0]

  txtFecha.textContent = "Noticias del día " + dia + "/" + meses[mes] + "/" + año

  // Fetch(ear?) el JSON
  $.getJSON("./notas.json", function (json) {
    // Asignarlo a la variable
    jsonFile = json
    // Cambiar el titulo y descripcion de las cartas de las notas en base al JSON
    cardTitles.each(function (i) {
      $(this).text(json["Notas"][i].Titulo)
    })
    cardDescriptions.each(function (i) {
      $(this).text(json["Notas"][i].Descripcion)
    })
  })
})

notaCards.each(function () {
  $(this).click(function () {
    containerNotas.show()
    containerTitulares.hide()
    containerNotas.html("")
    containerNotas.append(
      "<div class='fixed-action-btn'><a class='btn-floating btn-large blue'><i class='material-icons'>home</i></a></div>"
    )
    $(".progress").css("display", "block")

    $(".fixed-action-btn").click(function () {
      volverAHome()
    })

    // No funciona la animacion :(
    $("html, body").animate({ scrollTop: 0 }, "slow")

    jsonFile["Notas"].forEach((nota, i) => {
      if ($(this).attr("id") === nota.Key) {
        nota.Parrafos.map((parrafoActual) => {
          containerNotas.append(
            `<${parrafoActual.Etiqueta} ${parrafoActual.Propiedades ? parrafoActual.Propiedades : ""} class="${
              parrafoActual.Clases
            }"> ${parrafoActual.Texto ? parrafoActual.Texto : ""} </${parrafoActual.Etiqueta}>`
          )
        })

        let tituloNota = $(".titulo-nota")
        tituloNota.html(nota.Titulo)
      }
    })

    // Animar en scroll
    const fadeElements = $(".fade-scroll")
    const optionsAppear = {
      threshold: 0.8,
    }
    const scrollObserver = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        else {
          entry.target.classList.add("fade-in")
          appearOnScroll.unobserve(entry.target)
        }
      })
    }, optionsAppear)

    for (let el of fadeElements) {
      scrollObserver.observe(el)
    }
  })
})

const indicadorScroll = $(".determinate")
$(window).scroll(function () {
  let altura = document.documentElement.scrollHeight - document.documentElement.clientHeight
  let porcentaje = (window.scrollY / altura) * 100
  indicadorScroll.width(porcentaje + "%")
})

const volverAHome = () => {
  containerNotas.hide()
  containerTitulares.show()
  $(".progress").css("display", "none")
}
