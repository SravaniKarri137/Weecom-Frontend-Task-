# Product Management Dashboard

A simple **React + TailwindCSS** dashboard to manage products with CRUD operations, search, filtering, and pagination. Built using [shadcn/ui](https://ui.shadcn.com/) components for a modern UI.

---

## Features

- Fetch products from [DummyJSON API](https://dummyjson.com/docs/products)
- Add, edit, and delete products
- Search products by title
- Filter products by category
- Pagination
- Responsive layout with sidebar for filters
- Dialog-based forms for adding and editing products

---

## Tech Stack

- **React 18**
- **TailwindCSS**
- **shadcn/ui** (Card, Table, Button, Dialog, Input, Select)
- **React Hooks** for state management
- **JavaScript** (ES6+)

---


##Install dependencies

npm install


Run the development server

npm run dev


Project Structure
src/
├─ components/
│  ├─ products/
│  │  ├─ ProductForm.jsx
│  │  ├─ ProductRow.jsx
│  │  └─ ProductTable.jsx
├─ hooks/
│  └─ useProducts.js
├─ pages/
│  └─ ProductsPage.jsx
└─ App.jsx


components/products: UI components for the product table and forms

hooks/useProducts.js: Custom hook to fetch products and manage CRUD operations

pages/ProductsPage.jsx: Main page for displaying and managing products

Usage Guide

Open the Products page.

Click Add Product to add a new product.

Edit or delete existing products using the buttons in the table.

Use the Search input to filter products by title.

Select a category from the sidebar to filter products by category.

Navigate between pages using Previous, Next, or page numbers.

Notes

Product data is fetched from DummyJSON API
.

All changes (add/update/delete) are local and do not persist on the server.

Designed to be responsive for both desktop and mobile devices.
