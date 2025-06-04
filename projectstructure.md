restaurant-billing-app/
├── 📦 package.json
├── 📦 package-lock.json
├── ⚙️ electron.js
├── ⚙️ vite.config.ts
├── ⚙️ tailwind.config.ts
├── ⚙️ postcss.config.cjs
├── 📄 tsconfig.json
├── 📄 .env
├── 📄 .gitignore
├── 📄 README.md
│
├── 🗄️ prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── 🎨 src/
│   ├── 📄 main.tsx
│   ├── 📄 App.tsx
│   ├── 📄 index.css
│   │
│   ├── 🧩 components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── menu/
│   │   │   ├── MenuList.tsx
│   │   │   ├── MenuForm.tsx
│   │   │   ├── CategoryForm.tsx
│   │   │   └── MenuCard.tsx
│   │   │
│   │   ├── orders/
│   │   │   ├── OrderForm.tsx
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderItem.tsx
│   │   │   └── KitchenDisplay.tsx
│   │   │
│   │   ├── billing/
│   │   │   ├── BillForm.tsx
│   │   │   ├── BillList.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   └── InvoicePrint.tsx
│   │   │
│   │   ├── tables/
│   │   │   ├── TableGrid.tsx
│   │   │   ├── TableForm.tsx
│   │   │   └── CustomerForm.tsx
│   │   │
│   │   └── reports/
│   │       ├── SalesReport.tsx
│   │       ├── ItemReport.tsx
│   │       ├── PaymentReport.tsx
│   │       └── ExportOptions.tsx
│   │
│   ├── 📄 pages/
│   │   ├── Dashboard.tsx
│   │   ├── MenuManagement.tsx
│   │   ├── OrderManagement.tsx
│   │   ├── BillingPage.tsx
│   │   ├── TableManagement.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── LoginPage.tsx
│   │
│   ├── 🔄 store/
│   │   ├── index.ts
│   │   ├── authStore.ts
│   │   ├── menuStore.ts 
│   │   ├── orderStore.ts
│   │   ├── billingStore.ts
│   │   └── appStore.ts
│   │
│   ├── 🔌 api/
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   ├── menu.ts
│   │   ├── orders.ts
│   │   ├── billing.ts
│   │   ├── reports.ts
│   │   └── settings.ts
│   │
│   ├── 🛠️ utils/
│   │   ├── dateHelpers.ts
│   │   ├── formatters.ts
│   │   ├── calculations.ts
│   │   ├── validators.ts
│   │   ├── printer.ts
│   │   └── constants.ts
│   │
│   ├── 🎨 styles/
│   │   ├── components.css
│   │   ├── print.css
│   │   └── themes.css
│   │
│   └── 📚 types/
│       ├── common.d.ts
│       ├── auth.d.ts
│       ├── menu.d.ts
│       ├── orders.d.ts
│       ├── billing.d.ts
│       ├── tables.d.ts
│       ├── reports.d.ts
│       └── store.d.ts
│
├── 🖼️ public/
│   ├── index.html
│   ├── icon.png
│   └── assets/
│       ├── logo.png
│       └── icons/
│
├── 🗄️ data/
│   ├── restaurant.db (auto-created)
│   ├── backups/
│   └── exports/
│
└── 📋 docs/
    ├── API.md
    ├── SETUP.md
    ├── USER_GUIDE.md
    └── DEPLOYMENT.md