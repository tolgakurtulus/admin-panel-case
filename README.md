#### TR ####

## Admin Panel Case ## 

Uygulama; ürün ve kullanıcıların listelenmesi, detaylarının görüntülenmesi, eklenmesi, düzenlenmesi ve silinmesi gibi tüm temel yönetim fonksiyonlarını kapsar. Gerçek bir backend yerine mock data + localStorage kullanılarak geliştirilmiştir.


## Kullanılan Teknolojiler ##

* React 19 + TypeScript
* Vite
* React Router v7
* TanStack React Query
* Redux Toolkit
* Ant Design v6
* ESLint + Prettier

## Proje Kurulumu ## 

npm install
npm run dev

Local: http://localhost:5173

## Proje çalışma süreci ## 

Proje geliştirme sürecinde öncelikle gereksinimler analiz edilmiş, ardından modüler ve ölçeklenebilir bir mimari kurgulanmıştır. React Query ile veri yönetimi, Redux ile global state ihtiyaçları ele alınmış, Ant Design üzerinden tema ve UI standardı sağlanmıştır. Mock API yapısı gerçek API davranışını taklit edecek şekilde tasarlanmış, performans, erişilebilirlik ve kod kalitesi öncelikli tutulmuştur.

## Mock API & Veri Yönetimi ## 

* Gerçek bir API yerine localStorage tabanlı mock servisler kullanılmıştır.
* İlk çalıştırmada mock veriler otomatik olarak seed edilir
* CRUD işlemleri localStorage üzerinden simüle edilir
* Favori ürünler, silinen ürünlerle senkron tutulur

Bu yaklaşım:
* Gerçek API davranışını simüle eder
* React-query kullanımını gerçekçi kılar

## Tasarım Kararları ##

* Sunucu benzeri durum (ürünler, kullanıcılar) için önbellekleme, geçersiz kılma ve eşzamansız akışları yönetmek amacıyla React Query kullanılır.
* Redux Toolkit yalnızca genel istemci tarafı durumu (favoriler) için kullanılır.
* Ölçeklenebilirlik için özellik tabanlı klasör yapısı tercih edilir.
* Gerçekçi geliştirme için gerçek arka uç davranışını simüle etmek amacıyla localStorage tabanlı sahte servisler kullanılır.

## Hata Yönetimi ##

* Servis katmanı anlamlı hatalar fırlatır
* React Query, eşzamansız hata durumlarını yönetir
* Kullanıcı geri bildirimi, kullanıcı arayüzü onayları ve yükleme göstergeleri aracılığıyla sağlanır

## Bilinen Sınırlamalar ##

* Mock API, localStorage tabanlıdır ve çok kullanıcılı kullanım için güvenli değildir.
* Kimlik doğrulama/yetkilendirme katmanı uygulanmamıştır.
* Gösterim ve örnek olay incelemesi amacıyla tasarlanmıştır.

## Ürün Yönetimi (Products) - Özellikler ## 

* Ürün listeleme
* Arama (search)
* Kategoriye göre filtreleme
* Favorilere ekleme / çıkarma
* Ürün detay sayfası
* Ürün ekleme
* Ürün güncelleme
* Ürün silme
* Favori Yönetimi
* Redux state üzerinden yönetilir
* localStorage ile kalıcıdır
* Server-state (products, users): TanStack React Query
* Client-state (favorites): Redux Toolkit
* UI’da görsel olarak ayrıştırılmıştır

## Kullanıcı Yönetimi (Users) - Özellikler ## 

* Kullanıcı listeleme
* Kullanıcı detay sayfası
* Kullanıcı ekleme
* Kullanıcı düzenleme
* Kullanıcı silme

## UI & Tema Yönetimi ## 

* Ant Design kullanılmıştır
* Light / Dark tema desteği vardır
* Custom theme token yapısı mevcuttur
* Responsive layout:
* Desktop: Sider
* Mobile: Drawer


## Performans & Optimizasyonlar ## 

* React Query cache & staleTime kullanımı
* Controlled re-fetch stratejisi
* Feature bazlı kod ayrımı

## Erişilebilirlik & UX ## 

* Ant Design erişilebilir bileşenler
* Keyboard navigasyon uyumu
* Responsive tasarım
* Kullanıcı geri bildirimleri (loading, confirm, empty state)

## Kod Kalitesi ## 

* ESLint + Prettier
* Tip güvenliği (TypeScript)
* Tekrar eden kodlardan kaçınılmıştır
* Açıklayıcı fonksiyon ve bileşen isimleri
* Side-effect’ler kontrollü şekilde yönetilmiştir

### Code Splitting & Lazy Loading

Uygulamada performansı artırmak amacıyla route bazlı lazy loading yaklaşımı kullanılmıştır.

* Products ve Users feature’ları ihtiyaç duyulduğunda yüklenir
* Detay ve form sayfaları lazy olarak yüklenir
* Ant Design ve temel kütüphaneler, Vite manualChunks yapılandırması ile ayrı bundle’lara bölünmüştür

Bu yaklaşım, ilk yükleme sırasında indirilen bundle boyutunu önemli ölçüde azaltır ve uygulamanın daha hızlı açılmasını sağlar.


## Mimari Yaklaşım ## 

