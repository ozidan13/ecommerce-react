# E-Commerce React Application

## Overview
A modern e-commerce web application built with React, featuring product browsing, cart management, user authentication, and secure checkout functionality. The application provides a responsive and user-friendly interface for online shopping.

## Features
- **User Authentication**
  - Login/Register functionality
  - Protected routes
  - Token-based authentication
  - Session management

- **Product Management**
  - Product listing with categories
  - Detailed product views
  - Product image galleries
  - Product search and filtering
  - Category-based navigation

- **Shopping Cart**
  - Add/Remove products
  - Update quantities
  - Real-time cart total
  - Persistent cart data

- **Checkout System**
  - Secure payment processing
  - Order summary
  - Shipping information collection
  - Order confirmation

- **User Interface**
  - Responsive design
  - Loading states
  - Error handling
  - Toast notifications
  - Image sliders

## Technology Stack
- **Frontend Framework**: React.js
- **State Management**: React Context API
- **Routing**: React Router v7
- **API Client**: Axios
- **UI Components**:
  - Bootstrap v5.3.3
  - React Slick (for carousels)
  - React Hot Toast (for notifications)
  - React Loader Spinner
- **Form Handling**: Formik with Yup validation
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Font Awesome

## Project Structure
```
src/
├── components/
│   ├── Brands/
│   ├── Carts/
│   ├── Categories/
│   ├── CategoriesSlider/
│   ├── CheckOut/
│   ├── FeatureProducts/
│   ├── Footer/
│   ├── Home/
│   ├── LayOut/
│   ├── NavBar/
│   ├── NotFound/
│   ├── ProductDetails/
│   ├── Products/
│   ├── ProtectedRoutes/
│   ├── Register/
│   └── Signin/
├── context/
│   ├── cartContext.js
│   └── token.js
├── assets/
│   └── images/
├── App.js
└── index.js
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ozidan13/ecommerce-react.git
   ```

2. Navigate to project directory:
   ```bash
   cd ecommerce-react
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Integration
The application integrates with the following API endpoints:

- **Authentication**:
  - POST `/api/v1/auth/signin` - User login
  - POST `/api/v1/auth/signup` - User registration

- **Products**:
  - GET `/api/v1/products` - Fetch all products
  - GET `/api/v1/products/:id` - Fetch single product
  - GET `/api/v1/categories` - Fetch categories

- **Cart**:
  - GET `/api/v1/cart` - Fetch cart items
  - POST `/api/v1/cart` - Add to cart
  - DELETE `/api/v1/cart/:id` - Remove from cart
  - PUT `/api/v1/cart/:id` - Update cart item

- **Orders**:
  - POST `/api/v1/orders/checkout-session/:cartId` - Create checkout session

## Key Components

### Authentication
- Protected routes using `ProtectedRoutes` component
- Token-based authentication using localStorage
- Automatic token refresh
- Session management

### Product Display
- Grid layout for product listings
- Image galleries using React Slick
- Detailed product information
- Category-based filtering

### Shopping Cart
- Real-time cart updates
- Quantity management
- Price calculations
- Cart persistence

### Checkout Process
- Form validation using Formik
- Secure payment processing
- Order confirmation
- Error handling

## Error Handling
- API error handling
- Form validation errors
- Network error handling
- User feedback through toast notifications

## State Management
- Cart state using Context API
- Authentication state management
- Loading states
- Error states

## Styling
- Bootstrap for responsive design
- Custom CSS modules
- Font Awesome icons
- Responsive breakpoints

## Best Practices
- Component reusability
- Code splitting
- Error boundaries
- Loading states
- Accessibility features
- SEO optimization

## Known Issues and Solutions
1. **Route Navigation**:
   - Issue: Missing leading slash in product detail routes
   - Solution: Added leading slash to Link paths

2. **Data Structure**:
   - Issue: Inconsistent data handling
   - Solution: Implemented proper state management

3. **Cart Operations**:
   - Issue: Token handling in cart operations
   - Solution: Dynamic token retrieval

4. **Loading States**:
   - Issue: Inconsistent loading indicators
   - Solution: Added unified loading state management

## Future Improvements
1. Implement search functionality
2. Add product filtering
3. Enhance error handling
4. Improve performance optimization
5. Add unit tests
6. Implement wishlist feature
7. Add product reviews
8. Enhance mobile responsiveness

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
This project is licensed under the MIT License.

## Contact
For any queries or support, please contact [project maintainer].

## Acknowledgments
- React.js team
- Bootstrap team
- All contributors and maintainers
