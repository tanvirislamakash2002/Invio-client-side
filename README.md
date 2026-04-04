# Smart Inventory & Order Management System - Frontend

A modern, full-featured inventory management system for businesses to manage products, track stock levels, process customer orders, and handle restocking workflows efficiently.

## 🚀 Live Demo

[Live URL](https://invio-xi.vercel.app)

## 📋 Features

### 🔐 Authentication
- Email/Password signup and login
- Role-based access control (Admin, Manager, Staff)
- Demo login with pre-filled credentials for each role
- Session management with secure cookies

### 📦 Product Management
- Create, read, update, and delete products
- Set stock quantities and minimum threshold alerts
- Automatic status updates (Active/Out of Stock)
- Search and filter products by name, category, and status
- Pagination for large product catalogs

### 📁 Category Management
- Create and manage product categories
- Delete protection for categories with existing products
- Hierarchical organization of products

### 🛒 Order Management
- Create customer orders with multiple products
- Automatic stock deduction on order placement
- Real-time stock validation (prevents overselling)
- Update order status (Pending → Confirmed → Shipped → Delivered)
- Cancel orders with automatic stock restoration
- Search and filter orders by status, date, and customer
- Duplicate product prevention within same order
- Inactive product ordering prevention

### 📊 Restock Queue
- Automatic addition of products when stock falls below threshold
- Priority-based sorting (High/Medium/Low)
- Manual restock with quantity selection
- Remove products from queue
- Real-time stock updates

### 📈 Dashboard
- Key metrics overview (today's orders, pending orders, low stock count, revenue)
- Revenue chart for last 7 days
- Product stock summary with status indicators
- Recent orders list
- Recent activities log
- Real-time data updates

### 📝 Activity Log
- Track all system actions (order creation, status updates, stock changes)
- Filter by entity type (Order, Product, Category, Restock)
- Filter by action type
- Pagination support
- User information with timestamps

### 👥 User Management (Admin/Manager only)
- View all system users
- Change user roles (Staff, Manager, Admin)
- Activate/Deactivate user accounts
- Search and filter users by name, email, or role
- Role-based access restrictions

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components |
| **Lucide React** | Icons |
| **Recharts** | Dashboard charts |
| **date-fns** | Date formatting |
| **better-auth** | Authentication |
| **Zod** | Validation |

## 📁 Project Structure


src/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   └── (dashboard)/      # Protected pages
│       ├── dashboard/
│       ├── products/
│       ├── categories/
│       ├── orders/
│       ├── restock/
│       ├── activity/
│       └── users/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn components
│   ├── products/        # Product-specific components
│   ├── orders/          # Order-specific components
│   ├── dashboard/       # Dashboard components
│   └── ...
├── actions/             # Server actions
│   ├── auth.action.ts
│   ├── product.action.ts
│   ├── order.action.ts
│   └── ...
├── services/            # API service layer
│   ├── auth.service.ts
│   ├── product.service.ts
│   └── ...
├── lib/                 # Utilities
│   └── utils.ts
└── types/               # TypeScript interfaces


## 🚦 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- Backend API running (see backend repository)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/tanvirislamakash2002/Invio-client-side.git
cd Invio-client-side
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Variables**
Create a `.env.local` file in the root directory:
```env
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
API_URL=http://localhost:5000/api/v1
AUTH_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open browser**
Navigate to `http://localhost:3000`

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| Staff | staff@example.com | staff123 |

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px to 1024px)
- Mobile (below 768px)

## 🔒 Role-Based Access

| Feature | Admin | Manager | Staff |
|---------|-------|---------|-------|
| View Dashboard | ✅ | ✅ | ✅ |
| Manage Products | ✅ | ✅ | ❌ |
| Manage Categories | ✅ | ✅ | ❌ |
| Create Orders | ✅ | ✅ | ✅ |
| Update Order Status | ✅ | ✅ | ❌ |
| Cancel Orders | ✅ | ✅ | ❌ |
| View Restock Queue | ✅ | ✅ | ❌ |
| Restock Products | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ |
| View Activity Log | ✅ | ✅ | ✅ |

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📄 License

MIT © [Tanvir Islam Akash]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Tanvir Islam Akash - [tanvirislamakash2002@gmail.com](mailto:tanvirislamakash2002@gmail.com)

Project Link: [https://github.com/tanvirislamakash2002/Invio-client-side.git](https://github.com/tanvirislamakash2002/Invio-client-side.git)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
```