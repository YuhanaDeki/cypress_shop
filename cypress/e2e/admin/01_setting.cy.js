describe('Admin setup section setting', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('TC-Setting-Category', () => {
    cy.fixture('example').then((user) => {
      cy.login(user.username_admin, user.password_admin);
    });

    // btn setting
    cy.xpath('//div[@class="card-body"]//*[@href="/back/setting"]', { timeout: 5000 }).click();

    // create category
    cy.xpath('//*[@data-bs-target="#staticBackdrop"]', { timeout: 5000 }).click();
    cy.xpath('//*[@id="staticBackdropLabel"]', { timeout: 5000 }).should('have.text', 'Add Category');
    cy.xpath('//form[@action="/back/setting/category/add"]//*[@name="category-name"]').type(Cypress.env('category_name'));
    cy.xpath('//form[@action="/back/setting/category/add"]//*[@name="category-status"]').select('Open');
    cy.xpath('//*[@name="category-add"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function add category is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

    // search data
    cy.xpath('//*[@id="searchInput"]').type(Cypress.env('category_name'));
    cy.xpath('//*[@id="tableBody"]/tr/td[3]').should('have.text', Cypress.env('category_name'));

    // edit category data
    cy.xpath('//*[@data-bs-target="#editProduct1"]').click();
    cy.xpath('//*[@id="editProductLabel1"]').should('have.text', 'Edit Category');
    cy.xpath('//form[@action="/back/setting/category/edit"]//*[@id="category-name"]').clear();
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/category/edit"]//*[@id="category-name"]', { timeout: 5000 }).type(Cypress.env('category_name_edit'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/category/edit"]//*[@id="category-status"]').select('Close');
    cy.xpath('//*[@name="category-edit"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function edit category is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

    // search data edit
    cy.xpath('//*[@id="searchInput"]').type(Cypress.env('category_name_edit'));
    cy.xpath('//*[@id="tableBody"]/tr/td[3]').should('have.text', Cypress.env('category_name_edit'));

    // delete data
    cy.xpath('//tbody[@id="tableBody"]//*[@class="bi bi-trash3"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function delete category is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();
    cy.get('body').should('not.contain', Cypress.env('category_name_edit'));
  })

  it('TC-Setting-Role', () => {
    cy.fixture('example').then((user) => {
      cy.login(user.username_admin, user.password_admin);
    });
    // btn setting
    cy.xpath('//div[@class="card-body"]//*[@href="/back/setting"]', { timeout: 5000 }).click();

    // create role
    cy.xpath('//*[@id="pills-profile-tab"]').click();
    cy.xpath('//*[@data-bs-target="#staticBackdropRole"]').click();
    cy.xpath('//*[@id="staticBackdropLabelRole"]').should('have.text', 'Add Role');
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/role/add"]//*[@id="role-name"]').type(Cypress.env('role_name'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/role/add"]//*[@id="role-status"]').select('Open');
    cy.xpath('//*[@id="role-add"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function add role is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

    // search role data
    cy.xpath('//*[@id="pills-profile-tab"]').click();
    cy.xpath('//*[@id="searchInput-role"]').type(Cypress.env('role_name'));
    cy.xpath('//*[@id="tableBody-Role"]/tr/td[3]').should('have.text', Cypress.env('role_name'));

    // edit role data
    cy.xpath('//*[@data-bs-target="#editRole1"]').click();

    cy.xpath('//*[@id="editRoleLabel1"]').then(($el) => {
      const text = $el.text();
      if (text !== 'Edit Role') {
        cy.task('logError', `Expected 'Edit Role' but got '${text}'`);
      }
    });


    cy.xpath('//form[@action="/back/setting/role/edit"]//*[@id="role-name"]').should('be.visible');

    cy.xpath('//form[@action="/back/setting/role/edit"]//*[@id="role-name"]').clear();
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/role/edit"]//*[@id="role-name"]', { timeout: 5000 }).type(Cypress.env('role_name_edit'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/role/edit"]//*[@id="role-status"]').select('Close');
    cy.xpath('//*[@name="role-edit"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function edit role is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

    // search role data
    cy.xpath('//*[@id="pills-profile-tab"]').click();
    cy.xpath('//*[@id="searchInput-role"]').type(Cypress.env('role_name_edit'));
    cy.xpath('//*[@id="tableBody-Role"]/tr/td[3]').should('have.text', Cypress.env('role_name_edit'));

    // delete data
    cy.xpath('//tbody[@id="tableBody-Role"]//*[@class="bi bi-trash3"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function delete role is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();
    cy.xpath('//*[@id="pills-profile-tab"]').click();
    cy.xpath('//*[@id="searchInput-role"]').type(Cypress.env('role_name_edit'));
    cy.get('body').should('not.contain', Cypress.env('role_name_edit'));

  });

  it('TC-Setting-Bank', () => {
    cy.fixture('example').then((user) => {
      cy.login(user.username_admin, user.password_admin);
    });

    // btn setting
    cy.xpath('//div[@class="card-body"]//*[@href="/back/setting"]', { timeout: 5000 }).click();

    // create Bank 
    cy.xpath('//*[@id="pills-bank-tab"]').click();
    cy.xpath('//*[@data-bs-target="#staticBackdropBank"]').click();
    cy.xpath('//*[@id="staticBackdropLabelbank"]').should('have.text', 'Add Bank');
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/add"]//*[@id="bank-initial-name"]').type(Cypress.env('bank_init_name'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/add"]//*[@id="bank-full-name"]').type(Cypress.env('bank_full_name'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/add"]//*[@id="bank-status"]').select('Open');
    cy.xpath('//*[@id="bank-add"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function add bank is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

    // serach bank data
    cy.xpath('//*[@id="pills-bank-tab"]').click();
    cy.xpath('//*[@id="searchInput-bank"]').type(Cypress.env('bank_full_name'));
    cy.xpath('//*[@id="tableBody-bank"]/tr/td[4]').should('have.text', Cypress.env('bank_full_name'));

    // edit bank data
    cy.xpath('//tbody[@id="tableBody-bank"]//*[@class="bi bi-pencil-square"]').click();

    cy.xpath('//*[@id="editBankLabel1"]').then(($el) => {
      const text = $el.text();
      if (text !== 'Edit Bank') {
        cy.task('logError', `Expected 'Edit Role' but got '${text}'`);
      }
    });

    cy.xpath('//form[@action="/back/setting/bank/edit"]//*[@id="bank-initial-name-1"]').clear();
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/edit"]//*[@id="bank-initial-name-1"]', { timeout: 5000 }).type(Cypress.env('bank_init_name_edit'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/edit"]//*[@id="bank-full-name-1"]').clear();
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/edit"]//*[@id="bank-full-name-1"]', { timeout: 5000 }).type(Cypress.env('bank_full_name_edit'));
    cy.wait(1000);
    cy.xpath('//form[@action="/back/setting/bank/edit"]//*[@name="bank-status"]').select('Close');
    cy.xpath('//*[@name="bank-edit"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function edit bank is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

    // serach bank data
    cy.xpath('//*[@id="pills-bank-tab"]').click();
    cy.xpath('//*[@id="searchInput-bank"]').type(Cypress.env('bank_full_name_edit'));
    cy.xpath('//*[@id="tableBody-bank"]/tr/td[4]').should('have.text', Cypress.env('bank_full_name_edit'));

    // delete bank data
    cy.xpath('//tbody[@id="tableBody-bank"]//*[@class="bi bi-trash3"]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="swal2-html-container"]').should('have.text', 'Function delete bank is successfully');
    cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();
    cy.xpath('//*[@id="pills-bank-tab"]').click();
    cy.xpath('//*[@id="searchInput-bank"]').type(Cypress.env('bank_full_name_edit'));
    cy.get('body').should('not.contain', Cypress.env('bank_full_name_edit'));
  });
});

