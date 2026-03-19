import { useState } from 'react'
import { Menu, X, Sparkles, Heart, Star, ChevronRight, Instagram, Mail, MapPin, Eye, Smile, Hand, Flower2, Wrench, ShoppingCart, Phone, Send, Trash2, Plus, Minus, MessageCircle, Tag, Percent, Clock, ArrowUpRight, ArrowRight } from 'lucide-react'
import './App.css'

/* Types */
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

interface Oferta {
  id: string
  name: string
  brand: string
  image: string
  description: string
  skinType: string
  originalPrice: number
  originalPriceDisplay: string
  price: number
  priceDisplay: string
  discount: number
  tag: string
}

/* Product Data */
const productData: Record<string, Product[]> = {
  rostro: [
    { id: 'rostro-1', name: '10% Azelaic Acid Serum', brand: 'ANUA', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop', description: 'Sérum con ácido azelaico al 10% que ayuda a unificar el tono de la piel, reducir rojeces y controlar el exceso de sebo.', skinType: 'Piel mixta, grasa y con tendencia al acné', price: 28900, priceDisplay: '$28.900' },
    { id: 'rostro-2', name: 'Advanced Snail 96 Mucin Power Essence', brand: 'COSRX', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=400&h=500&fit=crop', description: 'Esencia con 96% de extracto de baba de caracol filtrada. Hidrata en profundidad y repara la barrera cutánea.', skinType: 'Todo tipo de piel, especialmente seca', price: 24500, priceDisplay: '$24.500' },
    { id: 'rostro-3', name: 'Glow Serum: Propolis + Niacinamida', brand: 'Beauty of Joseon', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop', description: 'Sérum iluminador con extracto de propóleo y niacinamida. Nutre la piel y aporta un glow natural.', skinType: 'Piel opaca, sensible y con manchas', price: 19900, priceDisplay: '$19.900' },
    { id: 'rostro-4', name: 'Madagascar Centella Ampoule', brand: 'SKIN1004', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=500&fit=crop', description: 'Ampolla calmante con centella asiática de Madagascar al 100%. Reduce irritación y fortalece la barrera cutánea.', skinType: 'Piel sensible, irritada y con rojeces', price: 22300, priceDisplay: '$22.300' },
  ],
  ojos: [
    { id: 'ojos-1', name: 'Retinal Eye Cream', brand: 'Beauty of Joseon', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop', description: 'Crema de contorno de ojos con retinal encapsulado y extracto de ginseng. Reduce líneas finas y ojeras.', skinType: 'Piel madura y con signos de envejecimiento', price: 26500, priceDisplay: '$26.500' },
    { id: 'ojos-2', name: 'Advanced Snail Peptide Eye Cream', brand: 'COSRX', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=500&fit=crop', description: 'Crema para el contorno de ojos con péptidos y baba de caracol. Reafirma e hidrata el área ocular.', skinType: 'Todo tipo de piel', price: 23800, priceDisplay: '$23.800' },
    { id: 'ojos-3', name: 'Collagen Power Firming Eye Cream', brand: 'Mizon', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=500&fit=crop', description: 'Crema reafirmante con 42% de colágeno marino. Reduce arrugas y mejora la elasticidad del contorno de ojos.', skinType: 'Piel madura, seca y con pérdida de firmeza', price: 18700, priceDisplay: '$18.700' },
  ],
  cuerpo: [
    { id: 'cuerpo-1', name: 'Aloe Soothing Sun Cream SPF50+', brand: 'COSRX', image: 'https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?w=400&h=500&fit=crop', description: 'Protector solar ligero con aloe vera que calma e hidrata. Alta protección UVA/UVB sin residuo blanco.', skinType: 'Todo tipo de piel, ideal para piel sensible', price: 16500, priceDisplay: '$16.500' },
    { id: 'cuerpo-2', name: 'Green Tea Seed Hyaluronic Body Lotion', brand: 'Innisfree', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop', description: 'Loción corporal hidratante con semillas de té verde de Jeju y ácido hialurónico. Textura sedosa.', skinType: 'Piel seca y normal', price: 21200, priceDisplay: '$21.200' },
    { id: 'cuerpo-3', name: 'Ceramide Ato Body Wash', brand: 'COSRX', image: 'https://images.unsplash.com/photo-1631390109941-3acc43a08b38?w=400&h=500&fit=crop', description: 'Gel de baño suave con ceramidas que limpia sin resecar. Fortalece la barrera cutánea.', skinType: 'Piel seca, sensible y atópica', price: 18900, priceDisplay: '$18.900' },
  ],
  manos: [
    { id: 'manos-1', name: 'Jeju Life Perfumed Hand Cream', brand: 'Innisfree', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745571?w=400&h=500&fit=crop', description: 'Crema de manos perfumada con extracto de camelia de Jeju. Hidratación profunda con aroma floral delicado.', skinType: 'Todo tipo de piel', price: 9500, priceDisplay: '$9.500' },
    { id: 'manos-2', name: 'Peach Hand Cream', brand: 'Tony Moly', image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&h=500&fit=crop', description: 'Crema de manos con extracto de durazno. Hidrata, suaviza y deja un aroma dulce irresistible.', skinType: 'Piel seca y normal', price: 8200, priceDisplay: '$8.200' },
    { id: 'manos-3', name: 'Shea Butter Hand Cream — Cherry Blossom', brand: 'Innisfree', image: 'https://images.unsplash.com/photo-1608979048467-6194bfd12b3c?w=400&h=500&fit=crop', description: 'Crema de manos enriquecida con manteca de karité y flor de cerezo. Nutrición intensa.', skinType: 'Piel seca y muy seca', price: 10300, priceDisplay: '$10.300' },
  ],
}

const complementos: Complemento[] = [
  { id: 'comp-1', name: 'Jade Roller Facial', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&h=500&fit=crop', description: 'Rodillo de jade natural para masaje facial. Estimula la circulación y reduce la hinchazón.', price: 14900, priceDisplay: '$14.900' },
  { id: 'comp-2', name: 'Gua Sha de Cuarzo Rosa', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=500&fit=crop', description: 'Herramienta de gua sha tallada en cuarzo rosa. Esculpe el rostro y drena líquidos.', price: 12500, priceDisplay: '$12.500' },
  { id: 'comp-3', name: 'Sheet Masks de Seda x5', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop', description: 'Mascarillas faciales de seda con centella, niacinamida, propóleo, colágeno y aloe vera.', price: 15800, priceDisplay: '$15.800' },
  { id: 'comp-4', name: 'Set de Brochas de Aplicación', image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=400&h=500&fit=crop', description: 'Set de 3 brochas de silicona para aplicación precisa de mascarillas y tratamientos faciales.', price: 11200, priceDisplay: '$11.200' },
  { id: 'comp-5', name: 'Banda Facial Elástica', image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=500&fit=crop', description: 'Banda elástica de tela suave para mantener el cabello alejado durante tu rutina de skincare.', price: 6900, priceDisplay: '$6.900' },
  { id: 'comp-6', name: 'Esponja Konjac Natural', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop', description: 'Esponja konjac 100% natural para limpieza facial suave. Ideal para todo tipo de piel.', price: 7500, priceDisplay: '$7.500' },
]

const ofertas: Oferta[] = [
  { id: 'oferta-1', name: 'Advanced Snail 96 Mucin Power Essence', brand: 'COSRX', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=500&fit=crop', description: 'Esencia con 96% de extracto de baba de caracol filtrada. Hidrata y repara la barrera cutánea.', skinType: 'Todo tipo de piel', originalPrice: 24500, originalPriceDisplay: '$24.500', price: 18900, priceDisplay: '$18.900', discount: 23, tag: 'Más vendido' },
  { id: 'oferta-2', name: 'Glow Serum: Propolis + Niacinamida', brand: 'Beauty of Joseon', image: 'https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?w=400&h=500&fit=crop', description: 'Sérum iluminador con propóleo y niacinamida. Nutre y aporta un glow natural.', skinType: 'Piel opaca y con manchas', originalPrice: 19900, originalPriceDisplay: '$19.900', price: 14900, priceDisplay: '$14.900', discount: 25, tag: 'Favorito' },
  { id: 'oferta-3', name: 'Jade Roller Facial', brand: 'KareBeauty Tools', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745571?w=400&h=500&fit=crop', description: 'Rodillo de jade natural para masaje facial. Estimula la circulación y reduce hinchazón.', skinType: 'Todo tipo de piel', originalPrice: 14900, originalPriceDisplay: '$14.900', price: 9900, priceDisplay: '$9.900', discount: 34, tag: 'Oferta flash' },
  { id: 'oferta-4', name: 'Sheet Masks de Seda x5', brand: 'KareBeauty', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop', description: 'Mascarillas faciales de seda con centella, niacinamida, propóleo, colágeno y aloe vera.', skinType: 'Todo tipo de piel', originalPrice: 15800, originalPriceDisplay: '$15.800', price: 11500, priceDisplay: '$11.500', discount: 27, tag: 'Pack ahorro' },
  { id: 'oferta-5', name: 'Madagascar Centella Ampoule', brand: 'SKIN1004', image: 'https://images.unsplash.com/photo-1631390109941-3acc43a08b38?w=400&h=500&fit=crop', description: 'Ampolla calmante con centella asiática de Madagascar al 100%. Reduce irritación.', skinType: 'Piel sensible e irritada', originalPrice: 22300, originalPriceDisplay: '$22.300', price: 16900, priceDisplay: '$16.900', discount: 24, tag: 'Recomendado' },
  { id: 'oferta-6', name: 'Retinal Eye Cream', brand: 'Beauty of Joseon', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=500&fit=crop', description: 'Crema de contorno de ojos con retinal encapsulado y extracto de ginseng.', skinType: 'Piel madura', originalPrice: 26500, originalPriceDisplay: '$26.500', price: 19900, priceDisplay: '$19.900', discount: 25, tag: 'Novedad' },
]

type Page = 'home' | 'nosotros' | 'productos' | 'ofertas' | 'carrito' | 'contacto'
type ProductTab = 'rostro' | 'ojos' | 'cuerpo' | 'manos'

const productTabIcons: Record<ProductTab, React.ReactNode> = {
  rostro: <Smile className="w-4 h-4" />,
  ojos: <Eye className="w-4 h-4" />,
  cuerpo: <Flower2 className="w-4 h-4" />,
  manos: <Hand className="w-4 h-4" />,
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
    <div className="min-h-screen bg-cream font-sans text-charcoal antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-3 sm:mx-6 lg:mx-8 mt-3 sm:mt-4">
          <div className="bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/50 shadow-lg shadow-charcoal/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2.5 group">
                  <div className="w-8 h-8 bg-charcoal rounded-xl flex items-center justify-center group-hover:rounded-lg transition-all duration-500">
                    <Sparkles className="w-4 h-4 text-camel-400" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-charcoal">
                    kare<span className="text-camel-500">beauty</span>
                  </span>
                </button>

                <nav className="hidden lg:flex items-center gap-1">
                  {([
                    { page: 'nosotros' as Page, label: 'Nosotros' },
                    { page: 'productos' as Page, label: 'Productos' },
                    { page: 'ofertas' as Page, label: 'Ofertas' },
                    { page: 'contacto' as Page, label: 'Contacto' },
                  ]).map(({ page, label }) => (
                    <button
                      key={page}
                      onClick={() => navigateTo(page)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-charcoal text-white'
                          : 'text-softgray hover:text-charcoal hover:bg-camel-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                  <div className="w-px h-6 bg-camel-200 mx-2" />
                  <button
                    onClick={() => navigateTo('carrito')}
                    className="relative p-2.5 text-softgray hover:text-charcoal hover:bg-camel-50 rounded-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-camel-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </nav>

                <div className="flex items-center gap-2 lg:hidden">
                  <button onClick={() => navigateTo('carrito')} className="relative p-2 text-softgray hover:text-charcoal transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-camel-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                    )}
                  </button>
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-charcoal hover:text-camel-500 transition-colors">
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mx-3 sm:mx-6 mt-2">
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/50 shadow-lg p-2 animate-fade-up">
              {(['nosotros', 'productos', 'ofertas', 'contacto'] as Page[]).map((page) => (
                <button
                  key={page}
                  onClick={() => navigateTo(page)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    currentPage === page ? 'bg-charcoal text-white' : 'text-softgray hover:text-charcoal hover:bg-camel-50'
                  }`}
                >
                  {page === 'contacto' ? 'Contacto' : page === 'ofertas' ? 'Ofertas' : page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="h-20 sm:h-24" />

      {/* HOME */}
      {currentPage === 'home' && (
        <main className="px-3 sm:px-6 lg:px-8">
          <section className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
              <div className="lg:col-span-8 bg-camel-100/60 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden min-h-80 sm:min-h-96 flex flex-col justify-end">
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                  <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-camel-300/30 blur-3xl" />
                </div>
                <div className="absolute top-16 right-20 sm:top-20 sm:right-32">
                  <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-camel-400/20 blur-2xl animate-float" />
                </div>
                <div className="relative space-y-5 sm:space-y-6 max-w-xl animate-fade-up">
                  <p className="text-xs font-semibold tracking-widest uppercase text-camel-600">K-Beauty Premium 2026</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-none tracking-tight text-charcoal">
                    El ritual de la
                    <span className="block text-camel-500 mt-1">piel perfecta</span>
                  </h1>
                  <p className="text-softgray text-sm sm:text-base max-w-md leading-relaxed">
                    Cosm&#233;tica coreana aut&#233;ntica. Ciencia avanzada. Resultados visibles desde la primera aplicaci&#243;n.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => navigateTo('productos')} className="group inline-flex items-center justify-center gap-2 bg-charcoal text-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-camel-600 transition-all duration-300">
                      Ver colecci&#243;n
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button onClick={() => navigateTo('nosotros')} className="inline-flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm text-charcoal px-7 py-3.5 rounded-xl font-medium text-sm border border-camel-200/50 hover:bg-white transition-all duration-300">
                      Nuestra historia
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 grid gap-3 sm:gap-4">
                <div className="bg-charcoal rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden group cursor-pointer" onClick={() => navigateTo('ofertas')}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-camel-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative space-y-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Percent className="w-5 h-5 text-camel-400" />
                    </div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-white/50">Hasta</p>
                    <p className="text-4xl sm:text-5xl font-bold tracking-tight">34%</p>
                    <p className="text-white/50 text-sm">Ofertas del mes en productos seleccionados</p>
                    <div className="flex items-center gap-1 text-camel-400 text-sm font-medium pt-1">
                      <span>Ver ofertas</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => navigateTo('productos')}>
                  <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop" alt="Skincare products" className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/faf6f1/b08968?text=KareBeauty' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-medium text-sm">500+ productos</p>
                    <p className="text-white/60 text-xs mt-0.5">Explora la colecci&#243;n completa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
              {[
                { icon: <Heart className="w-5 h-5" />, title: '100% Auténtico', desc: 'Importación directa desde Corea del Sur' },
                { icon: <Star className="w-5 h-5" />, title: 'Curación experta', desc: 'Solo las mejores marcas K-Beauty' },
                { icon: <Sparkles className="w-5 h-5" />, title: 'Resultados reales', desc: 'Ingredientes respaldados por ciencia' },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-5 sm:p-6 border border-camel-100/50 hover:border-camel-200 hover:shadow-lg hover:shadow-camel-100/50 transition-all duration-500 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-camel-50 rounded-xl flex items-center justify-center text-camel-500 flex-shrink-0 group-hover:bg-camel-500 group-hover:text-white transition-all duration-300">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-charcoal">{f.title}</h3>
                      <p className="text-softgray text-xs mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto mt-16 sm:mt-24">
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-camel-500 mb-2">Destacados</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">Lo más popular</h2>
              </div>
              <button onClick={() => navigateTo('productos')} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-softgray hover:text-charcoal transition-colors">
                Ver todo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {productData.rostro.map((product, i) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-camel-100/50 hover:border-camel-200 hover:shadow-xl hover:shadow-camel-100/50 transition-all duration-500 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="relative aspect-square overflow-hidden bg-camel-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/faf6f1/b08968?text=${encodeURIComponent(product.brand)}` }} />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/80 backdrop-blur-md text-charcoal text-xs font-semibold px-2.5 py-1 rounded-lg">{product.brand}</span>
                    </div>
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product) }} className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-xl font-medium text-xs shadow-lg hover:bg-white transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">+ Agregar</button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 space-y-1.5">
                    <h3 className="font-semibold text-xs sm:text-sm text-charcoal leading-snug line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-softgray line-clamp-1 hidden sm:block">{product.skinType}</p>
                    <p className="font-bold text-sm sm:text-base text-charcoal pt-1">{product.priceDisplay}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto mt-16 sm:mt-24 mb-16 sm:mb-20">
            <div className="bg-charcoal rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-camel-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-camel-400/5 rounded-full blur-3xl" />
              </div>
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">Tu piel merece lo mejor</h2>
                  <p className="text-white/40 text-sm sm:text-base max-w-lg">Explora más de 500 productos importados directamente de Corea del Sur. Envío a todo Chile.</p>
                </div>
                <button onClick={() => navigateTo('productos')} className="group flex items-center gap-2 bg-camel-500 text-white px-8 py-4 rounded-xl font-medium text-sm hover:bg-camel-400 transition-all duration-300 flex-shrink-0">
                  Explorar colección
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* NOSOTROS */}
      {currentPage === 'nosotros' && (
        <main className="px-3 sm:px-6 lg:px-8">
          <section className="max-w-7xl mx-auto">
            <div className="bg-camel-100/60 rounded-3xl p-8 sm:p-12 lg:p-16 mb-3 sm:mb-4 animate-fade-up">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-widest uppercase text-camel-600 mb-4">Nuestra historia</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-none">
                  Belleza con <span className="text-camel-500">propósito</span>
                </h1>
                <p className="text-softgray text-base sm:text-lg mt-5 sm:mt-6 leading-relaxed max-w-xl">
                  KareBeauty nació de un amor profundo por la filosofía de skincare coreana, donde el cuidado de la piel es un ritual, no una obligación.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
              <div className="lg:col-span-5 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=700&fit=crop" alt="Equipo KareBeauty" className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x700/faf6f1/b08968?text=KareBeauty' }} />
              </div>
              <div className="lg:col-span-7 grid gap-3 sm:gap-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-camel-100/50 animate-fade-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-3 sm:mb-4">Pasión por la K-Beauty</h2>
                  <p className="text-softgray text-sm sm:text-base leading-relaxed">
                    Creemos que cada persona merece acceso a productos de la más alta calidad, formulados con ingredientes innovadores
                    y respaldados por décadas de investigación dermatológica. Seleccionamos cada producto personalmente, viajando a Seúl para descubrir las marcas más exclusivas.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { number: '500+', label: 'Productos' },
                    { number: '50+', label: 'Marcas' },
                    { number: '10K+', label: 'Clientes' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-4 sm:p-5 border border-camel-100/50 text-center hover:border-camel-200 hover:shadow-lg transition-all duration-300 group">
                      <p className="text-2xl sm:text-3xl font-bold text-camel-500 group-hover:scale-110 transition-transform duration-300">{stat.number}</p>
                      <p className="text-xs text-softgray uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
              {[
                { title: 'Autenticidad', desc: 'Solo distribuidores autorizados. Cada producto verificado.' },
                { title: 'Transparencia', desc: 'Información clara sobre ingredientes, origen y beneficios.' },
                { title: 'Sustentabilidad', desc: 'Marcas eco-friendly y fórmulas cruelty-free.' },
                { title: 'Comunidad', desc: 'Un espacio para compartir experiencias de skincare.' },
              ].map((value, i) => (
                <div key={value.title} className="bg-white rounded-2xl p-5 sm:p-6 border border-camel-100/50 hover:border-camel-200 hover:shadow-lg transition-all duration-500 group animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <h3 className="font-semibold text-sm sm:text-base text-charcoal mb-2">{value.title}</h3>
                  <p className="text-softgray text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-charcoal rounded-3xl p-8 sm:p-12 lg:p-16 mt-3 sm:mt-4 mb-16 sm:mb-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-64 h-64 bg-camel-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="relative max-w-2xl mx-auto space-y-5 sm:space-y-6">
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-camel-400 mx-auto" />
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-light text-white/90 italic leading-relaxed">
                  "La belleza coreana no se trata de cubrir imperfecciones, sino de nutrir tu piel hasta que brille por sí misma."
                </blockquote>
                <p className="text-white/30 text-xs tracking-widest uppercase">Filosofía KareBeauty</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* PRODUCTOS */}
      {currentPage === 'productos' && (
        <main className="px-3 sm:px-6 lg:px-8">
          <section className="max-w-7xl mx-auto">
            <div className="mb-6 sm:mb-8 animate-fade-up">
              <p className="text-xs font-semibold tracking-widest uppercase text-camel-500 mb-2">Colección</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">Productos</h1>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {(Object.keys(productTabIcons) as ProductTab[]).map((tab) => (
                <button key={tab} onClick={() => { setProductTab(tab); setShowComplementos(false) }}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                    !showComplementos && productTab === tab ? 'bg-charcoal text-white' : 'bg-white text-softgray border border-camel-100 hover:border-camel-200 hover:text-charcoal'
                  }`}>
                  {productTabIcons[tab]}
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
              <button onClick={() => setShowComplementos(true)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  showComplementos ? 'bg-charcoal text-white' : 'bg-white text-softgray border border-camel-100 hover:border-camel-200 hover:text-charcoal'
                }`}>
                <Wrench className="w-4 h-4" />
                Complementos
              </button>
            </div>

            {!showComplementos && (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {productData[productTab].map((product, i) => (
                  <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-camel-100/50 hover:border-camel-200 hover:shadow-xl hover:shadow-camel-100/50 transition-all duration-500 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="relative aspect-square overflow-hidden bg-camel-50">
                      <img src={product.image} alt={`${product.brand} ${product.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/faf6f1/b08968?text=${encodeURIComponent(product.brand)}` }} />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/80 backdrop-blur-md text-charcoal text-xs font-semibold px-2.5 py-1 rounded-lg">{product.brand}</span>
                      </div>
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                        <button onClick={() => addToCart(product)} className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-xl font-medium text-xs shadow-lg hover:bg-white transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">+ Agregar al carrito</button>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                      <h3 className="font-semibold text-xs sm:text-sm text-charcoal leading-snug line-clamp-2 min-h-8 sm:min-h-10">{product.name}</h3>
                      <p className="text-softgray text-xs leading-relaxed line-clamp-2 hidden sm:block">{product.description}</p>
                      <div className="bg-camel-50 rounded-xl px-3 py-2 hidden sm:block">
                        <p className="text-xs text-camel-600"><span className="font-semibold">Piel:</span> {product.skinType}</p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-bold text-sm sm:text-lg text-charcoal">{product.priceDisplay}</span>
                        <button onClick={() => addToCart(product)} className="w-7 h-7 sm:w-8 sm:h-8 bg-charcoal text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-camel-500 transition-colors duration-200">
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showComplementos && (
              <div className="animate-fade-up">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal">Complementos y Herramientas</h2>
                  <p className="text-softgray text-xs sm:text-sm mt-1">Accesorios esenciales para tu rutina</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {complementos.map((item, i) => (
                    <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-camel-100/50 hover:border-camel-200 hover:shadow-xl hover:shadow-camel-100/50 transition-all duration-500 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="relative aspect-square overflow-hidden bg-camel-50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/faf6f1/b08968?text=${encodeURIComponent(item.name)}` }} />
                        <div className="absolute top-3 left-3">
                          <span className="bg-camel-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">Tool</span>
                        </div>
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                          <button onClick={() => addToCart(item as unknown as Product)} className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-xl font-medium text-xs shadow-lg hover:bg-white transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">+ Agregar al carrito</button>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                        <h3 className="font-semibold text-xs sm:text-sm text-charcoal leading-snug">{item.name}</h3>
                        <p className="text-softgray text-xs leading-relaxed line-clamp-2 hidden sm:block">{item.description}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-bold text-sm sm:text-lg text-charcoal">{item.priceDisplay}</span>
                          <button onClick={() => addToCart(item as unknown as Product)} className="w-7 h-7 sm:w-8 sm:h-8 bg-charcoal text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-camel-500 transition-colors duration-200">
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="h-16 sm:h-20" />
          </section>
        </main>
      )}

      {/* CARRITO */}
      {currentPage === 'carrito' && (
        <main className="px-3 sm:px-6 lg:px-8">
          <section className="max-w-3xl mx-auto">
            <div className="mb-6 sm:mb-8 animate-fade-up">
              <p className="text-xs font-semibold tracking-widest uppercase text-camel-500 mb-2">Tu selección</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">Carrito</h1>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl border border-camel-100/50 p-10 sm:p-16 text-center animate-fade-up">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-camel-50 rounded-2xl mx-auto flex items-center justify-center mb-5 sm:mb-6">
                  <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-camel-300" />
                </div>
                <p className="text-softgray text-base sm:text-lg mb-5 sm:mb-6">Tu carrito está vacío</p>
                <button onClick={() => navigateTo('productos')} className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-camel-600 transition-all duration-300">
                  Explorar productos
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 animate-fade-up">
                {cart.map((item) => (
                  <div key={item.product.id} className="bg-white rounded-2xl p-3 sm:p-5 flex items-center gap-3 sm:gap-4 border border-camel-100/50 hover:border-camel-200 hover:shadow-lg transition-all duration-300">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/faf6f1/b08968?text=Product' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold tracking-wider uppercase text-camel-500">{item.product.brand}</p>
                      <h3 className="font-semibold text-xs sm:text-sm text-charcoal truncate">{item.product.name}</h3>
                      <p className="text-xs sm:text-sm text-softgray mt-0.5">{item.product.priceDisplay}</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-camel-50 text-camel-600 flex items-center justify-center hover:bg-camel-100 transition-colors">
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                      <span className="font-semibold text-xs sm:text-sm w-5 sm:w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-camel-50 text-camel-600 flex items-center justify-center hover:bg-camel-100 transition-colors">
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                    <div className="text-right flex-shrink-0 w-20 sm:w-24 hidden sm:block">
                      <p className="font-bold text-sm text-charcoal">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 sm:p-2 text-softgray/50 hover:text-red-500 transition-colors flex-shrink-0">
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}

                <div className="bg-charcoal rounded-2xl p-5 sm:p-8 text-white mt-3 sm:mt-4">
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="text-white/50 text-xs sm:text-sm">Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})</span>
                    <span className="text-xl sm:text-3xl font-bold">{formatPrice(cartTotal)}</span>
                  </div>
                  <button className="w-full bg-camel-500 text-white py-3 sm:py-3.5 rounded-xl font-medium text-sm hover:bg-camel-400 transition-all duration-300">
                    Proceder al pago
                  </button>
                </div>
              </div>
            )}
            <div className="h-16 sm:h-20" />
          </section>
        </main>
      )}

      {/* CONTACTO */}
      {currentPage === 'contacto' && (
        <main className="px-3 sm:px-6 lg:px-8">
          <section className="max-w-5xl mx-auto">
            <div className="mb-6 sm:mb-8 animate-fade-up">
              <p className="text-xs font-semibold tracking-widest uppercase text-camel-500 mb-2">Hablemos</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">Contacto</h1>
            </div>

            <div className="grid lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="lg:col-span-2 space-y-3 sm:space-y-4 animate-fade-up">
                <div className="bg-charcoal rounded-3xl p-6 sm:p-8 text-white">
                  <h2 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">¿Tienes preguntas?</h2>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                    Estamos aquí para ayudarte con cualquier consulta sobre productos o tu rutina de skincare.
                  </p>
                </div>
                {[
                  { icon: <Mail className="w-4 h-4" />, title: 'Email', value: 'hola@karebeauty.com', href: 'mailto:hola@karebeauty.com' },
                  { icon: <Phone className="w-4 h-4" />, title: 'Teléfono', value: '+56 9 1234 5678', href: 'tel:+56912345678' },
                  { icon: <Instagram className="w-4 h-4" />, title: 'Instagram', value: '@karebeauty', href: 'https://instagram.com/karebeauty' },
                  { icon: <MapPin className="w-4 h-4" />, title: 'Ubicación', value: 'Santiago, Chile', href: '' },
                ].map((c) => (
                  <div key={c.title} className="bg-white rounded-2xl p-3.5 sm:p-4 border border-camel-100/50 hover:border-camel-200 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-camel-50 rounded-lg sm:rounded-xl flex items-center justify-center text-camel-500 flex-shrink-0 group-hover:bg-camel-500 group-hover:text-white transition-all duration-300">
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-xs text-softgray">{c.title}</p>
                        {c.href ? (
                          <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-charcoal hover:text-camel-600 transition-colors">{c.value}</a>
                        ) : (
                          <p className="text-xs sm:text-sm font-medium text-charcoal">{c.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3 animate-slide-in-right">
                <form onSubmit={handleContactSubmit} className="bg-white rounded-3xl p-5 sm:p-8 border border-camel-100/50 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-softgray mb-1.5">Nombre</label>
                      <input type="text" required value={contactForm.name} onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-camel-100 focus:border-camel-400 focus:outline-none focus:ring-2 focus:ring-camel-100 transition-all bg-camel-50/30 text-charcoal text-sm placeholder-camel-300" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-softgray mb-1.5">Email</label>
                      <input type="email" required value={contactForm.email} onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-camel-100 focus:border-camel-400 focus:outline-none focus:ring-2 focus:ring-camel-100 transition-all bg-camel-50/30 text-charcoal text-sm placeholder-camel-300" placeholder="tu@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-softgray mb-1.5">Asunto</label>
                    <input type="text" required value={contactForm.subject} onChange={e => setContactForm(prev => ({ ...prev, subject: e.target.value }))} className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-camel-100 focus:border-camel-400 focus:outline-none focus:ring-2 focus:ring-camel-100 transition-all bg-camel-50/30 text-charcoal text-sm placeholder-camel-300" placeholder="¿En qué podemos ayudarte?" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-softgray mb-1.5">Mensaje</label>
                    <textarea required rows={4} value={contactForm.message} onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))} className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-camel-100 focus:border-camel-400 focus:outline-none focus:ring-2 focus:ring-camel-100 transition-all bg-camel-50/30 text-charcoal text-sm placeholder-camel-300 resize-none" placeholder="Cuéntanos más..." />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-charcoal text-white py-3 sm:py-3.5 rounded-xl font-medium text-sm hover:bg-camel-600 transition-all duration-300">
                    <Send className="w-4 h-4" />
                    Enviar mensaje
                  </button>
                  {contactSent && (
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-center text-xs sm:text-sm font-medium animate-fade-up border border-green-200">
                      <MessageCircle className="w-4 h-4 inline mr-1.5" />
                      ¡Mensaje enviado! Te responderemos pronto.
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="h-16 sm:h-20" />
          </section>
        </main>
      )}

      {/* OFERTAS */}
      {currentPage === 'ofertas' && (
        <main className="px-3 sm:px-6 lg:px-8">
          <section className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-camel-50 rounded-3xl p-6 sm:p-8 lg:p-12 mb-3 sm:mb-4 animate-fade-up relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-red-100/30 rounded-full blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold mb-3">
                  <Percent className="w-3 h-3" />
                  Descuentos exclusivos
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">Ofertas del Mes</h1>
                <div className="flex items-center gap-1.5 text-softgray text-xs sm:text-sm mt-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Válidas hasta agotar stock</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {ofertas.map((oferta, i) => (
                <div key={oferta.id} className="group bg-white rounded-2xl overflow-hidden border border-camel-100/50 hover:border-camel-200 hover:shadow-xl hover:shadow-camel-100/50 transition-all duration-500 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="relative aspect-square overflow-hidden bg-camel-50">
                    <img src={oferta.image} alt={oferta.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/faf6f1/b08968?text=KareBeauty' }} />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">-{oferta.discount}%</span>
                      <span className="bg-white/80 backdrop-blur-md text-charcoal text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg hidden sm:inline-flex items-center">
                        <Tag className="w-3 h-3 inline mr-0.5" />
                        {oferta.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                      <button onClick={() => addToCart({ ...oferta, brand: oferta.brand, skinType: oferta.skinType })} className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-xl font-medium text-xs shadow-lg hover:bg-white transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">+ Agregar al carrito</button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider uppercase text-camel-500">{oferta.brand}</span>
                      <span className="text-xs text-softgray hidden sm:block">{oferta.skinType}</span>
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm text-charcoal leading-snug line-clamp-2">{oferta.name}</h3>
                    <p className="text-softgray text-xs leading-relaxed line-clamp-2 hidden sm:block">{oferta.description}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-sm sm:text-lg font-bold text-red-500">{oferta.priceDisplay}</span>
                      <span className="text-xs sm:text-sm text-softgray line-through">{oferta.originalPriceDisplay}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-charcoal rounded-3xl p-6 sm:p-8 lg:p-12 mt-3 sm:mt-4 mb-16 sm:mb-20 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-camel-500/10 rounded-full blur-3xl" />
              </div>
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">¿No encuentras lo que buscas?</h2>
                  <p className="text-white/40 text-xs sm:text-sm mt-2">Explora la colección completa con más de 500 productos.</p>
                </div>
                <button onClick={() => navigateTo('productos')} className="group flex items-center gap-2 bg-camel-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-camel-400 transition-all duration-300 flex-shrink-0">
                  Ver productos
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-charcoal text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-camel-400" />
                </div>
                <span className="text-sm sm:text-base font-bold">kare<span className="text-camel-400">beauty</span></span>
              </div>
              <p className="text-white/30 text-xs sm:text-sm leading-relaxed">Tu destino de cosmética coreana premium.</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50">Navegación</h4>
              <div className="space-y-1.5 sm:space-y-2">
                {(['home', 'nosotros', 'productos', 'ofertas', 'contacto'] as Page[]).map((page) => (
                  <button key={page} onClick={() => navigateTo(page)} className="block text-xs sm:text-sm text-white/30 hover:text-camel-400 transition-colors">
                    {page === 'home' ? 'Inicio' : page === 'contacto' ? 'Contacto' : page === 'ofertas' ? 'Ofertas' : page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50">Productos</h4>
              <div className="space-y-1.5 sm:space-y-2">
                {(['Rostro', 'Ojos', 'Cuerpo', 'Manos', 'Complementos']).map((cat) => (
                  <button key={cat} onClick={() => { navigateTo('productos'); if (cat === 'Complementos') { setShowComplementos(true) } else { setProductTab(cat.toLowerCase() as ProductTab); setShowComplementos(false) } }} className="block text-xs sm:text-sm text-white/30 hover:text-camel-400 transition-colors">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50">Contacto</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <a href="mailto:hola@karebeauty.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/30 hover:text-camel-400 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  hola@karebeauty.com
                </a>
                <a href="https://instagram.com/karebeauty" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs sm:text-sm text-white/30 hover:text-camel-400 transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                  @karebeauty
                </a>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-white/30">
                  <MapPin className="w-3.5 h-3.5" />
                  Santiago, Chile
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-10 sm:mt-12 pt-5 sm:pt-6 text-center">
            <p className="text-white/15 text-xs">
              {new Date().getFullYear()} KareBeauty. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
