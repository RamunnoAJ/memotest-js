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

$botonJugar.addEventListener('click', configurarJuego)
$reiniciarJuego.addEventListener('click', reiniciarJuego)

function configurarJuego() {
  const coloresRepetidos = [...colores, ...colores]
  configurarBloques($bloques, coloresRepetidos)
  manejarEventos($tablero)
}

function manejarEventos($tablero) {
  $botonJugar.classList.add('ocultar')
  $reiniciarJuego.classList.remove('ocultar')
  $textoFinal.classList.add('ocultar')
  $tablero.classList.remove('ocultar')
  $tablero.addEventListener('click', (e) => {
    const $elemento = e.target

    if ($elemento.classList.contains('bloque')) {
      manejarClickBloque($elemento)
    }
  })
}

function manejarClickBloque($bloqueActual) {
  mostrarBloque($bloqueActual)

  if ($primerBloque === null) {
    $primerBloque = $bloqueActual
  } else {
    if ($primerBloque === $bloqueActual) {
      return
    }

    rondas++

    if (bloquesSonIguales($primerBloque, $bloqueActual)) {
      eliminarBloque($primerBloque)
      eliminarBloque($bloqueActual)
    } else {
      ocultarBloque($primerBloque)
      ocultarBloque($bloqueActual)
    }
    $primerBloque = null
  }
}

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

function reiniciarJuego() {
  window.location.reload()
}
