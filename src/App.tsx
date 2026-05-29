/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent } from 'react';
import { CVData, Language } from './types';
import { INITIAL_CV_DATA } from './data';
import CVViewer from './components/CVViewer';
import CVEditor, { TabType } from './components/CVEditor';
import TemplateSidebar from './components/TemplateSidebar';
import UserManualModal from './components/UserManualModal';
import { Printer, Edit3, Globe, RotateCcw, FileText, CheckCircle, Eye, EyeOff, Save, Download, Upload, ShieldCheck, Layers, HelpCircle, Type, ChevronDown, History } from 'lucide-react';

interface HistoryItem {
  timestamp: number;
  data: CVData;
}

// Central font definitions for reuse
export const FONT_OPTIONS = [
  { id: 'Outfit', name: 'Gemini (Outfit)', desc: 'Circular y tecnológico', font: '"Outfit", sans-serif' },
  { id: 'Inter', name: 'Inter', desc: 'Suizo, limpio y moderno', font: '"Inter", sans-serif' },
  { id: 'Manrope', name: 'Manrope', desc: 'Preciso y contemporáneo', font: '"Manrope", sans-serif' },
  { id: 'Montserrat', name: 'Montserrat', desc: 'Urbano y equilibrado', font: '"Montserrat", sans-serif' },
  { id: 'Poppins', name: 'Poppins', desc: 'Dinámico y geométrico', font: '"Poppins", sans-serif' },
  { id: 'Open Sans', name: 'Open Sans', desc: 'Legibilidad corporativa', font: '"Open Sans", sans-serif' },
  { id: 'Lato', name: 'Lato', desc: 'Harmonioso y elegante', font: '"Lato", sans-serif' },
  { id: 'Quicksand', name: 'Quicksand', desc: 'Suave y redondeado', font: '"Quicksand", sans-serif' },
  { id: 'Roboto', name: 'Roboto', desc: 'Geométrico y adaptable', font: '"Roboto", sans-serif' },
  { id: 'Playfair Display', name: 'Playfair Display', desc: 'Académico de gran elegancia', font: '"Playfair Display", serif' },
  { id: 'Lora', name: 'Lora', desc: 'Clásico e intelectual', font: '"Lora", serif' },
  { id: 'Merriweather', name: 'Merriweather', desc: 'Excelente legibilidad en pantalla', font: '"Merriweather", serif' }
];

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
          if (!parsed.personalInfo.photoEffect) {
            parsed.personalInfo.photoEffect = {
              type: 'malibu',
              intensity: 35,
              showFrame: true,
              frameColor: '#ec4899',
              frameWidth: 4,
              shape: 'circle'
            };
          } else {
            const eff = parsed.personalInfo.photoEffect;
            if (eff.showFrame === undefined) eff.showFrame = true;
            if (!eff.frameColor) {
              eff.frameColor = eff.type === 'malibu' 
                ? '#ec4899' 
                : eff.type === 'radioactive'
                ? '#10b981'
                : eff.type === 'retro'
                ? '#f97316'
                : eff.type === 'midnight'
                ? '#3b82f6'
                : eff.type === 'chroma'
                ? '#8b5cf6'
                : '#e2e8f0';
            }
            if (eff.frameWidth === undefined) eff.frameWidth = 4;
            if (!eff.shape) eff.shape = 'circle';
          }
          if (!parsed.pageSize) {
            parsed.pageSize = 'oficio';
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
  const [editorActiveTab, setEditorActiveTab] = useState<TabType>('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showFloatingFontSelector, setShowFloatingFontSelector] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('doctor_cv_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  // Function to save a snapshot to history
  const saveSnapshot = (dataToSave: CVData) => {
    setHistory((prev) => {
      // Don't save if it's identical to the latest one
      if (prev.length > 0 && JSON.stringify(prev[0].data) === JSON.stringify(dataToSave)) {
        return prev;
      }
      
      const newItem: HistoryItem = {
        timestamp: Date.now(),
        data: JSON.parse(JSON.stringify(dataToSave)) // Deep clone
      };
      
      const newHistory = [newItem, ...prev].slice(0, 3);
      localStorage.setItem('doctor_cv_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('doctor_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  // Periodic automatic snapshot (every 5 minutes if data changed significantly)
  useEffect(() => {
    const interval = setInterval(() => {
      saveSnapshot(cvData);
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [cvData]);

  // Save snapshot when finishing editing session
  useEffect(() => {
    if (!isEditing && !isPreviewMode) {
      saveSnapshot(cvData);
    }
  }, [isEditing]);

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

  // Handle data export as a backup JSON file
  const handleExportJSON = () => {
    try {
      saveSnapshot(cvData); // Save snapshot before export
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(cvData, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `CV_${cvData.personalInfo.name.replace(/\s+/g, '_')}_Backup.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setToastMessage(lang === 'es' ? 'Archivo de respaldo de progreso (.json) descargado con éxito' : 'Progress backup (.json) file downloaded successfully');
    } catch (e) {
      console.error(e);
      setToastMessage(lang === 'es' ? 'Error al exportar el archivo de progreso' : 'Error exporting progress backup');
    }
  };

  // Handle data import from a backup JSON file
  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personalInfo && parsed.personalInfo.name) {
          // Schema normalization / defaults
          if (!Array.isArray(parsed.referencias)) {
            parsed.referencias = [];
          }
          if (!parsed.personalInfo.photoEffect) {
            parsed.personalInfo.photoEffect = {
              type: 'none',
              intensity: 35,
              showFrame: true,
              frameColor: '#ec4899',
              frameWidth: 4,
              shape: 'circle'
            };
          }
          setCvData(parsed);
          setToastMessage(lang === 'es' ? '✔ ¡Progreso importado y restaurado correctamente!' : '✔ Progress successfully imported and restored!');
        } else {
          setToastMessage(lang === 'es' ? 'El archivo JSON no tiene un formato válido para esta plantilla.' : 'JSON file has an invalid format for this template.');
        }
      } catch (err) {
        console.error(err);
        setToastMessage(lang === 'es' ? 'Error al leer el archivo de respaldo.' : 'Error reading the backup file.');
      }
    };
    fileReader.readAsText(files[0]);
    // Clear input so same file can be loaded again if desired
    e.target.value = '';
  };

  // Handle manual trigger showing reassuring toast message
  const handleManualSave = () => {
    saveSnapshot(cvData);
    localStorage.setItem('doctor_cv_data', JSON.stringify(cvData));
    setToastMessage(lang === 'es' ? '✔ ¡Progreso guardado de forma segura en este navegador!' : '✔ Progress safely saved in this browser!');
  };

  const restoreHistory = (item: HistoryItem) => {
    if (window.confirm(lang === 'es' ? '¿Restaurar esta versión guardada?' : 'Restore this saved version?')) {
      // Save current state to history before restoring another
      saveSnapshot(cvData);
      setCvData(item.data);
      setIsHistoryOpen(false);
      setToastMessage(lang === 'es' ? '✔ ¡Versión restaurada con éxito!' : '✔ Version successfully restored!');
    }
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
            <span className="hidden md:inline-block h-4 w-px bg-slate-700"></span>
            <div className="hidden md:flex items-center gap-1.5 text-[10px] text-teal-400 bg-teal-400/5 px-2.5 py-1 rounded-full border border-teal-500/10 font-medium select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span>{lang === 'es' ? 'Autoguardado local activo' : 'Real-time autosave active'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
            {/* Quick main templates dropdown selector */}
            <div className="flex items-center gap-1.5 bg-slate-850 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-teal-400 select-none">
                {lang === 'es' ? 'Plantilla:' : 'Theme:'}
              </span>
              <select
                value={cvData.templateId || 'jorge'}
                onChange={(e) => {
                  const id = e.target.value;
                  setCvData((prev) => ({ ...prev, templateId: id }));
                  setToastMessage(lang === 'es' ? '✔ ¡Diseño de plantilla aplicado!' : '✔ Template style applied!');
                }}
                className="bg-transparent border-0 text-white font-bold py-0.5 focus:outline-none cursor-pointer pr-1 text-xs"
              >
                <option value="jorge" className="bg-slate-900">{lang === 'es' ? 'Jorge (Clásico)' : 'Jorge (Classic)'}</option>
                <option value="academia" className="bg-slate-900">{lang === 'es' ? 'Academia Lora' : 'Academia Lora'}</option>
                <option value="executive" className="bg-slate-900">{lang === 'es' ? 'Prestige Ejecutivo' : 'Prestige Exec.'}</option>
                <option value="modern" className="bg-slate-900">{lang === 'es' ? 'Clínico Moderno' : 'Modern Clinical'}</option>
              </select>
            </div>

            {/* Dynamic Template Preset Drawer Trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-850/80 hover:text-white text-slate-100 border border-slate-800 transition-colors cursor-pointer font-bold relative"
              title={lang === 'es' ? 'Elegir uno de los 30 diseños de plantilla' : 'Browse through 30 specialized template designs'}
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'es' ? 'Diseño de Hoja (30)' : 'CV Designs (30)'}</span>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-850/80 text-slate-100 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title={lang === 'es' ? 'Cambiar a Inglés' : 'Cambiar a Español'}
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold">{lang === 'es' ? 'English' : 'Español'}</span>
            </button>

            {/* History Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                  isHistoryOpen 
                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-100 border-slate-800'
                }`}
                title={lang === 'es' ? 'Ver historial de versiones' : 'View history of versions'}
              >
                <History className={`w-3.5 h-3.5 ${isHistoryOpen ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{lang === 'es' ? 'Historial' : 'History'}</span>
              </button>

              {isHistoryOpen && (
                <div className="absolute right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 w-72 z-[100] animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-slate-850 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{lang === 'es' ? 'Últimos 3 Estados' : 'Last 3 Saved States'}</span>
                    <span className="text-[9px] text-slate-500 uppercase">{lang === 'es' ? 'Auto-Sesión' : 'Auto-Session'}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-1">
                    {history.length > 0 ? (
                      history.map((item, idx) => (
                        <div key={item.timestamp} className="flex flex-col gap-2 p-2.5 rounded-lg bg-slate-850/50 border border-slate-800/60 hover:border-amber-500/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold text-slate-200">
                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className="text-[9px] text-slate-500">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <button
                              onClick={() => restoreHistory(item)}
                              className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black rounded-md transition-colors uppercase"
                            >
                              {lang === 'es' ? 'Restaurar' : 'Restore'}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 px-4 text-center">
                        <p className="text-[10px] text-slate-500 italic">{lang === 'es' ? 'Aún no se han capturado versiones automáticamente. Comienza a editar para generar historial.' : 'No automatic versions captured yet. Start editing to generate history.'}</p>
                      </div>
                    )}
                    <div className="mt-1 px-2 pb-1 border-t border-slate-850 pt-2">
                       <p className="text-[9px] text-slate-500 italic leading-tight">
                         {lang === 'es' 
                           ? 'Se guarda un punto de control cada vez que terminas de editar o cada 5 minutos.' 
                           : 'A checkpoint is saved each time you finish editing or every 5 minutes.'}
                       </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Minimalist Help/Instrucciones Trigger */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-slate-850 text-indigo-300 hover:text-white border border-indigo-900/65 transition-colors cursor-pointer"
              title={lang === 'es' ? 'Guía de inicio y manual de ayuda sencillo' : 'Friendly how-to instructions & guide'}
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold">{lang === 'es' ? 'Ayuda ❓' : 'Help ❓'}</span>
            </button>

            {/* Minimalist Typography Dropdown in Header */}
            <div className="relative group">
              <button
                onClick={() => setShowFloatingFontSelector(!showFloatingFontSelector)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                  showFloatingFontSelector 
                    ? 'bg-teal-500 text-slate-950 border-teal-400' 
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-100 border-slate-800'
                }`}
              >
                <Type className={`w-3.5 h-3.5 ${showFloatingFontSelector ? 'text-slate-950' : 'text-teal-400'}`} />
                <span>{lang === 'es' ? 'Tipografía' : 'Fonts'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFloatingFontSelector ? 'rotate-180' : ''}`} />
              </button>

              {showFloatingFontSelector && (
                <div className="absolute right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 w-64 z-[100] animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-slate-850 mb-1">
                     <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{lang === 'es' ? 'Seleccionar Fuente' : 'Select Font Face'}</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {FONT_OPTIONS.map((font) => {
                      const isActive = (cvData.fontFamily || 'Inter') === font.id;
                      return (
                        <button
                          key={font.id}
                          onClick={() => {
                            setCvData(prev => ({ ...prev, fontFamily: font.id }));
                            setToastMessage(lang === 'es' ? `✔ ¡Fuente aplicada: ${font.id}!` : `✔ Font applied: ${font.id}!`);
                          }}
                          className={`w-full flex flex-col items-start px-3 py-2 transition-colors hover:bg-slate-850 border-l-2 ${
                            isActive ? 'bg-slate-850 border-teal-500' : 'border-transparent'
                          }`}
                        >
                          <span style={{ fontFamily: font.font }} className={`text-sm ${isActive ? 'text-teal-400 font-bold' : 'text-slate-200 font-medium'}`}>
                            {font.id === 'Outfit' ? 'Gemini' : font.name}
                          </span>
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            {lang === 'es' 
                              ? font.desc 
                              : font.id === 'Inter' ? 'Swiss modern style' : 
                                font.id === 'Roboto' ? 'Geometric & legible' : 
                                font.id === 'Playfair Display' ? 'Academic & elegant' : 
                                font.id === 'Lora' ? 'Classic & intellectual' : 
                                font.id === 'Merriweather' ? 'Robust screen legible' :
                                font.id === 'Outfit' ? 'Tech-forward geometric' :
                                font.id === 'Manrope' ? 'Modern sans-serif' :
                                font.id === 'Montserrat' ? 'Equilibrium & style' :
                                font.id === 'Poppins' ? 'Dynamic geometric' :
                                font.id === 'Open Sans' ? 'Corporate legible' :
                                font.id === 'Lato' ? 'Harmonious & elegant' :
                                font.id === 'Quicksand' ? 'Soft rounded style' : ''
                            }
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

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
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800/80 shadow-md flex flex-col gap-5 print:hidden">
            {/* ROW 1: Title and Central Customize Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/50">
              <div className="flex flex-col gap-1 md:text-left text-center">
                <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse shrink-0"></span>
                  <span>{lang === 'es' ? 'Currículum Profesional Interactivo' : 'Interactive Professional Resume'}</span>
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  {lang === 'es'
                    ? 'Estructura médica optimizada de alta legibilidad. Traduce al instante, edita textos mediante clics en la tarjeta y descarga tu PDF final.'
                    : 'Optimized medical structure with high readability. Translate instantly, click elements to edit text dynamically, and download your final PDF.'}
                </p>
              </div>

              {/* Central Customization Switcher */}
              <button
                onClick={() => {
                  const nextState = !isEditing;
                  setIsEditing(nextState);
                  if (nextState) {
                    setIsPreviewMode(false);
                  }
                }}
                className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border shadow-lg shrink-0 ${
                  isEditing
                    ? 'bg-teal-500 text-slate-950 border-teal-400 hover:bg-teal-400 shadow-teal-500/10'
                    : 'bg-indigo-600 hover:bg-indigo-505 text-white border-indigo-500 shadow-indigo-950/40'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>
                  {isEditing 
                    ? (lang === 'es' ? 'Finalizar Edición ✔' : 'Finish Editing ✔') 
                    : (lang === 'es' ? 'Editar Contenido 📝' : 'Edit Content 📝')}
                </span>
              </button>
            </div>

            {/* ROW 2: Multi-column grid containing Templates Panel and File Actions Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* LEFT PANEL: Core layout switcher dropdown and preset library */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {lang === 'es' ? 'Diseño y Plantillas Principales' : 'Design & Core Templates'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    {lang === 'es'
                      ? 'Visualiza tus cambios al instante rotando sobre las 4 plantillas claves recomendadas para el sector salud.'
                      : 'Instantly view your changes by switching between the 4 core clinical layouts recommended for healthcare.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mt-1.5">
                  {/* Dropdown Menu for the 4 main templates */}
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wide pl-1">
                      {lang === 'es' ? 'Alternar Estructura' : 'Change Structure'}
                    </span>
                    <select
                      value={cvData.templateId || 'jorge'}
                      onChange={(e) => {
                        const id = e.target.value;
                        setCvData((prev) => ({ ...prev, templateId: id }));
                        setToastMessage(lang === 'es' ? '✔ ¡Diseño de plantilla aplicado!' : '✔ Template style applied!');
                      }}
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer font-bold"
                    >
                      <option value="jorge">👉 {lang === 'es' ? 'Jorge (Clásico Médico)' : 'Jorge (Clinical Classic)'}</option>
                      <option value="academia">👉 {lang === 'es' ? 'Academia Lora (Solemne)' : 'Academia (Academic Serif)'}</option>
                      <option value="executive">👉 {lang === 'es' ? 'Prestige Ejecutivo (Liderazgo)' : 'Prestige (Executive Banner)'}</option>
                      <option value="modern">👉 {lang === 'es' ? 'Clínico Moderno (Bento Rejilla)' : 'Clinical (Modern Bento)'}</option>
                    </select>
                  </div>

                  {/* Sidebar preset catalog selector */}
                  <div className="flex flex-col gap-1 justify-end">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wide pl-1">
                      {lang === 'es' ? 'Catálogo Completo' : 'Complete Catalog'}
                    </span>
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white text-xs font-bold rounded-lg border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      title={lang === 'es' ? 'Ver los 30 diseños de catálogo' : 'Explore the full list of 30 designs'}
                    >
                      <Layers className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                      <span>{lang === 'es' ? 'Más Diseños (30)' : 'More Styles (30)'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: Data persistence backup tools */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Save className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {lang === 'es' ? 'Archivo & Respaldo de Progreso' : 'Backup & Progress Archiving'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    {lang === 'es'
                      ? 'Guarda localmente en tu navegador de forma segura o exporta tus datos modificados en archivo .json.'
                      : 'Safely save your progress locally or download your formulated resume data as a portable .json backup file.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {/* Manual Save */}
                  <button
                    onClick={handleManualSave}
                    className="px-2 py-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    title={lang === 'es' ? 'Asegurar progreso de edición actual' : 'Commit work locally'}
                  >
                    <Save className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{lang === 'es' ? 'Guardar' : 'Save'}</span>
                  </button>

                  {/* Export file */}
                  <button
                    onClick={handleExportJSON}
                    className="px-2 py-2  bg-slate-900 border border-slate-800 hover:border-teal-500/40 hover:bg-teal-500/5 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    title={lang === 'es' ? 'Descargar respaldo .json en tu computadora' : 'Save as .json copy'}
                  >
                    <Download className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{lang === 'es' ? 'Exportar' : 'Export'}</span>
                  </button>

                  {/* Import file */}
                  <label
                    className="px-2 py-2 bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/5 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm relative text-center"
                    title={lang === 'es' ? 'Cargar un archivo de progreso guardado anteriormente' : 'Upload backup JSON file'}
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{lang === 'es' ? 'Cargar' : 'Import'}</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </label>
                </div>
              </div>

            </div>

            {/* LOWER STATS AND UTILITIES */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-800/25 mt-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{lang === 'es' ? 'Panel central de visualización sincronizado en tiempo real' : 'Central visualization sync engine active'}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <button
                  onClick={() => setIsHelpOpen(true)}
                  className="text-[11px] font-bold text-teal-405 hover:text-teal-300 hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                  title={lang === 'es' ? '¿Cómo funciona todo? Ver instrucciones paso a paso' : 'How does it work? View step-by-step instructions'}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{lang === 'es' ? 'Instructivo de Ayuda 💡' : 'User Help Guide 💡'}</span>
                </button>
                <span className="text-slate-850">|</span>
                <button 
                  onClick={handleResetData}
                  className="text-[11px] font-bold text-red-500/80 hover:text-red-400 hover:underline transition-colors"
                >
                  {lang === 'es' ? '¿Restablecer datos originales desde cero? ↺' : 'Restore base template values ↺'}
                </button>
              </div>
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
              activeTab={editorActiveTab}
              setActiveTab={setEditorActiveTab}
            />
          </div>
        )}

        {/* PRIMARY CV VISUALIZATION */}
        <div className={`flex-1 flex justify-center items-start transition-all duration-350`}>
          <CVViewer
            data={cvData}
            onChange={setCvData}
            lang={lang}
            onAvatarChange={isPreviewMode ? undefined : handleAvatarChange}
            forcePrintLayout={isPreviewMode}
            onEditSection={(section) => {
              setEditorActiveTab(section as TabType);
              setIsEditing(true);
              setIsPreviewMode(false);
              setToastMessage(
                lang === 'es'
                  ? `✏️ Se abrió el editor para: ${
                      section === 'personal' ? 'Información Personal' : 
                      section === 'competencias' ? 'Competencias/Habilidades' : 
                      section === 'perfil' ? 'Resumen de Perfil' : 
                      section === 'experiencia' ? 'Experiencia Médica' : 
                      section === 'certificaciones' ? 'Certificados y Cursos' : 
                      section === 'educacion' ? 'Educación Médica' : 
                      section === 'referencias' ? 'Referencias Clínicas/Personales' : 
                      'Estilos y Ajustes'
                    }`
                  : `✏️ Opened editor panel for: ${section}`
              );
            }}
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

      {/* FLOATING MINIMALIST FONT SELECTOR ON THE LEFT (Hidden during printing) - REMOVED AS IT IS NOW IN THE HEADER */}
      <div className="fixed left-5 top-[40%] -translate-y-1/2 z-40 print:hidden hidden lg:flex flex-col items-start">
        {/* Toggle bubble button */}
        <button
          onClick={() => setShowFloatingFontSelector(!showFloatingFontSelector)}
          className={`flex items-center gap-2 p-3.5 rounded-2xl border transition-all duration-300 shadow-2xl cursor-pointer ${
            showFloatingFontSelector 
              ? 'bg-teal-500 text-slate-950 border-teal-400 scale-105' 
              : 'bg-slate-900/95 hover:bg-slate-850 text-slate-300 hover:text-white border-slate-800'
          }`}
          title={lang === 'es' ? 'Cambiar tipo de letra' : 'Change font face'}
        >
          <Type className={`w-5 h-5 shrink-0 ${showFloatingFontSelector ? 'text-slate-950' : 'text-teal-400'}`} />
          <span className="text-[11px] font-black tracking-wider uppercase select-none pr-1">
            {lang === 'es' ? 'Tipografía' : 'Font Face'}
          </span>
        </button>

        {/* Dropdown panel when opened */}
        {showFloatingFontSelector && (
          <div className="absolute left-0 top-[56px] bg-slate-900/95 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 shadow-2xl w-64 flex flex-col gap-2">
            <div className="border-b border-slate-800 pb-2 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                {lang === 'es' ? 'Fuentes del Currículum' : 'Resume Web Fonts'}
              </span>
              <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                Ajuste Real
              </span>
            </div>

            {[
              { id: 'Outfit', name: 'Gemini', desc: lang === 'es' ? 'Circular y tecnológico (Inspirado)' : 'Tech-forward geometric' },
              { id: 'Inter', name: 'Inter', desc: lang === 'es' ? 'Suizo, limpio y moderno' : 'Swiss modern style' },
              { id: 'Manrope', name: 'Manrope', desc: lang === 'es' ? 'Preciso y contemporáneo' : 'Modern sans-serif' },
              { id: 'Montserrat', name: 'Montserrat', desc: lang === 'es' ? 'Urbano y equilibrado' : 'Equilibrium & style' },
              { id: 'Roboto', name: 'Roboto', desc: lang === 'es' ? 'Geométrico y adaptable' : 'Geometric & legible' },
              { id: 'Playfair Display', name: 'Playfair Display', desc: lang === 'es' ? 'Académico de gran elegancia' : 'Academic & elegant' },
              { id: 'Lora', name: 'Lora', desc: lang === 'es' ? 'Clásico e intelectual' : 'Classic & intellectual' },
              { id: 'Merriweather', name: 'Merriweather', desc: lang === 'es' ? 'Excelente legibilidad en pantalla' : 'Robust screen legible' }
            ].map((font) => {
              const isActive = (cvData.fontFamily || 'Inter') === font.id;
              return (
                <button
                  key={font.id}
                  onClick={() => {
                    setCvData(prev => ({ ...prev, fontFamily: font.id }));
                    setToastMessage(
                      lang === 'es' 
                        ? `✔ ¡Tipografía aplicada: ${font.id}!` 
                        : `✔ Font applied: ${font.id}!`
                    );
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left border ${
                    isActive 
                      ? 'bg-slate-800 border-teal-500/40 text-teal-400' 
                      : 'bg-slate-950/20 hover:bg-slate-950 border-transparent text-slate-355 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span 
                      className={`text-xs font-bold`}
                      style={{ 
                        fontFamily: font.id === 'Inter' ? '"Inter", sans-serif' :
                                    font.id === 'Roboto' ? '"Roboto", sans-serif' :
                                    font.id === 'Outfit' ? '"Outfit", sans-serif' :
                                    font.id === 'Manrope' ? '"Manrope", sans-serif' :
                                    font.id === 'Montserrat' ? '"Montserrat", sans-serif' :
                                    font.id === 'Playfair Display' ? '"Playfair Display", serif' :
                                    font.id === 'Lora' ? '"Lora", serif' : '"Merriweather", serif'
                      }}
                    >
                      {font.name}
                    </span>
                    <span className="text-[9.5px] text-slate-500 font-normal line-clamp-1">
                      {font.desc}
                    </span>
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SPECIALIZED LATERAL DESIGN DRAWER (30 PRESETS) */}
      <TemplateSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedTemplateId={cvData.templateId || 'jorge'}
        onSelectTemplate={(id) => {
          setCvData((prev) => ({ ...prev, templateId: id }));
          setToastMessage(lang === 'es' ? '✔ ¡Diseño de plantilla aplicado!' : '✔ Template style applied!');
        }}
        lang={lang}
      />

      {/* DETAILED USER HELP MANUAL MODAL */}
      <UserManualModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        lang={lang}
      />
    </main>
  );
}
