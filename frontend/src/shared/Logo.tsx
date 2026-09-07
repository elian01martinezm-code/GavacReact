// src/shared/Logo.tsx
export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icono de toro estilizado en SVG puro */}
      <svg viewBox="0 0 48 48" className="h-12 w-12 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#2E7D32" />
        {/* Cuernos */}
        <path d="M14 16L8 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 16L40 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
        {/* Cabeza */}
        <circle cx="24" cy="26" r="14" stroke="white" strokeWidth="3" />
        {/* Ojos */}
        <circle cx="19" cy="23" r="2" fill="white" />
        <circle cx="29" cy="23" r="2" fill="white" />
        {/* Hocico */}
        <path d="M20 30C20 30 22 32 24 32C26 32 28 30 28 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      
      {/* Texto */}
      <div className="flex flex-col justify-center">
        <span className="font-serif text-3xl font-bold text-[#2E7D32] leading-none tracking-tight">
          GAVAC
        </span>
        <span className="text-[10px] font-bold text-[#6B7269] tracking-[0.2em] uppercase mt-1">
          Gestión Ganadera
        </span>
      </div>
    </div>
  );
}