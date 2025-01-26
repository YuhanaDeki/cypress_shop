describe('Admin setup user', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Section User', () => {
        cy.fixture('example').then((user) => {
            cy.login(user.username_admin, user.password_admin);
        });

        // btn user
        cy.xpath('//div[@class="card-body"]//*[@href="/back/user"]', { timeout: 5000 }).click();

        // create user
        cy.xpath('//*[@data-bs-target="#staticBackdrop"]').click();
        cy.wait(1000);
        cy.xpath('//*[@id="staticBackdropLabel"]').then(($el) => {
            const text = $el.text();
            if (text !== 'Add User') {
                cy.task('logError', `Expected 'Add User' but got '${text}'`);
            }
        });

        cy.fixture('user').then((user) => {
            cy.xpath('//*[@id="username"]').type(user.username);
            cy.xpath('//*[@id="user-password"]').type(user.password);
            cy.xpath('//*[@id="re-user-password"]').type(user.password);
        });

        cy.xpath('//*[@id="user-role"]').select('Admin');
        cy.xpath('//*[@id="user_submit"]').click();
        cy.wait(1000);
        cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function add user is successfully');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // search user data
        cy.fixture('user').then((user) => {
            cy.xpath('//*[@id="searchInput"]').type(user.username);
            cy.xpath('//*[@id="tableBody"]/tr/td[3]').should('have.text', user.username);
        });

        // edit user data
        cy.xpath('//*[@class="bi bi-pencil-square"]').click();
        cy.xpath('//*[@id="editUserLabel1"]').should('have.text', 'Edit User');

        cy.fixture('user').then((user) => {
            cy.wait(1000);
            cy.xpath('//*[@id="editFloatingInput1"]').clear();
            cy.wait(1000);
            cy.xpath('//*[@id="editFloatingInput1"]').type(user.username_edit);
            cy.wait(1000);
            cy.xpath('//*[@id="open-password-1"]').click();
            cy.wait(1000);
            cy.xpath('//*[@id="editFloatingPassword1"]').type(user.password_edit);
        });

        cy.xpath('//*[@id="editFloatingSelectGrid1"]').select('User');
        cy.xpath('//*[@id="user_edit_submit1"]').click();
        cy.wait(1000);
        cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function edit user is successfully');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // search user data
        cy.fixture('user').then((user) => {
            cy.xpath('//*[@id="searchInput"]').type(user.username_edit);
            cy.xpath('//*[@id="tableBody"]/tr/td[3]').should('have.text', user.username_edit);
        });



        // delete user data
        cy.xpath('//*[@class="bi bi-trash3"]').click();
        cy.wait(1000);
        cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function delete user is successfully');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // search user data
        cy.fixture('user').then((user) => {
            cy.xpath('//*[@id="searchInput"]').type(user.username_edit);
            cy.get('body').should('not.contain', user.username_edit);
        });

    });
});