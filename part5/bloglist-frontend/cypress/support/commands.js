// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('resetdb', () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', ({ title, author }) => {
    cy.contains('new blog').click()
    cy.get('#blogTitle').type(title)
    cy.get('#blogAuthor').type(author)
    cy.contains('Save').click()
    cy.contains('title')
})

Cypress.Commands.add('likeBlog', () => {
    cy.get('#like-button').click()
    cy.get('#likes').contains('1')
})
