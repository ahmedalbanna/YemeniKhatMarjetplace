# Yemeni Khat Marketplace

This is a Next.js application for a marketplace to buy and sell khat and accessories. Built with Next.js, TypeScript, and Tailwind CSS.

## Core Features

### 1. User Authentication & Roles
-   **Dual Roles**: Separate registration and login flows for **Customers** and **Vendors**.
-   **Role-Based Dashboards**: Users are automatically redirected to their respective dashboards (Customer or Vendor) upon login.
-   **Profile Management**: Users can view and update their personal information.

### 2. Marketplace & Product Discovery
-   **Product Catalog**: A central marketplace page (`/`) that displays all available khat products.
-   **Advanced Filtering**: Users can filter products by:
    -   Governorate (e.g., صنعاء, عدن).
    -   Market within a governorate (e.g., سوق باب اليمن).
    -   Khat Strain (e.g., أرحبي, صعدي).
-   **Detailed Product Pages**: Each product has a dedicated page showing:
    -   Multiple images in a carousel.
    -   Vendor information, rating, and reviews.
    -   Specific khat types (e.g., رؤوس, بزغة) with a **price per gram**.

### 3. Complex Order & Negotiation Workflow
The application simulates a realistic negotiation process:
1.  **Request Creation**: A customer selects quantities (in grams) for various khat types and sends a request to the vendor.
2.  **Delivery Options**: The customer chooses between "Pickup from store" or "Home Delivery", specifying an address if needed.
3.  **Vendor Approval**: The request appears in the vendor's dashboard as "Pending Approval". The vendor must first accept the request to initiate negotiation.
4.  **Live Negotiation**: Once approved, a chat interface opens for both parties within the order details page to negotiate the final price.
    -   An AI-powered "Suggest Reply" feature is available to assist the vendor in crafting professional, culturally appropriate responses in Arabic.
5.  **Final Price Offer**: The vendor proposes a final price.
6.  **Customer Payment**: If the customer accepts the final price, they proceed to a secure payment page.
7.  **Order Processing**: Once payment is complete, the order status changes to "Processing," signaling the vendor to prepare the shipment.
8.  **Confirmation of Receipt**: The customer has a button to confirm they have received the order, which completes the transaction cycle.

### 4. Customer Dashboard
A dedicated, sidebar-navigated dashboard for customers includes:
-   **Dashboard Overview**: A summary of wallet balance and recent/active orders.
-   **Order Management**: A detailed list of all past and current orders with their statuses. Customers can view order details and track their progress.
-   **Financial Wallet**:
    -   Displays the current balance.
    -   Allows users to deposit funds.
    -   Shows a complete history of all transactions (deposits, payments, refunds).
-   **Payment Page**: A secure page to complete payments for orders using Wallet Balance, Mobile Money, or Card.

### 5. Vendor Dashboard
A comprehensive, sidebar-navigated dashboard for vendors to manage their business:
-   **Dashboard Overview**: Key metrics like total revenue, active products, new orders, and overall rating.
-   **Product Management**: A full CRUD interface to add, view, edit, and delete products.
-   **Quote/Order Management**: A centralized table to view and manage all incoming quote requests and their statuses (Pending, Negotiating, Processing, Delivered, Cancelled).
-   **Inventory & Analytics**: A page displaying daily sales statistics and a monthly sales-record chart to track performance.

### 6. Support System
-   A support page with a FAQ section and a contact form for users to get help.
