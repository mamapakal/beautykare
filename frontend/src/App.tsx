import { useState } from 'react'
import { Menu, X, Sparkles, Heart, Star, ChevronRight, Instagram, Mail, MapPin, Eye, Smile, Hand, Flower2, Wrench, ShoppingCart, Phone, Send, Trash2, Plus, Minus, MessageCircle } from 'lucide-react'
import './App.css'

/* ─── Types ─── */
interface Product {
  id: string
  name: string
  brand: string
  image: string
  description: string
  skinType: string
  price: number
  priceDisplay: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface Complemento {
  id: string
  name: string
  image: string
  description: string
  price: number
  priceDisplay: string
}

/* ─── Product Data ─── */
const productData: Record<string, Product[]> = {
  rostro: [
    {
      id: 'rostro-1',
      name: '10% Azelaic Acid Serum',
      brand: 'ANUA',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop',
      description: 'Sérum con ácido azelaico al 10% que ayuda a unificar el tono de la piel, reducir rojeces y controlar el exceso de sebo. Fórmula ligera de rápida absorción.',
      skinType: 'Piel mixta, grasa y con tendencia al acné',
      price: 28900,
      priceDisplay: '$28.900',
    },
    {
      id: 'rostro-2',
      name: 'Advanced Snail 96 Mucin Power Essence',
      brand: 'COSRX',
      image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=500&fit=crop',
      description: 'Esencia con 96% de extracto de baba de caracol filtrada. Hidrata en profundidad, repara la barrera cutánea y deja la piel luminosa y suave al tacto.',
      skinType: 'Todo tipo de piel, especialmente seca y deshidratada',
      price: 24500,
      priceDisplay: '$24.500',
    },
    {
      id: 'rostro-3',
      name: 'Glow Serum: Propolis + Niacinamida',
      brand: 'Beauty of Joseon',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=500&fit=crop',
      description: 'Sérum iluminador con extracto de propóleo y niacinamida. Nutre la piel en profundidad, reduce manchas y aporta un glow natural incomparable.',
      skinType: 'Piel opaca, sensible y con manchas',
      price: 19900,
      priceDisplay: '$19.900',
    },
    {
      id: 'rostro-4',
      name: 'Madagascar Centella Ampoule',
      brand: 'SKIN1004',
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=400&h=500&fit=crop',
      description: 'Ampolla calmante con centella asiática de Madagascar al 100%. Reduce irritación, rojeces y fortalece la barrera cutánea dañada.',
      skinType: 'Piel sensible, irritada y con rojeces',
      price: 22300,
      priceDisplay: '$22.300',
    },
  ],
  ojos: [
    {
      id: 'ojos-1',
      name: 'Retinal Eye Cream',
      brand: 'Beauty of Joseon',
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=500&fit=crop',
      description: 'Crema de contorno de ojos con retinal encapsulado y extracto de ginseng. Reduce líneas finas, ojeras y bolsas con una fórmula suave y nutritiva.',
      skinType: 'Piel madura y con signos de envejecimiento',
      price: 26500,
      priceDisplay: '$26.500',
    },
    {
      id: 'ojos-2',
      name: 'Advanced Snail Peptide Eye Cream',
      brand: 'COSRX',
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=500&fit=crop',
      description: 'Crema para el contorno de ojos con péptidos y baba de caracol. Reafirma, hidrata y suaviza las líneas de expresión del área ocular.',
      skinType: 'Todo tipo de piel',
      price: 23800,
      priceDisplay: '$23.800',
    },
    {
      id: 'ojos-3',
      name: 'Collagen Power Firming Eye Cream',
      brand: 'Mizon',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop',
      description: 'Crema reafirmante con 42% de colágeno marino. Reduce arrugas, mejora la elasticidad y aporta hidratación intensa al delicado contorno de ojos.',
      skinType: 'Piel madura, seca y con pérdida de firmeza',
      price: 18700,
      priceDisplay: '$18.700',
    },
  ],
  cuerpo: [
    {
      id: 'cuerpo-1',
      name: 'Aloe Soothing Sun Cream SPF50+',
      brand: 'COSRX',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop',
      description: 'Protector solar ligero con aloe vera que calma e hidrata la piel mientras ofrece alta protección UVA/UVB. No deja residuo blanco.',
      skinType: 'Todo tipo de piel, ideal para piel sensible',
      price: 16500,
      priceDisplay: '$16.500',
    },
    {
      id: 'cuerpo-2',
      name: 'Green Tea Seed Hyaluronic Body Lotion',
      brand: 'Innisfree',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=500&fit=crop',
      description: 'Loción corporal hidratante con semillas de té verde de Jeju y ácido hialurónico. Hidratación duradera con textura sedosa y aroma relajante.',
      skinType: 'Piel seca y normal',
      price: 21200,
      priceDisplay: '$21.200',
    },
    {
      id: 'cuerpo-3',
      name: 'Ceramide Ato Body Wash',
      brand: 'COSRX',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop',
      description: 'Gel de baño suave con ceramidas que limpia sin resecar. Fortalece la barrera cutánea y deja la piel suave e hidratada tras cada ducha.',
      skinType: 'Piel seca, sensible y atópica',
      price: 18900,
      priceDisplay: '$18.900',
    },
  ],
  manos: [
    {
      id: 'manos-1',
      name: 'Jeju Life Perfumed Hand Cream — Camellia',
      brand: 'Innisfree',
      image: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=400&h=500&fit=crop',
      description: 'Crema de manos perfumada con extracto de camelia de Jeju. Hidratación profunda con aroma floral delicado y textura no grasa de rápida absorción.',
      skinType: 'Todo tipo de piel',
      price: 9500,
      priceDisplay: '$9.500',
    },
    {
      id: 'manos-2',
      name: 'Peach Hand Cream',
      brand: 'Tony Moly',
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=500&fit=crop',
      description: 'Crema de manos con extracto de durazno en un envase adorable. Hidrata, suaviza y deja un aroma dulce y frutal irresistible en tus manos.',
      skinType: 'Piel seca y normal',
      price: 8200,
      priceDisplay: '$8.200',
    },
    {
      id: 'manos-3',
      name: 'Shea Butter Hand Cream — Cherry Blossom',
      brand: 'Innisfree',
      image: 'https://images.unsplash.com/photo-1609097172610-a9e5acf09893?w=400&h=500&fit=crop',
      description: 'Crema de manos enriquecida con manteca de karité y flor de cerezo. Nutrición intensa para manos secas con aroma primaveral encantador.',
      skinType: 'Piel seca y muy seca',
      price: 10300,
      priceDisplay: '$10.300',
    },
  ],
}

const complementos: Complemento[] = [
  {
    id: 'comp-1',
    name: 'Jade Roller Facial',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&h=500&fit=crop',
    description: 'Rodillo de jade natural para masaje facial. Estimula la circulación, reduce la hinchazón y ayuda a la absorción de sérums.',
    price: 14900,
    priceDisplay: '$14.900',
  },
  {
    id: 'comp-2',
    name: 'Gua Sha de Cuarzo Rosa',
    image: 'https://images.unsplash.com/photo-1608979048467-6194bfd12b3c?w=400&h=500&fit=crop',
    description: 'Herramienta de gua sha tallada en cuarzo rosa. Esculpe el rostro, drena líquidos y relaja la tensión muscular facial.',
    price: 12500,
    priceDisplay: '$12.500',
  },
  {
    id: 'comp-3',
    name: 'Sheet Masks de Seda — Pack x5',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    description: 'Mascarillas faciales de seda con diferentes principios activos: centella, niacinamida, propóleo, colágeno y aloe vera.',
    price: 15800,
    priceDisplay: '$15.800',
  },
  {
    id: 'comp-4',
    name: 'Set de Brochas de Aplicación',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop',
    description: 'Set de 3 brochas de silicona para aplicación precisa de mascarillas, sérums y tratamientos faciales. Higiénicas y reutilizables.',
    price: 11200,
    priceDisplay: '$11.200',
  },
  {
    id: 'comp-5',
    name: 'Banda Facial Elástica',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=500&fit=crop',
    description: 'Banda elástica de tela suave para mantener el cabello alejado del rostro durante tu rutina de skincare. Diseño elegante y cómodo.',
    price: 6900,
    priceDisplay: '$6.900',
  },
  {
    id: 'comp-6',
    name: 'Esponja Konjac Natural',
    image: 'https://images.unsplash.com/photo-1599847987606-758ea19587e2?w=400&h=500&fit=crop',
    description: 'Esponja konjac 100% natural para limpieza facial suave. Exfolia delicadamente y es ideal para todo tipo de piel, incluso la más sensible.',
    price: 7500,
    priceDisplay: '$7.500',
  },
]

type Page = 'home' | 'nosotros' | 'productos' | 'carrito' | 'contacto'
type ProductTab = 'rostro' | 'ojos' | 'cuerpo' | 'manos'

const productTabIcons: Record<ProductTab, React.ReactNode> = {
  rostro: <Smile className="w-5 h-5" />,
  ojos: <Eye className="w-5 h-5" />,
  cuerpo: <Flower2 className="w-5 h-5" />,
  manos: <Hand className="w-5 h-5" />,
}

const formatPrice = (price: number) => {
  return '$' + price.toLocaleString('es-CL')
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [productTab, setProductTab] = useState<ProductTab>('rostro')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showComplementos, setShowComplementos] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [contactSent, setContactSent] = useState(false)

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    setShowComplementos(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product: Product | Complemento) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      const cartProduct: Product = 'brand' in product
        ? product as Product
        : { ...product, brand: 'Herramienta', skinType: '', description: product.description, priceDisplay: product.priceDisplay }
      return [...prev, { product: cartProduct, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id !== productId) return item
      const newQty = item.quantity + delta
      return newQty > 0 ? { ...item, quantity: newQty } : item
    }))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSent(true)
    setTimeout(() => setContactSent(false), 4000)
    setContactForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white font-sans text-charcoal">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-camel-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group">
              <Sparkles className="w-7 h-7 text-camel-500 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" />
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-charcoal">
                Kare<span className="text-camel-500">Beauty</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {([
                { page: 'nosotros' as Page, label: 'Nosotros' },
                { page: 'productos' as Page, label: 'Productos' },
                { page: 'contacto' as Page, label: 'Contáctanos' },
              ]).map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => navigateTo(page)}
                  className={`relative text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:text-camel-500 py-2 ${
                    currentPage === page ? 'text-camel-500' : 'text-charcoal/60'
                  }`}
                >
                  {label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-camel-500 transition-all duration-500 ${
                    currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
              <button
                onClick={() => navigateTo('carrito')}
                className="relative p-3 text-charcoal/60 hover:text-camel-500 transition-all duration-300 hover:scale-110"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-camel-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile: cart + menu */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => navigateTo('carrito')}
                className="relative p-2 text-charcoal/60 hover:text-camel-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-camel-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-camel-500 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-camel-100 animate-fade-up">
            <div className="px-4 py-4 space-y-1">
              {(['nosotros', 'productos', 'contacto'] as Page[]).map((page) => (
                <button
                  key={page}
                  onClick={() => navigateTo(page)}
                  className="block w-full text-left px-4 py-3.5 text-sm font-semibold tracking-widest uppercase text-charcoal/60 hover:text-camel-500 hover:bg-camel-50 rounded-xl transition-all duration-300"
                >
                  {page === 'contacto' ? 'Contáctanos' : page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero / Home ─── */}
      {currentPage === 'home' && (
        <main>
          <section className="relative overflow-hidden bg-gradient-to-br from-camel-50 via-white to-warm min-h-screen flex items-center">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-80 h-80 bg-camel-200/20 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-32 right-20 w-96 h-96 bg-camel-100/30 rounded-full blur-3xl animate-float-delayed" />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-camel-300/10 rounded-full blur-3xl animate-float" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10 animate-fade-up">
                  <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2.5 rounded-full border border-camel-200 shadow-sm hover:shadow-md transition-shadow duration-500">
                    <Sparkles className="w-4 h-4 text-camel-500" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-camel-600">K-Beauty Premium</span>
                  </div>
                  <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-charcoal">
                    El secreto de la
                    <span className="block text-camel-500 italic mt-2">piel coreana</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-softgray max-w-lg leading-relaxed">
                    Descubre la rutina de skincare que ha revolucionado el mundo de la belleza.
                    Productos auténticos coreanos seleccionados para transformar tu piel.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigateTo('productos')}
                      className="group inline-flex items-center justify-center gap-2 bg-charcoal text-white px-10 py-5 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-camel-500 transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                      Ver Productos
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => navigateTo('nosotros')}
                      className="inline-flex items-center justify-center gap-2 bg-white text-charcoal px-10 py-5 rounded-full font-semibold text-sm tracking-wider uppercase border-2 border-camel-200 hover:border-camel-500 hover:text-camel-600 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-lg"
                    >
                      Conócenos
                    </button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="absolute -inset-4 bg-gradient-to-br from-camel-200/40 to-camel-100/20 rounded-3xl transform rotate-3 animate-float" />
                  <div className="absolute -inset-4 bg-gradient-to-tl from-camel-300/20 to-transparent rounded-3xl transform -rotate-2 animate-float-delayed" />
                  <img
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop"
                    alt="Rutina de skincare coreana"
                    className="relative rounded-3xl shadow-2xl object-cover w-full aspect-[4/5] hover:scale-[1.02] transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x700/faf6f1/b08968?text=KareBeauty' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-16">
                {[
                  { icon: <Heart className="w-8 h-8" />, title: '100% Auténtico', desc: 'Productos importados directamente de Corea del Sur con certificación de autenticidad.' },
                  { icon: <Star className="w-8 h-8" />, title: 'Selección Premium', desc: 'Curación experta de las mejores marcas y fórmulas del mercado K-Beauty.' },
                  { icon: <Sparkles className="w-8 h-8" />, title: 'Resultados Reales', desc: 'Ingredientes activos respaldados por la ciencia para una piel visiblemente transformada.' },
                ].map((feature, i) => (
                  <div key={feature.title} className="text-center space-y-5 group" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-camel-50 text-camel-500 rounded-3xl group-hover:bg-camel-500 group-hover:text-white transition-all duration-700 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:rotate-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-semibold">{feature.title}</h3>
                    <p className="text-softgray leading-relaxed max-w-xs mx-auto">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-charcoal relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 right-20 w-64 h-64 bg-camel-500/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-camel-400/5 rounded-full blur-3xl animate-float-delayed" />
            </div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
                Tu piel merece lo mejor
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                Explora nuestra colección completa de productos coreanos para cada parte de tu cuerpo.
                Desde sérums faciales hasta cremas de manos, tenemos todo lo que necesitas.
              </p>
              <button
                onClick={() => navigateTo('productos')}
                className="group inline-flex items-center gap-3 bg-camel-500 text-white px-12 py-5 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-camel-400 transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Explorar Colección
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </section>
        </main>
      )}

      {/* ─── Nosotros ─── */}
      {currentPage === 'nosotros' && (
        <main>
          <section className="py-24 bg-gradient-to-b from-camel-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-5 mb-20 animate-fade-up">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-camel-600 bg-camel-50 px-5 py-2.5 rounded-full border border-camel-100">Nuestra Historia</span>
                <h1 className="font-serif text-5xl sm:text-6xl font-bold text-charcoal">Nosotros</h1>
                <div className="w-24 h-1 bg-camel-500 mx-auto rounded-full" />
              </div>
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-camel-200/30 rounded-3xl transform rotate-2 group-hover:rotate-1 transition-transform duration-700" />
                  <img
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=500&fit=crop"
                    alt="Equipo KareBeauty"
                    className="relative rounded-3xl shadow-xl object-cover w-full h-80 lg:h-96 group-hover:shadow-2xl transition-shadow duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x500/faf6f1/b08968?text=KareBeauty+Team' }}
                  />
                </div>
                <div className="space-y-8 animate-fade-up">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                    Pasión por la belleza coreana
                  </h2>
                  <p className="text-softgray leading-relaxed text-lg">
                    <strong className="text-camel-600 font-semibold">KareBeauty</strong> nació de un amor profundo por la filosofía de skincare coreana,
                    donde el cuidado de la piel es un ritual, no una obligación. Creemos que cada persona
                    merece acceso a productos de la más alta calidad, formulados con ingredientes innovadores
                    y respaldados por décadas de investigación dermatológica.
                  </p>
                  <p className="text-softgray leading-relaxed text-lg">
                    Seleccionamos cada producto personalmente, viajando a Seúl para descubrir las marcas
                    más exclusivas y las fórmulas más avanzadas. Nuestro compromiso es traerte lo mejor
                    de la K-Beauty con la garantía de autenticidad que mereces.
                  </p>
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-camel-100">
                    {[
                      { number: '500+', label: 'Productos' },
                      { number: '50+', label: 'Marcas' },
                      { number: '10K+', label: 'Clientes Felices' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center group/stat">
                        <p className="font-serif text-3xl font-bold text-camel-500 group-hover/stat:scale-110 transition-transform duration-300">{stat.number}</p>
                        <p className="text-xs text-softgray uppercase tracking-wider mt-2">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Nuestros Valores</h2>
                <div className="w-24 h-1 bg-camel-500 mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: 'Autenticidad', desc: 'Solo trabajamos con distribuidores autorizados y verificamos cada producto.' },
                  { title: 'Transparencia', desc: 'Información clara sobre ingredientes, origen y beneficios de cada producto.' },
                  { title: 'Sustentabilidad', desc: 'Priorizamos marcas con empaques eco-friendly y fórmulas cruelty-free.' },
                  { title: 'Comunidad', desc: 'Creamos un espacio donde compartir conocimiento y experiencias de skincare.' },
                ].map((value, i) => (
                  <div key={value.title} className="bg-camel-50/50 rounded-3xl p-8 space-y-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-700 border border-camel-100/50" style={{ animationDelay: `${i * 100}ms` }}>
                    <h3 className="font-serif text-xl font-semibold text-charcoal">{value.title}</h3>
                    <p className="text-softgray leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="py-24 bg-charcoal relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-20 w-40 h-40 bg-camel-500/10 rounded-full blur-3xl animate-float" />
            </div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
              <Sparkles className="w-12 h-12 text-camel-400 mx-auto animate-float" />
              <blockquote className="font-serif text-2xl sm:text-4xl font-light text-white italic leading-relaxed">
                &ldquo;La belleza coreana no se trata de cubrir imperfecciones, sino de nutrir tu piel hasta que brille por sí misma.&rdquo;
              </blockquote>
              <p className="text-white/40 text-sm tracking-widest uppercase">— Filosofía KareBeauty</p>
            </div>
          </section>
        </main>
      )}

      {/* ─── Productos ─── */}
      {currentPage === 'productos' && (
        <main>
          <section className="py-16 sm:py-24 bg-gradient-to-b from-camel-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-5 mb-16 animate-fade-up">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-camel-600 bg-white/80 px-5 py-2.5 rounded-full border border-camel-100 shadow-sm">Colección K-Beauty</span>
                <h1 className="font-serif text-5xl sm:text-6xl font-bold text-charcoal">Productos</h1>
                <div className="w-24 h-1 bg-camel-500 mx-auto rounded-full" />
                <p className="text-softgray max-w-2xl mx-auto text-lg">
                  Nuestra selección cuidadosamente curada de los mejores productos de cosmética coreana
                </p>
              </div>

              {/* Product Sub-tabs + Complementos Toggle */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {(Object.keys(productTabIcons) as ProductTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setProductTab(tab); setShowComplementos(false) }}
                    className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-500 hover:-translate-y-0.5 ${
                      !showComplementos && productTab === tab
                        ? 'bg-charcoal text-white shadow-xl'
                        : 'bg-white text-softgray border-2 border-camel-100 hover:border-camel-400 hover:text-camel-600 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {productTabIcons[tab]}
                    {tab}
                  </button>
                ))}
                <button
                  onClick={() => setShowComplementos(true)}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-500 hover:-translate-y-0.5 ${
                    showComplementos
                      ? 'bg-charcoal text-white shadow-xl'
                      : 'bg-white text-softgray border-2 border-camel-100 hover:border-camel-400 hover:text-camel-600 shadow-sm hover:shadow-md'
                  }`}
                >
                  <Wrench className="w-5 h-5" />
                  Complementos
                </button>
              </div>

              {/* Product Grid */}
              {!showComplementos && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {productData[productTab].map((product, i) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-camel-100/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="relative overflow-hidden aspect-square bg-gradient-to-b from-camel-50 to-warm">
                        <img
                          src={product.image}
                          alt={`${product.brand} ${product.name}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x500/faf6f1/b08968?text=${encodeURIComponent(product.brand)}` }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full shadow-sm">
                            {product.brand}
                          </span>
                        </div>
                        {/* Add to cart overlay */}
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-white text-charcoal px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase shadow-xl hover:bg-camel-500 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                          >
                            Agregar al carrito
                          </button>
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="font-serif text-lg font-bold text-charcoal leading-snug min-h-12">
                          {product.name}
                        </h3>
                        <p className="text-softgray text-sm leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                        <div className="bg-camel-50 rounded-2xl px-4 py-3 space-y-1">
                          <p className="text-xs font-bold tracking-wider uppercase text-camel-600">Tipo de piel</p>
                          <p className="text-softgray text-sm">{product.skinType}</p>
                        </div>
                        <div className="pt-3 flex items-center justify-between">
                          <span className="font-serif text-2xl font-bold text-charcoal">{product.priceDisplay}</span>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-camel-500 text-white p-2.5 rounded-full hover:bg-camel-600 transition-all duration-300 hover:scale-110 shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complementos y Herramientas */}
              {showComplementos && (
                <div className="animate-fade-up">
                  <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Complementos y Herramientas</h2>
                    <p className="text-softgray mt-3 text-lg">Accesorios esenciales para potenciar tu rutina de skincare</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {complementos.map((item, i) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-camel-100/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="relative overflow-hidden aspect-square bg-gradient-to-b from-camel-50 to-warm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x500/faf6f1/b08968?text=${encodeURIComponent(item.name)}` }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-camel-500 text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full shadow-sm">
                              Herramienta
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => addToCart(item as unknown as Product)}
                              className="bg-white text-charcoal px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase shadow-xl hover:bg-camel-500 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                            >
                              Agregar al carrito
                            </button>
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <h3 className="font-serif text-lg font-bold text-charcoal leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-softgray text-sm leading-relaxed">
                            {item.description}
                          </p>
                          <div className="pt-3 flex items-center justify-between">
                            <span className="font-serif text-2xl font-bold text-charcoal">{item.priceDisplay}</span>
                            <button
                              onClick={() => addToCart(item as unknown as Product)}
                              className="bg-camel-500 text-white p-2.5 rounded-full hover:bg-camel-600 transition-all duration-300 hover:scale-110 shadow-md"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* ─── Carrito ─── */}
      {currentPage === 'carrito' && (
        <main className="min-h-screen bg-gradient-to-b from-camel-50 to-white">
          <section className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-5 mb-16 animate-fade-up">
                <ShoppingCart className="w-12 h-12 text-camel-500 mx-auto" />
                <h1 className="font-serif text-5xl font-bold text-charcoal">Tu Carrito</h1>
                <div className="w-24 h-1 bg-camel-500 mx-auto rounded-full" />
              </div>

              {cart.length === 0 ? (
                <div className="text-center space-y-8 py-20 animate-fade-up">
                  <div className="w-32 h-32 bg-camel-50 rounded-full mx-auto flex items-center justify-center">
                    <ShoppingCart className="w-16 h-16 text-camel-300" />
                  </div>
                  <p className="text-softgray text-xl">Tu carrito está vacío</p>
                  <button
                    onClick={() => navigateTo('productos')}
                    className="inline-flex items-center gap-2 bg-camel-500 text-white px-10 py-4 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-camel-600 transition-all duration-500 shadow-lg hover:-translate-y-1"
                  >
                    Explorar Productos
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-up">
                  {cart.map((item) => (
                    <div key={item.product.id} className="bg-white rounded-3xl p-6 flex items-center gap-6 shadow-sm border border-camel-100/50 hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/faf6f1/b08968?text=Product' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold tracking-wider uppercase text-camel-500">{item.product.brand}</p>
                        <h3 className="font-serif text-lg font-bold text-charcoal truncate">{item.product.name}</h3>
                        <p className="font-serif text-lg text-softgray mt-1">{item.product.priceDisplay}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-9 h-9 rounded-full bg-camel-50 text-camel-600 flex items-center justify-center hover:bg-camel-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-9 h-9 rounded-full bg-camel-50 text-camel-600 flex items-center justify-center hover:bg-camel-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right flex-shrink-0 w-28">
                        <p className="font-serif text-xl font-bold text-charcoal">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-softgray hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  {/* Cart Total */}
                  <div className="bg-charcoal rounded-3xl p-8 mt-8 text-white">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-white/60 text-lg">Subtotal ({cartCount} productos)</span>
                      <span className="font-serif text-3xl font-bold">{formatPrice(cartTotal)}</span>
                    </div>
                    <button className="w-full bg-camel-500 text-white py-5 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-camel-400 transition-all duration-500 shadow-lg hover:shadow-xl">
                      Proceder al Pago
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* ─── Contáctanos ─── */}
      {currentPage === 'contacto' && (
        <main className="min-h-screen bg-gradient-to-b from-camel-50 to-white">
          <section className="py-16 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-5 mb-16 animate-fade-up">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-camel-600 bg-camel-50 px-5 py-2.5 rounded-full border border-camel-100">Estamos aquí para ti</span>
                <h1 className="font-serif text-5xl sm:text-6xl font-bold text-charcoal">Contáctanos</h1>
                <div className="w-24 h-1 bg-camel-500 mx-auto rounded-full" />
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-10 animate-fade-up">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">¿Tienes preguntas?</h2>
                    <p className="text-softgray text-lg leading-relaxed">
                      Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos,
                      tu rutina de skincare, o pedidos. Escríbenos y te responderemos lo antes posible.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'hola@karebeauty.com', href: 'mailto:hola@karebeauty.com' },
                      { icon: <Phone className="w-6 h-6" />, title: 'Teléfono', value: '+56 9 1234 5678', href: 'tel:+56912345678' },
                      { icon: <Instagram className="w-6 h-6" />, title: 'Instagram', value: '@karebeauty', href: 'https://instagram.com/karebeauty' },
                      { icon: <MapPin className="w-6 h-6" />, title: 'Ubicación', value: 'Santiago, Chile', href: undefined },
                    ].map((contact) => (
                      <div key={contact.title} className="flex items-start gap-5 group">
                        <div className="w-14 h-14 bg-camel-50 rounded-2xl flex items-center justify-center text-camel-500 group-hover:bg-camel-500 group-hover:text-white transition-all duration-500 flex-shrink-0 group-hover:-translate-y-1 group-hover:shadow-lg">
                          {contact.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-wider uppercase text-camel-500 mb-1">{contact.title}</p>
                          {contact.href ? (
                            <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-charcoal text-lg hover:text-camel-600 transition-colors">
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-charcoal text-lg">{contact.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div className="animate-slide-in-right">
                  <form onSubmit={handleContactSubmit} className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-camel-100/50 space-y-6">
                    <div>
                      <label className="block text-xs font-bold tracking-wider uppercase text-camel-600 mb-2">Nombre</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-camel-100 focus:border-camel-400 focus:outline-none transition-colors bg-camel-50/30 text-charcoal placeholder-camel-300"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider uppercase text-camel-600 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-camel-100 focus:border-camel-400 focus:outline-none transition-colors bg-camel-50/30 text-charcoal placeholder-camel-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider uppercase text-camel-600 mb-2">Asunto</label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={e => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-camel-100 focus:border-camel-400 focus:outline-none transition-colors bg-camel-50/30 text-charcoal placeholder-camel-300"
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider uppercase text-camel-600 mb-2">Mensaje</label>
                      <textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-camel-100 focus:border-camel-400 focus:outline-none transition-colors bg-camel-50/30 text-charcoal placeholder-camel-300 resize-none"
                        placeholder="Cuéntanos más..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 bg-camel-500 text-white py-5 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-camel-600 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Mensaje
                    </button>
                    {contactSent && (
                      <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl text-center font-medium animate-fade-up border border-green-200">
                        <MessageCircle className="w-5 h-5 inline mr-2" />
                        ¡Mensaje enviado! Te responderemos pronto.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ─── Footer ─── */}
      <footer className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-5 md:col-span-1">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-camel-400" />
                <span className="font-serif text-2xl font-bold">Kare<span className="text-camel-400">Beauty</span></span>
              </div>
              <p className="text-white/40 leading-relaxed">
                Tu destino premium de cosmética coreana. Productos auténticos para una piel radiante.
              </p>
            </div>
            <div className="space-y-5">
              <h4 className="font-serif text-lg font-bold">Navegación</h4>
              <div className="space-y-3">
                {(['home', 'nosotros', 'productos', 'contacto'] as Page[]).map((page) => (
                  <button key={page} onClick={() => navigateTo(page)} className="block text-white/40 hover:text-camel-400 transition-all duration-300 hover:translate-x-1">
                    {page === 'home' ? 'Inicio' : page === 'contacto' ? 'Contáctanos' : page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h4 className="font-serif text-lg font-bold">Productos</h4>
              <div className="space-y-3">
                {(['Rostro', 'Ojos', 'Cuerpo', 'Manos', 'Complementos']).map((cat) => (
                  <button key={cat} onClick={() => { navigateTo('productos'); if (cat === 'Complementos') { setShowComplementos(true) } else { setProductTab(cat.toLowerCase() as ProductTab); setShowComplementos(false) } }} className="block text-white/40 hover:text-camel-400 transition-all duration-300 hover:translate-x-1">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h4 className="font-serif text-lg font-bold">Contacto</h4>
              <div className="space-y-4">
                <a href="mailto:hola@karebeauty.com" className="flex items-center gap-3 text-white/40 hover:text-camel-400 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  hola@karebeauty.com
                </a>
                <a href="https://instagram.com/karebeauty" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-camel-400 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                  @karebeauty
                </a>
                <p className="flex items-center gap-3 text-white/40">
                  <MapPin className="w-4 h-4" />
                  Santiago, Chile
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 text-center">
            <p className="text-white/20 text-sm">
              &copy; {new Date().getFullYear()} KareBeauty. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