src/
 ├─ app/                   → Global yapılandırmalar
 │   ├─ store.ts           → Redux Toolkit store
 │   └─ queryClient.ts     → TanStack React Query client
 │
 ├─ features/              → İş domain’leri (feature-based)
 │   ├─ products/          → Ürün yönetimi
 │   │   ├─ api/           → Mock servisler
 │   │   ├─ hooks/         → React Query hooks & mutations
 │   │   ├─ pages/         → Sayfa bileşenleri
 │   │   └─ types.ts       → Tip tanımları
 │   │
 │   ├─ users/             → Kullanıcı yönetimi
 │   │   ├─ api/
 │   │   ├─ hooks/
 │   │   ├─ pages/
 │   │   └─ types.ts
 │   │
 │   └─ favorites/         → Favori ürün state yönetimi
 │       └─ favoritesSlice.ts
 │
 ├─ components/            → Ortak, tekrar kullanılabilir bileşenler
 │   └─ FullPageLoader/
 │
 ├─ layouts/               → Sayfa iskeletleri
 │   └─ MainLayout.tsx
 │
 ├─ routes/                → Router tanımları
 │   └─ router.tsx
 │
 ├─ theme/                 → Tema & stil yönetimi
 │   ├─ ThemeProvider.tsx
 │   ├─ ThemeContext.tsx
 │   ├─ useTheme.ts
 │   └─ antdTheme.ts
 │
 ├─ App.tsx                → Uygulama kök bileşeni
 ├─ main.tsx               → React entry point
 └─ index.css              → Global stiller



#### EN ####

## Admin Panel Case ##

This application covers all core administration functionalities such as listing, viewing details, creating, updating, and deleting products and users.
Instead of a real backend, the project is developed using mock data powered by localStorage to simulate real API behavior.


## Technologies Used ##

* React 19 + TypeScript
* Vite
* React Router v7
* TanStack React Query
* Redux Toolkit
* Ant Design v6
* ESLint + Prettier


## Project Setup ##

npm install
npm run dev

Local: http://localhost:5173


## Project work process ##

During the project development process, requirements were first analyzed, and then a modular and scalable architecture was designed. Data management was handled with React Query, global state requirements with Redux, and theme and UI standardization was provided via Ant Design. The Mock API structure was designed to mimic the behavior of a real API, prioritizing performance, accessibility, and code quality.

## Mock API & Data Management ##

* localStorage-based mock services are used instead of a real API
* Mock data is automatically seeded on the first run
* CRUD operations are simulated via localStorage
* Favorite products are kept in sync with deleted products

This approach:

* Simulates real backend API behavior
* Makes React Query usage realistic and meaningful

## Design Decisions ##

* React Query is used for server-like state (products, users) to handle caching, invalidation, and async flows.
* Redux Toolkit is used only for global client-side state (favorites).
* Feature-based folder structure is preferred for scalability.
* localStorage-based mock services simulate real backend behavior for realistic development.

## Error Handling ##

* Service layer throws meaningful errors
* React Query handles async error states
* User feedback is provided via UI confirmations and loaders

## Known Limitations ##

* Mock API is localStorage-based and not multi-user safe
* No authentication/authorization layer implemented
* Designed for demonstration and case-study purposes

## Product Management - Features ##

* Product listing
* Search functionality
* Category-based filtering
* Add / remove favorites
* Product detail page
* Create product
* Update product
* Delete product
* Managed via Redux state
* Persisted using localStorage
* Server-state (products, users): TanStack React Query
* Client-state (favorites): Redux Toolkit
* Visually distinguished in the UI

## User Management - Features ##

* User listing
* User detail page
* Create user
* Edit user
* Delete user


## UI & Theme Management ##

* Built with Ant Design
* Light / Dark theme support
* Custom theme token configuration
* Responsive layout:
* Desktop: Sider
* Mobile: Drawer


## Performance & Optimizations ##

* React Query cache and `staleTime` usage
* Controlled re-fetch strategies
* Feature-based code separation


## Accessibility & UX ##

* Accessible Ant Design components
* Keyboard navigation support
* Responsive design
* User feedback mechanisms (loading states, confirmations, empty states)


## Code Quality ##

* ESLint + Prettier
* Type safety with TypeScript
* Avoidance of duplicated logic
* Descriptive function and component naming
* Controlled and predictable side-effect management

### Code Splitting & Lazy Loading

The application uses route-based lazy loading to improve performance.

- Products and Users features are loaded on demand
- Detail and form pages are lazy loaded
- Ant Design and core libraries are split into separate chunks via Vite manualChunks

This approach significantly reduces the initial bundle size and improves first load performance.



## Architectural Approach ##

src/
 ├─ app/                   → Global configurations
 │   ├─ store.ts           → Redux Toolkit store
 │   └─ queryClient.ts     → TanStack React Query client
 │
 ├─ features/              → Feature-based domain structure
 │   ├─ products/          → Product management
 │   │   ├─ api/           → Mock services
 │   │   ├─ hooks/         → React Query hooks & mutations
 │   │   ├─ pages/         → Page components
 │   │   └─ types.ts       → Type definitions
 │   │
 │   ├─ users/             → User management
 │   │   ├─ api/
 │   │   ├─ hooks/
 │   │   ├─ pages/
 │   │   └─ types.ts
 │   │
 │   └─ favorites/         → Favorite products state management
 │       └─ favoritesSlice.ts
 │
 ├─ components/            → Shared, reusable components
 │   └─ FullPageLoader/
 │
 ├─ layouts/               → Application layouts
 │   └─ MainLayout.tsx
 │
 ├─ routes/                → Routing configuration
 │   └─ router.tsx
 │
 ├─ theme/                 → Theme & styling
 │   ├─ ThemeProvider.tsx
 │   ├─ ThemeContext.tsx
 │   ├─ useTheme.ts
 │   └─ antdTheme.ts
 │
 ├─ App.tsx                → Root application component
 ├─ main.tsx               → React entry point
 └─ index.css              → Global styles



