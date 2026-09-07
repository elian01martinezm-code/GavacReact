import { Link } from "react-router-dom";
import logoGavac from "../assets/logo_gavac.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gavac-bg text-gavac-text font-sans">
      {/* === NAVEGACIÓN === */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={logoGavac} alt="GAVAC" className="h-14 w-auto object-contain" />
          </Link>
        </div>
        <ul className="hidden md:flex gap-8 list-none">
          {["Funciones", "Precios", "Testimonios", "Contacto"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-gray-700 text-sm font-medium hover:text-gavac-primary transition-colors">{item}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm font-medium px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700">Iniciar sesión</Link>
          <Link to="/register" className="text-sm font-medium px-5 py-2 rounded-lg bg-gavac-primary text-white hover:bg-gavac-primaryHover transition-colors shadow-sm">Solicitar acceso</Link>
        </div>
      </nav>

      {/* === HERO SECTION === */}
      <section className="px-4 md:px-8 py-20 md:py-32 max-w-7xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl leading-tight tracking-tight mb-6 text-gavac-text">
            El campo que cuidas merece<br />
            la <em className="text-gavac-primary not-italic">mejor herramienta</em>
          </h1>
          <p className="text-lg text-gavac-textMuted mb-8 max-w-lg">
            Registro de animales, sanidad, producción y reproducción en un solo lugar. Desde cualquier dispositivo, en cualquier momento.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/register" className="px-8 py-4 bg-gavac-primary text-white rounded-lg font-medium shadow-lg shadow-gavac-primary/30 hover:bg-gavac-primaryHover hover:-translate-y-0.5 transition-all">Solicitar acceso</Link>
            <a href="#funciones" className="px-7 py-4 bg-white border border-gavac-border rounded-lg font-medium hover:bg-gavac-bg transition-all text-gavac-text">Ver funciones</a>
          </div>
        </div>

        {/* Tarjeta de Módulos */}
        <div className="bg-white rounded-2xl border border-gavac-border shadow-xl overflow-hidden">
          <div className="p-5 border-b border-gavac-border bg-gavac-bg flex justify-between items-center">
            <span className="text-sm font-bold text-gavac-text">Módulos disponibles</span>
            <span className="text-xs font-bold bg-gavac-light text-gavac-primary px-3 py-1 rounded-full">5 módulos</span>
          </div>
          {[
            { name: "Registro de animales", desc: "Ficha individual, genealogía y lotes" },
            { name: "Sanidad y vacunación", desc: "Calendario sanitario y alertas" },
            { name: "Producción y peso", desc: "Leche, carne y ganancias diarias" },
            { name: "Reproducción", desc: "Control de partos, celos y alertas" },
            { name: "Potreros y pastoreo", desc: "Rotación y capacidad de carga" },
          ].map((mod, i) => (
            <div key={i} className="flex justify-between items-center p-5 border-b border-gavac-border last:border-0 hover:bg-gavac-bg transition-colors">
              <div>
                <p className="text-sm font-bold text-gavac-text">{mod.name}</p>
                <p className="text-xs text-gavac-textMuted">{mod.desc}</p>
              </div>
              <span className="text-xs font-bold text-gavac-primary bg-gavac-light px-3 py-1 rounded-full">Activo</span>
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

      {/* === FOOTER === */}
      <footer id="contacto" className="bg-[#1A1A14] text-white/60 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4 bg-white rounded-lg p-3 inline-block">
              <img src={logoGavac} alt="GAVAC" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              La plataforma de gestión ganadera líder en Colombia. Diseñada para el campo moderno.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#funciones" className="hover:text-white transition-colors">Funciones</a></li>
              <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
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
          <small className="text-xs text-white/40">© 2026 GAVAC - Gestión Ganadera. Todos los derechos reservados.</small>
        </div>
      </footer>
    </div>
  );
}