# Inventory Management System

This project is an Inventory Management System built with TypeScript and tested with Cypress and Vitest. It helps manage and track inventory items efficiently.

## Features
- Add, update, and delete inventory items
- Search and filter items
- Track inventory levels
- Generate reports

## Technologies Used
- TypeScript
- Node.js
- Express.js
- Cypress
- MongoDB
- Vitest
- Docker

## Installation

1. **Clone the Repository**:
```bash
git clone https://github.com/Milanshub/Inventory-management-ts-jest-project-6.git
cd inventory-management-ts-jest-project-6
```

2. **Build the Backend Server**:
```bash
cd server
npm install
npm build
```

3. **Build the Frontend Client**:
```bash
cd ../client
npm install
npm build
```

4. **Start the Backend Server**:
```bash
cd ../server
npm start:dist
```

5. **Start the Frontend Client**:
```bash
cd ../client
start:build
```

## Build and Deploy Locally with Docker Compose

1. **Ensure Docker and Docker Compose are Installed.**

2. **Build and Start the Application**:
```bash
docker-compose up --build
```

## Kubernetes Deployment

1. **Ensure Kubernetes and kubectl are Installed.**

2. **Apply Kubernetes Configuration**:
```bash
kubectl apply -f k8s/
```

3. **Forward Ports to Access Services Locally**:
```bash
kubectl port-forward svc/client-service 3000:80 -n inventory-demo-app
kubectl port-forward svc/server-service 5000:5000 -n inventory-demo-app
```

## Running Tests

### Backend Tests (Server)
```bash
cd server
npm test
```

### Frontend Tests (Client)
```bash
cd client
# Run Component Tests
npm run cypress:run:component

# Run E2E Tests  
npm run cypress:run:e2e
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact [shubaevmilan@gmail.com].