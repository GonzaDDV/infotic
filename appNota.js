// Indicador Scroll
let indicador_scroll = document.getElementsByClassName("determinate")[0]
window.onscroll = (e) => {
  let altura =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  let porcentaje = (window.scrollY / altura) * 100
  indicador_scroll.style.width = porcentaje + "%"
}
