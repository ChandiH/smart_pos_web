
# Smart POS Web

Smart POS Web is a comprehensive Point-of-Sale (POS) frontend application built with React. It provides a modern, responsive interface for managing sales, inventory, employees, customers, suppliers, and more. This project is designed for retail businesses seeking an efficient and user-friendly POS solution.

## Features

- **Dashboard**: Visualize sales data, top-selling products, and branches with interactive charts.
- **Sales Management**: Create, view, and manage sales transactions, including cart and history views.
- **Inventory Management**: Track products, stock levels, and categories.
- **Customer & Supplier Management**: Add, edit, and view customer and supplier information.
- **Employee Management**: Manage employee records, roles, and profile images.
- **Authentication & Authorization**: Secure login, user roles, and access control.
- **Image Uploads**: Upload product and employee images.
- **Pagination & Search**: Efficiently navigate large datasets with built-in pagination and search components.
- **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.

## Technologies Used

- **React**: UI library for building interactive interfaces.
- **React Context API**: State management for cart and user data.
- **Jest**: Unit testing for components and utilities.
- **Custom Services**: API communication and business logic abstraction.
- **CSS**: Custom styles for a modern look and feel.

## Project Structure

```
smart_pos_web/
├── public/                # Static assets and index.html
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Contexts for global state
│   ├── screens/           # Main application screens/pages
│   ├── services/          # API and business logic services
│   ├── utils/             # Utility functions
│   ├── __tests__/         # Unit tests for components
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── ...
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
	```bash
	git clone https://github.com/ChandiH/smart_pos_web.git
	cd smart_pos_web
	```
2. **Install dependencies:**
	```bash
	npm install
	# or
	yarn install
	```
3. **Start the development server:**
	```bash
	npm start
	# or
	yarn start
	```
	The app will run at `http://localhost:3000`.

### Running Tests

Unit tests are located in the `src/__tests__/` directory. To run tests:

```bash
npm test
# or
yarn test
```

## Usage

- Log in with your credentials.
- Navigate through the dashboard, sales, inventory, employee, customer, and supplier screens using the navigation bar.
- Add, edit, or delete records as needed.
- Upload images for products and employees.
- Use search and pagination to find and manage records efficiently.

## Folder Overview

- `src/components/`: UI elements like tables, forms, charts, and navigation.
- `src/screens/`: Main pages (dashboard, login, profile, etc.).
- `src/services/`: Handles API requests and business logic.
- `src/context/`: Global state management (cart, user).
- `src/utils/`: Helper functions (e.g., pagination).
- `src/__tests__/`: Jest tests for components.

## Customization

- **API Endpoints**: Update service files in `src/services/` to match your backend API.
- **Styling**: Modify CSS files in `src/` for custom themes.
- **Components**: Extend or replace components in `src/components/` as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

ISC © Somesh Chandimal

---

## Contact

For questions or support, please contact the repository owner via GitHub.
