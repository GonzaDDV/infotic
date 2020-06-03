// Indicador Scroll
let indicador_scroll = $(".determinate")
window.onscroll = (e) => {
  let altura =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  let porcentaje = (window.scrollY / altura) * 100
  indicador_scroll.width(porcentaje + "%")
}

// Get título de la nota
const tituloPagina = $(".titulo-nota")

var url = location.href
var urlFilename = url.substring(url.lastIndexOf("/") + 1)

$(document).ready(() => {
  $.getJSON("../notas.json", function (json) {
    for (let nota of json["Notas"]) {
      if (nota.Key + ".html" === urlFilename) {
        $(".titulo-nota").text(nota.Titulo)
        $(document).prop("title", `${nota.Titulo} - InfoTIC`)
      }
    }
  })
})
