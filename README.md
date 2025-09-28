# Recruitment Platform Prototype

A modern, full-stack recruitment platform built with Django REST Framework and React, featuring JWT authentication, dark theme, and professional animations.

## 🚀 Features

### Backend (Django)
- **User Authentication**: JWT-based authentication with refresh tokens
- **User Registration**: Email and password registration with validation
- **User Profiles**: Comprehensive user profile management
- **RESTful API**: Clean API endpoints for all functionality
- **CORS Support**: Cross-origin resource sharing for React frontend
- **Database Models**: User profile with recruitment-specific fields

### Frontend (React)
- **Dark Theme**: Beautiful dark theme with system preference detection
- **Professional Animations**: Smooth animations using Framer Motion
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Glass morphism effects and gradient styling
- **Form Validation**: Client-side validation with error handling
- **Token Management**: Automatic JWT token refresh and storage

## 🛠 Tech Stack

### Backend
- **Django 5.2**: Web framework
- **Django REST Framework**: API development
- **Simple JWT**: JWT authentication
- **Django CORS Headers**: CORS support
- **SQLite**: Database (development)

### Frontend
- **React 19**: Frontend framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **React Router**: Client-side routing
- **Lucide React**: Icon library

## 🎨 Design Features

- **Dark Theme**: Default dark theme with toggle functionality
- **Professional Animations**: Smooth page transitions and hover effects
- **Glass Morphism**: Modern glassmorphism UI elements
- **Gradient Styling**: Beautiful gradients throughout the interface
- **Custom Components**: Reusable UI components with consistent styling

## 📦 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend/recruitmentPlatform
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   # For development with additional tools:
   pip install -r requirements-dev.txt
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/recruitmentPlatform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/token/refresh/` - Refresh JWT token

### User Profile
- `GET /api/profile/` - Get user profile
- `PATCH /api/profile/` - Update user profile
- `GET /api/user-info/` - Get current user info

## 🎯 Usage

1. **Registration**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Profile Management**: View and edit your profile information
4. **Theme Toggle**: Switch between dark and light themes
5. **Responsive Design**: Use on desktop, tablet, or mobile devices

## 🔧 Features Implemented

### User Management
- ✅ User registration with validation
- ✅ JWT-based authentication
- ✅ User profile creation and updates
- ✅ Password security and validation

### UI/UX
- ✅ Dark theme implementation
- ✅ Professional animations
- ✅ Responsive design
- ✅ Form validation and error handling
- ✅ Loading states and feedback

### Technical
- ✅ RESTful API design
- ✅ JWT token management
- ✅ CORS configuration
- ✅ React context for state management
- ✅ Protected routes and authentication guards

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple accent (#7c3aed)
- **Dark Theme**: Custom dark color palette
- **Gradients**: Multiple gradient combinations

### Typography
- **Font**: System fonts with fallbacks
- **Sizes**: Responsive typography scale
- **Weights**: Multiple font weights

### Components
- **Cards**: Glass morphism effect
- **Buttons**: Gradient styling with hover effects
- **Forms**: Consistent input styling
- **Animations**: Framer Motion transitions

## 📚 Documentation

- **[README.md](README.md)** - Project overview, setup, and basic features
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Comprehensive architectural documentation including:
  - API structure and design decisions
  - Authentication flow and security implementation
  - Error management and validation strategies
  - Scaling suggestions and production considerations
  - Performance optimization techniques
  - Security best practices
- **[docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** - Complete API reference with:
  - Detailed endpoint documentation
  - Request/response examples
  - Authentication requirements
  - Error handling patterns
  - Rate limiting information
- **[docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - Database design documentation with:
  - Complete schema definitions
  - Relationship diagrams
  - Index strategies
  - Migration patterns
  - Performance considerations

## 🚀 Future Enhancements

- Job posting and application system
- Advanced search and filtering
- File upload for resumes and documents
- Email notifications
- Company profiles for recruiters
- Admin dashboard
- Analytics and reporting

## 🤝 Contributing

This is a prototype project. Feel free to explore and extend the functionality based on your requirements.

## 📝 License

This project is for demonstration purposes. Use as needed for your recruitment platform needs.

---

**Built with ❤️ using Django and React**
