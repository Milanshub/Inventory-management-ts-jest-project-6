import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // to simulate routing
import {Header} from '../../components/Header';
import { AuthContext } from '../../context/AuthContext';
import '@testing-library/jest-dom'; 
import { IUser } from '@/models/userModel';
import { authContextMock } from '../context/authContextMock';

describe('Header component suit', () => {
    test('renders the header with users and links', () => {
        const getAuthContextMock = authContextMock(); 

        render(
            <AuthContext.Provider value={getAuthContextMock}>
              <MemoryRouter>
                <Header />
              </MemoryRouter>
            </AuthContext.Provider>
          );

        // Check if the "Inventory Management" text is rendered
        expect(screen.getByText('Inventory Management')).toBeInTheDocument();

        // Check if the "Dashboard" button is rendered and has the correct link
        const dashboardButton = screen.getByText('Dashboard');
        expect(dashboardButton).toBeInTheDocument();
        expect(dashboardButton.closest('a')).toHaveAttribute('href', '/dashboard');

        // Check if the "Products" button is rendered and has the correct link
        const productsButton = screen.getByText('Products');
        expect(productsButton).toBeInTheDocument();
        expect(productsButton.closest('a')).toHaveAttribute('href', '/products');

        // Simulate clicking the logout button
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        // Ensure the logout function was called
        expect(getAuthContextMock.logout).toHaveBeenCalled();
        });
});


