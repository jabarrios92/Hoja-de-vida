/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  BookOpen, 
  MousePointerClick, 
  Palette, 
  Printer, 
  Save, 
  Sparkles, 
  ChevronRight, 
  FileText,
  HelpCircle,
  Clock,
  Camera,
  CheckCircle2,
  List,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type GuideTab = 'welcome' | 'editing' | 'styling' | 'saving' | 'printing';

export default function UserManualModal({ isOpen, onClose, lang }: UserManualModalProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>('welcome');

  const tabs = [
    {
      id: 'welcome' as GuideTab,
      labelEs: '👋 Guía de Inicio',
      labelEn: '👋 Getting Started',
      icon: BookOpen,
    },
    {
      id: 'editing' as GuideTab,
      labelEs: '✏️ ¿Cómo Editar?',
      labelEn: '✏️ How to Edit',
      icon: MousePointerClick,
    },
    {
      id: 'styling' as GuideTab,
      labelEs: '🎨 Diseño y Foto',
      labelEn: '🎨 Design & Photo',
      icon: Palette,
    },
    {
      id: 'saving' as GuideTab,
      labelEs: '💾 Guardar Datos',
      labelEn: '💾 Saving Data',
      icon: Save,
    },
    {
      id: 'printing' as GuideTab,
      labelEs: '🖨️ Imprimir y PDF',
      labelEn: '🖨️ Printing & PDF',
      icon: Printer,
    }
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm print:hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[80vh]"
          >
            {/* Modal Header */}
            <div className="p-4 md:p-5 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                    {lang === 'es' ? 'Manual de Ayuda e Instrucciones' : 'Help & Instructions Manual'}
                  </h2>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    {lang === 'es' 
                      ? 'Guía amigable paso a paso para dominar tu constructor de Hoja de Vida' 
                      : 'Friendly step-by-step guide to mastering your resume builder'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold hidden sm:inline">{lang === 'es' ? 'Cerrar' : 'Close'}</span>
              </button>
            </div>

            {/* Quick Summary Tip bar */}
            <div className="bg-teal-500/5 px-4 py-2 border-b border-teal-500/10 text-xs text-teal-400 font-semibold flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span>
                {lang === 'es' 
                  ? '💡 Consejo: También puedes interactuar directamente con tu hoja de vida.' 
                  : '💡 Tip: You can also interact directly with your resume.'}
              </span>
            </div>

            {/* Modal Body (Sidebar + Content splitscreen) */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              
              {/* Sidebar Tabs - Left */}
              <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-800/60 bg-slate-950/20 p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0 scrollbar-none">
                <div className="hidden md:block px-2 py-1.5 mb-1.5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <List className="w-3 h-3" />
                    <span>{lang === 'es' ? 'Contenido' : 'Index'}</span>
                  </span>
                </div>
                {tabs.map((tab) => {
                  const IconComp = tab.icon;
                  const isSelected = activeTab === tab.id;
                  const label = lang === 'es' ? tab.labelEs : tab.labelEn;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 py-2 px-3 rounded-xl text-[11.5px] font-bold transition-all text-left whitespace-nowrap shrink-0 md:shrink-1 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-teal-500/15 to-indigo-500/5 border border-teal-500/30 text-teal-400 shadow-sm shadow-teal-500/5'
                          : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span>{label}</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-600 hidden md:inline" />
                    </button>
                  );
                })}
              </div>

              {/* Central Information Area - Right */}
              <div className="flex-grow overflow-y-auto p-5 md:p-6 bg-slate-900/40 flex flex-col gap-4">
                
                {/* 1. WELCOME TAB */}
                {activeTab === 'welcome' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2.5 text-teal-400 border-b border-slate-800/50 pb-2">
                      <BookOpen className="w-4 h-4" />
                      <h3 className="font-bold text-xs uppercase tracking-wide">
                        {lang === 'es' ? '¡Bienvenido al Constructor Médico!' : 'Welcome to the Clinical Builder!'}
                      </h3>
                    </div>

                    <p className="text-[12.5px] text-slate-300 leading-relaxed">
                      {lang === 'es' 
                        ? 'Diseñamos esta herramienta para ser intuitiva y fácil de usar, sin importar tu experiencia con la tecnología. Sigue estos simples conceptos para crear un currículum de aspecto profesional e impecable.'
                        : 'We designed this tool to be highly intuitive and friendly, regardless of your comfort level with computers. Follow these simple guidelines to build an clean, professional clinically-organized resume.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                      <div className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80">
                        <span className="text-teal-400 text-xs font-semibold block mb-1">
                          {lang === 'es' ? '🚀 Todo Listo' : '🚀 Ready to Go'}
                        </span>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {lang === 'es' 
                            ? 'Incluye datos de ejemplo en salud que puedes simplemente sustituir con tus propios estudios o certificados.'
                            : 'Pre-populated with real clinical data samples. Simply click and swap them with your credentials.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80">
                        <span className="text-indigo-400 text-xs font-semibold block mb-1">
                          {lang === 'es' ? '🌐 Traducción Instantánea' : '🌐 Instant Translation'}
                        </span>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Traduce los títulos y etiquetas fijas al instante usando el botón "English" en la esquina de arriba.'
                            : 'Translate the structural titles and field headings immediately utilizing the language toggle above.'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 p-3.5 bg-yellow-500/5 rounded-xl border border-yellow-500/10 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {lang === 'es'
                          ? 'No te preocupes por cometer errores: siempre puedes volver a la versión inicial usando el botón de restablecer datos en la esquina superior.'
                          : "Don't worry about making mistakes: you can always reset back to the default profile using the small circular reset button at the top right."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 2. EDITING TAB */}
                {activeTab === 'editing' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2.5 text-teal-400 border-b border-slate-800/50 pb-2">
                      <MousePointerClick className="w-4 h-4" />
                      <h3 className="font-bold text-xs uppercase tracking-wide">
                        {lang === 'es' ? 'Cómo editar el contenido' : 'How to Edit the Content'}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-[12.5px] leading-relaxed">
                      {lang === 'es'
                        ? 'Hay dos formas muy sencillas de editar los datos de tu hoja de vida:'
                        : 'There are two highly straightforward ways to modify your resume contents:'}
                    </p>

                    <div className="flex flex-col gap-3">
                      {/* Interactive Double-Click guide */}
                      <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 font-bold text-xs">
                          1
                        </div>
                        <div>
                          <h4 className="text-[12.5px] font-bold text-teal-400">
                            {lang === 'es' ? '⚡ Método Rápido (¡Doble Clic!)' : '⚡ Swift Method (Double Click!)'}
                          </h4>
                          <p className="text-[11.5px] text-slate-300 mt-1 leading-relaxed">
                            {lang === 'es'
                              ? 'Mira la hoja de vida abajo. Pasa el mouse sobre el bloque que deseas cambiar y haz '
                              : 'Look at the live resume preview below. Hover over any section and double-click. '}
                            <span className="font-extrabold text-white underline">
                              {lang === 'es' ? 'Doble Clic' : 'Double click'}
                            </span>
                            {lang === 'es'
                              ? ' en cualquier texto. Se abrirá automáticamente el panel de control correspondiente en la parte superior.'
                              : ' to immediately open the exact active tab for editing.'}
                          </p>
                        </div>
                      </div>

                      {/* Editing Panel guide */}
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-850 flex items-center justify-center text-slate-400 shrink-0 font-bold text-xs">
                          2
                        </div>
                        <div>
                          <h4 className="text-[12.5px] font-bold text-slate-200">
                            {lang === 'es' ? '🛠️ Método Manual (Editor de Contenido)' : '🛠️ Manual Method (Content Editor)'}
                          </h4>
                          <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
                            {lang === 'es'
                              ? 'Haz clic en el botón "Editar Contenido 📝" en el centro superior. Se desplegará el panel para cambiar los datos pestaña por pestaña: Info Personal, Resumen, Experiencia, Certificaciones, etc.'
                              : 'Click the "Edit Content 📝" button at the center top. This opens the control dashboard where you can browse fields by category manually.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. STYLING TAB */}
                {activeTab === 'styling' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2.5 text-teal-400 border-b border-slate-800/50 pb-2">
                      <Palette className="w-4 h-4" />
                      <h3 className="font-bold text-xs uppercase tracking-wide">
                        {lang === 'es' ? 'Estilo, Diseño y Foto' : 'Style, Design & Photo'}
                      </h3>
                    </div>

                    <p className="text-[12.5px] text-slate-300 leading-relaxed">
                      {lang === 'es'
                        ? 'Puedes experimentar y ajustar la presencia visual para lograr el impacto médico que buscas:'
                        : 'Explore custom visual states to find your ideal professional visual impact:'}
                    </p>

                    <ul className="flex flex-col gap-3 mt-1 text-[11.5px] text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-100">{lang === 'es' ? 'Cambiar a otra plantilla (30 opciones)' : 'Alternate designs (30 options)'}</strong>
                          <p className="text-slate-400 mt-0.5">
                            {lang === 'es'
                              ? 'Elige la composición seleccionando entre el catálogo superior o abriendo el botón "Diseño de Hoja / 30" (encontrarás opciones con foto o minimalistas).'
                              : 'Choose structure style in the upper selector or click the "CV Designs (30)" button for a side list of layouts.'}
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2">
                        <Camera className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-100">{lang === 'es' ? 'Efectos de Foto Avanzados (Canva)' : 'Advanced Photo Effects (Canva Mode)'}</strong>
                          <p className="text-slate-400 mt-0.5">
                            {lang === 'es'
                              ? 'En el apartado de edición, selecciona la pestaña "Efectos de Foto". Elige un halo de luz neón (Malibu Rosa, Radioactive Verde, Retro Naranja, Midnight Azul), cambia la forma a óvalo/cuadrada o quita el borde físico.'
                              : 'Under "Efectos de Foto" edit tab, choose background neon glow rings, select picture shapes (rectangular, oval, circle, rounded-square), or modify border width.'}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {/* 4. SAVING TAB */}
                {activeTab === 'saving' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2.5 text-teal-400 border-b border-slate-800/50 pb-2">
                      <Save className="w-4 h-4" />
                      <h3 className="font-bold text-xs uppercase tracking-wide">
                        {lang === 'es' ? 'Guardar tus Datos y Avances' : 'Saving Your Progress'}
                      </h3>
                    </div>

                    <p className="text-[12.5px] text-slate-300 leading-relaxed">
                      {lang === 'es'
                        ? 'No tienes que preocuparte por presionar "guardar" constantemente. Tu trabajo está protegido:'
                        : 'No need to worry about constant manual commits. Your work is guarded and portable:'}
                    </p>

                    <div className="grid grid-cols-1 gap-3.5 mt-1">
                      <div className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-800 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{lang === 'es' ? '🛡️ Autoguardado Automático' : '🛡️ Live Autosave'}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {lang === 'es'
                              ? 'El sistema detecta tus cambios al instante y los almacena en tu navegador web. Si cierras la pestaña o reinicias la computadora, tu progreso estará exactamente igual al volver.'
                              : 'Your updates are logged instantly using the safe browser container. If you close the tab, everything remains exactly where you left.'}
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-800 flex items-start gap-3">
                        <FileText className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{lang === 'es' ? '💾 Archivo de Respaldo (.json)' : '💾 Exporting Backups (.json)'}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {lang === 'es'
                              ? 'Si quieres continuar editando en otro computador, haz clic en "Exportar". Guardará un pequeño archivo de texto .json. Para recuperarlo en otro lado, haz clic en "Cargar" y búscalo. ¡Así de simple!'
                              : 'To edit on a different computer, click "Export" to download a small .json copy. To restore, click "Import" on the new device.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. PRINTING TAB */}
                {activeTab === 'printing' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2.5 text-teal-400 border-b border-slate-800/50 pb-2">
                      <Printer className="w-4 h-4" />
                      <h3 className="font-bold text-xs uppercase tracking-wide">
                        {lang === 'es' ? 'Cómo descargar en PDF / Imprimir con éxito' : 'Steps for Perfect PDF Generation'}
                      </h3>
                    </div>

                    <p className="text-[12.5px] text-slate-300 leading-relaxed">
                      {lang === 'es'
                        ? 'Sigue estos 3 prácticos pasos para asegurar que las fuentes, bordes y halos de luz se vean espectaculares al descargar:'
                        : 'Please follow these crucial 3 steps to ensure perfect rendering of borders, fonts, and custom photo halos in your file:'}
                    </p>

                    <div className="space-y-3 mt-1">
                      <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                        <span className="text-[10px] font-bold text-teal-400 block uppercase mb-1">
                          {lang === 'es' ? 'Paso 1: Ir a Vista Previa' : 'Step 1: Go into Preview'}
                        </span>
                        <p className="text-[11px] text-slate-300">
                          {lang === 'es'
                            ? 'Haz clic arriba en "PDF / Imprimir". Entrarás a una previsualización de documento real.'
                            : 'Click the "PDF / HTML" button at the top header to enter print simulation.'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                        <span className="text-[10px] font-bold text-teal-400 block uppercase mb-1">
                          {lang === 'es' ? 'Paso 2: Cambiar a Guardar como PDF' : 'Step 2: Destination set to PDF'}
                        </span>
                        <p className="text-[11px] text-slate-300">
                          {lang === 'es'
                            ? 'Al ver la ventana de la impresora, define Destino en "Guardar como PDF" y tamaño de papel en "A4".'
                            : 'When the print dialog prompts, set Destination to "Save as PDF" and choose "A4" dimensions.'}
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <span className="text-[10.5px] font-bold text-emerald-400 block uppercase mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{lang === 'es' ? 'Paso 3 MUY IMPORTANTE: Activar Gráficos de Fondo' : 'Step 3 CRITICAL: Toggle Background Graphics'}</span>
                        </span>
                        <p className="text-[11px] text-slate-200 font-medium">
                          {lang === 'es'
                            ? 'Haz clic en "Más Ajustes" de la impresora local y ACTIVA la casilla: "Gráficos de fondo" (Background graphics) y deja los márgenes en "Ninguno" o "Predeterminado" para que los colores y auras de luz se impriman a la perfección.'
                            : 'Expand "More options" and physically TICK "Background graphics". Set Margins to "None" or "Default" to ensure complete background tint/blend transfers.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950/50 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>
                  {lang === 'es' 
                    ? '¿Tienes más dudas? Sigue editando y experimentando de forma segura.' 
                    : 'Any remaining questions? Start customizing safely now.'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer text-center"
              >
                {lang === 'es' ? '¡Entendido, gracias!' : 'Understood, got it!'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
