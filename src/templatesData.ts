/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from './types';

export interface TemplateConfig {
  id: string;
  name: { es: string; en: string };
  desc: { es: string; en: string };
  category: { es: string; en: string };
  accent: { es: string; en: string };
  layout: 'jorge' | 'academia' | 'executive' | 'modern';
  fontFamily: string;
  
  // Custom Color Palette (Hex)
  primary: string;       // Primary text highlight, subtitles, icons
  primaryBg: string;     // Pave or banner highlights bg
  secondary: string;     // Secondary details/borders
  sidebarBg: string;     // Sidebar background (used in jorge layout)
  sidebarText: string;   // Sidebar text color
  sidebarAccent: string; // Highlights/headers inside sidebar
  bannerBg: string;      // Top banner or card header background
  badgeBg: string;       // Background for skills/competencies badges
  badgeText: string;     // Text color for badges
}

export const TEMPLATES_LIST: TemplateConfig[] = [
  {
    id: 'jorge',
    name: { es: 'Jorge (Clásico Médico)', en: 'Jorge (Clinical Classic)' },
    desc: { es: 'Estructura icónica de doble columna con sidebar azul pizarra oscuro. Equilibrado, tradicional y de altísima confiabilidad en el régimen de salud.', en: 'Iconic double-column structure with deep dark slate sidebar. Highly reliable and traditional for clinical applications.' },
    category: { es: 'Clásico Profesional', en: 'Professional Classic' },
    accent: { es: 'La preferida del sector salud en Colombia', en: 'Colombia\'s health sector preferred choice' },
    layout: 'jorge',
    fontFamily: 'Inter',
    primary: '#0d9488', // teal-600
    primaryBg: '#f0fdfa', // teal-50
    secondary: '#14b8a6', // teal-500
    sidebarBg: '#1e2530', // dark slate
    sidebarText: '#cbd5e1', // slate-300
    sidebarAccent: '#2dd4bf', // teal-400
    bannerBg: '#111827',
    badgeBg: '#1118274d',
    badgeText: '#cbd5e1'
  },
  {
    id: 'academia',
    name: { es: 'Academia Lora', en: 'Academia Lora' },
    desc: { es: 'Diseñó límpido de una columna y alta densidad literaria, con tipografía Serif que transmite rigurosidad intelectual. Ideal para investigación y docencia médica.', en: 'Clean single-column design with elegant Serif typography signaling academic rigor. Recommended for research and teaching.' },
    category: { es: 'Académico / Serif', en: 'Academic / Serif' },
    accent: { es: 'Excelente para hospitales universitarios', en: 'Ideal for teaching hospitals & universities' },
    layout: 'academia',
    fontFamily: 'Lora',
    primary: '#047857', // emerald-700
    primaryBg: '#ecfdf5',
    secondary: '#10b981',
    sidebarBg: '#f8fafc',
    sidebarText: '#334155',
    sidebarAccent: '#047857',
    bannerBg: '#0f172a',
    badgeBg: '#f1f5f9',
    badgeText: '#1e293b'
  },
  {
    id: 'executive',
    name: { es: 'Prestige Ejecutivo', en: 'Prestige Executive' },
    desc: { es: 'Detalle superior en azul profundo, líneas de división doradas y estructura asimétrica refinada. Proyecta liderazgo, gestión clínica y gobernanza corporativa.', en: 'Refined deep navy top banner, premium gold divider accents, and structured dual columns. Projects leadership and clinical coordination.' },
    category: { es: 'Ejecutivo / Liderazgo', en: 'Executive / Leadership' },
    accent: { es: 'Excelente para jefes de servicio y coordinaciones', en: 'Perfect for department heads & administration' },
    layout: 'executive',
    fontFamily: 'Inter',
    primary: '#0f172a', // slate-900
    primaryBg: '#f8fafc',
    secondary: '#d97706', // amber-600 (gold)
    sidebarBg: '#f8fafc',
    sidebarText: '#334155',
    sidebarAccent: '#b45309',
    bannerBg: '#121d26', // navy-gold
    badgeBg: '#121d2611',
    badgeText: '#121d26'
  },
  {
    id: 'modern',
    name: { es: 'Clínico Moderno', en: 'Modern Clinical' },
    desc: { es: 'Estructura fresca de paneles bento con bordes redondeados suaves, badges de competencias y tipografía geométrica Outfit. Muy dinámico y fácil de leer.', en: 'Dynamic bento grid card layouts with soft rounded corners, badge pill highlights, and geometric Outfit typography. Highly readable.' },
    category: { es: 'Vanguardia Digital', en: 'Digital Modern' },
    accent: { es: 'Ideal para telemedicina y consulta privada premium', en: 'Perfect for telemedicine & upscale private clinics' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#4f46e5', // indigo-600
    primaryBg: '#e0e7ff', // indigo-100
    secondary: '#6366f1',
    sidebarBg: '#faf5ff',
    sidebarText: '#475569',
    sidebarAccent: '#4f46e5',
    bannerBg: '#f8fafc',
    badgeBg: '#4f46e511',
    badgeText: '#4f46e5'
  },
  {
    id: 'valle',
    name: { es: 'Vanguardia San Vicente', en: 'San Vicente Premium' },
    desc: { es: 'Fondo sofisticado en verde esmeralda y líneas de color tiza para el área de salud. Un balance majestuoso de pureza y conocimiento técnico.', en: 'Deep emerald color palette with crisp chalk lines tailored for premium healthcare settings. A majestic balance.' },
    category: { es: 'Especialidades / Clínico', en: 'Specialties / Clinical' },
    accent: { es: 'Diseñado para cirujanos y especialistas del Valle', en: 'Designed for surgeons and specialists' },
    layout: 'jorge',
    fontFamily: 'Inter',
    primary: '#065f46', // deep emerald-800
    primaryBg: '#f0fdf4',
    secondary: '#059669',
    sidebarBg: '#064e3b', // extremely deep forest
    sidebarText: '#d1fae5',
    sidebarAccent: '#34d399',
    bannerBg: '#064e3b',
    badgeBg: '#34d39922',
    badgeText: '#d1fae5'
  },
  {
    id: 'antioquia',
    name: { es: 'Antioquia Hospitalar', en: 'Antioquia Hospitalar' },
    desc: { es: 'Paleta inspirada en las montañas antioqueñas: verde pino y blanco alpino purificado. Genera un lazo emocional de confianza e institucionalidad inmediata.', en: 'Mountain-inspired alpine green and white panels. Projects emotional connection, trust and local prestige.' },
    category: { es: 'Clásico Territorial', en: 'Local Heritage' },
    accent: { es: 'Óptimo para EPS y hospitales departamentales', en: 'Optimal for regional hospitals & insurance networks' },
    layout: 'jorge',
    fontFamily: 'Roboto',
    primary: '#15803d', // green-700
    primaryBg: '#f2fdf5',
    secondary: '#22c55e',
    sidebarBg: '#14532d', // dark green
    sidebarText: '#f0fdf4',
    sidebarAccent: '#4ade80',
    bannerBg: '#14532d',
    badgeBg: '#4ade8022',
    badgeText: '#f0fdf4'
  },
  {
    id: 'bogota',
    name: { es: 'Distrital Capital', en: 'Capital Distrital' },
    desc: { es: 'Estructura solemne con tonos azul heráldico y detalles en oro. Transmite la formalidad de los grandes centros asistenciales y secretarías del país.', en: 'Solemn heraldic blue and gold details. Emphasizes formality for major medical complexes and public health offices.' },
    category: { es: 'Institucional Público', en: 'Institutional Public' },
    accent: { es: 'Recomendado para convocatorias del Distrito', en: 'Highly recommended for Bogota public healthcare tenders' },
    layout: 'executive',
    fontFamily: 'Inter',
    primary: '#1e3a8a', // blue-900
    primaryBg: '#eff6ff',
    secondary: '#d97706', // gold
    sidebarBg: '#eff6ff',
    sidebarText: '#1e293b',
    sidebarAccent: '#1e3a8a',
    bannerBg: '#172554', // deep blue
    badgeBg: '#d977061d',
    badgeText: '#1e3a8a'
  },
  {
    id: 'caribe',
    name: { es: 'Coral Caribe', en: 'Coral Caribe' },
    desc: { es: 'Un lienzo cálido color arena de playa con acentuaciones en coral y gris pizarra. Dinámico, fresco, humano y sumamente empático.', en: 'Sand-colored canvas with coral and soft slate gray accents. Humane, warm, and highly empathetic.' },
    category: { es: 'Humanista / Cálido', en: 'Humanist / Warm' },
    accent: { es: 'Excelente para pediatría y medicina general familiar', en: 'Excellent for pediatrics and family medicine' },
    layout: 'academia',
    fontFamily: 'Outfit',
    primary: '#ea580c', // coral-orange
    primaryBg: '#fff7ed',
    secondary: '#475569',
    sidebarBg: '#fdfbf7',
    sidebarText: '#475569',
    sidebarAccent: '#ea580c',
    bannerBg: '#fdfbf7',
    badgeBg: '#ea580c12',
    badgeText: '#ea580c'
  },
  {
    id: 'santander',
    name: { es: 'Santander Académico', en: 'Santander Academic' },
    desc: { es: 'Línea editorial fuerte de tipografía robusta Merriweather, con un divisor marrón arcilla. Ideal para cirujanos y docentes sénior con amplia trayectoria.', en: 'Editorial-style layout with Merriweather Serif font and a brick/clay sidebar accent. Bold and authoritative for senior surgeons.' },
    category: { es: 'Especialidades / Académico', en: 'Specialties / Academic' },
    accent: { es: 'Ideal para perfiles con abundante producción científica', en: 'Ideal for portfolios with rich scientific publishing' },
    layout: 'academia',
    fontFamily: 'Merriweather',
    primary: '#78350f', // warm amber-900
    primaryBg: '#fffbeb',
    secondary: '#b45309',
    sidebarBg: '#fafaf9',
    sidebarText: '#44403c',
    sidebarAccent: '#78350f',
    bannerBg: '#78350f',
    badgeBg: '#78350f14',
    badgeText: '#78350f'
  },
  {
    id: 'cardio',
    name: { es: 'Cardio Infantil Premium', en: 'Cardio Cardiology' },
    desc: { es: 'Colores limpios inspirados en cardiología clínica: rojo carmín sobre bordes plateados ultra sutiles. Enfocado en la precisión científica y el cuidado vital.', en: 'Carmine red highlights on clean silver panels. Emphasizes clinical precision, cardiovascular focus and vital care.' },
    category: { es: 'Especialidades / Clínico', en: 'Specialties / Clinical' },
    accent: { es: 'Perfecto para cardiología, urgencias y medicina interna', en: 'Perfect for cardiology, ER and internal medicine' },
    layout: 'modern',
    fontFamily: 'Inter',
    primary: '#dc2626', // red-600
    primaryBg: '#fef2f2',
    secondary: '#ef4444',
    sidebarBg: '#fafafa',
    sidebarText: '#374151',
    sidebarAccent: '#dc2626',
    bannerBg: '#fff',
    badgeBg: '#dc26261c',
    badgeText: '#dc2626'
  },
  {
    id: 'pediatria',
    name: { es: 'Serenidad Pediátrica', en: 'Pediatric Serenity' },
    desc: { es: 'Fondo lila pastel suave estructurado con tipografía amigable y bordes redondeados. Transmite paz, confianza y calidez para el trato infantil.', en: 'Soft pastel lavender and sky blue layout. Delivers tranquility, comfort, and warmth necessary for child healthcare.' },
    category: { es: 'Humanista / Cálido', en: 'Humanist / Warm' },
    accent: { es: 'Recomendado para pediatría, neonatología y psicología', en: 'Recommended for pediatrics, neonatology and therapy' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#7c3aed', // violet-600
    primaryBg: '#f5f3ff',
    secondary: '#06b6d4', // cyan-500
    sidebarBg: '#fdfeff',
    sidebarText: '#4b5563',
    sidebarAccent: '#7c3aed',
    bannerBg: '#f5f3ff',
    badgeBg: '#7c3aed18',
    badgeText: '#7c3aed'
  },
  {
    id: 'oncologia',
    name: { es: 'Oncología Investigativa', en: 'Oncology Research' },
    desc: { es: 'Estructura sobria de color azul noche profundo y marcaciones de tiempo finas. Proyecta un perfil analítico, metodológico y de alta especialización.', en: 'Midnight blue accents and fine chronology grids. Projects an analytical, high-quality, and deeply methodical medical specialist profile.' },
    category: { es: 'Especialidades / Clínico', en: 'Specialties / Clinical' },
    accent: { es: 'La preferida para oncología, patología y neurología', en: 'Excellent for oncology, hematology and pathology' },
    layout: 'jorge',
    fontFamily: 'Inter',
    primary: '#1e3a8a',
    primaryBg: '#eff6ff',
    secondary: '#3b82f6',
    sidebarBg: '#0f172a', // slate dark
    sidebarText: '#cbd5e1',
    sidebarAccent: '#60a5fa',
    bannerBg: '#0f172a',
    badgeBg: '#3b82f625',
    badgeText: '#eff6ff'
  },
  {
    id: 'urgencias',
    name: { es: 'Alto Impacto Urgencias', en: 'High Impact ER' },
    desc: { es: 'Contraste imponente de gris grafito y naranja triage de emergencias. Pensado para que los reclutadores lean tus destrezas clave en 3 segundos.', en: 'Imposing graphite gray contrast and energetic emergency orange triage marks. Engineered for 3-second rapid reading of emergency medical skills.' },
    category: { es: 'Vanguardia Digital', en: 'Digital Modern' },
    accent: { es: 'Optimizado para médicos de urgencias y anestesiólogos', en: 'Optimized for emergency room physicians & critical care' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#ea580c', // orange-600
    primaryBg: '#fff7ed',
    secondary: '#374151',
    sidebarBg: '#f9fafb',
    sidebarText: '#1f2937',
    sidebarAccent: '#ea580c',
    bannerBg: '#1f2937',
    badgeBg: '#ea580c1f',
    badgeText: '#ea580c'
  },
  {
    id: 'estetica',
    name: { es: 'Estética & Bienestar', en: 'Aesthetics & Wellness' },
    desc: { es: 'Estilo tipo "Boutique" con fondo blanco lino, detalles en rosa viejo, oro rosa y tipografía Playfair Display. Elegancia absoluta y simetría superior.', en: 'Boutique beauty layout using playfair display, rose-gold accents, and ample negative space. Superior elegance.' },
    category: { es: 'Académico / Serif', en: 'Academic / Serif' },
    accent: { es: 'Establecido para medicina estética, dermatología u odontología', en: 'Established for aesthetic medicine, dermatology or dental' },
    layout: 'academia',
    fontFamily: 'Playfair Display',
    primary: '#be185d', // pink-700
    primaryBg: '#fdf2f8',
    secondary: '#e11d48',
    sidebarBg: '#fffafb',
    sidebarText: '#5c454a',
    sidebarAccent: '#be185d',
    bannerBg: '#fffafb',
    badgeBg: '#be185d11',
    badgeText: '#be185d'
  },
  {
    id: 'neuro',
    name: { es: 'Sinapsis Neurológica', en: 'Synapse Neurology' },
    desc: { es: 'Fondo tecnológico en azul cobalto y nodos violetas con rejilla limpia. Para intelectuales que aman la innovación y la neurociencia.', en: 'Violet accents on high-tech clinical cobalt margins. Perfect for specialists in neuroscience, rehabilitation and brain health.' },
    category: { es: 'Vanguardia Digital', en: 'Digital Modern' },
    accent: { es: 'Recomendado para psiquiatras, neurólogos y neurocirujanos', en: 'Perfect for psychiatry, neurology and neurosurgery' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#6d28d9', // purple-700
    primaryBg: '#faf5ff',
    secondary: '#8b5cf6',
    sidebarBg: '#f5f3ff',
    sidebarText: '#374151',
    sidebarAccent: '#6d28d9',
    bannerBg: '#f5f3ff',
    badgeBg: '#6d28d91b',
    badgeText: '#6d28d9'
  },
  {
    id: 'geriatria',
    name: { es: 'Cuidado Dorado', en: 'Golden Care' },
    desc: { es: 'Tonos arena suaves mezclados con café siena cálido. Transmite paciencia, experiencia clínica acumulada, respeto y un ambiente de acogimiento.', en: 'Warm sienna wood elements on desert sand canvas. Highlights patience, seasoned clinical expertise and profound human respect.' },
    category: { es: 'Humanista / Cálido', en: 'Humanist / Warm' },
    accent: { es: 'Perfecto para geriatría, fisiatría y cuidados paliativos', en: 'Perfect for geriatrics, pain management & palliative care' },
    layout: 'jorge',
    fontFamily: 'Lora',
    primary: '#b45309', // amber-700
    primaryBg: '#fef3c7',
    secondary: '#d97706',
    sidebarBg: '#451a03', // warm sienna
    sidebarText: '#fef3c7',
    sidebarAccent: '#fbbf24',
    bannerBg: '#451a03',
    badgeBg: '#fbbf241e',
    badgeText: '#fef3c7'
  },
  {
    id: 'publica',
    name: { es: 'Salud Pública Distrital', en: 'Public Health Distrital' },
    desc: { es: 'Colores heráldicos azul rey y gris mineral con tipografía balanceada. Connota una alta vocación de servicio administrativo e impacto social.', en: 'Royal blue and mineral gray accents with balanced fonts. Projects commitment to administrative and social healthcare impact.' },
    category: { es: 'Institucional Público', en: 'Institutional Public' },
    accent: { es: 'Ideal para puestos en secretarías de salud o gerencia de proyectos', en: 'Perfect for administrative public health tenders' },
    layout: 'executive',
    fontFamily: 'Inter',
    primary: '#1d4ed8', // blue-700
    primaryBg: '#eff6ff',
    secondary: '#475569',
    sidebarBg: '#f8fafc',
    sidebarText: '#1e293b',
    sidebarAccent: '#1d4ed8',
    bannerBg: '#1e3a8a',
    badgeBg: '#1d4ed811',
    badgeText: '#1d4ed8'
  },
  {
    id: 'militar',
    name: { es: 'Sanidad Militar & Policial', en: 'Military Medical Corps' },
    desc: { es: 'Líneas limpias de color verde oliva militar y remates en bronce mate. Traduce disciplina férrea, liderazgo bajo estrés y adaptabilidad extrema.', en: 'Surgical olive green and brass details. Connotes discipline, leadership under pressure, and flawless adaptability.' },
    category: { es: 'Institucional Público', en: 'Horizontal / Order' },
    accent: { es: 'Especial para el Hospital Militar, Sanidad de Policía y FFMM', en: 'Tailored for military, police, or state force medical complexes' },
    layout: 'jorge',
    fontFamily: 'Roboto',
    primary: '#3f6212', // olive-800
    primaryBg: '#f7fee7',
    secondary: '#a16207', // brass
    sidebarBg: '#1a2e05', // extremely dark olive
    sidebarText: '#ecfccb',
    sidebarAccent: '#a3e635',
    bannerBg: '#1a2e05',
    badgeBg: '#a3e63522',
    badgeText: '#ecfccb'
  },
  {
    id: 'farmacia',
    name: { es: 'Farmacología Científica', en: 'Pharmacology Lab' },
    desc: { es: 'Tonos cian de bio-tecnología y azul pizarra. Ideal para perfiles con amplio enfoque en farmacología, control de calidad clínico e investigación química.', en: 'Biotech cyan highlights and slate accents. Reflects mastery in pharmacology, clinical research, or chemical trials.' },
    category: { es: 'Especialidades / Clínico', en: 'Specialties / Clinical' },
    accent: { es: 'Excelente para investigadores farmacéuticos y toxicólogos', en: 'Excellent for pharmaceutical researchers & toxicologists' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#0891b2', // cyan-600
    primaryBg: '#ecfeff',
    secondary: '#0f172a',
    sidebarBg: '#f0fdfa',
    sidebarText: '#1e293b',
    sidebarAccent: '#0891b2',
    bannerBg: '#0f172a',
    badgeBg: '#0891b218',
    badgeText: '#0891b2'
  },
  {
    id: 'deportes',
    name: { es: 'Medicina Deportiva & Trauma', en: 'Sport Medicine & Trauma' },
    desc: { es: 'Contraste magnético de gris oscuro y destellos verde lima reflectivo. Irradia vitalidad, biomecánica avanzada y alto dinamismo.', en: 'Sleek dark gray contrast with electric lime highlights. Symbolizes sports performance, biomechanics, and quick physical recovery.' },
    category: { es: 'Vanguardia Digital', en: 'Digital Modern' },
    accent: { es: 'Diseñado para medicina del deporte y traumatólogos', en: 'Tailored for sports medicine, trauma & rehab clinics' },
    layout: 'executive',
    fontFamily: 'Outfit',
    primary: '#0f172a',
    primaryBg: '#fff',
    secondary: '#65a30d', // lime-600
    sidebarBg: '#f8fafc',
    sidebarText: '#334155',
    sidebarAccent: '#4d7c0f',
    bannerBg: '#0f172a', // dark background for top
    badgeBg: '#84cc1622',
    badgeText: '#4d7c0f'
  },
  {
    id: 'anestesia',
    name: { es: 'Anestesiología & Seguridad', en: 'Anesthesiology & Safety' },
    desc: { es: 'Paleta gris perla y azul hielo sutil. Transmite un estado mental de autocontrol clínico frío, concentración quirúrgica rigurosa y máxima seguridad del paciente.', en: 'Muted grey and ice blue highlights. Transmits a surgical state of calmness, focus, safety, and ultimate detail accuracy.' },
    category: { es: 'Especialidades / Clínico', en: 'Specialties / Clinical' },
    accent: { es: 'Muy recomendado para anestesiólogos e intensivistas', en: 'Highly recommended for anesthesiologists and ICU doctors' },
    layout: 'jorge',
    fontFamily: 'Inter',
    primary: '#0369a1', // sky-700
    primaryBg: '#f0f9ff',
    secondary: '#0284c7',
    sidebarBg: '#0c4a6e', // midnight sky
    sidebarText: '#e0f2fe',
    sidebarAccent: '#bae6fd',
    bannerBg: '#0c4a6e',
    badgeBg: '#bae6fd25',
    badgeText: '#e0f2fe'
  },
  {
    id: 'radiologia',
    name: { es: 'Imagen Diagnóstica', en: 'Radiology Imaging' },
    desc: { es: 'Inspirado en la escala de grises de rayos X: marco estructurado en pizarra profunda y acentuación en azul cobalto. Denota alta competencia técnica.', en: 'Inspired by radiological grayscale: clean deep charcoal border frames with neon-cyan highlights. Pure technical mastery.' },
    category: { es: 'Clásico Profesional', en: 'Professional Classic' },
    accent: { es: 'Perfecto para radiólogos, ecografistas y bioingenieros', en: 'Ideal for radiotherapists, sonographers and bioengineers' },
    layout: 'jorge',
    fontFamily: 'Roboto',
    primary: '#475569', // slate-600
    primaryBg: '#f8fafc',
    secondary: '#06b6d4', // cyan-500
    sidebarBg: '#0f172a', // very dark slate
    sidebarText: '#cbd5e1',
    sidebarAccent: '#22d3ee',
    bannerBg: '#0f172a',
    badgeBg: '#22d3ee33',
    badgeText: '#06b6d4'
  },
  {
    id: 'ginecologia',
    name: { es: 'Ginecología & Obstetricia', en: 'Gastroenterology' },
    desc: { es: 'Fondo suave con detalles en orchid rosáceo y violeta. Enfocado en consolidar una sensación de empatía, calidez familiar y un trato profundamente humano.', en: 'Orchid pink and violet palette. Tailored for gynecology, obstetrics, and maternal clinics seeking warmth and comfort.' },
    category: { es: 'Humanista / Cálido', en: 'Humanist / Warm' },
    accent: { es: 'La favorita para ginecología y pediatría', en: 'Excellent for obstetrics, nursing and neonatology' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#db2777', // pink-600
    primaryBg: '#fdf2f8',
    secondary: '#9d174d',
    sidebarBg: '#fffafb',
    sidebarText: '#6f2b47',
    sidebarAccent: '#db2777',
    bannerBg: '#fdf2f8',
    badgeBg: '#db277715',
    badgeText: '#db2777'
  },
  {
    id: 'psiquiatria',
    name: { es: 'Mente & Equilibrio', en: 'Mindset & Balance' },
    desc: { es: 'Elegante contraste de verde salvia orgánico y tipografía Lora. Genera un ambiente de serenidad clínica, reconciliación y salud interna.', en: 'Organic sage green highlights coupled with Lora typeface. Conveys clinical serenity, stability, and therapeutic balance.' },
    category: { es: 'Académico / Serif', en: 'Academic / Serif' },
    accent: { es: 'Perfecto para psiquiatras, terapeutas y psicólogos clínicos', en: 'Perfect for psychiatrists, counselors and therapists' },
    layout: 'academia',
    fontFamily: 'Lora',
    primary: '#15803d', // green-700
    primaryBg: '#f0fdf4',
    secondary: '#16a34a',
    sidebarBg: '#fcfdfa',
    sidebarText: '#2d3f27',
    sidebarAccent: '#15803d',
    bannerBg: '#f4f7f2',
    badgeBg: '#15803d13',
    badgeText: '#15803d'
  },
  {
    id: 'odontologia',
    name: { es: 'Estética Dental', en: 'Aesthetic Dentistry' },
    desc: { es: 'Limpidez extrema de verde menta brillante combinado con tipografía minimalista Roboto. Simboliza resplandor, higiene, precisión e innovación.', en: 'Ultra-clean bright mint and sky blue contrast with modern Roboto font. Represents brilliance, hygiene, precision, and patient safety.' },
    category: { es: 'Clásico Profesional', en: 'Professional Classic' },
    accent: { es: 'Especialmente diseñado para odontólogos e implantólogos', en: 'Specifically built for dentists and oral surgeons' },
    layout: 'modern',
    fontFamily: 'Roboto',
    primary: '#0891b2', // cyan-600
    primaryBg: '#ecfeff',
    secondary: '#06b6d4',
    sidebarBg: '#f0fdfa',
    sidebarText: '#374151',
    sidebarAccent: '#0891b2',
    bannerBg: '#f0fdfa',
    badgeBg: '#0891b218',
    badgeText: '#0891b2'
  },
  {
    id: 'cirugia',
    name: { es: 'Cirugía de Élite', en: 'Elite Surgeon' },
    desc: { es: 'Un diseño sobrio de color negro azabache y divisor plata metálico. Proyecta un estándar de competitividad y rigor técnico impecable.', en: 'Highly assertive pitch black background accents and silver lines. Reflects flawless medical coordination and absolute rigor.' },
    category: { es: 'Ejecutivo / Liderazgo', en: 'Executive / Leadership' },
    accent: { es: 'La elección de cirujanos generales y plásticos de alto perfil', en: 'The choice of high-profile general and plastic surgeons' },
    layout: 'executive',
    fontFamily: 'Inter',
    primary: '#0f172a',
    primaryBg: '#f8fafc',
    secondary: '#475569', // surgical metallic
    sidebarBg: '#f8fafc',
    sidebarText: '#1e293b',
    sidebarAccent: '#0f172a',
    bannerBg: '#020617', // black header banner 
    badgeBg: '#47556922',
    badgeText: '#0f172a'
  },
  {
    id: 'telesalud',
    name: { es: 'Telesalud & Salud Digital', en: 'Telehealth & Digital' },
    desc: { es: 'Visual violeta laser y paneles con degradados. Especialmente optimizado para plataformas web, tele-experticia, startups médicas y salud tech.', en: 'Modern violet laser highlights with grid nodes. Best suited for remote clinic experts, medical startups and clinical technology stars.' },
    category: { es: 'Vanguardia Digital', en: 'Digital Modern' },
    accent: { es: 'Esencial para e-Health, consultores y telemedicina', en: 'Essential for digital e-health consultors and remote experts' },
    layout: 'modern',
    fontFamily: 'Outfit',
    primary: '#7c3aed', // violet-600
    primaryBg: '#f5f3ff',
    secondary: '#db2777', // pink highlight
    sidebarBg: '#faf9ff',
    sidebarText: '#475569',
    sidebarAccent: '#7c3aed',
    bannerBg: '#faf9ff',
    badgeBg: '#7c3aed1a',
    badgeText: '#7c3aed'
  },
  {
    id: 'rural',
    name: { es: 'Año Rural Integral', en: 'Rural Medicine' },
    desc: { es: 'Estilo rústico cálido con tonos arcilla y verde sutil. Pensado para destacar la adaptación comunitaria, trabajo en territorio y salud preventiva.', en: 'Warm clay tones with sage leaf green. Highly focused on rural community dedication, emergency adaptability and preventive healthcare.' },
    category: { es: 'Humanista / Cálido', en: 'Humanist / Warm' },
    accent: { es: 'Especialmente recomendado para médicos en año rural', en: 'Customized for rural year physicians' },
    layout: 'academia',
    fontFamily: 'Lora',
    primary: '#c2410c', // terracotta-700
    primaryBg: '#fff7ed',
    secondary: '#15803d',
    sidebarBg: '#fcfaf7',
    sidebarText: '#442e1b',
    sidebarAccent: '#c2410c',
    bannerBg: '#fdf6f0',
    badgeBg: '#c2410c14',
    badgeText: '#c2410c'
  },
  {
    id: 'internis',
    name: { es: 'Medicina Interna Integrada', en: 'Internal Medicine' },
    desc: { es: 'Estructura asertiva color índigo oscuro y azul acero. Optimizado para mostrar extensos historiales médicos, investigaciones y atenciones complejas.', en: 'Indigo and steel-blue theme. Highly structured for voluminous resumes, research experience, and comprehensive diagnoses.' },
    category: { es: 'Clásico Profesional', en: 'Professional Classic' },
    accent: { es: 'Diseño para internistas, endocrinos y reumatólogos', en: 'Built for internists, endocrinologists and rheumatologists' },
    layout: 'jorge',
    fontFamily: 'Inter',
    primary: '#311042', // deep plum
    primaryBg: '#faf5ff',
    secondary: '#4f46e5',
    sidebarBg: '#1e1b4b', // deep indigo
    sidebarText: '#e0e7ff',
    sidebarAccent: '#c7d2fe',
    bannerBg: '#1e1b4b',
    badgeBg: '#c7d2fe25',
    badgeText: '#e0e7ff'
  },
  {
    id: 'patologia',
    name: { es: 'Patología & Laboratorio', en: 'Molecular Pathology' },
    desc: { es: 'Layout clínico con división color uva madura y grises fríos. Proyecta una personalidad minuciosa, científica y orientada al detalle microscópico.', en: 'Microscopic precision vibe with deep burgundy dividers and steel colors. Matches pathology, genetics and laboratory research.' },
    category: { es: 'Clásico Profesional', en: 'Professional Classic' },
    accent: { es: 'Ideal para patólogos clínicos, genetistas e inmunólogos', en: 'A great fit for clinical pathologists, geneticists & immunologists' },
    layout: 'executive',
    fontFamily: 'Roboto',
    primary: '#701a75', // burgundy-800
    primaryBg: '#fdf4ff',
    secondary: '#475569',
    sidebarBg: '#fdf4ff',
    sidebarText: '#4a044e',
    sidebarAccent: '#701a75',
    bannerBg: '#4a044e', // dark purple
    badgeBg: '#701a751a',
    badgeText: '#701a75'
  }
];

export function getTemplateById(id: string): TemplateConfig {
  return TEMPLATES_LIST.find((t) => t.id === id) || TEMPLATES_LIST[0];
}
