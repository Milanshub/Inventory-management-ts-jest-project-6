describe('Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the homepage
    });

    it('should register a new user and log them out', () => {
        // Generate a unique email using a timestamp
        const uniqueEmail = `newuser${Date.now()}@example.com`;

        // Navigate to the registration page
        cy.contains('Register').click(); // Click the register button
        cy.url().should('include', '/register'); // Assert we are on the registration page

        // Fill in the registration form
        cy.get('input[type="name"]').type('John Doe');
        cy.get('input[type="email"]').type(uniqueEmail); // Use unique email
        cy.get('input[type="password"]').type('newpassword'); // Use a unique password
        cy.get('button[type="submit"]').click(); // Click the register button

        // Assert that we are redirected to the dashboard
        cy.url().should('include', '/dashboard');
        cy.contains('Total'); // Adjust based on your dashboard content

        // Log out the user
        cy.get('button[aria-label="Logout"]').click(); // Click the logout button
        cy.url().should('include', '/login'); // Assert we are redirected to the login page
    });

    it('should log in successfully', () => {
        cy.contains('Login').click(); // Click the login button
        cy.url().should('include', '/login'); // Assert we are on the login page

        // Fill in the login form
        cy.get('input[type="email"]').type('newusers@example.com'); // Use the registered email
        cy.get('input[type="password"]').type('newpassword'); // Use the same password
        cy.get('button[type="submit"]').click(); // Click the login button

        // Assert that we are redirected to the dashboard
        cy.url().should('include', '/dashboard');
        cy.contains('Total'); // Adjust based on your dashboard content
    });

    context('Product Management Flow', () => {
        it('should add a new product', () => {
            cy.contains('Login').click();
            cy.url().should('include', '/login');

            cy.get('input[type="email"]').type('newusers@example.com');
            cy.get('input[type="password"]').type('newpassword');
            cy.get('button[type="submit"]').click();

            cy.url().should('include', '/dashboard');
            cy.contains('Products').click();

            cy.url().should('include', '/products');

            cy.get('input[name="name"]').type('New Product');
            cy.get('input[name="quantity"]').type('10');
            cy.get('input[name="price"]').type('100');
            cy.get('button[type="submit"]').click();

            cy.contains('New Product').should('be.visible');
        });

        it('should edit the quantity of an existing product', () => {
            cy.contains('Login').click();
            cy.url().should('include', '/login');

            cy.get('input[type="email"]').type('newusers@example.com');
            cy.get('input[type="password"]').type('newpassword');
            cy.get('button[type="submit"]').click();

            cy.url().should('include', '/dashboard');
            cy.contains('Products').click();

            cy.url().should('include', '/products');

            cy.get('input[name="name"]').type('Editable Product');
            cy.get('input[name="quantity"]').type('5');
            cy.get('input[name="price"]').type('50');
            cy.get('button[type="submit"]').click();

            cy.contains('Editable Product').parents('tr').find('button').contains('Update').click({ multiple: true });

            cy.contains('Update Product').should('be.visible');
        });

        it('should delete a product', () => {
            cy.contains('Login').click();
            cy.url().should('include', '/login');

            cy.get('input[type="email"]').type('newusers@example.com');
            cy.get('input[type="password"]').type('newpassword');
            cy.get('button[type="submit"]').click();

            cy.url().should('include', '/dashboard');
            cy.contains('Products').click();

            cy.url().should('include', '/products');

            cy.get('input[name="name"]').type('Deletable Product');
            cy.get('input[name="quantity"]').type('8');
            cy.get('input[name="price"]').type('80');
            cy.get('button[type="submit"]').click();

            cy.contains('Deletable Product').parents('tr').find('button').contains('Delete').click();
            cy.on('window:confirm', () => true);

            cy.contains('Deletable Product').should('not.exist');
        });
    });
});
