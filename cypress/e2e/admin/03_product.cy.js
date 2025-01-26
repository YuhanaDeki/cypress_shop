describe('Admin-Product', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('example').then((result) => {
            cy.login(result.username_admin, result.password_admin);
        });
    });


    it('TC-Officer-Product', () => {
        // add data
        cy.url().should('include', '/back/dashboard');
        cy.xpath('//div[@class="card-body"]//*[@href="/back/product"]').click();
        cy.url().should('include', '/back/product');
        cy.xpath('//*[@data-bs-target="#staticBackdrop"]').click();
        cy.contains('Add Product').should('be.visible');
        cy.wait(1000);

        cy.fixture('admin_product').then((e) => {
            cy.xpath('//*[@id="product-name"]').type(e.productName);
            cy.xpath('//*[@id="product-description"]').type(e.productDes);
            cy.xpath('//*[@id="product-price"]').type(e.productPrice);
        });

        cy.xpath('//*[@id="product-category"]').select('Shirt');
        cy.xpath('//*[@id="product-status"]').select('Open');
        cy.xpath('//*[@id="product-img"]').attachFile('../fixtures/image/image_02.jpg');

        cy.xpath('//*[@id="product_submit"]').click();
        cy.wait(1000);
        cy.contains('Function add product is successfully').should('be.visible');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // serach data
        cy.fixture('admin_product').then((e) => {
            cy.xpath('//*[@id="searchInput"]').type(e.productName);
            cy.wait(1000);
            cy.contains(e.productName).should('be.visible');
        });

        // edit data
        cy.xpath('(//*[@class="bi bi-pencil-square"])[last()]').click();
        cy.contains('Edit Product').should('be.visible');

        cy.fixture('admin_product').then((e) => {
            cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-name"]').clear();
            cy.wait(1000);
            cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-name"]').type(e.productName_edit);
            cy.wait(1000);
            cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-description"]').clear();
            cy.wait(1000);
            cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-description"]').type(e.productDes_edit);
            cy.wait(1000);
            cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-price"]').clear();
            cy.wait(1000);
            cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-price"]').type(e.productPrice_edit);
            cy.wait(1000);
        });

        cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-category"]').select('Trousers');
        cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-status"]').select('Close');
        cy.xpath('//form[@action="/back/product/edit"]//*[@name="product_submit"]').click();
        cy.wait(1000);
        cy.contains('Function edit product is successfully').should('be.visible');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // serach data
        cy.fixture('admin_product').then((e) => {
            cy.xpath('//*[@id="searchInput"]').type(e.productName_edit);
            cy.wait(1000);
            cy.contains(e.productName_edit).should('be.visible');
        });

        // edit image
        cy.xpath('(//*[@class="bi bi-pencil-square"])[last()]').click();
        cy.contains('Edit Product').should('be.visible');
        cy.xpath('//*[@data-bs-target="#pills-profile-1"]').click();
        cy.xpath('//form[@action="/back/product/edit"]//*[@name="product-img"]').attachFile('../fixtures/image/test_image.jpg');
        cy.xpath('//button[@name="product-edit-image"]//*[@class="bi bi-arrow-right-circle"]').click();
        cy.contains('Function edit product is successfully').should('be.visible');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // serach data
        cy.fixture('admin_product').then((e) => {
            cy.xpath('//*[@id="searchInput"]').type(e.productName_edit);
            cy.wait(1000);
            cy.contains(e.productName_edit).should('be.visible');
        });

        // delete data
        cy.xpath('(//*[@class="bi bi-trash3"])[last()]').click();
        cy.wait(1000);
        cy.contains('Function delete product is successfully').should('be.visible');
        cy.xpath('//*[@class="swal2-confirm swal2-styled"]').click();

        // serach data
        cy.fixture('admin_product').then((e) => {
            cy.xpath('//*[@id="searchInput"]').type(e.productName_edit);
            cy.wait(1000);
            cy.get('body').should('not.contain', `${e.productName_edit}`);
        });
    });
});