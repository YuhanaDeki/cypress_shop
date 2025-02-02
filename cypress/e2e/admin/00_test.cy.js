describe('Test-Command', () => {
    it('TC-Click', () => {
        cy.visit('/');
        cy.clickBtn('//li[@class="nav-item menu-shop"]//*[@href="/product"]');
    })
});