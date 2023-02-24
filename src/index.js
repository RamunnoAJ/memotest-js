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

function bloquesSonIguales($bloque1, $bloque2) {
  return $bloque1.className === $bloque2.className
}

function mostrarBloque($bloque) {
  $bloque.style.opacity = '1'
}

function ocultarBloque($bloque) {
  setTimeout(() => {
    $bloque.style.opacity = '0'
  }, 300)
}

function eliminarBloque($bloque) {
  setTimeout(() => {
    $bloque.parentElement.classList.add('deshabilitar')
    $bloque.remove()
    $bloque.style.opacity = '0'
    evaluarFinDeJuego()
  }, 300)
}

function evaluarFinDeJuego() {
  if (document.querySelectorAll('.bloque').length === 0) {
    $tablero.classList.add('ocultar')
    $textoFinal.querySelector('span').textContent = rondas.toString()
    $textoFinal.classList.remove('ocultar')
  }
}
