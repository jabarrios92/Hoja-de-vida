/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CVData, Experiencia, Certificacion, Educacion, Referencia } from '../types';
import { Plus, Trash2, Check, Sparkles, User, FileText, Briefcase, GraduationCap, Award, Users, Palette, Sliders, Layers, Camera } from 'lucide-react';
import { RichInput, RichTextarea } from './RichInput';

interface CVEditorProps {
  data: CVData;
  onChange: (newData: CVData) => void;
  onClose: () => void;
  activeTab?: TabType;
  setActiveTab?: (tab: TabType) => void;
}

export type TabType = 'personal' | 'foto' | 'plantillas' | 'diseno' | 'perfil' | 'competencias' | 'experiencia' | 'certificaciones' | 'educacion' | 'referencias';

export default function CVEditor({ data, onChange, onClose, activeTab: propsActiveTab, setActiveTab: propsSetActiveTab }: CVEditorProps) {
  const [localActiveTab, setLocalActiveTab] = useState<TabType>('personal');
  const activeTab = propsActiveTab || localActiveTab;
  const setActiveTab = (tab: TabType) => {
    if (propsSetActiveTab) {
      propsSetActiveTab(tab);
    } else {
      setLocalActiveTab(tab);
    }
  };
  const [newCompetenciaEs, setNewCompetenciaEs] = useState('');
  const [newCompetenciaEn, setNewCompetenciaEn] = useState('');

  const effect = data.personalInfo.photoEffect || { type: 'none', intensity: 26 };

  // Local helper to update nested object properties dynamically
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const updatePersonalTranslation = (field: 'titles', lang: 'es' | 'en', value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: {
          ...data.personalInfo[field],
          [lang]: value
        }
      }
    });
  };

  const updatePerfil = (lang: 'es' | 'en', value: string) => {
    onChange({
      ...data,
      perfil: {
        ...data.perfil,
        [lang]: value
      }
    });
  };

  const updatePhotoEffect = (field: 'type' | 'intensity' | 'showFrame' | 'frameColor' | 'frameWidth' | 'shape', value: any) => {
    const currentEffect = data.personalInfo.photoEffect || { type: 'none', intensity: 26 };
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        photoEffect: {
          ...currentEffect,
          [field]: value
        }
      }
    });
  };

  // Referencias array editing handlers
  const handleAddReferencia = () => {
    const newRef: Referencia = {
      id: `ref_${Date.now()}`,
      name: 'Nombre de la Referencia',
      role: { es: 'Cargo / Profesión', en: 'Role / Profession' },
      institution: 'Institución / Lugar de Trabajo',
      phone: '300 000 0000'
    };
    onChange({
      ...data,
      referencias: [...(Array.isArray(data.referencias) ? data.referencias : []), newRef]
    });
  };

  const handleUpdateReferencia = (id: string, updates: Partial<Referencia>) => {
    onChange({
      ...data,
      referencias: (Array.isArray(data.referencias) ? data.referencias : []).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const handleRemoveReferencia = (id: string) => {
    onChange({
      ...data,
      referencias: (Array.isArray(data.referencias) ? data.referencias : []).filter((item) => item.id !== id)
    });
  };

  // Add a brand new competency
  const handleAddCompetencia = () => {
    if (newCompetenciaEs.trim() && newCompetenciaEn.trim()) {
      onChange({
        ...data,
        competencias: {
          es: [...data.competencias.es, newCompetenciaEs.trim()],
          en: [...data.competencias.en, newCompetenciaEn.trim()]
        }
      });
      setNewCompetenciaEs('');
      setNewCompetenciaEn('');
    }
  };

  // Remove competency by matching indexes
  const handleRemoveCompetencia = (idx: number) => {
    onChange({
      ...data,
      competencias: {
        es: data.competencias.es.filter((_, i) => i !== idx),
        en: data.competencias.en.filter((_, i) => i !== idx)
      }
    });
  };

  // Add work experience
  const handleAddExperience = () => {
    const newExp: Experiencia = {
      id: `exp_${Date.now()}`,
      role: { es: 'Nuevo Cargo', en: 'New Job Title' },
      company: 'Nombre Empresa / Hospital',
      location: 'Ciudad, País',
      period: { es: 'Fecha - Actual', en: 'Date - Present' },
      details: {
        es: ['Brindé servicios excelentes...'],
        en: ['Provided excellent services...']
      },
      achievement: { es: '', en: '' }
    };
    onChange({
      ...data,
      experiencia: [newExp, ...data.experiencia]
    });
  };

  // Update specific experience field
  const handleUpdateExperience = (id: string, updates: Partial<Experiencia>) => {
    onChange({
      ...data,
      experiencia: data.experiencia.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const handleUpdateExperienceDetail = (id: string, lang: 'es' | 'en', dIdx: number, val: string) => {
    onChange({
      ...data,
      experiencia: data.experiencia.map((item) => {
        if (item.id === id) {
          const arr = [...item.details[lang]];
          arr[dIdx] = val;
          return {
            ...item,
            details: {
              ...item.details,
              [lang]: arr
            }
          };
        }
        return item;
      })
    });
  };

  const handleAddExperienceDetail = (id: string) => {
    onChange({
      ...data,
      experiencia: data.experiencia.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            details: {
              es: [...item.details.es, 'Nueva descripción...'],
              en: [...item.details.en, 'New bullet point details...']
            }
          };
        }
        return item;
      })
    });
  };

  const handleRemoveExperienceDetail = (id: string, dIdx: number) => {
    onChange({
      ...data,
      experiencia: data.experiencia.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            details: {
              es: item.details.es.filter((_, idx) => idx !== dIdx),
              en: item.details.en.filter((_, idx) => idx !== dIdx)
            }
          };
        }
        return item;
      })
    });
  };

  const handleRemoveExperience = (id: string) => {
    onChange({
      ...data,
      experiencia: data.experiencia.filter((item) => item.id !== id)
    });
  };

  // Certifications editing handlers
  const handleAddCertificacion = () => {
    const newCert: Certificacion = {
      id: `cert_${Date.now()}`,
      title: { es: 'Nueva Certificación', en: 'New Certification' },
      entity: 'Entidad / Institución',
      year: new Date().getFullYear().toString()
    };
    onChange({
      ...data,
      certificaciones: [...data.certificaciones, newCert]
    });
  };

  const handleUpdateCertificacion = (id: string, updates: Partial<Certificacion>) => {
    onChange({
      ...data,
      certificaciones: data.certificaciones.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const handleRemoveCertificacion = (id: string) => {
    onChange({
      ...data,
      certificaciones: data.certificaciones.filter((item) => item.id !== id)
    });
  };

  // Education editing handlers
  const handleAddEducacion = () => {
    const newEdu: Educacion = {
      id: `edu_${Date.now()}`,
      degree: { es: 'Nueva Titulación', en: 'New Degree Title' },
      institution: 'Universidad / Instituto',
      period: 'Año - Año',
      achievements: { es: [], en: [] }
    };
    onChange({
      ...data,
      educacion: [...data.educacion, newEdu]
    });
  };

  const handleUpdateEducacion = (id: string, updates: Partial<Educacion>) => {
    onChange({
      ...data,
      educacion: data.educacion.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const handleUpdateEducacionAchievement = (id: string, lang: 'es' | 'en', aIdx: number, val: string) => {
    onChange({
      ...data,
      educacion: data.educacion.map((item) => {
        if (item.id === id) {
          const achievements = item.achievements || { es: [], en: [] };
          const arr = [...(achievements[lang] || [])];
          arr[aIdx] = val;
          return {
            ...item,
            achievements: {
              ...achievements,
              [lang]: arr
            }
          };
        }
        return item;
      })
    });
  };

  const handleAddEducacionAchievement = (id: string) => {
    onChange({
      ...data,
      educacion: data.educacion.map((item) => {
        if (item.id === id) {
          const achievements = item.achievements || { es: [], en: [] };
          return {
            ...item,
            achievements: {
              es: [...(achievements.es || []), 'Describir logro o hito...'],
              en: [...(achievements.en || []), 'Describe achievement or milestone...']
            }
          };
        }
        return item;
      })
    });
  };

  const handleRemoveEducacionAchievement = (id: string, aIdx: number) => {
    onChange({
      ...data,
      educacion: data.educacion.map((item) => {
        if (item.id === id) {
          const achievements = item.achievements || { es: [], en: [] };
          return {
            ...item,
            achievements: {
              es: (achievements.es || []).filter((_, idx) => idx !== aIdx),
              en: (achievements.en || []).filter((_, idx) => idx !== aIdx)
            }
          };
        }
        return item;
      })
    });
  };

  const handleRemoveEducacion = (id: string) => {
    onChange({
      ...data,
      educacion: data.educacion.filter((item) => item.id !== id)
    });
  };

  const tabList = [
    { id: 'personal', label: 'Info Personal', icon: User },
    { id: 'foto', label: 'Efectos de Foto', icon: Camera },
    { id: 'plantillas', label: 'Elegir Plantilla', icon: Layers },
    { id: 'diseno', label: 'Estilo y Ajustes', icon: Palette },
    { id: 'perfil', label: 'Resumen Profesional', icon: FileText },
    { id: 'competencias', label: 'Competencias', icon: Sparkles },
    { id: 'experiencia', label: 'Experiencias', icon: Briefcase },
    { id: 'certificaciones', label: 'Certificaciones', icon: Award },
    { id: 'educacion', label: 'Educación', icon: GraduationCap },
    { id: 'referencias', label: 'Referencias', icon: Users },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-6 shadow-2xl flex flex-col gap-6">
      {/* Editor Header */}
      <div className="flex md:items-center justify-between gap-4 md:flex-row flex-col pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <span>Editor de Currículum</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Los cambios se guardan localmente. Se mostrarán inmediatamente en la Hoja de Vida de arriba.
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors duration-200 self-start md:self-auto shadow-md"
        >
          <Check className="w-4 h-4" />
          <span>Finalizar Edición</span>
        </button>
      </div>

      {/* Editor Tabs Navigation */}
      <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl self-start">
        {tabList.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500/15 to-emerald-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Active Tab Panels */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 min-h-[400px]">
        {/* PERSONAL INFO PANEL */}
        {activeTab === 'personal' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-teal-400 border-b border-slate-850 pb-2 mb-2 uppercase tracking-wide">
              Información de Encabezado y Datos de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre Completo</label>
                <input
                  type="text"
                  value={data.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Ubicación (Ciudad, País)</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Teléfono Celular</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Email de Contacto</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Cargo / Título (Spanish)</label>
                <input
                  type="text"
                  value={data.personalInfo.titles.es}
                  onChange={(e) => updatePersonalTranslation('titles', 'es', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Cargo / Título (English)</label>
                <input
                  type="text"
                  value={data.personalInfo.titles.en}
                  onChange={(e) => updatePersonalTranslation('titles', 'en', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Foto Avatar URL</label>
                <input
                  type="text"
                  value={data.personalInfo.avatarUrl}
                  onChange={(e) => updatePersonalInfo('avatarUrl', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  placeholder="https://imageUrl.com/photo.jpg"
                />
                <span className="text-[10px] text-slate-500 leading-snug">
                  Consejo: Puedes ingresar cualquier enlace directo de cargado de imagen, o hacer clic en la foto de perfil en el visor de arriba para subir tu propia foto directamente.
                </span>
              </div>

            </div>
          </div>
        )}

        {/* PHOTO EFFECTS PANEL */}
        {activeTab === 'foto' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-0.5 border-b border-slate-850 pb-3 mb-2">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide flex items-center gap-2">
                <Camera className="w-4 h-4 text-teal-400" />
                <span>Efectos y Estilo de la Foto de Perfil</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Personaliza la presencia visual de tu fotografía con halos de luz de fondo neón, difuminados y marcos personalizables (Estilo Canva Malibu).
              </p>
            </div>

            {/* Grid of presets */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Filtro de Luz de Fondo (Neon Aura)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { id: 'none', name: 'Ninguno', color: '#475569', label: 'Simple' },
                  { id: 'malibu', name: 'Malibu 🏖️', color: '#ec4899', label: 'Neon Rosa' },
                  { id: 'radioactive', name: 'Radioactive ☢️', color: '#10b981', label: 'Verde Neón' },
                  { id: 'retro', name: 'Retro 🌅', color: '#f97316', label: 'Cálido sunset' },
                  { id: 'midnight', name: 'Midnight 🌌', color: '#3b82f6', label: 'Azul Eléctrico' },
                  { id: 'chroma', name: 'Chroma 🔮', color: '#8b5cf6', label: 'Púrpura UV' }
                ].map((p) => {
                  const isSelected = effect.type === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => updatePhotoEffect('type', p.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-teal-500 scale-[1.03] shadow-md shadow-teal-500/10' 
                          : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900/80 hover:border-slate-800'
                      }`}
                    >
                      {/* Stylized circle imitating visual filter */}
                      <div 
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-white text-[10px] font-bold"
                        style={{
                          borderColor: p.color,
                          boxShadow: isSelected ? `0 0 10px ${p.color}80` : 'none',
                          background: p.id === 'none' ? '#1e293b' : `linear-gradient(135deg, ${p.color}25, #0f172a)`
                        }}
                      >
                        {p.id === 'none' ? '✖' : '✨'}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-200">{p.name}</span>
                      <span className="text-[9px] text-slate-500">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Intensity Slider */}
            <div className="flex flex-col gap-2.5 p-4 rounded-xl border border-slate-905 bg-slate-900/30">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-sans tracking-wide">
                  Intensidad del Aura / Efecto: <span className="text-teal-400 font-mono text-xs ml-0.5">{effect.intensity}%</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updatePhotoEffect('intensity', Math.max(0, effect.intensity - 5))}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs flex items-center justify-center font-bold cursor-pointer transition-colors"
                    title="Disminuir 5%"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePhotoEffect('intensity', Math.min(100, effect.intensity + 5))}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs flex items-center justify-center font-bold cursor-pointer transition-colors"
                    title="Aumentar 5%"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={effect.intensity}
                  onChange={(e) => updatePhotoEffect('intensity', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <span className="text-[10px] font-mono text-slate-500 shrink-0 select-none">100%</span>
              </div>
            </div>

            {/* ADVANCED FRAME & CUSTOMIZATIONS SECTION (CANVA-STYLED) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 bg-slate-900/40 p-4 rounded-xl border border-slate-950">
              
              {/* Left Column: Frame visibility & Photo shape */}
              <div className="flex flex-col gap-4">
                {/* Frame Visibility toggle */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Diseño de Marco (Frame)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updatePhotoEffect('showFrame', true)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        effect.showFrame !== false
                          ? 'bg-teal-500/10 border-teal-500 text-teal-400 shadow-sm shadow-teal-500/5'
                          : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950/80 text-slate-400'
                      }`}
                    >
                      <span>Con Borde / Frame On</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePhotoEffect('showFrame', false)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        effect.showFrame === false
                          ? 'bg-teal-500/10 border-teal-500 text-teal-400 shadow-sm shadow-teal-500/5'
                          : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950/80 text-slate-400'
                      }`}
                      title="Quita el borde físico. Deja solo la foto flotando y el difuminado radiante detrás, aumentando la profundidad estética"
                    >
                      <span>Sin Borde (Solo Difuminado)</span>
                    </button>
                  </div>
                </div>

                {/* Shape Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Forma de la Foto / Photo Shape
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { id: 'circle', name: 'Ovalada' },
                      { id: 'oval', name: 'Huevo/Oval' },
                      { id: 'square', name: 'Cuadrada' },
                      { id: 'rounded-square', name: 'Redond.' },
                      { id: 'rectangular', name: 'Rectang.' }
                    ].map((sh) => {
                      const isSelectedShape = (effect.shape || 'circle') === sh.id;
                      return (
                        <button
                          key={sh.id}
                          type="button"
                          onClick={() => updatePhotoEffect('shape', sh.id)}
                          className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all gap-1 cursor-pointer ${
                            isSelectedShape
                              ? 'bg-slate-950 border-teal-500 text-teal-400 font-bold'
                              : 'bg-slate-950/30 border-slate-850 hover:bg-slate-950/60 text-slate-400'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 bg-slate-600 transition-colors ${
                            sh.id === 'circle' ? 'rounded-full' :
                            sh.id === 'oval' ? 'rounded-[50%/35%] h-4.5' :
                            sh.id === 'square' ? 'rounded-none' :
                            sh.id === 'rounded-square' ? 'rounded-md' :
                            'rounded-[3px] h-4.5'
                          } ${isSelectedShape ? 'bg-teal-400' : 'bg-slate-500'}`} />
                          <span className="text-[8.5px] truncate font-medium mt-0.5">{sh.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Frame customizers (Color + Width) */}
              <div className="flex flex-col gap-4">
                
                {/* Frame Width Control */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                      Grosor del Borde (Frame)
                    </label>
                    <span className={`text-[10px] font-mono ${effect.showFrame !== false ? 'text-teal-400' : 'text-slate-600 line-through'}`}>
                      {(effect.frameWidth !== undefined ? effect.frameWidth : 4)} px
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="12"
                      disabled={effect.showFrame === false}
                      value={effect.frameWidth !== undefined ? effect.frameWidth : 4}
                      onChange={(e) => updatePhotoEffect('frameWidth', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 disabled:opacity-20 disabled:cursor-not-allowed"
                    />
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={effect.showFrame === false}
                        onClick={() => updatePhotoEffect('frameWidth', Math.max(0, (effect.frameWidth !== undefined ? effect.frameWidth : 4) - 1))}
                        className="w-5 h-5 rounded bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-slate-700 text-white text-[10px] flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        disabled={effect.showFrame === false}
                        onClick={() => updatePhotoEffect('frameWidth', Math.min(12, (effect.frameWidth !== undefined ? effect.frameWidth : 4) + 1))}
                        className="w-5 h-5 rounded bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-slate-700 text-white text-[10px] flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Frame Color presets & custom picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Color del Borde / Border Color
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { hex: '#ec4899', name: 'Malibu' },
                      { hex: '#10b981', name: 'Radioactive' },
                      { hex: '#f97316', name: 'Retro' },
                      { hex: '#3b82f6', name: 'Midnight' },
                      { hex: '#8b5cf6', name: 'Chroma' },
                      { hex: '#ffffff', name: 'Blanco' },
                      { hex: '#1e2530', name: 'Sidebar Dark' }
                    ].map((col) => {
                      const currentFrameColor = effect.frameColor || '#ec4899';
                      const isSelectedColor = currentFrameColor.toLowerCase() === col.hex.toLowerCase();
                      return (
                        <button
                          key={col.hex}
                          type="button"
                          disabled={effect.showFrame === false}
                          onClick={() => updatePhotoEffect('frameColor', col.hex)}
                          className={`w-5.5 h-5.5 rounded-full border-2 transition-all cursor-pointer relative disabled:opacity-25 disabled:cursor-not-allowed ${
                            isSelectedColor ? 'border-teal-400 scale-110 shadow-md shadow-teal-500/20' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {isSelectedColor && (
                            <span className="absolute inset-0 flex items-center justify-center text-[8.5px] font-bold text-slate-900 mix-blend-difference">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}

                    {/* Direct custom brush */}
                    <div className="relative flex items-center gap-1.5 ml-1" title="Definir color HEX customizado">
                      <input
                        type="color"
                        disabled={effect.showFrame === false}
                        value={effect.frameColor || '#ec4899'}
                        onChange={(e) => updatePhotoEffect('frameColor', e.target.value)}
                        className="w-5.5 h-5.5 rounded-full cursor-pointer bg-transparent border-0 overflow-hidden appearance-none shrink-0 disabled:opacity-25 disabled:cursor-not-allowed"
                        style={{ padding: 0 }}
                      />
                      <span className="text-[8.5px] text-slate-500 select-none">Manual</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* CHOOSE TEMPLATE PANEL/TAB */}
        {activeTab === 'plantillas' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-0.5 border-b border-slate-850 pb-3 mb-2">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Elegir Estructura y Plantilla Recomendada</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Visualiza tus cambios al instante rotando sobre las 4 plantillas claves recomendadas para el sector salud.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'jorge',
                  name: 'Jorge (Clásico Médico)',
                  desc: 'Estructura icónica de doble columna con sidebar azul slate. Equilibrio perfecto para especialidades clínicas y puestos asistenciales.',
                  accent: 'La preferida del sector salud en Colombia',
                  color: 'bg-teal-500'
                },
                {
                  id: 'academia',
                  name: 'Academia Minimalista',
                  desc: 'Elegante diseño de una sola columna con una jerarquía tipográfica impecable, alta densidad literaria, magnífico para academia, investigación y docencia médica de alto nivel.',
                  accent: 'Ideal para hospitales universitarios y convocatorias',
                  color: 'bg-emerald-600'
                },
                {
                  id: 'executive',
                  name: 'Prestige Ejecutivo',
                  desc: 'Presenta un banner superior transversal azul profundo con detalles en oro, y una estructura balanceada de dos columnas para perfiles que combinan labor asistencial y liderazgo.',
                  accent: 'Excelente para coordinaciones, jefaturas y cargos directivos',
                  color: 'bg-amber-500'
                },
                {
                  id: 'modern',
                  name: 'Clínico Moderno',
                  desc: 'Diseño asimétrico fresco de rejilla bento, con badges de competencias redondeadas, sombreados sutiles e íconos amplios para captar atención en segundos.',
                  accent: 'Perfecto para telemedicina, estética y sector privado premium',
                  color: 'bg-indigo-500'
                }
              ].map((tpl) => {
                const isSelected = (data.templateId || 'jorge') === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => onChange({ ...data, templateId: tpl.id as any })}
                    className={`flex flex-col items-start text-left p-4 rounded-xl border transition-all duration-205 cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 border-teal-500 ring-1 ring-teal-500/20 scale-[1.01]' 
                        : 'bg-slate-900/30 border-slate-850 hover:bg-slate-900/70 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${tpl.color}`}></span>
                        {tpl.name}
                      </span>
                      {isSelected && (
                        <span className="text-[8px] font-black text-slate-150 bg-teal-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Seleccionado
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-2.5">{tpl.desc}</p>
                    <span className={`text-[9.5px] font-bold ${isSelected ? 'text-teal-400' : 'text-slate-500'} flex items-center gap-1 mt-auto bg-slate-950/50 px-2 py-0.5 rounded`}>
                      ★ {tpl.accent}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DESIGN & STYLE CONTROLS PANEL */}
        {activeTab === 'diseno' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-teal-400 border-b border-slate-850 pb-2 mb-2 uppercase tracking-wide flex items-center gap-2">
              <Palette className="w-4 h-4 text-teal-400" />
              <span>Estilo, Distribución y Tipografía de la Hoja de Vida</span>
            </h3>

            {/* DENSITY & SPACING ADJUSTMENTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-400" />
                  <span>Espaciado y Densidad de la Hoja</span>
                </label>
                <p className="text-[10px] text-slate-400 mb-2">
                  Ajusta la separación entre secciones, padding y márgenes. Ideal para condensar mucho contenido en 1 página o expandir si tu CV es más corto.
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'compact', name: 'Compacto', label: 'Alta densidad', desc: 'Minimiza espacios' },
                    { id: 'balanced', name: 'Balanceado', label: 'Predeterminado', desc: 'Espacio armónico' },
                    { id: 'spacious', name: 'Espacioso', label: 'Elegancia aireada', desc: 'Generoso negativo' }
                  ].map((sp) => {
                    const isSel = (data.spacingMode || 'balanced') === sp.id;
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => onChange({ ...data, spacingMode: sp.id as any })}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                          isSel
                            ? 'bg-slate-900 border-teal-500 text-teal-400 font-bold scale-[1.02] shadow-md shadow-teal-500/5'
                            : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900/70 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xs font-bold text-white mb-0.5">{sp.name}</span>
                        <span className="text-[9px] text-teal-400 font-medium">{sp.label}</span>
                        <span className="text-[8.5px] text-slate-500 mt-1">{sp.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FONT SIZE SCALING */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-teal-400 font-black text-xs font-mono">A/A</span>
                  <span>Escala del Tamaño de Letra</span>
                </label>
                <p className="text-[10px] text-slate-400 mb-2">
                  Ajusta de forma inteligente el tamaño de los textos de toda la hoja de vida para adaptarlo a tus necesidades de legibilidad u objetivos de espacio.
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'small', name: 'Pequeño', label: 'Más comprimido', desc: 'Ideal para 1 página' },
                    { id: 'normal', name: 'Normal', label: 'Estándar clínico', desc: 'Legibilidad perfecta' },
                    { id: 'large', name: 'Grande', label: 'Lectura ágil', desc: 'Destaca de inmediato' }
                  ].map((sz) => {
                    const isSel = (data.baseFontSize || 'normal') === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => onChange({ ...data, baseFontSize: sz.id as any })}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                          isSel
                            ? 'bg-slate-900 border-teal-500 text-teal-400 font-bold scale-[1.02] shadow-md shadow-teal-500/5'
                            : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900/70 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xs font-bold text-white mb-0.5">{sz.name}</span>
                        <span className="text-[9px] text-teal-400 font-medium">{sz.label}</span>
                        <span className="text-[8.5px] text-slate-500 mt-1">{sz.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TYPOGRAPHY SELECTOR (Moved from personal tab) */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-900">
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Diseño de Fuente Tipográfica (Personalización Estética)</span>
                </h4>
                <p className="text-[10px] text-slate-400">
                  Cambia la tipografía de toda la hoja de vida para adaptarla a tu estilo (Sans-serif modernos o Serif elegantes para ambiente académico)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'Inter', name: 'Inter', desc: 'Suizo, ultra-limpio y equilibrado', category: 'Sans-Serif', family: '"Inter", sans-serif' },
                  { id: 'Roboto', name: 'Roboto', desc: 'Geométrico, amigable y muy legible', category: 'Sans-Serif', family: '"Roboto", sans-serif' },
                  { id: 'Outfit', name: 'Outfit', desc: 'Geometría circular, premium y tecnológico', category: 'Sans-Serif', family: '"Outfit", sans-serif' },
                  { id: 'Playfair Display', name: 'Playfair Display', desc: 'Académico, de alto impacto y formal', category: 'Serif / Editorial', family: '"Playfair Display", serif' },
                  { id: 'Lora', name: 'Lora', desc: 'Clásico con pinceladas humanas e intelectuales', category: 'Serif / Editorial', family: '"Lora", serif' },
                  { id: 'Merriweather', name: 'Merriweather', desc: 'Robusto, cálido y diseñado para pantallas', category: 'Serif / Editorial', family: '"Merriweather", serif' },
                ].map((f) => {
                  const isSelected = (data.fontFamily || 'Inter') === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onChange({ ...data, fontFamily: f.id })}
                      className={`flex flex-col items-start text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-teal-500 scale-[1.01]' 
                          : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900/80 hover:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span 
                          className="text-sm font-bold text-slate-200"
                          style={{ fontFamily: f.family }}
                        >
                          {f.name}
                        </span>
                        <span className="text-[8px] font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">
                          {f.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400/90 leading-snug">{f.desc}</span>
                      {isSelected && (
                        <span className="mt-2 text-[9px] font-bold text-teal-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                          Activa actualmente
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* RESUMEN/PERFIL PANEL */}
        {activeTab === 'perfil' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-teal-400 border-b border-slate-850 pb-2 mb-2 uppercase tracking-wide">
              Perfil Profesional y Resumen Clínico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 relative">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Perfil Profesional (Spanish)</label>
                <RichTextarea
                  rows={6}
                  value={data.perfil.es}
                  onChange={(e) => updatePerfil('es', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed resize-y"
                />
                <div className="text-[10px] text-slate-500 mt-1 pl-1">
                  💡 Seleccione palabras para darles formato de estilo Microsoft Word.
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Perfil Profesional (English)</label>
                <RichTextarea
                  rows={6}
                  value={data.perfil.en}
                  onChange={(e) => updatePerfil('en', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed resize-y"
                />
                <div className="text-[10px] text-slate-500 mt-1 pl-1">
                  💡 Select words to apply Word-style bold, italic or underline formatting.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS PANEL */}
        {activeTab === 'competencias' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-teal-400 border-b border-slate-850 pb-2 mb-2 uppercase tracking-wide">
              Competencias Académicas o Profesionales
            </h3>
            {/* List of current competencies */}
            <div className="flex flex-col gap-2 bg-slate-900 p-4 rounded-xl border border-slate-800 max-h-60 overflow-y-auto">
              {data.competencias.es.map((compEs, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 p-2 rounded-lg bg-slate-950 border border-slate-850/50">
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="text-white"><strong className="text-teal-400 text-[10px] uppercase">ES:</strong> {compEs}</span>
                    <span className="text-slate-400"><strong className="text-teal-400 text-[10px] uppercase">EN:</strong> {data.competencias.en[idx]}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveCompetencia(idx)}
                    className="p-1 px-1.5 rounded-md hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all duration-150"
                    title="Eliminar Competencia"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {data.competencias.es.length === 0 && (
                <p className="text-center text-xs text-slate-500 p-4">No hay competencias. Genera algunas abajo.</p>
              )}
            </div>

            {/* Input to add next competency (needs both es and en keys) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Nueva competencia (Español)</label>
                <input
                  type="text"
                  value={newCompetenciaEs}
                  onChange={(e) => setNewCompetenciaEs(e.target.value)}
                  placeholder="Ej: Urgencias Médicas"
                  className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Nueva competencia (Inglés)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCompetenciaEn}
                    onChange={(e) => setNewCompetenciaEn(e.target.value)}
                    placeholder="Ej: Medical Emergencies"
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-500 flex-1"
                  />
                  <button
                    onClick={handleAddCompetencia}
                    className="p-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all text-xs flex items-center justify-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WORK EXPERIENCES PANEL */}
        {activeTab === 'experiencia' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Historial de Experiencias Profesionales
              </h3>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/35 border border-teal-500/20 text-teal-300 text-xs font-semibold transition-all duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Puesto</span>
              </button>
            </div>

            <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
              {data.experiencia.map((job) => (
                <div key={job.id} className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 relative flex flex-col gap-4 mb-1">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveExperience(job.id)}
                    className="absolute top-4 right-4 p-1 rounded-md hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-transform"
                    title="Eliminar Experiencia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company and Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Institución / Empresa</label>
                      <input
                        type="text"
                        value={job.company}
                        onChange={(e) => handleUpdateExperience(job.id, { company: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Ubicación (Región, País)</label>
                      <input
                        type="text"
                        value={job.location}
                        onChange={(e) => handleUpdateExperience(job.id, { location: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>

                    {/* Left Language Roles and Dates */}
                    <div className="border border-slate-800 p-3 rounded-lg flex flex-col gap-3">
                      <h4 className="text-[10px] font-bold text-teal-400 uppercase tracking-widest pb-1 border-b border-slate-850">
                        Campos en Español
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Cargo</label>
                        <input
                          type="text"
                          value={job.role.es}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              role: { ...job.role, es: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Periodo</label>
                        <input
                          type="text"
                          value={job.period.es}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              period: { ...job.period, es: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Etiqueta del Logro (ES)</label>
                        <RichInput
                          type="text"
                          value={job.achievementLabel?.es || ''}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              achievementLabel: { ...(job.achievementLabel || { es: '', en: '' }), es: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                          placeholder="Ej: Logro, Logro como Fundador, Meta"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Logro Principal</label>
                        <RichInput
                          type="text"
                          value={job.achievement?.es || ''}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              achievement: { ...(job.achievement || { es: '', en: '' }), es: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                          placeholder="Logro de la posición"
                        />
                      </div>
                    </div>

                    {/* Right Language Roles and Dates */}
                    <div className="border border-slate-800 p-3 rounded-lg flex flex-col gap-3">
                      <h4 className="text-[10px] font-bold text-teal-400 uppercase tracking-widest pb-1 border-b border-slate-850">
                        Fields in English
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Role / Job Title</label>
                        <input
                          type="text"
                          value={job.role.en}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              role: { ...job.role, en: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Period / Timeline</label>
                        <input
                          type="text"
                          value={job.period.en}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              period: { ...job.period, en: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Achievement Label (EN)</label>
                        <RichInput
                          type="text"
                          value={job.achievementLabel?.en || ''}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              achievementLabel: { ...(job.achievementLabel || { es: '', en: '' }), en: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                          placeholder="e.g. Achievement, Breakthrough, Milestone"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Key Achievement</label>
                        <RichInput
                          type="text"
                          value={job.achievement?.en || ''}
                          onChange={(e) =>
                            handleUpdateExperience(job.id, {
                              achievement: { ...(job.achievement || { es: '', en: '' }), en: e.target.value }
                            })
                          }
                          className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-200"
                          placeholder="Achievement for position"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bulletin Description items */}
                  <div className="flex flex-col gap-2 mt-2 bg-slate-950/70 p-3 rounded-lg border border-slate-850">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                      <span className="text-[10px] font-bold text-slate-300 uppercase">Tareas / Responsabilidades</span>
                      <button
                        onClick={() => handleAddExperienceDetail(job.id)}
                        className="flex items-center gap-1 text-[9px] font-bold text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Añadir Detalle / Bullet Point</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {job.details.es.map((_, detailIdx) => (
                        <div key={detailIdx} className="flex gap-2 items-start bg-slate-900 border border-slate-850 rounded p-2 relative">
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] font-bold text-teal-500 uppercase">Español {detailIdx + 1}</label>
                              <RichInput
                                type="text"
                                value={job.details.es[detailIdx] || ''}
                                onChange={(e) => handleUpdateExperienceDetail(job.id, 'es', detailIdx, e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-350"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] font-bold text-teal-500 uppercase">English {detailIdx + 1}</label>
                              <RichInput
                                type="text"
                                value={job.details.en[detailIdx] || ''}
                                onChange={(e) => handleUpdateExperienceDetail(job.id, 'en', detailIdx, e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-350"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveExperienceDetail(job.id, detailIdx)}
                            className="p-1 rounded text-slate-500 hover:text-red-400 self-center"
                            title="Eliminar este bullet point"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {job.details.es.length === 0 && (
                        <p className="text-center text-[10px] text-slate-500 italic">No hay viñetas/detalles. Presiona Añadir arriba.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {data.experiencia.length === 0 && (
                <p className="text-center text-xs text-slate-500 py-10">No hay puestos de trabajo agregados.</p>
              )}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certificaciones' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Lista de Certificaciones e Licencias
              </h3>
              <button
                onClick={handleAddCertificacion}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/35 border border-teal-500/20 text-teal-300 text-xs font-semibold transition-all duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Certificación</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
              {data.certificaciones.map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 relative flex flex-col gap-3">
                  <button
                    onClick={() => handleRemoveCertificacion(cert.id)}
                    className="absolute top-4 right-4 p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-md transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Título Certificación (Español)</label>
                      <input
                        type="text"
                        value={cert.title.es}
                        onChange={(e) =>
                          handleUpdateCertificacion(cert.id, {
                            title: { ...cert.title, es: e.target.value }
                          })
                        }
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Certification Title (English)</label>
                      <input
                        type="text"
                        value={cert.title.en}
                        onChange={(e) =>
                          handleUpdateCertificacion(cert.id, {
                            title: { ...cert.title, en: e.target.value }
                          })
                        }
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Organización / Entidad</label>
                      <input
                        type="text"
                        value={cert.entity}
                        onChange={(e) => handleUpdateCertificacion(cert.id, { entity: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Año de Expedición</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => handleUpdateCertificacion(cert.id, { year: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {data.certificaciones.length === 0 && (
                <p className="text-center text-xs text-slate-500 py-10">No hay certificaciones registradas.</p>
              )}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'educacion' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Formación e Historial Académico
              </h3>
              <button
                onClick={handleAddEducacion}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/35 border border-teal-500/20 text-teal-300 text-xs font-semibold transition-all duration-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Educación</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
              {data.educacion.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 relative flex flex-col gap-3">
                  <button
                    onClick={() => handleRemoveEducacion(edu.id)}
                    className="absolute top-4 right-4 p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-md transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Título Grado (Español)</label>
                      <input
                        type="text"
                        value={edu.degree.es}
                        onChange={(e) =>
                          handleUpdateEducacion(edu.id, {
                            degree: { ...edu.degree, es: e.target.value }
                          })
                        }
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Degree Title (English)</label>
                      <input
                        type="text"
                        value={edu.degree.en}
                        onChange={(e) =>
                          handleUpdateEducacion(edu.id, {
                            degree: { ...edu.degree, en: e.target.value }
                          })
                        }
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Institución / Universidad</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducacion(edu.id, { institution: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Fecha / Lapso de Tiempo</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => handleUpdateEducacion(edu.id, { period: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        placeholder="Ej: 2010 - 2016"
                      />
                    </div>
                  </div>

                  {/* Achievements List */}
                  <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-slate-800/60">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans col-span-2">
                        Logros, Actividades o Detalles Académicos (Opcional)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddEducacionAchievement(edu.id)}
                        className="flex items-center gap-1 text-[10px] text-teal-400 font-bold hover:text-teal-300 transition-colors bg-teal-500/10 hover:bg-teal-500/20 px-2.5 py-1.5 rounded-lg cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Agregar Logro</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {((edu.achievements && edu.achievements.es) || []).map((_, aIdx) => (
                        <div key={aIdx} className="flex flex-col gap-2 p-2.5 rounded-xl bg-slate-950/40 border border-slate-850 relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveEducacionAchievement(edu.id, aIdx)}
                            className="absolute top-2 right-2 p-1 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded-md transition-all cursor-pointer"
                            title="Eliminar Logro"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pr-6">
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-semibold text-slate-400 uppercase">Logro (Español)</span>
                              <input
                                type="text"
                                value={edu.achievements?.es?.[aIdx] || ''}
                                onChange={(e) => handleUpdateEducacionAchievement(edu.id, 'es', aIdx, e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                                placeholder="P.ej. Distinguido con mérito académico."
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-semibold text-slate-400 uppercase">Achievement (English)</span>
                              <input
                                type="text"
                                value={edu.achievements?.en?.[aIdx] || ''}
                                onChange={(e) => handleUpdateEducacionAchievement(edu.id, 'en', aIdx, e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                                placeholder="E.g. Graduated with honors."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!edu.achievements || !edu.achievements.es || edu.achievements.es.length === 0) && (
                        <p className="text-[11px] text-slate-500 italic">No hay logros registrados para esta formación académica.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {data.educacion.length === 0 && (
                <p className="text-center text-xs text-slate-500 py-10">No hay formación académica registrada.</p>
              )}
            </div>
          </div>
        )}

        {/* REFERENCIAS TAB */}
        {activeTab === 'referencias' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
                Lista de Referencias Personales y Profesionales
              </h3>
              <button
                type="button"
                onClick={handleAddReferencia}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/35 border border-teal-500/20 text-teal-300 text-xs font-semibold transition-all duration-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Referencia</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
              {Array.isArray(data.referencias) && data.referencias.map((ref) => (
                <div key={ref.id} className="p-4 rounded-xl border border-slate-850 bg-slate-900/40 relative flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handleRemoveReferencia(ref.id)}
                    className="absolute top-4 right-4 p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-md transition-all cursor-pointer"
                    title="Eliminar referencia"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Nombre Completo</label>
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) => handleUpdateReferencia(ref.id, { name: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        placeholder="Ej: Dr. Mauricio D. Carrascal"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Cargo / Especialidad (Español)</label>
                      <input
                        type="text"
                        value={ref.role?.es || ''}
                        onChange={(e) =>
                          handleUpdateReferencia(ref.id, {
                            role: { ...(ref.role || { es: '', en: '' }), es: e.target.value }
                          })
                        }
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        placeholder="Ej: Pediatra - U. de A."
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Role / Specialty (Inglés)</label>
                      <input
                        type="text"
                        value={ref.role?.en || ''}
                        onChange={(e) =>
                          handleUpdateReferencia(ref.id, {
                            role: { ...(ref.role || { es: '', en: '' }), en: e.target.value }
                          })
                        }
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        placeholder="Ej: Pediatrician - U. de A."
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Institución / Hospital / Empresa</label>
                      <input
                        type="text"
                        value={ref.institution || ''}
                        onChange={(e) => handleUpdateReferencia(ref.id, { institution: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        placeholder="Ej: H. Alma Mater"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Contacto / Celular / Teléfono</label>
                      <input
                        type="text"
                        value={ref.phone || ''}
                        onChange={(e) => handleUpdateReferencia(ref.id, { phone: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        placeholder="Ej: 316 285 7255"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!Array.isArray(data.referencias) || data.referencias.length === 0) && (
                <p className="text-center text-xs text-slate-500 py-10">No hay referencias registradas.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
