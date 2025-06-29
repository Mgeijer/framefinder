# FrameFinder - AI-Powered Face Shape Analysis & Eyeglass Recommendations

🎯 **Discover your perfect eyeglass style in seconds with AI-powered face shape detection.**

FrameFinder is a modern web application that uses TensorFlow.js and MediaPipe to analyze facial features and recommend personalized eyeglass frame styles. Built with Next.js 14, TypeScript, and Tailwind CSS with a beautiful Supabase theme.

## 🌟 Features

### Core Functionality
- **AI Face Detection**: Advanced TensorFlow.js face landmark detection
- **6 Face Shape Types**: Oval, Round, Square, Heart, Diamond, Triangle
- **Camera Integration**: Real-time webcam capture and photo upload
- **Personalized Recommendations**: Curated frame suggestions for each face shape
- **Expert Styling Tips**: Professional advice for optimal frame selection

### User Experience
- **Responsive Design**: Mobile-first approach with Supabase theme
- **Progressive Web App**: Fast loading and offline capabilities
- **Social Sharing**: Share results with friends and family
- **Results Export**: Download analysis results as JSON
- **Analytics Integration**: Comprehensive user journey tracking

### Monetization Ready
- **Ad Space Integration**: Header, sidebar, and footer ad placements
- **Affiliate Links**: Ready for eyewear retailer partnerships
- **Performance Optimized**: Fast loading for better ad revenue
- **SEO Optimized**: Built for organic traffic growth

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Modern browser with camera support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/framefinder.git
   cd framefinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or `http://127.0.0.1:3000` if localhost doesn't work)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with Supabase theme
- **Framer Motion** - Smooth animations
- **shadcn/ui** - High-quality UI components

### AI & Detection
- **TensorFlow.js** - Machine learning in the browser
- **MediaPipe Face Mesh** - Face landmark detection
- **React Webcam** - Camera integration

### Analytics & Monitoring
- **PostHog** - Product analytics and user tracking
- **Sentry** - Error monitoring (optional)
- **Vercel Analytics** - Performance monitoring

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 📊 Analytics Events

FrameFinder tracks comprehensive user analytics:

### Core Events
- `face_analysis_started` - User begins analysis
- `face_analysis_completed` - Successful detection
- `face_analysis_failed` - Detection errors
- `frame_recommendation_viewed` - User views recommendations
- `analysis_shared` - Social sharing
- `analysis_downloaded` - Results export

### Performance Events
- `model_load_time` - TensorFlow.js model loading
- `page_load_time` - Page performance
- `ad_impression` - Ad visibility tracking
- `affiliate_click` - Revenue tracking

## 🎨 Face Shape Detection

### Supported Face Shapes
1. **Oval** - Balanced proportions, versatile
2. **Round** - Soft curves, full cheeks
3. **Square** - Angular jawline, strong features
4. **Heart** - Wide forehead, narrow chin
5. **Diamond** - Prominent cheekbones
6. **Triangle** - Narrow forehead, wide jaw

### Algorithm
- **Landmark Detection**: 468-point MediaPipe face mesh
- **Measurement Calculation**: Facial ratios and proportions
- **Classification**: Rule-based system with confidence scoring
- **Accuracy**: >85% for well-lit, front-facing photos

## 💰 Monetization

### Ad Integration
- **Header Banner**: 728x90 leaderboard
- **Sidebar Ads**: 300x250 medium rectangle  
- **Footer Banner**: 728x90 leaderboard
- **Native Ads**: Between recommendations

### Affiliate Partnerships
- **Warby Parker**: 15-20% commission
- **Zenni Optical**: 8-12% commission
- **EyeBuyDirect**: 10-15% commission
- **Ray-Ban**: 5-8% commission

### Revenue Projections
- **Phase 1**: $500-2,000/month (10K visitors)
- **Phase 2**: $2,000-8,000/month (50K visitors)
- **Phase 3**: $8,000-25,000/month (200K+ visitors)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Set environment variables**:
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
   - `NEXT_PUBLIC_APP_URL`

3. **Deploy automatically** on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance Optimization

### Core Web Vitals Targets
- **LCP**: <2.5s (Largest Contentful Paint)
- **FID**: <100ms (First Input Delay)  
- **CLS**: <0.1 (Cumulative Layout Shift)

### Optimization Features
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Dynamic imports for TensorFlow.js
- **Caching**: Redis for face detection results
- **CDN**: Vercel Edge Network
- **Lazy Loading**: Non-critical components

## 🔒 Privacy & Security

### Data Protection
- **No Image Storage**: Photos processed client-side only
- **GDPR Compliant**: PostHog privacy controls
- **Secure Headers**: XSS and clickjacking protection
- **Privacy Policy**: Transparent data practices

### Security Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=self`

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Face detection accuracy
- **E2E Tests**: Complete user journey
- **Performance Tests**: Load time benchmarks

### Running Tests

```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run lighthouse  # Performance audit
```

## 📱 Browser Support

### Supported Browsers
- **Chrome** 88+ (recommended)
- **Safari** 14+
- **Firefox** 85+
- **Edge** 88+

### Mobile Support
- **iOS Safari** 14+
- **Android Chrome** 88+
- **Camera API** support required

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Conventional Commits**: Semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

### Documentation
- **Deployment Guide**: [docs/deployment.md](docs/deployment.md)
- **API Reference**: [docs/api.md](docs/api.md)
- **Analytics Setup**: [docs/analytics.md](docs/analytics.md)

### Getting Help
- **Issues**: GitHub Issues for bugs and feature requests
- **Discussions**: GitHub Discussions for questions
- **Email**: support@framefinder.com

---

## 🎯 Roadmap

### Phase 3: Advanced Features
- [ ] Virtual try-on with AR
- [ ] User accounts and saved results
- [ ] Advanced recommendation algorithm
- [ ] A/B testing framework
- [ ] Multi-language support

### Phase 4: Business Features
- [ ] Admin dashboard
- [ ] Custom branding options
- [ ] API for third-party integrations
- [ ] Premium subscription model
- [ ] White-label solutions

---

**Built with ❤️ by the FrameFinder Team**

*Helping people find their perfect eyeglass style through the power of AI*