/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  CheckCircle2, 
  Calendar, 
  Star,
  Quote,
  Pencil,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  Trash2,
  Save,
  X,
  Check,
  Type,
  Layers
} from 'lucide-react';
import { CVData, Language } from '../types';
import { getTemplateById } from '../templatesData';
import { RichInput, RichTextarea, FormattedText } from './RichInput';

interface CVViewerProps {
  data: CVData;
  onChange?: (updated: CVData) => void;
  lang: Language;
  onAvatarChange?: (newUrl: string) => void;
  forcePrintLayout?: boolean;
  onEditSection?: (section: 'personal' | 'diseno' | 'perfil' | 'competencias' | 'experiencia' | 'certificaciones' | 'educacion' | 'referencias') => void;
}

export default function CVViewer({ data, onChange, lang, onAvatarChange, forcePrintLayout, onEditSection }: CVViewerProps) {
  const { personalInfo, perfil, competencias, certificaciones, referencias, experiencia, educacion } = data;
  
  // Get active template configuration
  const activeTemplateId = data.templateId || 'jorge';
  const tplStyle = getTemplateById(activeTemplateId);
  const activeLayout = tplStyle.layout;

  // Use manual font family overlay, or fall back to template default
  const preferredFont = data.fontFamily || tplStyle.fontFamily || 'Inter';

  // Compute profile photo effect styles based on Canva-inspired settings
  const effect = personalInfo.photoEffect || { 
    type: 'none', 
    intensity: 35, 
    showFrame: true, 
    frameColor: tplStyle.secondary, // default to template anchor color!
    frameWidth: 4, 
    shape: 'circle' 
  };
  const type = effect.type;
  const intensity = effect.intensity;
  const showFrame = effect.showFrame !== false;
  const frameColor = effect.frameColor || tplStyle.secondary;
  const frameWidth = effect.frameWidth !== undefined ? effect.frameWidth : 4;
  const shape = effect.shape || 'circle';

  let shapeBorderRadius = '9999px'; // Default circle
  let shapeClass = 'w-[165px] h-[165px] md:w-[184px] md:h-[184px] aspect-square';

  if (shape === 'oval') {
    shapeBorderRadius = '50%'; 
    shapeClass = 'w-[147px] h-[184px] md:w-[165px] md:h-[202px]';
  } else if (shape === 'square') {
    shapeBorderRadius = '0px';
    shapeClass = 'w-[165px] h-[165px] md:w-[184px] md:h-[184px] aspect-square';
  } else if (shape === 'rounded-square') {
    shapeBorderRadius = '24px';
    shapeClass = 'w-[165px] h-[165px] md:w-[184px] md:h-[184px] aspect-square';
  } else if (shape === 'rectangular') {
    shapeBorderRadius = '16px';
    shapeClass = 'w-[147px] h-[184px] md:w-[165px] md:h-[202px]';
  }

  let glowStyle: React.CSSProperties = {};
  let innerStyle: React.CSSProperties = {
    borderColor: showFrame ? frameColor : 'transparent',
    borderWidth: showFrame ? `${frameWidth}px` : '0px',
    borderStyle: showFrame && frameWidth > 0 ? 'solid' : 'none',
    borderRadius: shapeBorderRadius,
  };
  let imageStyle: React.CSSProperties = {
    borderRadius: shapeBorderRadius,
  };

  if (type !== 'none') {
    const normalizedIntensity = intensity / 100;

    if (type === 'malibu') {
      imageStyle.filter = `contrast(${1 + normalizedIntensity * 0.12}) saturate(${1 + normalizedIntensity * 0.25}) brightness(${0.98 + normalizedIntensity * 0.05})`;
    } else if (type === 'radioactive') {
      imageStyle.filter = `contrast(${1 + normalizedIntensity * 0.08}) saturate(${1 + normalizedIntensity * 0.15})`;
    } else if (type === 'retro') {
      imageStyle.filter = `sepia(${normalizedIntensity * 0.15}) contrast(${1 + normalizedIntensity * 0.1}) saturate(${1 + normalizedIntensity * 0.2})`;
    } else if (type === 'midnight') {
      imageStyle.filter = `contrast(${1 + normalizedIntensity * 0.08}) brightness(${0.95 + normalizedIntensity * 0.05}) saturate(${1 + normalizedIntensity * 0.15})`;
    } else if (type === 'chroma') {
      imageStyle.filter = `contrast(${1 + normalizedIntensity * 0.15}) saturate(${1 + normalizedIntensity * 0.3})`;
    }
  } else {
    glowStyle.filter = `drop-shadow(0 10px 15px rgba(0, 0, 0, ${0.15 + (intensity / 100) * 0.35}))`;
  }

  // Handles photo upload internally
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onAvatarChange) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onAvatarChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const fontStyleMap: Record<string, string> = {
    'Inter': '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
    'Roboto': '"Roboto", ui-sans-serif, system-ui, sans-serif',
    'Outfit': '"Outfit", ui-sans-serif, system-ui, sans-serif',
    'Gemini': '"Outfit", ui-sans-serif, system-ui, sans-serif',
    'Manrope': '"Manrope", ui-sans-serif, system-ui, sans-serif',
    'Montserrat': '"Montserrat", ui-sans-serif, system-ui, sans-serif',
    'Open Sans': '"Open Sans", ui-sans-serif, system-ui, sans-serif',
    'Lato': '"Lato", ui-sans-serif, system-ui, sans-serif',
    'Poppins': '"Poppins", ui-sans-serif, system-ui, sans-serif',
    'Quicksand': '"Quicksand", ui-sans-serif, system-ui, sans-serif',
    'Playfair Display': '"Playfair Display", Georgia, Cambria, serif',
    'Lora': '"Lora", Georgia, Cambria, serif',
    'Merriweather': '"Merriweather", Georgia, Cambria, serif',
  };

  const rootFontFamily = fontStyleMap[preferredFont] || preferredFont;

  // Helper to get page dimensions
  const getPageDimensions = (size?: string) => {
    switch (size) {
      case 'a4':
        return { width: '210mm', height: '297mm', aspect: '210/297' };
      case 'letter':
        return { width: '215.9mm', height: '279.4mm', aspect: '215.9/279.4' };
      case 'oficio':
      default:
        return { width: '216mm', height: '330mm', aspect: '216/330' };
    }
  };

  const { width: pageWidth, height: pageHeight, aspect: pageAspect } = getPageDimensions(data.pageSize);

  // Spacing & scaling mappings for absolute design precision:
  const spacing = data.spacingMode || 'balanced';
  const size = data.baseFontSize || 'normal';

  // 1. Spacing helper maps
  const gapSidebar = spacing === 'compact' ? 'gap-4' : spacing === 'spacious' ? 'gap-10' : 'gap-7';
  const gapSection = spacing === 'compact' ? 'gap-4' : spacing === 'spacious' ? 'gap-9.5' : 'gap-6.5';
  const gapInsideSection = spacing === 'compact' ? 'gap-3' : spacing === 'spacious' ? 'gap-8' : 'gap-5';
  const gapList = spacing === 'compact' ? 'gap-1' : spacing === 'spacious' ? 'gap-3' : 'gap-1.5';
  const gapGroup = spacing === 'compact' ? 'gap-2' : spacing === 'spacious' ? 'gap-4' : 'gap-2.5';
  const gapSubItem = spacing === 'compact' ? 'gap-0.5' : spacing === 'spacious' ? 'gap-2' : 'gap-1';
  const paddingMain = spacing === 'compact' ? 'p-[18px] md:p-6' : spacing === 'spacious' ? 'p-10 md:p-12' : 'p-6.5 md:p-[28px]';
  const paddingMainAcademia = spacing === 'compact' ? 'p-[18px] md:p-6' : spacing === 'spacious' ? 'p-10 md:p-14' : 'p-6.5 md:p-[32px]';
  const paddingSidebar = spacing === 'compact' ? 'p-4 md:p-[18px]' : spacing === 'spacious' ? 'p-8.5 md:p-[34px]' : 'p-5 md:p-6';
  const paddingGrid = spacing === 'compact' ? 'p-2.5' : spacing === 'spacious' ? 'p-5.5' : 'p-4';
  const blockPadding = spacing === 'compact' ? 'p-2' : spacing === 'spacious' ? 'p-4' : 'p-3';
  const blockPaddingEdu = spacing === 'compact' ? 'p-2' : spacing === 'spacious' ? 'p-4' : 'p-3.5';
  const mbItem = spacing === 'compact' ? 'mb-0.5' : spacing === 'spacious' ? 'mb-3.5' : 'mb-1.5';
  
  // 2. Font sizing classes mapped dynamically for perfect "distribución de textos"
  const tBase = size === 'small' ? 'text-xs md:text-sm' : size === 'large' ? 'text-base' : 'text-sm';
  const tContact = size === 'small' ? 'text-[11px] md:text-xs' : size === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm';
  const tBody = size === 'small' ? 'text-[11px]' : size === 'large' ? 'text-[13.5px]' : 'text-xs';
  const tSecBody = size === 'small' ? 'text-[9.5px]' : size === 'large' ? 'text-[12.5px]' : 'text-[11px]';
  const tSmall = size === 'small' ? 'text-[8.5px]' : size === 'large' ? 'text-[11px]' : 'text-[9.5px]';
  
  // Titles & Headings
  const hName = size === 'small' ? 'text-2xl md:text-3xl' : size === 'large' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl';
  const hTitles = size === 'small' ? 'text-[10px] md:text-xs tracking-widest' : size === 'large' ? 'text-sm md:text-base tracking-widest' : 'text-xs md:text-sm tracking-widest';
  const hTitlesJorge = size === 'small' ? 'text-[11.5px] md:text-[13.8px]' : size === 'large' ? 'text-[16px] md:text-[18.4px]' : 'text-[13.8px] md:text-[16px]';
  const hSection = size === 'small' ? 'text-xs font-bold uppercase tracking-widest' : size === 'large' ? 'text-base font-extrabold uppercase tracking-widest' : 'text-sm font-bold uppercase tracking-widest';
  const hBadge = size === 'small' ? 'text-[9.5px]' : size === 'large' ? 'text-xs' : 'text-[11px]';
  const hRole = size === 'small' ? 'text-xs font-bold' : size === 'large' ? 'text-sm font-bold' : 'text-xs font-bold';

  // Local Inline Editing States
  const [localEditingSection, setLocalEditingSection] = React.useState<'personal' | 'perfil' | 'competencias' | 'experiencia' | 'certificaciones' | 'educacion' | 'referencias' | null>(null);

  // 1. Personal Info draft states
  const [draftName, setDraftName] = React.useState('');
  const [draftTitleEs, setDraftTitleEs] = React.useState('');
  const [draftTitleEn, setDraftTitleEn] = React.useState('');
  const [draftLocation, setDraftLocation] = React.useState('');
  const [draftPhone, setDraftPhone] = React.useState('');
  const [draftEmail, setDraftEmail] = React.useState('');
  const [draftRegistroMedico, setDraftRegistroMedico] = React.useState('');

  // 2. Perfil draft states
  const [draftPerfilEs, setDraftPerfilEs] = React.useState('');
  const [draftPerfilEn, setDraftPerfilEn] = React.useState('');

  // 3. Competencias draft states
  const [draftCompEs, setDraftCompEs] = React.useState<string[]>([]);
  const [draftCompEn, setDraftCompEn] = React.useState<string[]>([]);
  const [newCompEs, setNewCompEs] = React.useState('');
  const [newCompEn, setNewCompEn] = React.useState('');

  // 4. Certificaciones draft state
  const [draftCerts, setDraftCerts] = React.useState<any[]>([]);

  // 5. Referencias draft state
  const [draftRefs, setDraftRefs] = React.useState<any[]>([]);

  // 6. Experiencia draft state
  const [draftExps, setDraftExps] = React.useState<any[]>([]);

  // 7. Educacion draft state
  const [draftEdus, setDraftEdus] = React.useState<any[]>([]);

  // Auto-populate draft states on localEditingSection activation
  React.useEffect(() => {
    if (localEditingSection) {
      if (localEditingSection === 'personal') {
        setDraftName(personalInfo.name || '');
        setDraftTitleEs(personalInfo.titles?.es || '');
        setDraftTitleEn(personalInfo.titles?.en || '');
        setDraftLocation(personalInfo.location || '');
        setDraftPhone(personalInfo.phone || '');
        setDraftEmail(personalInfo.email || '');
        setDraftRegistroMedico(personalInfo.registroMedico || '');
      } else if (localEditingSection === 'perfil') {
        setDraftPerfilEs(perfil?.es || '');
        setDraftPerfilEn(perfil?.en || '');
      } else if (localEditingSection === 'competencias') {
        setDraftCompEs(competencias?.es || []);
        setDraftCompEn(competencias?.en || []);
        setNewCompEs('');
        setNewCompEn('');
      } else if (localEditingSection === 'certificaciones') {
        setDraftCerts(JSON.parse(JSON.stringify(certificaciones || [])));
      } else if (localEditingSection === 'referencias') {
        setDraftRefs(JSON.parse(JSON.stringify(referencias || [])));
      } else if (localEditingSection === 'experiencia') {
        setDraftExps(JSON.parse(JSON.stringify(experiencia || [])));
      } else if (localEditingSection === 'educacion') {
        setDraftEdus(JSON.parse(JSON.stringify(educacion || [])));
      }
    }
  }, [localEditingSection, data]);

  // Certifications Helpers
  const handleCertChange = (idx: number, key: string, value: any, subkey?: 'es' | 'en') => {
    const list = [...draftCerts];
    if (subkey) {
      list[idx] = {
        ...list[idx],
        [key]: {
          ...(list[idx][key] || { es: '', en: '' }),
          [subkey]: value
        }
      };
    } else {
      list[idx] = {
        ...list[idx],
        [key]: value
      };
    }
    setDraftCerts(list);
  };

  const addCert = () => {
    setDraftCerts([
      ...draftCerts,
      { id: Math.random().toString(), title: { es: '', en: '' }, entity: '', year: '' }
    ]);
  };

  const removeCert = (idx: number) => {
    setDraftCerts(draftCerts.filter((_, i) => i !== idx));
  };

  // References Helpers
  const handleRefChange = (idx: number, key: string, value: any, subkey?: 'es' | 'en') => {
    const list = [...draftRefs];
    if (subkey) {
      list[idx] = {
        ...list[idx],
        [key]: {
          ...(list[idx][key] || { es: '', en: '' }),
          [subkey]: value
        }
      };
    } else {
      list[idx] = {
        ...list[idx],
        [key]: value
      };
    }
    setDraftRefs(list);
  };

  const addRef = () => {
    setDraftRefs([
      ...draftRefs,
      { id: Math.random().toString(), name: '', role: { es: '', en: '' }, institution: '', phone: '' }
    ]);
  };

  const removeRef = (idx: number) => {
    setDraftRefs(draftRefs.filter((_, i) => i !== idx));
  };

  // Experience Helpers
  const handleExpChange = (idx: number, key: string, value: any, subkey?: 'es' | 'en') => {
    const list = [...draftExps];
    if (subkey) {
      list[idx] = {
        ...list[idx],
        [key]: {
          ...(list[idx][key] || { es: '', en: '' }),
          [subkey]: value
        }
      };
    } else {
      list[idx] = {
        ...list[idx],
        [key]: value
      };
    }
    setDraftExps(list);
  };

  const addExp = () => {
    setDraftExps([
      ...draftExps,
      {
        id: Math.random().toString(),
        role: { es: '', en: '' },
        company: '',
        location: '',
        period: { es: '', en: '' },
        details: { es: [], en: [] },
        achievement: { es: '', en: '' },
        achievementLabel: { es: '', en: '' }
      }
    ]);
  };

  const removeExp = (idx: number) => {
    setDraftExps(draftExps.filter((_, i) => i !== idx));
  };

  // Education Helpers
  const handleEduChange = (idx: number, key: string, value: any, subkey?: 'es' | 'en') => {
    const list = [...draftEdus];
    if (subkey) {
      list[idx] = {
        ...list[idx],
        [key]: {
          ...(list[idx][key] || { es: '', en: '' }),
          [subkey]: value
        }
      };
    } else {
      list[idx] = {
        ...list[idx],
        [key]: value
      };
    }
    setDraftEdus(list);
  };

  const addEdu = () => {
    setDraftEdus([
      ...draftEdus,
      {
        id: Math.random().toString(),
        degree: { es: '', en: '' },
        institution: '',
        period: '',
        achievements: { es: [], en: [] }
      }
    ]);
  };

  const removeEdu = (idx: number) => {
    setDraftEdus(draftEdus.filter((_, i) => i !== idx));
  };

  // Core Saver
  const handleSaveInline = () => {
    if (!onChange) return;

    let updatedData = { ...data };

    if (localEditingSection === 'personal') {
      updatedData.personalInfo = {
        ...updatedData.personalInfo,
        name: draftName,
        titles: { es: draftTitleEs, en: draftTitleEn },
        location: draftLocation,
        phone: draftPhone,
        email: draftEmail,
        registroMedico: draftRegistroMedico,
      };
    } else if (localEditingSection === 'perfil') {
      updatedData.perfil = {
        es: draftPerfilEs,
        en: draftPerfilEn,
      };
    } else if (localEditingSection === 'competencias') {
      updatedData.competencias = {
        es: draftCompEs.map(s => s.trim()).filter(Boolean),
        en: draftCompEn.map(s => s.trim()).filter(Boolean),
      };
    } else if (localEditingSection === 'certificaciones') {
      updatedData.certificaciones = draftCerts;
    } else if (localEditingSection === 'referencias') {
      updatedData.referencias = draftRefs;
    } else if (localEditingSection === 'experiencia') {
      updatedData.experiencia = draftExps;
    } else if (localEditingSection === 'educacion') {
      updatedData.educacion = draftEdus;
    }

    onChange(updatedData);
    setLocalEditingSection(null);
  };

  const getSectionTitle = (sec: string) => {
    if (lang === 'es') {
      switch(sec) {
        case 'personal': return 'Información Personal y de Contacto';
        case 'perfil': return 'Perfil y Resumen Profesional';
        case 'competencias': return 'Competencias y Habilidades';
        case 'certificaciones': return 'Certificaciones y Cursos';
        case 'referencias': return 'Referencias';
        case 'experiencia': return 'Experiencia Médica y Profesional';
        case 'educacion': return 'Educación Médica y Académica';
        default: return 'Editar Sección';
      }
    } else {
      switch(sec) {
        case 'personal': return 'Personal & Contact Information';
        case 'perfil': return 'Professional Profile';
        case 'competencias': return 'Skills & Core Competencies';
        case 'certificaciones': return 'Certifications & Courses';
        case 'referencias': return 'Professional References';
        case 'experiencia': return 'Medical & Clinical Experience';
        case 'educacion': return 'Medical Education';
        default: return 'Edit Section';
      }
    }
  };

  const renderInlineEditor = () => {
    if (!localEditingSection) return null;

    const modalTitle = getSectionTitle(localEditingSection);

    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs print:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setLocalEditingSection(null);
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-850 bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg">
                <Pencil className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest leading-none">
                  {modalTitle}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'es' ? 'Edita los datos directamente y presiona Guardar' : 'Modify information and press Save'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLocalEditingSection(null)}
              className="p-1 px-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-grow overflow-y-auto p-5 md:p-6 bg-slate-900/40 flex flex-col gap-4.5 text-left">
            {localEditingSection === 'personal' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">{lang === 'es' ? 'Nombre Completo' : 'Full Name'}</label>
                  <input 
                    type="text" 
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    value={draftName} 
                    onChange={(e) => setDraftName(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all font-medium" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">{lang === 'es' ? 'Ubicación' : 'Location'}</label>
                  <input 
                    type="text" 
                    onFocus={(e) => e.target.select()}
                    value={draftLocation} 
                    onChange={(e) => setDraftLocation(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                  <input 
                    type="text" 
                    onFocus={(e) => e.target.select()}
                    value={draftPhone} 
                    onChange={(e) => setDraftPhone(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">{lang === 'es' ? 'Correo Electrónico' : 'Email Address'}</label>
                  <input 
                    type="text" 
                    onFocus={(e) => e.target.select()}
                    value={draftEmail} 
                    onChange={(e) => setDraftEmail(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">{lang === 'es' ? 'Título Profesional (Español)' : 'Professional Title (Spanish)'}</label>
                  <input 
                    type="text" 
                    onFocus={(e) => e.target.select()}
                    value={draftTitleEs} 
                    onChange={(e) => setDraftTitleEs(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">{lang === 'es' ? 'Título Profesional (Inglés)' : 'Professional Title (English)'}</label>
                  <input 
                    type="text" 
                    onFocus={(e) => e.target.select()}
                    value={draftTitleEn} 
                    onChange={(e) => setDraftTitleEn(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all" 
                  />
                </div>
                <div className="flex flex-col sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 mb-1.5">
                    {lang === 'es' ? 'Registro Médico (RM)' : 'Medical Registration (RM)'}
                  </label>
                  <input 
                    type="text" 
                    onFocus={(e) => e.target.select()}
                    value={draftRegistroMedico} 
                    onChange={(e) => setDraftRegistroMedico(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all font-medium" 
                    placeholder={lang === 'es' ? 'ej. 1140884814 o N/A' : 'e.g. 1140884814 or N/A'}
                  />
                </div>
              </div>
            )}

            {localEditingSection === 'perfil' && (
              <div className="flex flex-col gap-4 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-800/45">
                <div className="flex flex-col relative">
                  <label className="text-xs font-bold text-slate-300 mb-1.5">{lang === 'es' ? 'Resumen Profesional (Español)' : 'Professional Summary (Spanish)'}</label>
                  <RichTextarea 
                    rows={5} 
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    value={draftPerfilEs} 
                    onChange={(e) => setDraftPerfilEs(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-150 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all leading-relaxed" 
                  />
                  <div className="text-[10px] text-slate-500 mt-1 pl-1">
                    {lang === 'es' ? '💡 Consejo: Selecciona texto para aplicar negrita, cursiva, subrayado o tachado.' : '💡 Pro tip: Select text to apply bold, italic, underline, or strikethrough.'}
                  </div>
                </div>
                <div className="flex flex-col relative mt-2">
                  <label className="text-xs font-bold text-slate-300 mb-1.5">{lang === 'es' ? 'Resumen Profesional (Inglés)' : 'Professional Summary (English)'}</label>
                  <RichTextarea 
                    rows={5} 
                    onFocus={(e) => e.target.select()}
                    value={draftPerfilEn} 
                    onChange={(e) => setDraftPerfilEn(e.target.value)} 
                    className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm text-slate-150 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all leading-relaxed" 
                  />
                  <div className="text-[10px] text-slate-500 mt-1 pl-1">
                    {lang === 'es' ? '💡 Consejo: Selecciona texto para formatear.' : '💡 Pro tip: Select text to format.'}
                  </div>
                </div>
              </div>
            )}

            {localEditingSection === 'competencias' && (
              <div className="flex flex-col gap-6 font-sans">
                {/* Competencies in Spanish */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400">
                    {lang === 'es' ? 'Competencias en Español (uno por uno)' : 'Skills in Spanish (one by one)'}
                  </label>
                  
                  {/* Current Spanish list */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {draftCompEs.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          onFocus={(e) => e.target.select()}
                          value={comp}
                          onChange={(e) => {
                            const updated = [...draftCompEs];
                            updated[idx] = e.target.value;
                            setDraftCompEs(updated);
                          }}
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-1.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all flex-1"
                          placeholder={lang === 'es' ? 'Nombre de la competencia' : 'Skill name'}
                        />
                        <button
                          onClick={() => {
                            setDraftCompEs(draftCompEs.filter((_, i) => i !== idx));
                          }}
                          className="p-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/30 text-red-400 rounded-xl transition-all cursor-pointer"
                          title={lang === 'es' ? 'Eliminar competencia' : 'Remove skill'}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {draftCompEs.length === 0 && (
                      <div className="text-xs text-slate-500 italic py-1 pl-1">
                        {lang === 'es' ? 'No hay competencias agregadas todavía.' : 'No skills added yet.'}
                      </div>
                    )}
                  </div>

                  {/* Add competency row */}
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={newCompEs}
                      onChange={(e) => setNewCompEs(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newCompEs.trim()) {
                            setDraftCompEs([...draftCompEs, newCompEs.trim()]);
                            setNewCompEs('');
                          }
                        }
                      }}
                      className="bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-1.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all flex-1"
                      placeholder={lang === 'es' ? 'Agregar nueva competencia...' : 'Add new skill...'}
                    />
                    <button
                      onClick={() => {
                        if (newCompEs.trim()) {
                          setDraftCompEs([...draftCompEs, newCompEs.trim()]);
                          setNewCompEs('');
                        }
                      }}
                      className="py-1.5 px-3.5 bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md h-[38px] shrink-0"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>{lang === 'es' ? 'Agregar' : 'Add'}</span>
                    </button>
                  </div>
                </div>

                {/* Competencies in English */}
                <div className="flex flex-col gap-2 border-t border-slate-800/40 pt-4">
                  <label className="text-xs font-bold text-slate-400">
                    {lang === 'es' ? 'Competencias en Inglés (uno por uno)' : 'Skills in English (one by one)'}
                  </label>
                  
                  {/* Current English list */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {draftCompEn.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          onFocus={(e) => e.target.select()}
                          value={comp}
                          onChange={(e) => {
                            const updated = [...draftCompEn];
                            updated[idx] = e.target.value;
                            setDraftCompEn(updated);
                          }}
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-1.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all flex-1"
                          placeholder={lang === 'es' ? 'Nombre de la competencia' : 'Skill name'}
                        />
                        <button
                          onClick={() => {
                            setDraftCompEn(draftCompEn.filter((_, i) => i !== idx));
                          }}
                          className="p-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/30 text-red-400 rounded-xl transition-all cursor-pointer"
                          title={lang === 'es' ? 'Eliminar competencia' : 'Remove skill'}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {draftCompEn.length === 0 && (
                      <div className="text-xs text-slate-500 italic py-1 pl-1">
                        {lang === 'es' ? 'No hay competencias agregadas todavía.' : 'No skills added yet.'}
                      </div>
                    )}
                  </div>

                  {/* Add competency row */}
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={newCompEn}
                      onChange={(e) => setNewCompEn(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newCompEn.trim()) {
                            setDraftCompEn([...draftCompEn, newCompEn.trim()]);
                            setNewCompEn('');
                          }
                        }
                      }}
                      className="bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-1.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500/30 transition-all flex-1"
                      placeholder={lang === 'es' ? 'Agregar nueva competencia...' : 'Add new skill...'}
                    />
                    <button
                      onClick={() => {
                        if (newCompEn.trim()) {
                          setDraftCompEn([...draftCompEn, newCompEn.trim()]);
                          setNewCompEn('');
                        }
                      }}
                      className="py-1.5 px-3.5 bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md h-[38px] shrink-0"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>{lang === 'es' ? 'Agregar' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {localEditingSection === 'certificaciones' && (
              <div className="flex flex-col gap-4">
                {draftCerts.map((cert, index) => (
                  <div key={cert.id || index} className="p-3.5 border border-slate-800 bg-slate-950/30 rounded-xl relative flex flex-col gap-3 font-sans">
                    <button 
                      onClick={() => removeCert(index)} 
                      className="absolute top-2.5 right-2.5 p-1 px-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900/30 text-red-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Borrar' : 'Delete'}</span>
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pr-16 text-left">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Título (ES)' : 'Title (ES)'}</label>
                        <input 
                          type="text" 
                          value={cert.title?.es || ''} 
                          onChange={(e) => handleCertChange(index, 'title', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Título (EN)' : 'Title (EN)'}</label>
                        <input 
                          type="text" 
                          value={cert.title?.en || ''} 
                          onChange={(e) => handleCertChange(index, 'title', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Entidad Emisora' : 'Issuing Authority'}</label>
                        <input 
                          type="text" 
                          value={cert.entity || ''} 
                          onChange={(e) => handleCertChange(index, 'entity', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Año / Fecha' : 'Year / Date'}</label>
                        <input 
                          type="text" 
                          value={cert.year || ''} 
                          onChange={(e) => handleCertChange(index, 'year', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addCert} 
                  className="py-2.5 px-4 border border-dashed border-slate-800 hover:border-slate-700 hover:bg-slate-850/40 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1"
                >
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>{lang === 'es' ? 'Agregar Certificación' : 'Add Certification'}</span>
                </button>
              </div>
            )}

            {localEditingSection === 'referencias' && (
              <div className="flex flex-col gap-4">
                {draftRefs.map((ref, index) => (
                  <div key={ref.id || index} className="p-3.5 border border-slate-800 bg-slate-950/30 rounded-xl relative flex flex-col gap-3 font-sans">
                    <button 
                      onClick={() => removeRef(index)} 
                      className="absolute top-2.5 right-2.5 p-1 px-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900/30 text-red-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Borrar' : 'Delete'}</span>
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pr-16 text-left">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Nombre de la Referencia' : 'Reference Name'}</label>
                        <input 
                          type="text" 
                          value={ref.name || ''} 
                          onChange={(e) => handleRefChange(index, 'name', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Institución / Lugar' : 'Institution'}</label>
                        <input 
                          type="text" 
                          value={ref.institution || ''} 
                          onChange={(e) => handleRefChange(index, 'institution', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Teléfono / Contacto' : 'Phone / Contact'}</label>
                        <input 
                          type="text" 
                          value={ref.phone || ''} 
                          onChange={(e) => handleRefChange(index, 'phone', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Cargo (Español)' : 'Role (Spanish)'}</label>
                        <input 
                          type="text" 
                          value={ref.role?.es || ''} 
                          onChange={(e) => handleRefChange(index, 'role', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Cargo (Inglés)' : 'Role (English)'}</label>
                        <input 
                          type="text" 
                          value={ref.role?.en || ''} 
                          onChange={(e) => handleRefChange(index, 'role', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addRef} 
                  className="py-2.5 px-4 border border-dashed border-slate-800 hover:border-slate-700 hover:bg-slate-850/40 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1"
                >
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>{lang === 'es' ? 'Agregar Referencia' : 'Add Reference'}</span>
                </button>
              </div>
            )}

            {localEditingSection === 'experiencia' && (
              <div className="flex flex-col gap-6">
                {draftExps.map((exp, index) => (
                  <div key={exp.id || index} className="p-4 border border-slate-800 bg-slate-950/30 rounded-xl relative flex flex-col gap-4.5 font-sans">
                    <button 
                      onClick={() => removeExp(index)} 
                      className="absolute top-2.5 right-2.5 p-1 px-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900/30 text-red-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Eliminar' : 'Delete'}</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pr-20 text-left">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Cargo / Posición (ES)' : 'Role / Position (ES)'}</label>
                        <input 
                          type="text" 
                          value={exp.role?.es || ''} 
                          onChange={(e) => handleExpChange(index, 'role', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Cargo / Posición (EN)' : 'Role / Position (EN)'}</label>
                        <input 
                          type="text" 
                          value={exp.role?.en || ''} 
                          onChange={(e) => handleExpChange(index, 'role', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Institución / Empresa' : 'Company / Hospital'}</label>
                        <input 
                          type="text" 
                          value={exp.company || ''} 
                          onChange={(e) => handleExpChange(index, 'company', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Ubicación' : 'Location'}</label>
                        <input 
                          type="text" 
                          value={exp.location || ''} 
                          onChange={(e) => handleExpChange(index, 'location', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Período (ES)' : 'Period (ES)'}</label>
                        <input 
                          type="text" 
                          value={exp.period?.es || ''} 
                          onChange={(e) => handleExpChange(index, 'period', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Período (EN)' : 'Period (EN)'}</label>
                        <input 
                          type="text" 
                          value={exp.period?.en || ''} 
                          onChange={(e) => handleExpChange(index, 'period', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                    </div>

                    {/* Bullet Points ES */}
                    <div className="mt-2 flex flex-col gap-2 border-t border-slate-800/80 pb-1.5 pt-3 text-left">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{lang === 'es' ? 'Responsabilidades Clínicas - Viñetas (ES)' : 'Clinical Responsibilities - Bullets (ES)'}</span>
                      {(exp.details?.es || []).map((det: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <RichInput 
                            type="text" 
                            value={det} 
                            onChange={(e) => {
                              const list = [...draftExps];
                              const details = [...(list[index].details?.es || [])];
                              details[dIdx] = e.target.value;
                              list[index] = {
                                ...list[index],
                                details: {
                                  ...list[index].details,
                                  es: details
                                }
                              };
                              setDraftExps(list);
                            }} 
                            className="flex-grow bg-slate-950 border border-slate-850 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans" 
                          />
                          <button 
                            onClick={() => {
                              const list = [...draftExps];
                              const details = (list[index].details?.es || []).filter((_: any, i: number) => i !== dIdx);
                              list[index] = {
                                ...list[index],
                                details: {
                                  ...list[index].details,
                                  es: details
                                }
                              };
                              setDraftExps(list);
                            }} 
                            className="p-1 px-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const list = [...draftExps];
                          list[index] = {
                            ...list[index],
                            details: {
                              ...list[index].details,
                              es: [...(list[index].details?.es || []), '']
                            }
                          };
                          setDraftExps(list);
                        }} 
                        className="self-start text-[10px] font-bold text-teal-500 hover:text-teal-400 flex items-center gap-1.5 mt-0.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Añadir línea descriptiva (ES)' : 'Add bullet item (ES)'}</span>
                      </button>
                    </div>

                    {/* Bullet Points EN */}
                    <div className="mt-2 flex flex-col gap-2 border-t border-slate-800/80 pb-1.5 pt-3 text-left">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{lang === 'es' ? 'Responsabilidades Clínicas - Viñetas (EN)' : 'Clinical Responsibilities - Bullets (EN)'}</span>
                      {(exp.details?.en || []).map((det: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <RichInput 
                            type="text" 
                            value={det} 
                            onChange={(e) => {
                              const list = [...draftExps];
                              const details = [...(list[index].details?.en || [])];
                              details[dIdx] = e.target.value;
                              list[index] = {
                                ...list[index],
                                details: {
                                  ...list[index].details,
                                  en: details
                                }
                              };
                              setDraftExps(list);
                            }} 
                            className="flex-grow bg-slate-950 border border-slate-850 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans" 
                          />
                          <button 
                            onClick={() => {
                              const list = [...draftExps];
                              const details = (list[index].details?.en || []).filter((_: any, i: number) => i !== dIdx);
                              list[index] = {
                                ...list[index],
                                details: {
                                  ...list[index].details,
                                  en: details
                                }
                              };
                              setDraftExps(list);
                            }} 
                            className="p-1 px-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const list = [...draftExps];
                          list[index] = {
                            ...list[index],
                            details: {
                              ...list[index].details,
                              en: [...(list[index].details?.en || []), '']
                            }
                          };
                          setDraftExps(list);
                        }} 
                        className="self-start text-[10px] font-bold text-teal-500 hover:text-teal-400 flex items-center gap-1.5 mt-0.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Añadir línea descriptiva (EN)' : 'Add bullet item (EN)'}</span>
                      </button>
                    </div>

                    {/* Logro Extra (Optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-1 border-t border-slate-800 pt-3 text-left">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'Título del Logro (ES - ej. Logro como Fundador)' : 'Achievement Label (ES - e.g. Achievement as Founder)'}</label>
                        <RichInput 
                          type="text" 
                          value={exp.achievementLabel?.es || ''} 
                          onChange={(e) => handleExpChange(index, 'achievementLabel', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                          placeholder={lang === 'es' ? 'Logro' : 'Achievement'}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'Título del Logro (EN)' : 'Achievement Label (EN)'}</label>
                        <RichInput 
                          type="text" 
                          value={exp.achievementLabel?.en || ''} 
                          onChange={(e) => handleExpChange(index, 'achievementLabel', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                          placeholder={lang === 'es' ? 'Achievement' : 'Featured Achievement'}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'Logro Destacado (ES - Opcional)' : 'Featured Achievement (ES - Optional)'}</label>
                        <RichInput 
                          type="text" 
                          value={exp.achievement?.es || ''} 
                          onChange={(e) => handleExpChange(index, 'achievement', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'Logro Destacado (EN - Opcional)' : 'Featured Achievement (EN - Optional)'}</label>
                        <RichInput 
                          type="text" 
                          value={exp.achievement?.en || ''} 
                          onChange={(e) => handleExpChange(index, 'achievement', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addExp} 
                  className="py-2.5 px-4 border border-dashed border-slate-800 hover:border-slate-700 hover:bg-slate-850/40 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1"
                >
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>{lang === 'es' ? 'Agregar Experiencia de Trabajo' : 'Add Work Experience'}</span>
                </button>
              </div>
            )}

            {localEditingSection === 'educacion' && (
              <div className="flex flex-col gap-6">
                {draftEdus.map((edu, index) => (
                  <div key={edu.id || index} className="p-4 border border-slate-800 bg-slate-950/30 rounded-xl relative flex flex-col gap-4.5 font-sans">
                    <button 
                      onClick={() => removeEdu(index)} 
                      className="absolute top-2.5 right-2.5 p-1 px-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900/30 text-red-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Eliminar' : 'Delete'}</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pr-20 text-left">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Grado / Especialidad (ES)' : 'Degree / Specialization (ES)'}</label>
                        <input 
                          type="text" 
                          value={edu.degree?.es || ''} 
                          onChange={(e) => handleEduChange(index, 'degree', e.target.value, 'es')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Grado / Especialidad (EN)' : 'Degree / Specialization (EN)'}</label>
                        <input 
                          type="text" 
                          value={edu.degree?.en || ''} 
                          onChange={(e) => handleEduChange(index, 'degree', e.target.value, 'en')} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Institución Académica' : 'Institution name'}</label>
                        <input 
                          type="text" 
                          value={edu.institution || ''} 
                          onChange={(e) => handleEduChange(index, 'institution', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lang === 'es' ? 'Período / Año' : 'Period / Year'}</label>
                        <input 
                          type="text" 
                          value={edu.period || ''} 
                          onChange={(e) => handleEduChange(index, 'period', e.target.value)} 
                          className="bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" 
                        />
                      </div>
                    </div>

                    {/* Achievements ES */}
                    <div className="mt-2 flex flex-col gap-2 border-t border-slate-800/80 pb-1.5 pt-3 text-left">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{lang === 'es' ? 'Logros / Tesis (ES)' : 'Academic Achievements / Details (ES)'}</span>
                      {(edu.achievements?.es || []).map((det: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={det} 
                            onChange={(e) => {
                              const list = [...draftEdus];
                              const details = [...(list[index].achievements?.es || [])];
                              details[dIdx] = e.target.value;
                              list[index] = {
                                ...list[index],
                                achievements: {
                                  ...list[index].achievements,
                                  es: details
                                }
                              };
                              setDraftEdus(list);
                            }} 
                            className="flex-grow bg-slate-950 border border-slate-850 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans" 
                          />
                          <button 
                            onClick={() => {
                              const list = [...draftEdus];
                              const details = (list[index].achievements?.es || []).filter((_: any, i: number) => i !== dIdx);
                              list[index] = {
                                ...list[index],
                                achievements: {
                                  ...list[index].achievements,
                                  es: details
                                }
                              };
                              setDraftEdus(list);
                            }} 
                            className="p-1 px-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const list = [...draftEdus];
                          const achievements = list[index].achievements || { es: [], en: [] };
                          list[index] = {
                            ...list[index],
                            achievements: {
                              ...achievements,
                              es: [...(achievements.es || []), '']
                            }
                          };
                          setDraftEdus(list);
                        }} 
                        className="self-start text-[10px] font-bold text-teal-500 hover:text-teal-400 flex items-center gap-1.5 mt-0.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Añadir logro académico (ES)' : 'Add academic item (ES)'}</span>
                      </button>
                    </div>

                    {/* Achievements EN */}
                    <div className="mt-2 flex flex-col gap-2 border-t border-slate-800/80 pb-1.5 pt-3 text-left">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{lang === 'es' ? 'Logros / Tesis (EN)' : 'Academic Achievements / Details (EN)'}</span>
                      {(edu.achievements?.en || []).map((det: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={det} 
                            onChange={(e) => {
                              const list = [...draftEdus];
                              const details = [...(list[index].achievements?.en || [])];
                              details[dIdx] = e.target.value;
                              list[index] = {
                                ...list[index],
                                achievements: {
                                  ...list[index].achievements,
                                  en: details
                                }
                              };
                              setDraftEdus(list);
                            }} 
                            className="flex-grow bg-slate-950 border border-slate-850 focus:border-teal-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans" 
                          />
                          <button 
                            onClick={() => {
                              const list = [...draftEdus];
                              const details = (list[index].achievements?.en || []).filter((_: any, i: number) => i !== dIdx);
                              list[index] = {
                                ...list[index],
                                achievements: {
                                  ...list[index].achievements,
                                  en: details
                                }
                              };
                              setDraftEdus(list);
                            }} 
                            className="p-1 px-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const list = [...draftEdus];
                          const achievements = list[index].achievements || { es: [], en: [] };
                          list[index] = {
                            ...list[index],
                            achievements: {
                              ...achievements,
                              en: [...(achievements.en || []), '']
                            }
                          };
                          setDraftEdus(list);
                        }} 
                        className="self-start text-[10px] font-bold text-teal-500 hover:text-teal-400 flex items-center gap-1.5 mt-0.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Añadir logro académico (EN)' : 'Add academic item (EN)'}</span>
                      </button>
                    </div>

                  </div>
                ))}
                <button 
                  onClick={addEdu} 
                  className="py-2.5 px-4 border border-dashed border-slate-800 hover:border-slate-700 hover:bg-slate-850/40 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1"
                >
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>{lang === 'es' ? 'Agregar Educación' : 'Add Education'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-850 bg-slate-950/40 flex items-center justify-end gap-3">
            <button
              onClick={() => setLocalEditingSection(null)}
              className="py-2 px-4 hover:bg-slate-800 text-xs font-bold text-slate-400 hover:text-slate-200 rounded-xl transition-all cursor-pointer border border-transparent"
            >
              {lang === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              onClick={handleSaveInline}
              className="py-2 px-5 bg-teal-600 hover:bg-teal-500 text-xs font-extrabold text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-teal-950/30"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{lang === 'es' ? 'Guardar Cambios' : 'Save Changes'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  // Hover Editable Component Wrapper
  const EditableSection = ({ 
    section, 
    children, 
    className = "",
    style 
  }: { 
    section: 'personal' | 'diseno' | 'perfil' | 'competencias' | 'experiencia' | 'certificaciones' | 'educacion' | 'referencias', 
    children: React.ReactNode, 
    className?: string,
    style?: React.CSSProperties
  }) => {
    const isInteractive = !forcePrintLayout;

    // Dynamically calculate font size for this specific section
    const secKey = section === 'personal' ? 'personalInfo' : section;
    const sectionFontSizePercent = (data.sectionFontSizes as any)?.[secKey] || 100;
    const sectionLineHeightPercent = (data.sectionLineHeight as any)?.[secKey] || 100;
    const sectionSpacingPercent = (data.sectionSpacing as any)?.[secKey] || 100;
    
    // Convert 100% to line-height 1.5, spacing scale etc.
    const spacingScale = sectionSpacingPercent / 100;
    
    const combinedStyle: any = {
      ...style,
      fontSize: sectionFontSizePercent !== 100 ? `${sectionFontSizePercent}%` : undefined,
      lineHeight: sectionLineHeightPercent !== 100 ? `${1.5 * (sectionLineHeightPercent / 100)}` : undefined,
      gap: sectionSpacingPercent !== 100 ? `calc(1rem * ${spacingScale})` : undefined,
      '--section-scale': (sectionFontSizePercent / 100).toString(),
      '--section-spacing': spacingScale.toString(),
    };

    const handleAdjustFontSize = (e: React.MouseEvent, delta: number) => {
      e.stopPropagation();
      if (!onChange) return;
      const current = (data.sectionFontSizes as any)?.[secKey] || 100;
      const next = Math.min(160, Math.max(60, current + delta));
      const newFontSizes = { ...(data.sectionFontSizes || {}), [secKey]: next };
      onChange({ ...data, sectionFontSizes: newFontSizes as any });
    };

    const handleAdjustLineHeight = (e: React.MouseEvent, delta: number) => {
      e.stopPropagation();
      if (!onChange) return;
      const current = (data.sectionLineHeight as any)?.[secKey] || 100;
      const next = Math.min(180, Math.max(60, current + delta));
      const newState = { ...(data.sectionLineHeight || {}), [secKey]: next };
      onChange({ ...data, sectionLineHeight: newState as any });
    };

    const handleAdjustSpacing = (e: React.MouseEvent, delta: number) => {
      e.stopPropagation();
      if (!onChange) return;
      const current = (data.sectionSpacing as any)?.[secKey] || 100;
      const next = Math.min(250, Math.max(20, current + delta));
      const newState = { ...(data.sectionSpacing || {}), [secKey]: next };
      onChange({ ...data, sectionSpacing: newState as any });
    };

    if (!isInteractive) {
      return <div style={combinedStyle} className={className}>{children}</div>;
    }

    return (
      <div 
        onDoubleClick={(e) => {
          e.stopPropagation();
          setLocalEditingSection(section);
          if (onEditSection) onEditSection(section);
        }}
        onClick={(e) => {
          if (onEditSection) {
            onEditSection(section);
          }
        }}
        style={combinedStyle}
        className={`group/section relative rounded-xl transition-all duration-200 hover:ring-2 hover:ring-teal-500/40 hover:bg-teal-500/[0.015] ${className}`}
        title={lang === 'es' ? "Clic para seleccionar o doble-clic para editar" : "Click to select or double-click to edit"}
      >
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 opacity-0 group-hover/section:opacity-100 transition-all duration-300 z-[20] pointer-events-auto">
           
           <div className="flex bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden shadow-xl self-stretch divide-x divide-slate-700/50">
             
             {/* Font Size */}
             <div className="flex items-center group/btn relative" title={lang === 'es' ? "Tamaño de letra" : "Font size"}>
               <button onClick={(e) => handleAdjustFontSize(e, -1)} className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><Minus className="w-2.5 h-2.5" /></button>
               <span className="text-[9px] font-bold text-teal-400 font-mono w-[22px] text-center">{(sectionFontSizePercent / 10).toFixed(1)}</span>
               <button onClick={(e) => handleAdjustFontSize(e, 1)} className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><Plus className="w-2.5 h-2.5" /></button>
               <Type className="w-2.5 h-2.5 text-slate-500 absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
             </div>

             {/* Line Height */}
             <div className="flex items-center group/btn relative" title={lang === 'es' ? "Interlineado" : "Line height"}>
               <button onClick={(e) => handleAdjustLineHeight(e, -5)} className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><ChevronDown className="w-2.5 h-2.5" /></button>
               <span className="text-[9px] font-bold text-amber-400 font-mono w-[22px] text-center">{(sectionLineHeightPercent / 10).toFixed(1)}</span>
               <button onClick={(e) => handleAdjustLineHeight(e, 5)} className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><ChevronUp className="w-2.5 h-2.5" /></button>
               <Layers className="w-2.5 h-2.5 text-slate-500 absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
             </div>

             {/* Spacing (Gap) */}
             <div className="flex items-center group/btn relative" title={lang === 'es' ? "Espaciado (Gap)" : "Spacing"}>
               <button onClick={(e) => handleAdjustSpacing(e, -5)} className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><Minus className="w-2.5 h-2.5" /></button>
               <span className="text-[9px] font-bold text-indigo-400 font-mono w-[22px] text-center">{(sectionSpacingPercent / 10).toFixed(1)}</span>
               <button onClick={(e) => handleAdjustSpacing(e, 5)} className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"><Plus className="w-2.5 h-2.5" /></button>
               <span className="text-[7.5px] font-bold text-slate-500 absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity tracking-widest leading-none">GAP</span>
             </div>

           </div>
           
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setLocalEditingSection(section);
               if (onEditSection) onEditSection(section);
             }}
             className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-2 py-1 text-[9px] font-bold tracking-wider shadow-xl cursor-pointer flex items-center gap-1 active:scale-95 transition-all w-fit"
             title={lang === 'es' ? "Editar contenido" : "Edit content"}
           >
             <Pencil className="w-2.5 h-2.5 stroke-[2.5]" />
             <span>{lang === 'es' ? 'EDITAR' : 'EDIT'}</span>
           </button>
        </div>
        {children}
      </div>
    );
  };

  // Shared Avatar Renderer
  const renderAvatar = (customShapeClass?: string, customShapeBorderRadius?: string, hideHint?: boolean) => {
    const finalShapeClass = customShapeClass || shapeClass;
    const finalBorderRadius = customShapeBorderRadius || shapeBorderRadius;

    const customInnerStyle = {
      ...innerStyle,
      borderRadius: finalBorderRadius
    };
    const customImageStyle = {
      ...imageStyle,
      borderRadius: finalBorderRadius
    };

    return (
      <div className="relative group flex flex-col items-center shrink-0">
        <div className="relative" style={glowStyle}>
          {type !== 'none' && (
            <div 
              className="absolute inset-[3.5px] transition-all duration-350 pointer-events-none"
              style={{
                borderRadius: finalBorderRadius,
                background: type === 'malibu' 
                  ? 'linear-gradient(135deg, #ec4899 15%, #a855f7 50%, #06b6d4 90%)' 
                  : type === 'radioactive'
                  ? 'linear-gradient(135deg, #10b981 10%, #22c55e 50%, #34d399 90%)'
                  : type === 'retro'
                  ? 'linear-gradient(135deg, #f97316 10%, #ef4444 50%, #facc15 90%)'
                  : type === 'midnight'
                  ? 'linear-gradient(135deg, #3b82f6 10%, #6366f1 50%, #06b6d4 90%)'
                  : type === 'chroma'
                  ? 'linear-gradient(135deg, #8b5cf6 10%, #ec4899 50%, #d946ef 90%)'
                  : 'transparent',
                transform: `scale(${1 + (intensity / 100) * 0.22})`,
                opacity: (intensity / 100) * 0.98,
                filter: `blur(${8 + (intensity / 100) * 20}px)`,
                mixBlendMode: 'screen',
              }}
            />
          )}
          
          <div 
            className={`relative overflow-hidden transition-all duration-300 bg-slate-800 flex items-center justify-center ${finalShapeClass}`}
            style={customInnerStyle}
          >
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
              style={customImageStyle}
            />
            {onAvatarChange && (
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white font-medium cursor-pointer transition-opacity duration-200">
                <span className="text-center px-2">Cambiar Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
        {onAvatarChange && !hideHint && (
          <span className="text-[10px] text-slate-400 mt-2 hover:text-teal-400 transition-colors cursor-pointer md:block hidden print:hidden">
            (Click para cambiar)
          </span>
        )}
      </div>
    );
  };  /* =========================================================================
     LAYOUT VARIANT 1: 'jorge' (THE SIDEBAR COLUMN LAYOUT)
     ========================================================================= */
  if (activeLayout === 'jorge') {
    return (
      <motion.div
        id="cv-print-area"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          fontFamily: rootFontFamily,
          width: pageWidth,
          minHeight: pageHeight,
          aspectRatio: pageAspect
        }}
        className={`mx-auto bg-white shadow-2xl overflow-visible print:shadow-none print:rounded-none border border-slate-200/60 ${
          forcePrintLayout 
            ? 'grid grid-cols-[35%_65%] !rounded-none shadow-xl border border-slate-200' 
            : 'grid grid-cols-1 md:grid-cols-[35%_65%]'
        }`}
      >
        {/* LEFT COLUMN: Sidebar (Thematic background) */}
        <div 
          id="cv-sidebar" 
          style={{ backgroundColor: tplStyle.sidebarBg, color: tplStyle.sidebarText }}
          className={`${paddingSidebar} flex flex-col ${gapSidebar} h-full relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:z-10`}
        >
          {/* Avatar rendering from shared helper with 10% size decrease */}
          {renderAvatar(
            shape === 'oval' || shape === 'rectangular'
              ? 'w-[146px] h-[182px] md:w-[164px] md:h-[200px]'
              : 'w-[164px] h-[164px] md:w-[182px] md:h-[182px] aspect-square'
          )}

          {/* CONTACT INFO */}
          <EditableSection section="personal" className="flex flex-col gap-4">
            <h3 
              style={{ color: tplStyle.sidebarAccent, borderColor: `${tplStyle.sidebarAccent}55` }}
              className={`font-bold tracking-wider ${tBase} border-b pb-2 uppercase`}
            >
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </h3>
            <ul className={`flex flex-col gap-2.5 text-[10.5px] md:text-[11.5px]`}>
              <li className="flex items-start gap-2.5">
                <MapPin className="shrink-0 mt-0.5" style={{ color: tplStyle.sidebarAccent, width: 'calc(0.85rem * var(--section-scale, 1))', height: 'calc(0.85rem * var(--section-scale, 1))' }} />
                <span>{personalInfo.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="shrink-0" style={{ color: tplStyle.sidebarAccent, width: 'calc(0.85rem * var(--section-scale, 1))', height: 'calc(0.85rem * var(--section-scale, 1))' }} />
                <a href={`tel:${personalInfo.phone}`} className="hover:opacity-85 transition-opacity">
                  {personalInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="shrink-0" style={{ color: tplStyle.sidebarAccent, width: 'calc(0.85rem * var(--section-scale, 1))', height: 'calc(0.85rem * var(--section-scale, 1))' }} aria-label="Mail icon" />
                <a href={`mailto:${personalInfo.email}`} className="hover:opacity-85 transition-opacity break-all">
                  {personalInfo.email}
                </a>
              </li>
            </ul>
          </EditableSection>

          {/* COMPETENCIAS / SKILLS */}
          <EditableSection section="competencias" className="flex flex-col gap-4">
            <h3 
              style={{ color: tplStyle.sidebarAccent, borderColor: `${tplStyle.sidebarAccent}55` }}
              className={`font-bold tracking-wider ${tBase} border-b pb-2 uppercase`}
            >
              {lang === 'es' ? 'Competencias' : 'Skills & Focus'}
            </h3>
            <div className={`flex flex-col ${gapList}`}>
              {competencias[lang]?.map((comp, idx) => (
                <div
                  key={idx}
                  style={{ borderColor: `${tplStyle.sidebarAccent}aa` }}
                  className={`flex flex-col ${tBody} leading-relaxed border-l-2 pl-3 py-0.5`}
                >
                  <span className="font-semibold" style={{ color: tplStyle.sidebarText }}>
                    {comp}
                  </span>
                </div>
              ))}
            </div>
          </EditableSection>

          {/* CERTIFICACIONES */}
          <EditableSection section="certificaciones" className="flex flex-col gap-4">
            <h3 
              style={{ color: tplStyle.sidebarAccent, borderColor: `${tplStyle.sidebarAccent}55` }}
              className={`font-bold tracking-wider ${tBase} border-b pb-2 uppercase`}
            >
              {lang === 'es' ? 'Certificaciones' : 'Certifications'}
            </h3>
            <div className={`flex flex-col ${gapList}`}>
              {certificaciones.map((cert) => (
                <div 
                  key={cert.id} 
                  style={{ borderColor: `${tplStyle.sidebarAccent}aa` }}
                  className={`flex flex-col ${tBody} leading-relaxed border-l-2 pl-3 py-0.5`}
                >
                  <span className="font-semibold text-white">{cert.title[lang]}</span>
                  <span className={`opacity-75 ${tSecBody}`}>
                    {cert.entity} <span className="opacity-50">|</span> {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </EditableSection>

          {/* REFERENCIAS */}
          <EditableSection section="referencias" className="flex flex-col gap-4 pt-5 border-t border-slate-700/80">
            <h3 
              style={{ color: tplStyle.sidebarAccent }}
              className={`font-bold tracking-wider ${tBase} uppercase opacity-90`}
            >
              {lang === 'es' ? 'Referencias' : 'References'}
            </h3>
            <div className={`flex flex-col gap-3.5`}>
              {Array.isArray(referencias) && referencias.length > 0 ? (
                referencias.map((ref) => (
                  <div key={ref.id || Math.random().toString()} className="flex flex-col leading-tight border-l-[1.5px] border-slate-700/40 pl-2">
                    <span className={`font-bold text-slate-200 text-xs tracking-wide`}>{ref.name}</span>
                    {ref.role && ref.role[lang] && (
                      <span className="text-slate-400 text-[10px] mt-0.5">{ref.role[lang]}</span>
                    )}
                    {(ref.institution || ref.phone) && (
                      <span className="text-slate-500 text-[9.5px] mt-0.5 flex flex-wrap items-center gap-1.5">
                        {ref.institution && <span>{ref.institution}</span>}
                        {ref.institution && ref.phone && <span className="text-slate-600/80">•</span>}
                        {ref.phone && <span className="text-teal-400 font-medium">{ref.phone}</span>}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className={`opacity-50 italic ${tBody}`}>
                  {lang === 'es' ? 'Sin referencias' : 'No references'}
                </p>
              )}
            </div>
          </EditableSection>
        </div>

        {/* RIGHT COLUMN: Professional Summary + Experience + Education */}
        <div 
          id="cv-main-body" 
          className={`${paddingMain} flex flex-col ${gapSection} text-slate-850 bg-white h-full`}
        >
          {/* HEADER AREA */}
          <EditableSection section="personal" className="flex flex-col gap-2">
            <h1 className={`${hName} font-extrabold tracking-tight text-slate-900 leading-tight`}>
              {personalInfo.name}
            </h1>
            <h2 
              style={{ color: tplStyle.primary }}
              className={`font-bold ${hTitlesJorge} tracking-wider uppercase flex items-center flex-wrap gap-2`}
            >
              <div className="flex items-center gap-2">
                <span 
                  style={{ backgroundColor: tplStyle.primary }}
                  className="w-1.5 h-1.5 rounded-full inline-block"
                ></span>
                <span>{personalInfo.titles[lang]}</span>
              </div>
              {personalInfo.registroMedico && (
                <>
                  <span className="opacity-40 select-none">|</span>
                  <span className="text-slate-600 font-bold uppercase tracking-wider">{personalInfo.registroMedico}</span>
                </>
              )}
            </h2>
          </EditableSection>

          {/* PROFESSIONAL PROFILE */}
          <EditableSection section="perfil" className="flex flex-col gap-3">
            <div 
              className={`flex items-center gap-2 border-b border-blue-200/60 pb-2 text-slate-900 font-bold ${tBase}`}
            >
              <div 
                style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                className="p-1.5 rounded-lg"
              >
                <Heart className="w-5 h-5" />
              </div>
              <h2>{lang === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</h2>
            </div>
            <div 
              style={{ borderColor: tplStyle.primary, backgroundColor: `${tplStyle.primaryBg}50` }}
              className={`border-l-[3px] p-4 rounded-r-2xl shadow-sm`}
            >
              <p className={`${tBody} text-slate-950 font-medium leading-relaxed text-justify`}>
                <FormattedText text={perfil[lang]} />
              </p>
            </div>
          </EditableSection>

          {/* WORK EXPERIENCE */}
          <EditableSection section="experiencia" className="flex flex-col gap-4">
            <div className={`flex items-center gap-2 border-b border-blue-200/60 pb-2 text-slate-900 font-bold ${tBase}`}>
              <div 
                style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                className="p-1.5 rounded-lg"
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <h2>{lang === 'es' ? 'Experiencia Profesional' : 'Work Experience'}</h2>
            </div>

            <div className={`relative border-l-2 border-slate-300/85 ml-3.5 pl-6 flex flex-col ${gapSection}`}>
              {experiencia.map((job) => {
                const isCurrent = job.period.es.toLowerCase().includes('actual') || 
                                 job.period.en.toLowerCase().includes('present');
                return (
                  <motion.div
                    key={job.id}
                    variants={itemVariants}
                    className="relative group/exp"
                  >
                    <span 
                      style={{ 
                        backgroundColor: isCurrent ? tplStyle.primary : '#94a3b8',
                        boxShadow: isCurrent ? `0 0 0 4px ${tplStyle.primary}33` : '0 0 0 4px white'
                      }}
                      className="absolute -left-[30px] top-[7px] w-[10px] h-[10px] rounded-full transition-transform duration-300 group-hover/exp:scale-125"
                    ></span>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                      <div>
                        <h3 className={`${tBase} font-bold text-slate-900 leading-tight`}>
                          {job.role[lang]}
                        </h3>
                        <p 
                          style={{ color: tplStyle.primary }}
                          className={`${tSecBody} text-[13.5px] md:text-[15px] font-bold`}
                        >
                          {job.company} <span className="text-slate-400/90 font-medium text-xs md:text-[13px]">| {job.location}</span>
                        </p>
                      </div>
                      {/* Date Pill */}
                      <span 
                        style={{ 
                          color: isCurrent ? tplStyle.primary : '#475569', 
                          backgroundColor: isCurrent ? tplStyle.primaryBg : '#f1f5f9',
                          borderColor: isCurrent ? `${tplStyle.primary}33` : '#e2e8f0'
                        }}
                        className={`self-start ${tSecBody} font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-colors duration-200`}
                      >
                        {job.period[lang]}
                      </span>
                    </div>

                    {job.details[lang] && job.details[lang].length > 0 && (
                      <ul className={`list-disc list-outside pl-4 space-y-1.5 ${tBody} text-slate-600 ${mbItem}`}>
                        {job.details[lang].map((detail, dIdx) => (
                          <li key={dIdx} className="leading-relaxed">
                            <FormattedText text={detail} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {job.achievement && job.achievement[lang] && (
                      <div 
                        style={{ borderColor: tplStyle.primary, backgroundColor: `${tplStyle.primaryBg}80` }}
                        className={`border-l-2 ${blockPadding} ${tBody} text-slate-650 rounded-r-md mt-1.5 flex items-start gap-1.5`}
                      >
                        <CheckCircle2 className="shrink-0 mt-0.5" style={{ color: tplStyle.primary, width: 'calc(0.875rem * var(--section-scale, 1))', height: 'calc(0.875rem * var(--section-scale, 1))' }} />
                        <p>
                          <strong className="text-slate-950 font-bold">
                            {job.achievementLabel?.[lang] || (lang === 'es' ? 'Logro' : 'Achievement')}:
                          </strong>{' '}
                          <FormattedText text={job.achievement[lang]} />
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </EditableSection>

          {/* EDUCATION */}
          <EditableSection section="educacion" className="flex flex-col gap-4 mt-2">
            <div className={`flex items-center gap-2 border-b border-blue-200/60 pb-2 text-slate-900 font-bold ${tBase}`}>
              <div 
                style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                className="p-1.5 rounded-lg"
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2>{lang === 'es' ? 'Formación Académica' : 'Academic Education'}</h2>
            </div>

            <div className={`relative border-l-2 border-slate-200 ml-2.5 pl-5 flex flex-col gap-2 mt-2`}>
              {[...educacion].sort((a, b) => {
                const getYear = (str: string) => {
                  if (!str) return 0;
                  const match = str.match(/\b(20\d{2}|19\d{2})\b/g);
                  return match ? parseInt(match[match.length - 1], 10) : 0;
                };
                return getYear(b.period) - getYear(a.period);
              }).map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="relative group/edu"
                >
                  {/* Connector Dot */}
                  <span 
                    style={{ backgroundColor: tplStyle.primary }}
                    className="absolute -left-[25px] top-[6px] w-[8px] h-[8px] rounded-full ring-4 ring-white shadow-sm transition-transform duration-300 group-hover/edu:scale-125"
                  ></span>
                  
                  <div className="flex flex-col gap-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 leading-tight">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5">
                        <h3 className={`${tBody} font-bold text-slate-900 leading-snug`}>
                          {edu.degree[lang]}
                        </h3>
                        <span className="hidden sm:inline text-slate-300 text-xs">•</span>
                        <p className={`${tSecBody} text-slate-500 font-medium`}>
                          {edu.institution}
                        </p>
                      </div>
                      <div className="sm:text-right shrink-0 mt-0.5 sm:mt-0">
                        <span 
                           style={{ color: tplStyle.primary, backgroundColor: tplStyle.primaryBg }}
                           className={`inline-block ${tSmall} font-semibold px-2 py-0.5 rounded-md border border-slate-200/60 transition-colors`}
                        >
                          {edu.period}
                        </span>
                      </div>
                    </div>

                    {edu.achievements && edu.achievements[lang] && edu.achievements[lang].length > 0 && (
                      <div className="flex flex-col gap-1.5 mt-1">
                        {edu.achievements[lang].map((achievement, aIdx) => (
                          <div
                            key={aIdx}
                            style={{ backgroundColor: `${tplStyle.primaryBg}80` }}
                            className={`${blockPadding} ${tBody} text-slate-650 rounded-md flex items-start gap-1.5`}
                          >
                            <CheckCircle2 className="shrink-0 mt-0.5" style={{ color: tplStyle.primary, width: 'calc(0.875rem * var(--section-scale, 1))', height: 'calc(0.875rem * var(--section-scale, 1))' }} />
                            <p>
                              <strong className="text-slate-950 font-bold">
                                {lang === 'es' ? 'Logro' : 'Achievement'}:
                              </strong>{' '}
                              <FormattedText text={achievement} />
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </EditableSection>
        </div>
        {renderInlineEditor()}
      </motion.div>
    );
  }

  /* =========================================================================
     LAYOUT VARIANT 2: 'academia' (MINIMALIST ACADEMIA - ELEGANT 1-COLUMN FORMAT)
     ========================================================================= */
  if (activeLayout === 'academia') {
    return (
      <motion.div
        id="cv-print-area"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          fontFamily: rootFontFamily,
          width: pageWidth,
          minHeight: pageHeight,
          aspectRatio: pageAspect
        }}
        className={`mx-auto bg-white shadow-2xl overflow-visible print:shadow-none print:rounded-none border border-slate-200/60 ${paddingMainAcademia} flex flex-col ${gapSection} text-slate-800`}
      >
        {/* CENTERED HEADER */}
        <EditableSection section="personal" className="flex flex-col items-center text-center pb-6 border-b border-slate-250 gap-4">
          {renderAvatar('w-[129px] h-[129px] md:w-[147px] md:h-[147px] aspect-square', '50%', true)}
          <div className="flex flex-col gap-1">
            <h1 className={`${hName} font-extrabold tracking-tight text-slate-900 leading-tight`}>
              {personalInfo.name}
            </h1>
            <h2 
              style={{ color: tplStyle.primary }}
              className={`font-bold ${tBase} tracking-widest uppercase mt-0.5 flex flex-wrap items-center justify-center gap-2`}
            >
              <span>{personalInfo.titles[lang]}</span>
              {personalInfo.registroMedico && (
                <>
                  <span className="opacity-40 select-none">|</span>
                  <span className="text-slate-600 font-bold uppercase tracking-widest">{personalInfo.registroMedico}</span>
                </>
              )}
            </h2>
          </div>

          {/* CONTACT LIST STRIP */}
          <div className={`flex flex-wrap justify-center items-center gap-x-5 gap-y-2 ${tContact} text-slate-600 mt-1`}>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.primary }} />
              <span>{personalInfo.location}</span>
            </span>
            <span className="hidden sm:inline text-slate-200">|</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.primary }} />
              <a href={`tel:${personalInfo.phone}`} className="hover:opacity-85 transition-opacity">
                {personalInfo.phone}
              </a>
            </span>
            <span className="hidden sm:inline text-slate-250">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.primary }} />
              <a href={`mailto:${personalInfo.email}`} className="hover:opacity-85 transition-opacity break-all">
                {personalInfo.email}
              </a>
            </span>
          </div>
        </EditableSection>

        {/* PROFILE STATEMENT */}
        <EditableSection section="perfil" className="flex flex-col gap-2.5">
          <h3 
            style={{ borderColor: `${tplStyle.primary}55` }}
            className={`font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b pb-1 w-full text-left ${hSection}`}
          >
            <Heart className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
            <span>{lang === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</span>
          </h3>
          <div 
            style={{ borderColor: tplStyle.primary, backgroundColor: `${tplStyle.primaryBg}30` }}
            className={`border-l-[3px] p-4 rounded-r-2xl shadow-sm`}
          >
            <p className={`${tBody} text-slate-950 font-medium leading-relaxed text-justify`}>
              <FormattedText text={perfil[lang]} />
            </p>
          </div>
        </EditableSection>

        {/* TWO SECTION BLOCKS SIDE-BY-SIDE OR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* MAIN COLUMN (Experience & Education) */}
          <div className={`md:col-span-8 flex flex-col ${gapSection}`}>
            
            {/* WORK EXPERIENCE */}
            <EditableSection section="experiencia" className="flex flex-col gap-4">
              <h3 
                style={{ borderColor: `${tplStyle.primary}55` }}
                className={`font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b pb-1 text-left ${hSection}`}
              >
                <Briefcase className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Experiencia Profesional' : 'Work Experience'}</span>
              </h3>
              
              <div className={`flex flex-col ${gapInsideSection}`}>
                {experiencia.map((job) => {
                  const isCurrent = job.period.es.toLowerCase().includes('actual') || 
                                   job.period.en.toLowerCase().includes('present');
                  return (
                    <div 
                      key={job.id} 
                      style={{ borderColor: `${tplStyle.primary}33` }}
                      className="relative pl-3 border-l-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1.5">
                        <div>
                          <h4 className={`${tBase} font-bold text-slate-900 leading-tight`}>
                            {job.role[lang]}
                          </h4>
                          <p 
                            style={{ color: tplStyle.primary }}
                            className={`${tSecBody} font-semibold`}
                          >
                            {job.company} <span className="text-slate-400 font-normal">| {job.location}</span>
                          </p>
                        </div>
                        <span 
                          style={{ 
                            color: isCurrent ? tplStyle.primary : '#475569', 
                            backgroundColor: isCurrent ? tplStyle.primaryBg : '#f8fafc',
                            borderColor: isCurrent ? `${tplStyle.primary}33` : '#e2e8f0'
                          }}
                          className={`self-start ${tSecBody} font-semibold px-2 py-0.5 rounded border transition-colors`}
                        >
                          {job.period[lang]}
                        </span>
                      </div>

                      {job.details[lang] && job.details[lang].length > 0 && (
                        <ul className={`list-disc list-outside pl-3.5 space-y-1 ${tBody} text-slate-600 mb-1.5`}>
                          {job.details[lang].map((detail, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">
                              <FormattedText text={detail} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {job.achievement && job.achievement[lang] && (
                        <div 
                          style={{ borderColor: tplStyle.primary, backgroundColor: `${tplStyle.primaryBg}70` }}
                          className={`border-l ${blockPadding} ${tBody} text-slate-600 rounded-r-md mt-1 flex items-start gap-1.5`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: tplStyle.primary }} />
                          <p>
                            <strong className="text-slate-900 font-bold">
                              {job.achievementLabel?.[lang] || (lang === 'es' ? 'Logro destacado' : 'Key Achievement')}:
                            </strong>{' '}
                            <FormattedText text={job.achievement[lang]} />
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </EditableSection>

            {/* EDUCATION */}
            <EditableSection section="educacion" className="flex flex-col gap-4">
              <h3 
                style={{ borderColor: `${tplStyle.primary}55` }}
                className={`font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b pb-1 text-left ${hSection}`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Formación Académica' : 'Academic Education'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {educacion.map((edu) => (
                  <div 
                    key={edu.id} 
                    className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-2.5 relative group overflow-hidden"
                  >
                    <div 
                      style={{ backgroundColor: tplStyle.primary }}
                      className="absolute top-0 left-0 w-full h-1 opacity-10 group-hover:opacity-30 transition-opacity"
                    ></div>
                    
                    <div className="flex flex-col gap-1">
                      <h4 className={`${tSmall} font-bold text-slate-900 leading-tight uppercase tracking-tight`}>{edu.degree[lang]}</h4>
                      <p className={`${tSecBody} text-slate-500 font-medium`}>{edu.institution}</p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-auto bg-white/60 p-1 rounded-lg border border-slate-100/50 w-fit">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className={`${tSmall} font-bold text-slate-500`}>{edu.period}</span>
                    </div>

                    {edu.achievements && edu.achievements[lang] && edu.achievements[lang].length > 0 && (
                      <div className="flex flex-col gap-1 border-t border-slate-150/60 pt-2 mt-1">
                        {edu.achievements[lang].map((achievement, aIdx) => (
                          <div key={aIdx} className={`text-[10px] text-slate-600 flex items-start gap-1`}>
                            <span style={{ color: tplStyle.primary }} className="font-extrabold shrink-0">•</span>
                            <p className="italic leading-snug">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </EditableSection>

          </div>

          {/* SIDE COLUMN (Competencies, Certifications & References in Academia layout) */}
          <div className={`md:col-span-4 flex flex-col ${gapSection}`}>
            
            {/* COMPETENCIAS */}
            <EditableSection section="competencias" className="flex flex-col gap-3">
              <h3 
                style={{ borderColor: `${tplStyle.primary}55` }}
                className={`font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b pb-1 text-left ${hSection}`}
              >
                <Star className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Competencias' : 'Skills & Focus'}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {competencias[lang]?.map((comp, idx) => (
                  <span
                    key={idx}
                    style={{ backgroundColor: tplStyle.badgeBg, color: tplStyle.badgeText }}
                    className={`border border-slate-200 px-2.5 py-1 rounded ${hBadge} font-semibold`}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </EditableSection>

            {/* CERTIFICACIONES */}
            <EditableSection section="certificaciones" className="flex flex-col gap-3">
              <h3 
                style={{ borderColor: `${tplStyle.primary}55` }}
                className={`font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b pb-1 text-left ${hSection}`}
              >
                <Award className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Certificaciones' : 'Certifications'}</span>
              </h3>
              <div className={`flex flex-col ${gapList}`}>
                {certificaciones.map((cert) => (
                  <div 
                    key={cert.id} 
                    style={{ borderColor: `${tplStyle.primary}33` }}
                    className={`${tBody} leading-normal border-l pl-2.5`}
                  >
                    <p className="font-bold text-slate-800">{cert.title[lang]}</p>
                    <p className={`text-slate-500 ${tSecBody}`}>{cert.entity} • {cert.year}</p>
                  </div>
                ))}
              </div>
            </EditableSection>

            {/* REFERENCIAS */}
            <EditableSection section="referencias" className="flex flex-col gap-3">
              <h3 
                style={{ borderColor: `${tplStyle.primary}55` }}
                className={`font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b pb-1 text-left ${hSection}`}
              >
                <Award className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Referencias' : 'References'}</span>
              </h3>
              <div className={`flex flex-col gap-6`}>
                {Array.isArray(referencias) && referencias.length > 0 ? (
                  referencias.map((ref) => (
                    <div key={ref.id || Math.random().toString()} className="flex flex-col leading-snug">
                      <p className={`font-bold text-slate-900 ${tSecBody}`}>{ref.name}</p>
                      {ref.role && ref.role[lang] && (
                        <p className={`text-slate-500 text-[10.5px] mt-0.5`}>{ref.role[lang]}</p>
                      )}
                      {ref.phone && (
                        <p style={{ color: tplStyle.primary }} className={`font-bold text-[10.5px] mt-1 flex items-center gap-1.5`}>
                          <Phone className="w-3 h-3" />
                          <span>{ref.phone}</span>
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className={`opacity-50 italic ${tBody}`}>
                    {lang === 'es' ? 'Sin referencias' : 'No references'}
                  </p>
                )}
              </div>
            </EditableSection>

          </div>

        </div>
        {renderInlineEditor()}
      </motion.div>
    );
  }

  /* =========================================================================
     LAYOUT VARIANT 3: 'executive' (PRESTIGE EJECUTIVO - CLASSY EXTENSIVE TEMPLATE)
     ========================================================================= */
  if (activeLayout === 'executive') {
    return (
      <motion.div
        id="cv-print-area"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          fontFamily: rootFontFamily,
          width: pageWidth,
          minHeight: pageHeight,
          aspectRatio: pageAspect
        }}
        className="mx-auto bg-white shadow-2xl overflow-visible print:shadow-none print:rounded-none flex flex-col border border-slate-200/60"
      >
        {/* EXECUTIVE SOLID BANNER HEADER */}
        <EditableSection 
          section="personal" 
          style={{ backgroundColor: tplStyle.bannerBg }}
          className="text-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 border-b-4"
        >
          {/* Custom shape for executive frame */}
          {renderAvatar('w-[129px] h-[129px] md:w-[147px] md:h-[147px] aspect-square', '20px', true)}
          
          <div className="flex flex-col gap-2 md:text-left text-center flex-1">
            <h1 className={`${hName} font-extrabold tracking-tight text-white leading-none`}>
              {personalInfo.name}
            </h1>
            <h2 
              style={{ color: tplStyle.secondary }}
              className={`font-semibold ${tBase} tracking-widest uppercase mt-0.5 flex flex-wrap items-center justify-center md:justify-start gap-2`}
            >
              <span>✦ {personalInfo.titles[lang]}</span>
              {personalInfo.registroMedico && (
                <>
                  <span className="opacity-40 select-none">|</span>
                  <span className="text-white/80 font-semibold uppercase tracking-widest">{personalInfo.registroMedico}</span>
                </>
              )}
            </h2>

            {/* Quick clean contact layout in header bar */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 ${tContact} text-white/90`}>
              <div className="flex items-center justify-center md:justify-start gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span className="truncate">{personalInfo.location}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span className="truncate">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span className="truncate break-all">{personalInfo.email}</span>
              </div>
            </div>
          </div>
        </EditableSection>

        {/* DOUBLE COLUMN LAYOUT UNDER HEADER */}
        <div className={`grid grid-cols-1 md:grid-cols-12 flex-1 ${
          forcePrintLayout ? 'grid h-full' : ''
        }`}>
          
          {/* LEFT SIDEBAR */}
          <div 
            style={{ backgroundColor: `${tplStyle.primaryBg}80` }}
            className={`${paddingSidebar} border-r border-slate-100 flex flex-col ${gapSidebar} print:col-span-3 ${
              forcePrintLayout ? 'col-span-3' : 'md:col-span-3'
            }`}
          >
            
            {/* PROFILE */}
            <EditableSection section="perfil" className="flex flex-col gap-2.5">
              <h3 
                style={{ borderColor: tplStyle.secondary }}
                className={`text-slate-900 font-bold ${hSection} uppercase tracking-wider border-b pb-1 flex items-center gap-1.5`}
              >
                <Heart className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span>{lang === 'es' ? 'Perfil Ejecutivo' : 'Executive Profile'}</span>
              </h3>
              <div 
                className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/50"
              >
                <p className={`${tBody} text-slate-950 font-medium leading-relaxed text-justify`}>
                  <FormattedText text={perfil[lang]} />
                </p>
              </div>
            </EditableSection>

            {/* COMPETENCIAS */}
            <EditableSection section="competencias" className="flex flex-col gap-3">
              <h3 
                style={{ borderColor: tplStyle.secondary }}
                className={`text-slate-900 font-bold ${hSection} uppercase tracking-wider border-b pb-1 flex items-center gap-1.5`}
              >
                <Star className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span>{lang === 'es' ? 'Competencias' : 'Skills & focus'}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {competencias[lang]?.map((comp, idx) => (
                  <span
                    key={idx}
                    style={{ backgroundColor: tplStyle.badgeBg, color: tplStyle.badgeText }}
                    className={`border border-slate-200 px-2.5 py-1 rounded-full ${hBadge} font-bold`}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </EditableSection>

            {/* CERTIFICACIONES */}
            <EditableSection section="certificaciones" className="flex flex-col gap-3">
              <h3 
                style={{ borderColor: tplStyle.secondary }}
                className={`text-slate-900 font-bold ${hSection} uppercase tracking-wider border-b pb-1 flex items-center gap-1.5`}
              >
                <Award className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span>{lang === 'es' ? 'Certificaciones' : 'Certifications'}</span>
              </h3>
              <div className={`flex flex-col ${gapList}`}>
                {certificaciones.map((cert) => (
                  <div 
                    key={cert.id} 
                    style={{ borderColor: `${tplStyle.secondary}44` }}
                    className={`${tBody} leading-relaxed border-l-2 pl-2.5`}
                  >
                    <p className="font-bold text-slate-800">{cert.title[lang]}</p>
                    <p className={`text-slate-500 ${tSecBody}`}>{cert.entity} | {cert.year}</p>
                  </div>
                ))}
              </div>
            </EditableSection>

            {/* REFERENCES */}
            <EditableSection section="referencias" className="flex flex-col gap-3">
              <h3 
                style={{ borderColor: tplStyle.secondary }}
                className={`text-slate-900 font-bold ${hSection} uppercase tracking-wider border-b pb-1 flex items-center gap-1.5`}
              >
                <Award className="w-3.5 h-3.5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span>{lang === 'es' ? 'Referencias' : 'References'}</span>
              </h3>
              <div className={`flex flex-col gap-6`}>
                {Array.isArray(referencias) && referencias.length > 0 ? (
                  referencias.map((ref) => (
                    <div key={ref.id || Math.random().toString()} className={`flex flex-col leading-snug`}>
                      <p className="font-bold text-slate-900 text-xs">{ref.name}</p>
                      {ref.role && ref.role[lang] && <p className={`text-slate-600 text-[10.5px] mt-0.5`}>{ref.role[lang]}</p>}
                      {ref.phone && <p style={{ color: tplStyle.secondary }} className={`font-bold text-[10.5px] mt-1.5 flex items-center gap-1`}>
                         <Phone className="w-2.5 h-2.5" />
                         <span>{ref.phone}</span>
                      </p>}
                    </div>
                  ))
                ) : (
                  <p className={`opacity-50 italic ${tBody}`}>
                    {lang === 'es' ? 'Sin referencias' : 'No references'}
                  </p>
                )}
              </div>
            </EditableSection>

          </div>

          {/* RIGHT SIDE (Experiences, Education) */}
          {/* RIGHT SIDE (Experiences, Education) */}
          <div className={`${paddingMain} flex flex-col ${gapSection} text-slate-800 bg-white print:col-span-9 col-span-12 ${
            forcePrintLayout ? 'col-span-9' : 'md:col-span-9'
          }`}>
            
            {/* WORK EXPERIENCE */}
            <EditableSection section="experiencia" className="flex flex-col gap-4">
              <h3 
                className={`text-slate-900 font-extrabold ${tBase} uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2`}
              >
                <Briefcase className="w-5 h-5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span>{lang === 'es' ? 'Trayectoria Profesional' : 'Executive Experience'}</span>
              </h3>

              <div className={`flex flex-col ${gapInsideSection}`}>
                {experiencia.map((job) => {
                  const isCurrent = job.period.es.toLowerCase().includes('actual') || 
                                   job.period.en.toLowerCase().includes('present');
                  return (
                    <div key={job.id} className="relative pl-4 border-l-2 border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                        <div>
                          <h4 className={`${tBase} font-bold text-slate-900 leading-tight`}>
                            {job.role[lang]}
                          </h4>
                          <p 
                            style={{ color: tplStyle.secondary }}
                            className={`${tSecBody} font-semibold`}
                          >
                            {job.company} <span className="text-slate-400 font-normal">| {job.location}</span>
                          </p>
                        </div>
                        <span 
                          style={{ 
                            color: isCurrent ? tplStyle.secondary : '#475569', 
                            backgroundColor: isCurrent ? tplStyle.primaryBg : '#f8fafc',
                            borderColor: isCurrent ? `${tplStyle.secondary}33` : '#e2e8f0'
                          }}
                          className={`self-start ${tSecBody} font-bold px-2.5 py-0.5 rounded border whitespace-nowrap transition-colors`}
                        >
                          {job.period[lang]}
                        </span>
                      </div>

                      {job.details[lang] && job.details[lang].length > 0 && (
                        <ul className={`list-disc list-outside pl-3.5 space-y-1.5 ${tBody} text-slate-650 ${mbItem}`}>
                          {job.details[lang].map((detail, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">
                              <FormattedText text={detail} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {job.achievement && job.achievement[lang] && (
                        <div 
                          style={{ borderColor: tplStyle.secondary, backgroundColor: `${tplStyle.primaryBg}50` }}
                          className={`border-l-2 ${blockPadding} ${tBody} text-slate-650 rounded-r-md mt-1.5 flex items-start gap-1.5`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: tplStyle.secondary }} />
                          <p>
                            <strong className="text-slate-900 font-bold">
                              {job.achievementLabel?.[lang] || (lang === 'es' ? 'Logro destacado' : 'Achievement')}:
                            </strong>{' '}
                            <FormattedText text={job.achievement[lang]} />
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </EditableSection>

            {/* EDUCATION */}
            <EditableSection section="educacion" className="flex flex-col gap-4">
              <h3 className={`text-slate-900 font-extrabold ${tBase} uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2`}>
                <GraduationCap className="w-5 h-5 shrink-0" style={{ color: tplStyle.secondary }} />
                <span>{lang === 'es' ? 'Formación Académica' : 'Academic Background'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {educacion.map((edu) => (
                  <div 
                    key={edu.id} 
                    className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-2.5 relative group overflow-hidden"
                  >
                    <div 
                      style={{ backgroundColor: tplStyle.secondary }}
                      className="absolute top-0 left-0 w-full h-1 opacity-10 group-hover:opacity-40 transition-opacity"
                    ></div>
                    
                    <div className="flex flex-col gap-1">
                      <span 
                        style={{ color: tplStyle.secondary, backgroundColor: tplStyle.primaryBg, borderColor: `${tplStyle.secondary}22` }}
                        className={`${tSmall} font-bold border px-2 py-0.5 rounded-full self-start shadow-xs`}
                      >
                        {edu.period}
                      </span>
                      <h4 className={`${tBody} font-bold text-slate-900 leading-tight mt-1`}>{edu.degree[lang]}</h4>
                      <p className={`${tSecBody} text-slate-500 font-medium`}>{edu.institution}</p>
                    </div>

                    {edu.achievements && edu.achievements[lang] && edu.achievements[lang].length > 0 && (
                      <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2.5 mt-1.5">
                        {edu.achievements[lang].map((achievement, aIdx) => (
                          <div key={aIdx} className={`${tSmall} text-slate-600 flex items-start gap-1.5`}>
                            <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: tplStyle.secondary }} />
                            <p className="italic leading-snug font-medium text-slate-600">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </EditableSection>

          </div>

        </div>
        {renderInlineEditor()}
      </motion.div>
    );
  }

  /* =========================================================================
     LAYOUT VARIANT 4: 'modern' (CLÍNICO MODERNO - CONTEMPORARY HIGH-VISIBILITY LAYOUT)
     ========================================================================= */
  if (activeLayout === 'modern') {
    return (
      <motion.div
        id="cv-print-area"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          fontFamily: rootFontFamily,
          width: pageWidth,
          minHeight: pageHeight,
          aspectRatio: pageAspect
        }}
        className="mx-auto bg-white shadow-2xl overflow-visible print:shadow-none print:rounded-none p-6 md:p-10 flex flex-col gap-7 text-slate-800 border border-slate-200/60"
      >
        {/* ASYMMETRIC CONTEMPORARY TOP HEADER */}
        <EditableSection 
          section="personal" 
          className="bg-slate-50 border border-slate-150 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 md:text-left text-center">
            {/* Rounded square avatar frame from shared helper */}
            {renderAvatar('w-[110px] h-[110px] md:w-[129px] md:h-[129px] aspect-square', '20px', true)}
            <div className="flex flex-col gap-1">
              <h1 className={`${hName} font-black text-slate-900 tracking-tight leading-tight`}>
                {personalInfo.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                <span 
                  style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                  className={`px-3 py-1 font-bold rounded-lg ${tSmall} inline-block capitalize tracking-wider`}
                >
                  💊 {personalInfo.titles[lang]}
                </span>
                {personalInfo.registroMedico && (
                  <span className={`px-2.5 py-1 bg-slate-150 text-slate-700 font-bold rounded-lg ${tSmall} inline-block tracking-wider`}>
                    {personalInfo.registroMedico}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Badge-style vertical direct values */}
          <div className={`flex flex-col gap-2 shrink-0 md:w-auto w-full ${tContact}`}>
            <div className="flex items-center gap-2 bg-white border border-slate-100 p-2.5 rounded-xl shadow-xs">
              <div 
                style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                className="p-1 rounded-md text-indigo-650"
              >
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-700 truncate">{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-100 p-2.5 rounded-xl shadow-xs">
              <div 
                style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                className="p-1 rounded-md text-indigo-600"
              >
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-705 truncate">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-100 p-2.5 rounded-xl shadow-xs">
              <div 
                style={{ backgroundColor: tplStyle.primaryBg, color: tplStyle.primary }}
                className="p-1 rounded-md text-indigo-600"
              >
                <Mail className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <span style={{ color: tplStyle.primary }} className="font-bold underline truncate break-all">{personalInfo.email}</span>
            </div>
          </div>
        </EditableSection>

        {/* CORE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
          
          {/* PROFILE + EXPERIENCES + EDUCATION */}
          <div className={`md:col-span-8 flex flex-col ${gapSection}`}>
            
            {/* CLINICAL OBJECTIVE / QUOTE DESIGN */}
            <EditableSection section="perfil" 
              style={{ backgroundColor: `${tplStyle.primary}07`, borderColor: tplStyle.primary }}
              className={`${blockPadding} border-l-4 rounded-r-2xl relative`}
            >
              <Quote className="absolute right-3.5 top-3.5 w-8 h-8 opacity-5" style={{ color: tplStyle.primary }} />
              <p className={`${tBody} text-slate-950 leading-relaxed text-justify relative z-10 font-semibold`}>
                <FormattedText text={perfil[lang]} />
              </p>
            </EditableSection>

            {/* EXPERIENCIAS */}
            <EditableSection section="experiencia" className="flex flex-col gap-3">
              <h2 className={`font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-1 text-left ${hSection}`}>
                <Briefcase className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Historial Profesional' : 'Experience Journal'}</span>
              </h2>

              <div className={`flex flex-col ${gapInsideSection}`}>
                {experiencia.map((job) => {
                  const isCurrent = job.period.es.toLowerCase().includes('actual') || 
                                   job.period.en.toLowerCase().includes('present');
                  return (
                    <div 
                      key={job.id} 
                      className={`${blockPaddingEdu} border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/20 rounded-xl transition-all duration-200`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-2">
                        <div>
                          <h3 className={`${tBase} font-bold text-slate-900 leading-tight`}>{job.role[lang]}</h3>
                          <span style={{ color: tplStyle.primary }} className={`${tSecBody} font-bold`}>
                            {job.company} • <span className="text-slate-400 font-normal">{job.location}</span>
                          </span>
                        </div>
                        <span 
                          style={{ 
                            color: isCurrent ? tplStyle.primary : '#475569', 
                            backgroundColor: isCurrent ? tplStyle.primaryBg : '#f1f5f9',
                          }}
                          className={`self-start ${tSecBody} font-bold px-2 py-0.5 rounded-md`}
                        >
                          {job.period[lang]}
                        </span>
                      </div>

                      {job.details[lang] && job.details[lang].length > 0 && (
                        <ul className={`list-disc list-outside pl-3.5 space-y-1 ${tBody} text-slate-650 ${mbItem}`}>
                          {job.details[lang].map((detail, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">
                              <FormattedText text={detail} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {job.achievement && job.achievement[lang] && (
                        <div 
                          style={{ backgroundColor: `${tplStyle.primary}07`, borderColor: tplStyle.primary }}
                          className={`border-l-2 ${blockPadding} ${tBody} flex items-start gap-1.5 mt-2 rounded-r-lg`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: tplStyle.primary }} />
                          <p className="text-slate-650 leading-relaxed font-semibold">
                            <span className="text-slate-900 font-bold">
                              {job.achievementLabel?.[lang] || (lang === 'es' ? 'Meta Lograda' : 'Target Achieved')}:
                            </span>{' '}
                            <FormattedText text={job.achievement[lang]} />
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </EditableSection>

            {/* FORMACION ACADEMICA */}
            <EditableSection section="educacion" className="flex flex-col gap-3">
              <h2 className={`font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-1 text-left ${hSection}`}>
                <GraduationCap className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Formación & Hitos' : 'Education Highs'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {educacion.map((edu) => (
                  <div 
                    key={edu.id} 
                    className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-2 relative group overflow-hidden"
                  >
                    <div 
                      style={{ backgroundColor: tplStyle.primary }}
                      className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                    ></div>
                    
                    <span 
                      style={{ color: tplStyle.primary, backgroundColor: tplStyle.primaryBg }}
                      className={`${tSmall} font-bold px-2.5 py-0.5 rounded-lg inline-block self-start`}
                    >
                      {edu.period}
                    </span>
                    <h4 className={`${tBody} font-black text-slate-900 leading-tight mt-0.5`}>{edu.degree[lang]}</h4>
                    <p className={`${tSecBody} text-slate-600 font-bold`}>{edu.institution}</p>
                    
                    {edu.achievements && edu.achievements[lang] && edu.achievements[lang].length > 0 && (
                      <div className="flex flex-col gap-1.5 border-t border-slate-100/50 pt-2.5 mt-1">
                        {edu.achievements[lang].map((achievement, aIdx) => (
                          <div key={aIdx} className={`text-[10px] text-slate-600 flex items-start gap-1`}>
                            <div style={{ backgroundColor: tplStyle.primary }} className="w-1 h-1 rounded-full mt-1.5 shrink-0 opacity-60"></div>
                            <p className="leading-relaxed font-medium italic">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </EditableSection>
          </div>

          {/* DYNAMIC COMPETENCIES + CERTIFICATIONS + REFERENCES BAR */}
          <div className={`md:col-span-4 flex flex-col ${gapSidebar}`}>
            
            {/* COMPETENCIAS */}
            <EditableSection section="competencias" className={`${blockPaddingEdu} bg-slate-50 border border-slate-100 p-4.5 rounded-2xl flex flex-col gap-3`}>
              <h3 className={`font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5 ${hSection}`}>
                <Star className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Foco de Desempeño' : 'Core Disciplines'}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {competencias[lang]?.map((comp, idx) => (
                  <span
                    key={idx}
                    style={{ backgroundColor: tplStyle.badgeBg, color: tplStyle.badgeText }}
                    className={`px-2.5 py-1.5 rounded-lg ${hBadge} font-bold border border-slate-100 hover:scale-[1.02] transition-transform cursor-default`}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </EditableSection>

            {/* CERTIFICACIONES */}
            <EditableSection section="certificaciones" className={`${blockPaddingEdu} bg-slate-50 border border-slate-100 p-4.5 rounded-2xl flex flex-col gap-3`}>
              <h3 className={`font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5 ${hSection}`}>
                <Award className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Certificaciones' : 'Certifications'}</span>
              </h3>
              <div className={`flex flex-col ${gapList}`}>
                {certificaciones.map((cert) => (
                  <div 
                    key={cert.id} 
                    style={{ borderColor: `${tplStyle.primary}33` }}
                    className={`pl-2 border-l-2 ${tBody}`}
                  >
                    <p className="font-bold text-slate-900 leading-snug">{cert.title[lang]}</p>
                    <span className={`text-slate-500 font-semibold ${tSecBody}`}>{cert.entity} | {cert.year}</span>
                  </div>
                ))}
              </div>
            </EditableSection>

            {/* REFERENCIAS */}
            <EditableSection section="referencias" className={`${blockPaddingEdu} bg-slate-50 border border-slate-100 p-4.5 rounded-2xl flex flex-col gap-3`}>
              <h3 className={`font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5 ${hSection}`}>
                <Award className="w-4 h-4 shrink-0" style={{ color: tplStyle.primary }} />
                <span>{lang === 'es' ? 'Referencias' : 'References'}</span>
              </h3>
              <div className={`flex flex-col gap-5`}>
                {Array.isArray(referencias) && referencias.length > 0 ? (
                  referencias.map((ref) => (
                    <div key={ref.id || Math.random().toString()} className="flex flex-col leading-snug">
                      <p className="font-black text-slate-900 text-[11px] uppercase tracking-tighter">{ref.name}</p>
                      {ref.role && ref.role[lang] && <p className={`text-slate-600 text-[10px] mt-0.5 opacity-80 font-medium`}>{ref.role[lang]}</p>}
                      {ref.phone && <p style={{ color: tplStyle.primary }} className={`font-bold text-[10px] mt-1.5 flex items-center gap-1`}> 
                        <Phone className="w-2.5 h-2.5" /> 
                        <span>{ref.phone}</span>
                      </p>}
                    </div>
                  ))
                ) : (
                  <p className={`opacity-50 italic ${tBody}`}>
                    {lang === 'es' ? 'Sin referencias' : 'No references'}
                  </p>
                )}
              </div>
            </EditableSection>

          </div>

        </div>
        {renderInlineEditor()}
      </motion.div>
    );
  }

  return null;
}
