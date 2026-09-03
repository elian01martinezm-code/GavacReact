import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gavac-bg text-gavac-text font-sans">
            
            {/* === NAVEGACIÓN === */}
            <nav className="sticky top-0 z-50 bg-gavac-bg/95 backdrop-blur-md border-b border-black/10 px-5% h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🐾</span>
                    <span className="font-serif text-xl font-bold text-gavac-primary">Gavac</span>
                </div>
                <ul className="hidden md:flex gap-8 list-none">
                    {['Funciones', 'Precios', 'Testimonios', 'Contacto'].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="text-gavac-text text-sm font-medium hover:text-gavac-primary transition-colors">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-3">
                    <Link to="/login" className="text-sm font-medium px-5 py-2 rounded-lg bg-white/85 border border-black/10 hover:bg-[#EDE8E0] transition-colors text-gavac-text">
                        Iniciar sesión
                    </Link>
                    <Link to="/register" className="text-sm font-medium px-5 py-2 rounded-lg bg-gavac-primary text-white hover:bg-gavac-primaryHover transition-colors">
                        Registrarse
                    </Link>
                </div>
            </nav>

            {/* === HERO SECTION === */}
            <section className="px-5% py-20 md:py-32 max-w-7xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                <div>
                    <h1 className="text-4xl md:text-6xl leading-tight tracking-tight mb-6 text-gavac-text">
                        El campo que cuidas merece<br />la <em className="text-gavac-primary not-italic">mejor herramienta</em>
                    </h1>
                    <p className="text-lg text-gavac-textLight mb-8 max-w-lg">
                        Registro de animales, sanidad, producción y reproducción en un solo lugar. Desde cualquier dispositivo, en cualquier momento.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <Link to="/register" className="px-8 py-4 bg-gavac-primary text-white rounded-lg font-medium shadow-lg shadow-gavac-primary/30 hover:bg-gavac-primaryHover hover:-translate-y-0.5 transition-all">
                            Empieza hoy
                        </Link>
                        <a href="#funciones" className="px-7 py-4 bg-white/85 border border-black/10 rounded-lg font-medium hover:bg-[#EDE8E0] transition-all text-gavac-text">
                            Ver funciones
                        </a>
                    </div>
                </div>

                {/* Tarjeta de Módulos */}
                <div className="bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden">
                    <div className="p-5 border-b border-black/10 bg-[#FAFAF8] flex justify-between items-center">
                        <span className="text-sm font-bold text-gavac-text">Módulos disponibles</span>
                        <span className="text-xs font-bold bg-gavac-light text-gavac-accent px-3 py-1 rounded-full">5 módulos</span>
                    </div>
                    {[
                        { name: 'Registro de animales', desc: 'Ficha individual, genealogía y lotes' },
                        { name: 'Sanidad y vacunación', desc: 'Calendario sanitario y alertas' },
                        { name: 'Producción y peso', desc: 'Leche, carne y ganancias diarias' },
                        { name: 'Reproducción', desc: 'Control de partos, celos y alertas' },
                        { name: 'Potreros y pastoreo', desc: 'Rotación y capacidad de carga' }
                    ].map((mod, i) => (
                        <div key={i} className="flex justify-between items-center p-5 border-b border-black/10 last:border-0 hover:bg-gavac-bg transition-colors">
                            <div>
                                <p className="text-sm font-bold text-gavac-text">{mod.name}</p>
                                <p className="text-xs text-gavac-textMuted">{mod.desc}</p>
                            </div>
                            <span className="text-xs font-bold text-gavac-accent bg-gavac-light px-3 py-1 rounded-full">Activo</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* === ESTADÍSTICAS === */}
            <section className="bg-gavac-primary py-16">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center text-white">
                    <div className="p-6">
                        <strong className="block text-5xl font-light mb-2 font-sans">+<span className="text-[#C8E6C9]">2.400</span></strong>
                        <p className="text-sm text-white/70">ganaderos activos en Colombia</p>
                    </div>
                    <div className="p-6">
                        <strong className="block text-5xl font-light mb-2 font-sans"><span className="text-[#C8E6C9]">98</span>%</strong>
                        <p className="text-sm text-white/70">índice de satisfacción</p>
                    </div>
                    <div className="p-6">
                        <strong className="block text-5xl font-light mb-2 font-sans">+<span className="text-[#C8E6C9]">120k</span></strong>
                        <p className="text-sm text-white/70">animales registrados</p>
                    </div>
                </div>
            </section>

            {/* === FUNCIONES === */}
            <section id="funciones" className="py-24 px-5% max-w-7xl mx-auto">
                <p className="text-xs font-bold text-gavac-primary uppercase tracking-widest mb-3">Funcionalidades</p>
                <h2 className="font-serif text-4xl md:text-5xl text-gavac-text mb-12 max-w-2xl">
                    Todo lo que necesitas para gestionar tu finca
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: 'Registro de animales', desc: 'Ficha completa por animal con datos de nacimiento, genealogía, raza, peso histórico y movimientos entre lotes.' },
                        { title: 'Sanidad y vacunación', desc: 'Calendario sanitario automático con alertas de vacunaciones, desparasitaciones y revisiones. Historial médico completo.' },
                        { title: 'Producción y peso', desc: 'Seguimiento diario de producción lechera, control de pesos y ganancias por periodo. Gráficas de tendencia por lote.' },
                        { title: 'Reproducción', desc: 'Control de partos, celos y alertas del hato. Planificación de inseminación y seguimiento gestacional.' }
                    ].map((func, i) => (
                        <div key={i} className="bg-white rounded-xl border border-black/10 p-8 shadow-sm hover:-translate-y-1 hover:border-gavac-primary/30 transition-all">
                            <h3 className="text-lg font-bold text-gavac-text mb-2">{func.title}</h3>
                            <p className="text-sm text-gavac-textLight leading-relaxed">{func.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === TESTIMONIOS === */}
            <section id="testimonios" className="bg-[#EDE8E0] py-24 px-5%">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-gavac-primary uppercase tracking-widest mb-3">Testimonios</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-gavac-text mb-12">Lo que dicen nuestros ganaderos</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { quote: 'Reduje mis pérdidas en un 30% desde que empecé a usar la plataforma. El control sanitario es increíble.', name: 'Carlos Mejía', place: 'Finca El Progreso — Córdoba', initials: 'CM' },
                            { quote: 'El calendario sanitario me ahorra horas cada semana. Antes se me olvidaban las vacunas, ahora todo llega al celular.', name: 'Laura Pérez', place: 'Ganadería Los Llanos — Meta', initials: 'LP' },
                            { quote: 'Por fin sé cuánto me cuesta producir un litro de leche. Los reportes financieros cambiaron cómo tomo decisiones.', name: 'Julio Ramírez', place: 'Hacienda La Esperanza — Antioquia', initials: 'JR' },
                            { quote: 'Tengo 3 fincas y por primera vez las manejo desde un solo lugar. El módulo de potreros es exactamente lo que necesitaba.', name: 'María González', place: 'Ganadería Los Ceibos — Casanare', initials: 'MG' }
                        ].map((test, i) => (
                            <article key={i} className="bg-white rounded-xl p-8 border border-black/10">
                                <blockquote className="font-serif text-lg italic text-gavac-text mb-6 leading-relaxed">"{test.quote}"</blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gavac-primary text-white flex items-center justify-center text-sm font-bold">{test.initials}</div>
                                    <div>
                                        <p className="text-sm font-bold text-gavac-text">{test.name}</p>
                                        <p className="text-xs text-gavac-textMuted">{test.place}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* === PRECIOS === */}
            <section id="precios" className="py-24 px-5% max-w-7xl mx-auto">
                <p className="text-xs font-bold text-gavac-primary uppercase tracking-widest mb-3">Planes</p>
                <h2 className="font-serif text-4xl md:text-5xl text-gavac-text mb-12">Elige el plan que se adapta a tu finca</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: 'Básico', price: '$89.900', period: 'por mes', features: ['Hasta 50 animales', 'Registro y ficha individual', 'Calendario sanitario básico', '1 usuario'], popular: false },
                        { name: 'Pro', price: '$189.900', period: 'por mes · hato ilimitado', features: ['Animales ilimitados', 'Todos los módulos activos', 'Reportes financieros', 'Alertas y notificaciones', 'Hasta 5 usuarios'], popular: true },
                        { name: 'Empresa', price: '$389.900', period: 'por mes', features: ['Multi-finca ilimitado', 'Soporte dedicado', 'Usuarios ilimitados'], popular: false }
                    ].map((plan, i) => (
                        <div key={i} className={`relative rounded-xl p-10 flex flex-col ${plan.popular ? 'bg-gavac-primary text-white border-2 border-gavac-primary' : 'bg-white border border-black/10'}`}>
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gavac-primaryHover text-white text-xs font-bold px-4 py-1 rounded-full">Más popular</span>
                            )}
                            <p className={`text-xs uppercase tracking-wider mb-3 ${plan.popular ? 'text-white/70' : 'text-gavac-textMuted'}`}>{plan.name}</p>
                            <strong className={`font-serif text-5xl mb-1 ${plan.popular ? 'text-white' : 'text-gavac-text'}`}>{plan.price}</strong>
                            <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-gavac-textMuted'}`}>{plan.period}</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((f, j) => (
                                    <li key={j} className={`text-sm ${plan.popular ? 'text-white/85 border-white/10' : 'text-gavac-textLight border-black/5'} border-b pb-2`}>{f}</li>
                                ))}
                            </ul>
                            <Link to="/register" className={`block text-center py-3 rounded-lg font-bold text-sm transition-all ${plan.popular ? 'bg-[#C8E6C9] text-gavac-primary hover:bg-white' : 'border border-black/10 text-gavac-text hover:bg-[#EDE8E0]'}`}>
                                {plan.popular ? 'Empezar con Pro' : 'Comenzar'}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* === LLAMADO A LA ACCIÓN FINAL === */}
            <section className="bg-gavac-primary py-24 px-5% text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Empieza a gestionar<br />tu hato hoy</h2>
                <p className="text-white/80 mb-8">Configura tu cuenta en menos de 5 minutos.</p>
                <Link to="/register" className="inline-block bg-white text-gavac-primary font-bold px-8 py-4 rounded-lg hover:-translate-y-0.5 transition-all">
                    Crear cuenta
                </Link>
            </section>

            {/* === FOOTER === */}
            <footer id="contacto" className="bg-[#1A1A14] text-white/60 py-16 px-5%">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-1">
                        <p className="font-serif text-2xl font-bold text-white mb-3">Gestion<span className="text-[#C8E6C9]">Ganadera</span></p>
                        <p className="text-sm leading-relaxed">La plataforma de gestión ganadera líder en Colombia. Diseñada para el campo moderno.</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Plataforma</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#funciones" className="hover:text-white transition-colors">Funciones</a></li>
                            <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Empresa</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Soporte</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
                            <li><a href="mailto:GestionGanadera@Gmail.com" className="hover:text-white transition-colors">GestionGanadera@Gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <small className="text-xs text-white/40">© 2026 Gestion Ganadera. Todos los derechos reservados.</small>
                    <nav className="flex gap-6 text-xs text-white/40">
                        <a href="#" className="hover:text-white/80">Términos de uso</a>
                        <a href="#" className="hover:text-white/80">Política de privacidad</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}