describe('User Register', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.xpath('//*[@class="navbar-brand bg-warning p-2 rounded"]').should('have.text', 'Shop');
    });

    it('TC-Register', () => {
        cy.xpath('//*[@href="/register"]').click();
        cy.xpath('//form[@action="/register/add"]//*[@class="mb-3"]').should('have.text', 'Register User');

        cy.fixture('register').then((register) => {
            cy.xpath('//*[@id="username"]').type(register.username);
            cy.xpath('//small[@id="text-check"]//*[@class="text-success"]').should('have.text', 'Username can be used.');
            cy.xpath('//*[@id="user-password"]').type(register.password);
            cy.xpath('//*[@id="re-user-password"]').type(register.password);
            cy.xpath('//small[@id="text-show"]//*[@class="text-success"]').should('have.text', 'Password is same');
            cy.xpath('//*[@id="register"]').click();
            cy.wait(1000);
        });

        cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function register is successfully');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();
        cy.wait(1000);
        cy.fixture('register').then((user) => {
            cy.login(user.username, user.password);
            cy.xpath('//div[@id="navbarNavDropdown"]//*[@class="me-3"]')
                .invoke('text')
                .then((text) => {
                    const splitText = text.replace('Username : ', '').trim();
                    const userName = user.username;
                    if (splitText === userName) {
                        cy.log('LogTrue', `Check Username is true : ${splitText} to ${userName}`);
                    } else {
                        cy.log('LogError', `Check Username is true : ${splitText} to ${userName}`);
                    }
                });
        });
    });
})
