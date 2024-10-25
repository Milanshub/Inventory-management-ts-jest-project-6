// cypress/e2e/auth.spec.cy.ts
describe('Authentication Flow', () => {
    beforeEach(() => {
      cy.visit('/'); // Visit the homepage
    });
  
    it('should navigate to login page', () => {
      cy.contains('Login').click(); // Click the login button
      cy.url().should('include', '/login'); // Assert that the URL includes /login
    });
  
    it('should log in successfully', () => {
      cy.contains('Login').click(); // Click the login button
      cy.url().should('include', '/login'); // Assert we are on the login page
  
      // Fill in the login form
      cy.get('input[type="email"]').type('m@m.com'); // Replace with valid email
      cy.get('input[type="password"]').type('m'); // Replace with valid password
      cy.get('button[type="submit"]').click(); // Click the login button
  
      // Assert that we are redirected to the dashboard
      cy.url().should('include', '/dashboard'); 
      cy.contains('Total'); // Adjust based on your dashboard content
    });
    it('should redirect back to login page on invalid login', () => {
        cy.contains('Login').click(); // Click the login button
        cy.url().should('include', '/login'); // Assert we are on the login page
      
        // Fill in the login form with invalid credentials
        cy.get('input[type="email"]').type('invalid@example.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click(); // Click the login button
      
        // Assert that the user is redirected back to the login page
        cy.url().should('include', '/login'); // Check if redirected to /login
      });
      
  
    it('should navigate to registration page', () => {
      cy.contains('Register').click(); // Click the register button
      cy.url().should('include', '/register'); // Assert we are on the registration page
    });
  
    it('should register a new user', () => {
      cy.contains('Register').click(); // Click the register button
      cy.url().should('include', '/register'); // Assert we are on the registration page
  
      // Fill in the registration form
      cy.get('input[type="name"]').type('John Does');
      cy.get('input[type="email"]').type('newusers@example.com');
      cy.get('input[type="password"]').type('newspassword');
      cy.get('button[type="submit"]').click(); // Click the register button
  
      // Assert that we are redirected to the dashboard
      cy.url().should('include', '/dashboard'); 
      cy.contains('Total'); // Adjust based on your dashboard content
    });
  });
  