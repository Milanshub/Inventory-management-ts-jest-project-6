import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Footer from '../../components/Footer';

describe('Footer component suite', () => {
    test('render the footer with current year and links', () => {
        render(<Footer />); 

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} Inventory Management. All rights reserved.`)).toBeInTheDocument();

        // Check if the Privacy Policy link is rendered
        const privacyLink = screen.getByText('Privacy Policy');
        expect(privacyLink).toBeInTheDocument();
        expect(privacyLink).toHaveAttribute('href', '/privacy');

        // Check if the Terms of Service link is rendered
        const termsLink = screen.getByText('Terms of Service');
        expect(termsLink).toBeInTheDocument();
        expect(termsLink).toHaveAttribute('href', '/terms');
    });
});