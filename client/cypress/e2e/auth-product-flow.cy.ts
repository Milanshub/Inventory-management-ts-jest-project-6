describe('Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the homepage
    });

    it('should register a new user and log them out', () => {
        // Navigate to the registration page
        cy.contains('Register').click(); // Click the register button
        cy.url().should('include', '/register'); // Assert we are on the registration page

        // Fill in the registration form
        cy.get('input[type="name"]').type('John Doe');
        cy.get('input[type="email"]').type('newusers@example.com');
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
        cy.contains('Login').click(); // Click the login button
        cy.url().should('include', '/login'); // Assert we are on the login page

        // Fill in the login form
        cy.get('input[type="email"]').type('newusers@example.com'); // Use the registered email
        cy.get('input[type="password"]').type('newpassword'); // Use the same password
        cy.get('button[type="submit"]').click(); // Click the login button

        cy.url().should('include', '/dashboard'); // Assert we are on the dashboard
        cy.contains('Products').click(); // Click the Products link to navigate to the products page

        // Assert that we are on the products page
        cy.url().should('include', '/products'); // Assert we are on the products page

        // Fill in the product form
        cy.get('input[name="name"]').type('New Product');
        cy.get('input[name="quantity"]').type('10');
        cy.get('input[name="price"]').type('100');
        cy.get('button[type="submit"]').click(); // Click the save product button 

        // Assert that the product is displayed in the list
        cy.contains('New Product').should('be.visible');
    });

    it('should edit the quantity of an existing product', () => {
        cy.contains('Login').click(); // Click the login button
        cy.url().should('include', '/login'); // Assert we are on the login page
    
        // Fill in the login form
        cy.get('input[type="email"]').type('newusers@example.com'); // Use the registered email
        cy.get('input[type="password"]').type('newpassword'); // Use the same password
        cy.get('button[type="submit"]').click(); // Click the login button
    
        cy.url().should('include', '/dashboard'); // Assert we are on the dashboard
        cy.contains('Products').click(); // Click the Products link to navigate to the products page
    
        // Assert that we are on the products page
        cy.url().should('include', '/products'); // Assert we are on the products page
    
        // First, add a product to edit later
        cy.get('input[name="name"]').type('Editable Product'); // Add a product
        cy.get('input[name="quantity"]').type('5');
        cy.get('input[name="price"]').type('50');
        cy.get('button[type="submit"]').click(); // Save the new product
    
        // Now, edit the quantity of the product
        cy.contains('Editable Product').parents('tr').find('button').contains('Update').click(); // Click the update button for the product
    
        // Ensure the modal is visible before interacting with it
        cy.get('div[role="dialog"]').should('be.visible'); // Wait for the modal to be visible
    
        // Clear and enter new quantity
        cy.get('input[name="quantity"]').clear({ force: true }).type('10', { force: true }); // Clear and enter new quantity
    
        // Click the Update button using the data-testid (or directly if not using data-testid)
        cy.get('button[type="submit"]').contains('Update').click(); // Click the Update button
    
    });
    
    
        it('should delete a product', () => {
            cy.contains('Login').click(); // Click the login button
            cy.url().should('include', '/login'); // Assert we are on the login page
    
            // Fill in the login form
            cy.get('input[type="email"]').type('newusers@example.com'); // Use the registered email
            cy.get('input[type="password"]').type('newpassword'); // Use the same password
            cy.get('button[type="submit"]').click(); // Click the login button
    
            cy.url().should('include', '/dashboard'); // Assert we are on the dashboard
            cy.contains('Products').click(); // Click the Products link to navigate to the products page
    
            // Assert that we are on the products page
            cy.url().should('include', '/products'); // Assert we are on the products page
    
            // First, add a product to delete later
            cy.get('input[name="name"]').type('Deletable Product');
            cy.get('input[name="quantity"]').type('8');
            cy.get('input[name="price"]').type('80');
            cy.get('button[type="submit"]').click(); // Save the new product

            // Now, delete the product
            cy.contains('Deletable Product').parents('tr').find('button').contains('Delete').click(); // Click the delete button

            // Confirm the deletion in the confirmation dialog
            cy.on('window:confirm', () => true); // Automatically confirm the delete action

            // Assert that the product is removed
            cy.contains('Deletable Product').should('not.exist'); // Check that the product no longer exists
        });
    });
});
