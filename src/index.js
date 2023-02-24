const $botonJugar = document.querySelector('#boton-jugar')
const $reiniciarJuego = document.querySelector('#reiniciar-juego')
const $tablero = document.querySelector('#tablero')
const $rondas = document.querySelector('#rondas')
const $textoFinal = document.querySelector('#fin-juego')
const $columnas = document.querySelectorAll('.columna')
const $bloques = document.querySelectorAll('.bloque')

let rondas = 0
let $primerBloque = null

const colores = [
  'rojo',
  'violeta',
  'verde',
  'amarillo',
  'azul',
  'negro',
  'naranja',
  'celeste'
]

function configurarBloques($bloques, colores) {
  const coloresAleatorios = colores.sort(() => 0.5 - Math.random())

  coloresAleatorios.forEach((color, i) => {
    $bloques[i].classList.add(color)
  })
}
