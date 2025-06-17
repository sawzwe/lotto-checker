# 🎲 Thai Lottery Checker - ตรวจสอบรางวัลหวย

A modern, responsive Thai lottery checker web application built with Next.js, TypeScript, and shadcn/ui components.

## ✨ Features

### Core Functionality
- **6-digit lottery number validation** with real-time input sanitization
- **Hierarchical prize matching logic** following official Thai lottery rules
- **Instant result display** with animated transitions
- **Mobile-first responsive design** optimized for all devices

### Prize Categories
1. **รางวัลที่ 1** (First Prize) - 6,000,000 บาท
2. **รางวัลที่ 2** (Second Prize) - 200,000 บาท  
3. **เลขหน้า 3 ตัว** (Front 3 digits) - 4,000 บาท
4. **เลขท้าย 3 ตัว** (Back 3 digits) - 4,000 บาท
5. **เลขท้าย 2 ตัว** (Last 2 digits) - 2,000 บาท

### User Experience
- **Confetti celebration** for winning numbers
- **Smooth animations** using Framer Motion
- **Multi-language support** (Thai/English) with persistent language switching
- **Dark/Light mode** toggle with system preference detection
- **Loading states** with skeleton components
- **Form validation** with helpful error messages
- **Accessibility features** built into shadcn/ui components

### Technical Features
- **TypeScript** for type safety
- **shadcn/ui** component library for consistent design
- **Tailwind CSS** for styling with mobile-first approach
- **React Hook Form** with Zod validation
- **Next.js 15** with App Router
- **Internationalization (i18n)** with React Context for language switching
- **Responsive design** for desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lotto-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Language Support

### Language Switching
- **Thai (ไทย)**: Default language for authentic Thai lottery experience
- **English**: Full English translation for international users
- **Language Toggle**: Click the 🌐 button in the top-right corner
- **Persistent Storage**: Language preference saved in localStorage
- **Dynamic Content**: All text, validation messages, and results update instantly

### Localized Features
- **Date formatting**: Thai Buddhist calendar vs. Western calendar
- **Currency display**: บาท (Thai Baht) vs. THB
- **Prize descriptions**: Culturally appropriate messaging
- **Form validation**: Language-specific error messages

## 🎯 How to Use

### Testing the Application

Try these winning numbers from the mock data:

#### Winning Numbers:
- **123456** - รางวัลที่ 1 (First Prize)
- **234567** - รางวัลที่ 2 (Second Prize)
- **345678** - รางวัลที่ 2 (Second Prize)
- **123xxx** - เลขหน้า 3 ตัว (e.g., 123999)
- **456xxx** - เลขหน้า 3 ตัว (e.g., 456111)
- **xxx789** - เลขท้าย 3 ตัว (e.g., 111789)
- **xxx890** - เลขท้าย 3 ตัว (e.g., 222890)
- **xxxx56** - เลขท้าย 2 ตัว (e.g., 111156)

#### Non-winning Number:
- **000000** - ไม่ถูกรางวัล (No prize)

### Prize Logic Hierarchy

The application checks numbers in the following priority order:

1. **Exact 6-digit match** for First Prize
2. **Exact 6-digit match** for Second Prize
3. **First 3 digits match** for Front 3 digits prize
4. **Last 3 digits match** for Back 3 digits prize
5. **Last 2 digits match** for Last 2 digits prize
6. **No match** - No prize

## 🛠️ Project Structure

```
lotto-checker/
├── app/
│   ├── globals.css          # Global styles with shadcn/ui setup
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main lottery checker page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   └── alert.tsx
│   ├── Result.tsx           # Animated result display component
│   ├── theme-provider.tsx   # Dark mode theme provider
│   └── language-provider.tsx # Multi-language support provider
├── lib/
│   ├── utils.ts             # shadcn/ui utility functions
│   ├── translations.ts      # Language translations (Thai/English)
│   └── mockData.ts          # Mock lottery data and logic
├── components.json          # shadcn/ui configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎨 Design System

### shadcn/ui Components Used
- **Button** - Primary actions and navigation
- **Card** - Content containers with consistent styling
- **Input** - Number input with validation
- **Form** - Form validation and field management
- **Badge** - Prize and number displays
- **Skeleton** - Loading state placeholders
- **Alert** - Result descriptions and messages

### Color Scheme
- **Primary**: Blue gradient (500-600)
- **Success**: Green for winning results
- **Error**: Red for non-winning results
- **Neutral**: Gray scale for UI elements
- **Prize Colors**: Yellow (1st), Silver (2nd), Green/Blue/Purple (others)

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Framer Motion** - Smooth animations
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework

### Dependencies
- **react-confetti** - Celebration effects
- **next-themes** - Dark mode support
- **lucide-react** - Icon library
- **@hookform/resolvers** - Form validation integration

## 📱 Mobile Optimization

- **Touch-friendly interface** with large tap targets
- **Responsive grid layouts** that adapt to screen size
- **Optimized animations** for mobile performance
- **Fast loading** with efficient component rendering
- **Accessible navigation** with keyboard support

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Environment Variables
No environment variables required for the current implementation.

## 🔮 Future Enhancements

- **Real lottery data API** integration
- **Historical results** tracking
- **Push notifications** for draw announcements
- **User accounts** and favorite numbers
- **Social sharing** features
- **Multi-language support** (English/Thai)
- **Progressive Web App** (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Thai lottery system** for the prize structure reference

---

**Happy checking! 🍀 Good luck with your lottery numbers! 🎰**
