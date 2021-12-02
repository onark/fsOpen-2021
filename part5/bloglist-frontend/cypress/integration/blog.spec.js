
const { _ } = Cypress

describe('Login',function() {
    beforeEach(function() {
        cy.resetdb()
    })
    it('fails with wrong credentials', function() {
        cy.contains('log in').click()
        cy.contains('login').click()
        cy.get('input:first').type('root')
        cy.get('input:last').type('xalainen')
        cy.get('#login-button').click()
        cy.get('.error').contains('Wrong credentials')
    })

    it('succeeds with correct credentials', function() {
        cy.login({ username: 'root', password: 'salainen' })
        cy.contains('logged-in')
        cy.contains('Logout').click()
    })

})

describe('Blog app', function() {
    beforeEach(function() {
        cy.resetdb()
    })

    it('front page can be opened', function() {
        cy.contains('blogs')
    })

    it('login form can be opened', function() {
        cy.contains('log in').click()
        cy.contains('login').click()
        cy.contains('cancel').click()
    })

})

describe('when logged in', function() {
    it('reset and login', function() {
        cy.resetdb()
        cy.login({ username: 'root', password: 'salainen' })
    })

    it('create and like blog', function() {
        cy.createBlog({ title: 'a new blog by cypress', author: 'blog writer' })
        cy.likeBlog()
    })

    it('delete a blog', function() {
        cy.contains('Delete').click()
        cy.get('html').should('not.contain', 'a new blog by cypress')
    })
})

describe('Blog app like order', function() {
    it('reset and login', function() {
        cy.resetdb()
        cy.login({ username: 'root', password: 'salainen' })
    })

    it('create 3 blogs', function() {
        cy.createBlog({ title: 'first blog by cypress', author: 'blog writer1' })
        cy.createBlog({ title: 'second blog by cypress', author: 'blog writer2' })
        cy.createBlog({ title: 'third blog by cypress', author: 'blog writer3' })
        cy.wait(100)
    })

    it('like second blog', function () {
        cy.contains('blog writer1').parent().find('button').contains('Like').click()
        cy.wait(100)
        cy.contains('blog writer1').parent().find('button').contains('Like').click()
        cy.wait(100)
        cy.contains('blog writer1').parent().find('button').contains('Like').click()
        cy.wait(200)
        cy.contains('blog writer2').parent().find('button').contains('Like').click()
        cy.wait(100)
        cy.contains('blog writer1').parent().contains('3')
    })

    it('like order', function() {
        cy.log(cy.get('#likes'))
        cy.get('#likes').then((likes) => _.map(likes, Number)
        ).then((likes) => {
            const sorted = _.sortBy(likes)
            expect(likes, 'likes are sorted').to.deep.equal(sorted)
        })
    })

})