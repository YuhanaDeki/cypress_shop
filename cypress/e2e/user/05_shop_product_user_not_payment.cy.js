describe('Shop product user not payment', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('TC-Select-Product-Checkout-None-Upload', () => {
        cy.fixture('login_user').then((login) => {
            cy.login(login.username, login.password);
        });
        cy.xpath('//*[@class="navbar-brand bg-warning p-2 rounded"]').should('have.text', 'Shop');
        cy.wait(1000);
        cy.xpath('//div[@id="navbarNavDropdown"]//*[@href="/product"]').click();
        cy.url().should('include', '/product');
        cy.wait(1000);
        cy.xpath('//*[@id="searchInput"]').type('Black Shirt');
        cy.wait(1000);
        cy.xpath('//*[@class="btn btn-primary"]').click();
        cy.xpath('//*[@id="product-value"]').clear();
        cy.wait(1000);
        cy.xpath('//*[@id="product-value"]').type('2{enter}');
        cy.wait(1000);

        cy.xpath('//*[@id="productPrice"]').invoke('val').then((value1) => {
            cy.xpath('//*[@id="product-result"]').invoke('val').then((value2) => {
                cy.xpath('//*[@id="product-value"]').invoke('val').then((value3) => {
                    const result = value1 * value3;

                    cy.log(`Product result : ${value1} x ${value3} = ${result} , result show is ${value2}`);

                    if (result == parseInt(value2)) {
                        cy.log(`Product result is equal html result show : ${result} = ${value2}`);
                        expect(result).to.equal(parseInt(value2));
                    } else {
                        cy.log(`Product result is not equal html result show : ${result} !== ${value2}`);
                        expect(result).to.equal(parseInt(value2));
                    }
                });

            });
        });

        cy.wait(1000);
        cy.xpath('//*[@id="product-id"]').click();
        cy.wait(1000);
        cy.on('window:alert', () => { });
        cy.wait(1000);
        cy.xpath('//*[@href="/payment"]').click();
        cy.url().should('include', '/payment');

        cy.fixture('checkoutList').then((item) => {
            cy.xpath('//*[@id="firstName"]').type(item.firstName);
            cy.xpath('//*[@id="lastName"]').type(item.lastName);
            cy.xpath('//*[@id="email"]').type(item.email);
            cy.xpath('//*[@id="address"]').type(item.address);
            cy.xpath('//*[@id="city"]').type(item.city);
            cy.xpath('//*[@id="zip"]').type(item.zip);
        });

        cy.xpath('//*[@name="payment-create"]').click();
        cy.wait(1000);
        cy.url().should('include', '/order');

        // cypress not new tab fix script this code into page and back to order page
        cy.xpath('(//*[@id="tableBody"]//td[1]/a)[last()]').invoke('attr', 'href').then((result) => {
            cy.visit(result);
            cy.contains('Black Shirt').should('be.visible');
            cy.go('back');
            cy.url().should('include', '/order');
        });

        // Check url request process is true || this is script run on jenkens for CI
        cy.xpath('(//*[@id="tableBody"]//td[1]/a)[last()]').invoke('attr', 'href').then((result) => {
            cy.request(result).its('status').should('eq', 200);
        });

        // officer appove      
        cy.xpath('//*[@href="/back/logout"]').click();
        cy.url().should('include', '/login');
        cy.xpath('//*[@href="/home"]').click();

        cy.fixture('login_officer').then((e) => {
            cy.login(e.username, e.password);
        });

        cy.wait(1000);
        cy.xpath('//div[@class="card-body"]//*[@href="/back/order"]').click();
        cy.url().should('include', '/back/order');

        // cypress not new tab fix script this code into page and back to order page
        cy.xpath('(//*[@id="tableBody"]//td[1]/a)[last()]').invoke('attr', 'href').then((url) => {
            cy.visit(`/back/${url}`);
            cy.contains('Black Shirt').should('be.visible');
            cy.go('back');
            cy.url().should('include', '/back/order');
        });

        //Check url request process is true || this is script run on jenkens for CI
        cy.xpath('(//*[@id="tableBody"]//td[1]/a)[last()]').invoke('attr', 'href').then((result) => {
            cy.request(`/back/${result}`).its('status').should('eq', 200);
        });

        //Check Payment Completed
        //cypress not new tab fix script this code into page and back to order page
        cy.xpath('(//*[@id="tableBody"]//td[4])[last()]')
            .invoke('text')
            .then((text) => {
                const textOnLastOrder = text;
                if (textOnLastOrder === "Not Payment Completed") {
                    cy.log("User not payment");
                } else {
                    cy.log("User Payment success");
                    cy.xpath('(//*[@id="tableBody"]/tr[9]/td[4]/a)[last()]').invoke('attr', 'href').then((result) => {
                        cy.visit(`/back/${result}`);
                        cy.fixture('checkoutList').then((item) => {
                            cy.xpath('//*[@id="firstName"]').should('have.text', item.firstName);
                            cy.xpath('//*[@id="lastName"]').should('have.text', item.lastName);
                            cy.xpath('//*[@id="email"]').should('have.text', item.email);
                            cy.xpath('//*[@id="address"]').should('have.text', item.address);
                            cy.xpath('//*[@id="city"]').should('have.text', item.city);
                            cy.xpath('//*[@id="zip"]').should('have.text', item.zip);
                        });
                        cy.go('back');
                        cy.url().should('include', '/back/order');
                    });

                    // Check url request process is true || this is script run on jenkens for CI
                    cy.xpath('(//*[@id="tableBody"]/tr[9]/td[4]/a)[last()]').invoke('attr', 'href').then((result) => {
                        cy.request(result).its('status').should('eq', 200);
                    });

                    cy.xpath('(//*[@id="tableBody"]//td[5]/a)[last()]').click();
                    cy.xpath('(//*[@id="tableBody"]//td[5]/a)[last()]').should('have.text', 'Cancel');
                }
            });


    });
});