const URL = 'http://127.0.0.1:8080'

context('Memotest', () => {
  const NUMERO_BLOQUES = 16

  beforeEach(() => {
    cy.visit(URL)
    cy.get('#boton-jugar').click()
  })

  describe('verifica que se muestre el panel de juego', () => {
    it('se asegura que se muestren todas las fichas del juego', () => {
      cy.get('#tablero').find('.bloque').should('have.length', NUMERO_BLOQUES)
    })

    it('se asegura que el botón de reiniciar sea visible', () => {
      cy.get('#reiniciar-juego').should('be.visible')
    })

    it('se asegura que el tablero sea aleatorio', () => {
      cy.get('.bloque').then((bloques) => {
        let clasesOriginales = []

        bloques.each((i, bloque) => {
          clasesOriginales.push(bloque.className)
        })

        cy.get('#reiniciar-juego').click()
        cy.get('#boton-jugar').click()

        let clasesNuevas = []
        cy.get('.bloque').then((nuevosBloques) => {
          nuevosBloques.each((i, bloque) => {
            clasesNuevas.push(bloque.className)
          })

          cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas)
        })
      })
    })
  })

  describe('verifica la resolución del juego', () => {
    let mapaDePares
    let listaDePares

    it('elige una combinación errónea', () => {
      cy.get('.bloque').then((bloques) => {
        mapaDePares = obtenerPares(bloques)
        listaDePares = Object.values(mapaDePares)
        cy.get(listaDePares[0][0]).click()
        cy.get(listaDePares[1][0]).click()

        cy.get('.bloque').should('have.length', NUMERO_BLOQUES)
      })
    })
    it('resuelve el juego', () => {
      cy.get('.bloque').should('have.length', NUMERO_BLOQUES)
      cy.get('.bloque')
        .then((bloques) => {
          mapaDePares = obtenerPares(bloques)
          listaDePares = Object.values(mapaDePares)
        })
        .then(() => {
          listaDePares.forEach((par) => {
            cy.get(par[0]).click()
            cy.get(par[1]).click()
          })
        })

      cy.get('.bloque').should('have.length', 0)

      cy.get('#tablero').should('not.be.visible')

      const rondas = NUMERO_BLOQUES / 2

      cy.get('#fin-juego')
        .should('be.visible')
        .contains(
          `¡Felicitaciones! Terminaste el juego, tardaste ${rondas} turnos.`
        )

      cy.get('#reiniciar-juego').should('be.visible')
    })
  })
})

function obtenerPares(bloques) {
  const pares = {}

  bloques.each((i, bloque) => {
    const claseColor = bloque.className.replace('bloque ', '')

    if (pares[claseColor]) {
      pares[claseColor].push(bloque)
    } else {
      pares[claseColor] = [bloque]
    }
  })

  return pares
}
