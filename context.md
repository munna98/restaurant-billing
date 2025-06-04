Restaurant Billing Software - Project Context
🎯 Project Overview
What is this project?
A complete offline-first restaurant billing software built as a desktop application using modern web technologies. The system operates entirely offline, storing all data locally using SQLite database, making it perfect for restaurants that need reliable POS functionality without depending on internet connectivity.
Target Users

Small to mid-sized restaurants (10-50 tables)
Quick service restaurants (QSR)
Cafes and food courts
Cloud kitchens with delivery/takeaway focus
Restaurants in areas with unreliable internet

🏗️ Architecture & Technical Decisions
Core Technology Stack
Desktop App:     Electron.js (Cross-platform desktop wrapper)
Frontend:        React 18 + Vite (Fast development & building)
UI Framework:    Tailwind CSS (Rapid styling)
State Mgmt:      Zustand (Lightweight, performant)
Database:        SQLite (File-based, zero-config)
ORM:             Prisma (Type-safe database operations)
Forms:           React Hook Form (Minimal re-renders)
Charts:          Recharts (Sales reports & analytics)
Why These Choices?
Electron.js

✅ Cross-platform (Windows, Mac, Linux)
✅ Native OS integration (printing, file system)
✅ No browser dependencies
✅ Can package SQLite database

SQLite + Prisma

✅ Zero configuration database
✅ ACID transactions for billing integrity
✅ File-based (easy backup/restore)
✅ Excellent performance for restaurant scale
✅ Type-safe queries with Prisma

React + Zustand

✅ Component reusability
✅ Fast state updates for real-time orders
✅ Smaller bundle than Redux
✅ Easy to test and debug

🍽️ Business Domain Model
Core Entities & Relationships
Restaurant
├── Users (Admin, Manager, Cashier, Waiter, Kitchen)
├── Menu Management
│   ├── Categories (Starters, Main, Beverages, Desserts)
│   └── Menu Items (with pricing, taxes, availability)
├── Table Management
│   ├── Dine-in Tables (status tracking)
│   └── Customer Info (takeaway/delivery)
├── Order Processing
│   ├── Order Creation (table/customer assignment)
│   ├── Order Items (quantity, notes, modifications)
│   └── Kitchen Display (order status tracking)
├── Billing System
│   ├── Invoice Generation (auto-numbering)
│   ├── Tax Calculations (GST/VAT support)
│   ├── Payment Processing (multiple modes)
│   └── Receipt Printing
└── Reporting
    ├── Sales Reports (daily/weekly/monthly)
    ├── Item Performance
    ├── Payment Analysis
    └── Export Options (CSV/PDF)
Business Rules
Menu Management

Items can be marked available/unavailable
Category-wise organization
Price and tax rate per item
Item types: VEG/NON_VEG/BEVERAGE/DESSERT

Order Processing

Order statuses: NEW → CONFIRMED → PREPARING → READY → SERVED
Item-level status tracking for kitchen
Table assignment for dine-in
Customer details for takeaway/delivery

Billing Rules

Auto-calculation: Subtotal + Tax - Discount = Total
Multiple payment modes supported
Partial payments allowed
Invoice numbering (auto-increment)

Access Control

Admin: Full system access, settings, reports
Manager: Menu, orders, reports (no system settings)
Cashier: Orders, billing, basic reports
Waiter: Order taking, table management
Kitchen: Kitchen display, kot
📁 Project Structure Deep Dive
Frontend Architecture
src/
├── components/           # Reusable UI components
│   ├── common/          # Header, Sidebar, Modal, etc.
│   ├── auth/            # Login, access control
│   ├── menu/            # Menu CRUD operations
│   ├── orders/          # Order management & kitchen display
│   ├── billing/         # Invoice, payment, printing
│   ├── tables/          # Table grid, customer forms
│   ├── types/           # for type scrpit
│   └── reports/         # Analytics and reporting
├── pages/               # Route-level components
├── store/               # Zustand state management
├── api/                 # Database operations layer
├── utils/               # Helper functions
└── styles/              # Global CSS and themes