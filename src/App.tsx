/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CVData, Language } from './types';
import { INITIAL_CV_DATA } from './data';
import CVViewer from './components/CVViewer';
import CVEditor from './components/CVEditor';
import { Printer, Edit3, Globe, RotateCcw, FileText, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function App() {
  // Load initial CV data from localStorage if available, else use baseline data
  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem('doctor_cv_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Basic schema check to prevent crashes if schema changes
        if (parsed && parsed.personalInfo && parsed.personalInfo.name) {
          if (!Array.isArray(parsed.referencias)) {
            parsed.referencias = INITIAL_CV_DATA.referencias;
          }
          return parsed;
        }
      } catch (e) {
        console.error("Error loading CV data from localStorage", e);
      }
    }
    return INITIAL_CV_DATA;
  });

  const [lang, setLang] = useState<Language>('es');
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('doctor_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Reset to original PDF CV data
  const handleResetData = () => {
    if (window.confirm(lang === 'es' ? '¿Estás seguro de que quieres restablecer los datos originales de la hoja de vida?' : 'Are you sure you want to restore the original resume data?')) {
      setCvData(INITIAL_CV_DATA);
      setToastMessage(lang === 'es' ? 'Datos restablecidos con éxito' : 'Data reset successfully');
    }
  };

  // Trigger Print Dialog
  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn("Printing failed or blocked by iframe container.", e);
    }
    setToastMessage(
      lang === 'es' 
        ? 'Abriendo panel de impresión. Consejo: Para un PDF perfecto, habilita "Gráficos de fondo" en más opciones.' 
        : 'Opening print dialog. Tip: Enable "Background graphics" in the print settings for a perfect PDF output.'
    );
  };

  // Handle avatar update from photo selector
  const handleAvatarChange = (newUrl: string) => {
    setCvData(prevDef => ({
      ...prevDef,
      personalInfo: {
        ...prevDef.personalInfo,
        avatarUrl: newUrl
      }
    }));
    setToastMessage(lang === 'es' ? 'Foto de perfil actualizada' : 'Profile photo updated');
  };

  return (
    <main className={`min-h-screen text-slate-800 flex flex-col transition-colors duration-300 ${
      isPreviewMode ? 'bg-[#0f1420]' : 'bg-slate-50'
    }`}>
      {/* ACTION HEADER BAR (Hidden during printing) */}
      <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800 shadow-md px-4 py-3 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1 px-2 text-xs font-bold text-teal-400 bg-teal-500/10 rounded-md uppercase tracking-wider">
              {lang === 'es' ? 'Médico General' : 'MD Portfolio'}
            </span>
            <span className="h-4 w-px bg-slate-700"></span>
            <span className="text-slate-300 text-xs font-medium">
              CV: {cvData.personalInfo.name}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-100 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title={lang === 'es' ? 'Cambiar a Inglés' : 'Cambiar a Español'}
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold">{lang === 'es' ? 'English' : 'Español'}</span>
            </button>

            {/* Print Trigger */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors cursor-pointer shadow-sm"
              title={lang === 'es' ? 'Guardar como PDF / Imprimir' : 'Save as PDF / Print'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'PDF / Imprimir' : 'PDF / Print'}</span>
            </button>

            {/* PDF Preview Mode Switcher */}
            <button
              onClick={() => {
                const nextState = !isPreviewMode;
                setIsPreviewMode(nextState);
                if (nextState) {
                  setIsEditing(false);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors border cursor-pointer ${
                isPreviewMode
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md hover:bg-amber-550'
                  : 'bg-slate-850 hover:bg-slate-800 text-slate-100 border-slate-800'
              }`}
              title={lang === 'es' ? 'Simular documento de hoja A4 impresa' : 'Simulate physical printed A4 sheet'}
            >
              {isPreviewMode ? <EyeOff className="w-3.5 h-3.5 text-amber-200" /> : <Eye className="w-3.5 h-3.5 text-teal-400" />}
              <span>{isPreviewMode ? (lang === 'es' ? 'Cerrar Previa' : 'Close Preview') : (lang === 'es' ? 'Vista Previa PDF' : 'PDF Preview')}</span>
            </button>

            {/* Edit Switcher */}
            <button
              onClick={() => {
                const nextState = !isEditing;
                setIsEditing(nextState);
                if (nextState) {
                  setIsPreviewMode(false);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors border cursor-pointer ${
                isEditing
                  ? 'bg-slate-700 text-teal-400 border-slate-600 hover:bg-slate-650'
                  : 'bg-slate-850 hover:bg-slate-800 text-slate-100 border-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? (lang === 'es' ? 'Ver Hoja de Vida' : 'View Resume') : (lang === 'es' ? 'Editar Contenido' : 'Edit Content')}</span>
            </button>

            {/* Reset to Baseline */}
            <button
              onClick={handleResetData}
              className="flex items-center justify-center p-2 rounded-lg bg-slate-850 hover:bg-slate-800 hover:text-red-400 text-slate-400 border border-slate-850 transition-colors cursor-pointer"
              title={lang === 'es' ? 'Restablecer Valores Originales' : 'Reset to original values'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ACTION NOTIFICATION TOAST */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white rounded-xl py-3 px-4 shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* CORE WRAPPER SECTION */}
      <section className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-8 print:p-0">
        
        {/* INTERACTIVE HEADER CARD WITH QUICK GUIDE (Hidden in Preview Mode) */}
        {!isPreviewMode && (
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl border border-slate-800/80 shadow-md flex items-center justify-between gap-6 flex-col md:flex-row print:hidden">
            <div className="flex flex-col gap-1 md:text-left text-center">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-1.5">
                <span>{lang === 'es' ? 'Currículum Profesional Interactivo' : 'Interactive Professional Resume'}</span>
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                {lang === 'es'
                  ? 'Diseño moderno, limpio y de alta legibilidad inspirado exactamente en el perfil médico del Dr. Jorge Andrés. Puedes traducirlo a inglés con un clic, cambiar la foto, editar los textos y guardarlo como PDF listo para enviar.'
                  : 'Modern, clean, high-readability design precisely inspired by Dr. Jorge Andrés\' medical profile. Translate to English with one click, change the photo, edit descriptions, and save as PDF ready to send.'}
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700/80 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                {lang === 'es' ? 'Personalizar Textos' : 'Customize Texts'}
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW MODE HIGHLIGHT BANNER */}
        {isPreviewMode && (
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 print:hidden animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-200">
                  {lang === 'es' ? 'Modo Vista Previa PDF Activo (Acuñado A4)' : 'A4 PDF Print Preview Mode Active'}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {lang === 'es' 
                    ? 'Esta vista replica exactamente el formato de página impreso real (A4). Tip: Elige "Guardar como PDF" y selecciona "Gráficos de fondo" en más opciones.'
                    : 'This viewport models the exact paper dimensions and grids. Tip: Choose "Save as PDF" and toggle "Background graphics" in printer options.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
              </button>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-350 rounded-xl text-xs cursor-pointer"
              >
                {lang === 'es' ? 'Volver a Edición' : 'Edit Mode'}
              </button>
            </div>
          </div>
        )}

        {/* EDITOR AREA (Hidden during printing and preview) */}
        {isEditing && !isPreviewMode && (
          <div className="print:hidden">
            <CVEditor
              data={cvData}
              onChange={setCvData}
              onClose={() => setIsEditing(false)}
            />
          </div>
        )}

        {/* PRIMARY CV VISUALIZATION */}
        <div className={`flex-1 flex justify-center items-start transition-all duration-350`}>
          <CVViewer
            data={cvData}
            lang={lang}
            onAvatarChange={isPreviewMode ? undefined : handleAvatarChange}
            forcePrintLayout={isPreviewMode}
          />
        </div>
      </section>

      {/* FOOTER AREA (Hidden during printing) */}
      <footer className="bg-slate-900 border-t border-slate-800/80 text-slate-500 py-6 px-4 text-center text-xs mt-12 print:hidden w-full">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; 2026 {cvData.personalInfo.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">{lang === 'es' ? 'Diseñado para Médicos y Profesionales' : 'Tailored for Clinicians & Professionals'}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
