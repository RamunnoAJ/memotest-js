const URL = 'http://127.0.0.1:8080'
const NUMERO_BLOQUES = 16

before(() => {
  cy.visit(URL)
})

describe('memotest', () => {
  it('se asegura que el juego inicia', () => {
    cy.get('#boton-jugar').click()

    cy.get('#tablero').find('.bloque').should('have.length', NUMERO_BLOQUES)
  })
})
