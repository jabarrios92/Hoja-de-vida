/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CVData, Experiencia, Certificacion, Educacion, Referencia } from '../types';
import { Plus, Trash2, Check, Sparkles, User, FileText, Briefcase, GraduationCap, Award, Users } from 'lucide-react';

interface CVEditorProps {
  data: CVData;
  onChange: (newData: CVData) => void;
  onClose: () => void;
}

type TabType = 'personal' | 'perfil' | 'competencias' | 'experiencia' | 'certificaciones' | 'educacion' | 'referencias';

export default function CVEditor({ data, onChange, onClose }: CVEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [newCompetenciaEs, setNewCompetenciaEs] = useState('');
  const [newCompetenciaEn, setNewCompetenciaEn] = useState('');

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
      period: 'Año - Año'
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

  const handleRemoveEducacion = (id: string) => {
    onChange({
      ...data,
      educacion: data.educacion.filter((item) => item.id !== id)
    });
  };

  const tabList = [
    { id: 'personal', label: 'Info Personal', icon: User },
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

        {/* RESUMEN/PERFIL PANEL */}
        {activeTab === 'perfil' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-teal-400 border-b border-slate-850 pb-2 mb-2 uppercase tracking-wide">
              Perfil Profesional y Resumen Clínico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Perfil Profesional (Spanish)</label>
                <textarea
                  rows={6}
                  value={data.perfil.es}
                  onChange={(e) => updatePerfil('es', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed resize-y"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Perfil Profesional (English)</label>
                <textarea
                  rows={6}
                  value={data.perfil.en}
                  onChange={(e) => updatePerfil('en', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed resize-y"
                />
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
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Logro Principal</label>
                        <input
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
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Key Achievement</label>
                        <input
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
                              <input
                                type="text"
                                value={job.details.es[detailIdx] || ''}
                                onChange={(e) => handleUpdateExperienceDetail(job.id, 'es', detailIdx, e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-350"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] font-bold text-teal-500 uppercase">English {detailIdx + 1}</label>
                              <input
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
