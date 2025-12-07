# GitHub Rated

GitHub kullanıcılarını analiz edip 0-100 arası bir "GitHub Rating" skoru üreten modern bir web uygulaması.

## 🚀 Özellikler

- **Kullanıcı Analizi**: GitHub kullanıcı profillerini detaylı analiz
- **Rating Sistemi**: 5 farklı kategoride skorlama:
  - Popularity (Popülerlik)
  - Activity (Aktivite)
  - Code Quality (Kod Kalitesi)
  - Community (Topluluk)
  - Diversity (Çeşitlilik)
- **Görselleştirme**: Radar chart ve bar chart ile interaktif grafikler
- **Dark Mode**: Karanlık ve aydınlık tema desteği
- **Responsive Design**: Mobil ve desktop uyumlu tasarım

## 🛠 Teknoloji Yığını

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Query** - Data fetching ve caching
- **Recharts** - Grafik görselleştirme
- **Axios** - HTTP client
- **Vitest** - Testing framework

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd GitScoreLab
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment değişkenlerini ayarlayın:
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyip GitHub Personal Access Token'ınızı ekleyin:
```
VITE_GITHUB_TOKEN=your_token_here
```

GitHub token oluşturmak için: [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

## 🚀 Çalıştırma

Development server'ı başlatın:
```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 🧪 Test

Testleri çalıştırın:
```bash
npm test
```

Test UI ile çalıştırın:
```bash
npm run test:ui
```

## 📊 Rating Hesaplama

Rating sistemi aşağıdaki formüllere göre çalışır:

### Popularity Score (30% ağırlık)
- Follower sayısı (60%)
- Toplam star sayısı (40%)

### Activity Score (25% ağırlık)
- Son 30 gün içinde güncellenen repo sayısı
- Son 90 gün içinde güncellenen repo sayısı

### Code Quality Score (20% ağırlık)
- Description'ı olan repo oranı (60%)
- En popüler repo'nun star sayısı (40%)

### Community Score (15% ağırlık)
- Follower + Following sayısı (60%)
- Toplam fork sayısı (40%)

### Diversity Score (10% ağırlık)
- Unique programlama dili sayısı

## 📁 Proje Yapısı

```
src/
├── components/       # React componentleri
├── hooks/           # Custom React hooks
├── services/        # API servisleri
├── types/           # TypeScript type tanımları
├── utils/           # Yardımcı fonksiyonlar
└── test/            # Test setup dosyaları
```

## 🔧 Build

Production build:
```bash
npm run build
```

Build önizleme:
```bash
npm run preview
```

## 📝 Lisans

MIT
