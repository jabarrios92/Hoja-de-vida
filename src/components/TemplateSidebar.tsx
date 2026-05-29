/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Filter, Check, Star, Heart, Award, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TEMPLATES_LIST, TemplateConfig } from '../templatesData';

interface TemplateSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: string;
  onSelectTemplate: (id: string) => void;
  lang: Language;
}

export default function TemplateSidebar({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
  lang,
}: TemplateSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Categories list based on template meta
  const categories = useMemo(() => {
    const list = [
      { id: 'todos', es: 'Todos', en: 'All' },
      { id: 'clasico', es: 'Clásicos', en: 'Classics' },
      { id: 'academico', es: 'Académicos', en: 'Academic' },
      { id: 'ejecutivo', es: 'Ejecutivos', en: 'Executive' },
      { id: 'vanguardia', es: 'Vanguardia', en: 'Modern' },
      { id: 'warm', es: 'Cálido & Humano', en: 'Warm & Humane' },
    ];
    return list;
  }, []);

  // Filter and search logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_LIST.filter((template) => {
      const matchSearch =
        template.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.desc[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.accent[lang].toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'todos') return matchSearch;

      if (selectedCategory === 'clasico') {
        return matchSearch && template.category[lang].toLowerCase().includes('clásico');
      }
      if (selectedCategory === 'academico') {
        return matchSearch && template.category[lang].toLowerCase().includes('académico');
      }
      if (selectedCategory === 'ejecutivo') {
        return matchSearch && template.category[lang].toLowerCase().includes('ejecutivo');
      }
      if (selectedCategory === 'vanguardia') {
        return matchSearch && template.category[lang].toLowerCase().includes('vanguardia');
      }
      if (selectedCategory === 'warm') {
        return matchSearch && template.category[lang].toLowerCase().includes('humanista');
      }

      return matchSearch;
    });
  }, [searchQuery, selectedCategory, lang]);

  // Mini CSS renderer of layout preview
  const renderThumbnailLayout = (template: TemplateConfig) => {
    const layout = template.layout;
    
    if (layout === 'jorge') {
      return (
        <div className="w-[74px] h-[98px] bg-slate-50 border border-slate-200 rounded flex overflow-hidden shrink-0 relative shadow-sm group-hover:scale-[1.03] transition-transform duration-200">
          {/* Sidebar */}
          <div 
            style={{ backgroundColor: template.sidebarBg }} 
            className="w-[24px] h-full flex flex-col items-center py-1 gap-1 border-r border-slate-100"
          >
            {/* Tiny Avatar dot */}
            <div className="w-3.5 h-3.5 rounded-full bg-slate-300/40 relative">
              <div style={{ backgroundColor: template.sidebarAccent }} className="absolute -bottom-0.5 right-0 w-1 p-0.5 rounded-full" />
            </div>
            {/* Tiny lines */}
            <div className="w-3.5 h-0.5 rounded" style={{ backgroundColor: `${template.sidebarAccent}aa` }} />
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: template.sidebarText }} />
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: template.sidebarText }} />
            <div className="w-3.5 h-0.5 rounded mt-2" style={{ backgroundColor: `${template.sidebarAccent}aa` }} />
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: template.sidebarText }} />
          </div>
          {/* Content */}
          <div className="flex-1 p-1.5 flex flex-col gap-1">
            {/* Title block */}
            <div className="w-full h-1.5 rounded-sm bg-slate-300" />
            <div className="w-2/3 h-1 rounded-sm" style={{ backgroundColor: template.primary }} />
            {/* Blocks */}
            <div className="w-full h-1 bg-slate-150 rounded mt-1.5" />
            <div className="w-5/6 h-0.5 bg-slate-150 rounded" />
            <div className="w-11/12 h-0.5 bg-slate-150 rounded" />
            {/* Timeline */}
            <div className="flex gap-1 items-start mt-1 pl-1">
              <div className="w-0.5 h-6 rounded" style={{ backgroundColor: template.primary }} />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="w-4/5 h-1 bg-slate-200 rounded" />
                <div className="w-2/3 h-0.5 bg-slate-150 rounded" />
                <div className="w-3/4 h-1 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (layout === 'academia') {
      return (
        <div className="w-[74px] h-[98px] bg-slate-50 border border-slate-200 rounded flex flex-col items-center p-1.5 gap-1 shrink-0 relative shadow-sm group-hover:scale-[1.03] transition-transform duration-200">
          {/* Avatar dot */}
          <div className="w-4 h-4 rounded-full bg-slate-200 border-2" style={{ borderColor: template.primary }} />
          {/* Title and subtitle */}
          <div className="w-4/5 h-1.5 rounded bg-slate-300" />
          <div className="w-1/2 h-0.5 rounded mb-1" style={{ backgroundColor: template.primary }} />
          {/* 1 Column bars */}
          <div className="w-full h-1.5 bg-slate-100 rounded flex items-center px-1 border-l-2" style={{ borderColor: template.primary }}>
            <div className="w-1/2 h-0.5 bg-slate-300 rounded" />
          </div>
          <div className="w-full flex gap-1 mt-0.5">
            {/* Mini column split */}
            <div className="w-3/5 flex flex-col gap-1">
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-4/5 h-0.5 bg-slate-150 rounded" />
              <div className="w-3/4 h-1 bg-slate-200 rounded" />
            </div>
            <div className="w-2/5 flex flex-col gap-1">
              <div className="w-full h-1 rounded" style={{ backgroundColor: template.badgeBg }} />
              <div className="w-4/5 h-1 rounded" style={{ backgroundColor: template.badgeBg }} />
              <div className="w-full h-1 rounded" style={{ backgroundColor: template.badgeBg }} />
            </div>
          </div>
        </div>
      );
    }

    if (layout === 'executive') {
      return (
        <div className="w-[74px] h-[98px] bg-slate-50 border border-slate-200 rounded flex flex-col shrink-0 relative overflow-hidden shadow-sm group-hover:scale-[1.03] transition-transform duration-200">
          {/* Solid Royal top banner */}
          <div 
            className="w-full h-[22px] flex items-center px-1.5 gap-1 border-b" 
            style={{ backgroundColor: template.bannerBg, borderBottomColor: template.secondary }}
          >
            <div className="w-3 h-3 rounded bg-slate-400" />
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-4/5 h-1 bg-white/70 rounded-xs" />
              <div className="w-1/2 h-0.5 rounded-xs" style={{ backgroundColor: template.secondary }} />
            </div>
          </div>
          {/* Layout Body split */}
          <div className="flex-1 p-1 flex gap-1 bg-white">
            <div className="w-1/3 flex flex-col gap-1" style={{ backgroundColor: `${template.primaryBg}70` }}>
              <div className="w-full h-1 rounded bg-slate-300" />
              <div className="w-4/5 h-0.5 bg-slate-200 rounded" />
              <div className="w-5/6 h-0.5 bg-slate-200 rounded" />
              <div className="w-full h-1.5 rounded mt-1" style={{ backgroundColor: template.badgeBg }} />
            </div>
            <div className="w-2/3 flex flex-col gap-1">
              <div className="w-full h-1 bg-slate-300 rounded" />
              <div className="w-5/6 h-0.5 bg-slate-150 rounded" />
              <div className="w-full h-0.5 bg-slate-150 rounded" />
              {/* Timeline */}
              <div className="flex gap-0.5 mt-0.5 items-start">
                <div className="w-0.5 h-4 bg-slate-300" />
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="w-2/3 h-1 bg-slate-200 rounded" />
                  <div className="w-1/2 h-0.5 bg-slate-150 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (layout === 'modern') {
      return (
        <div className="w-[74px] h-[98px] bg-slate-50 border border-slate-200 rounded flex flex-col p-1 gap-1 shrink-0 relative shadow-sm group-hover:scale-[1.03] transition-transform duration-200">
          {/* Round card banner */}
          <div className="w-full h-[20px] rounded bg-white border border-slate-150 p-1 flex items-center justify-between">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-2/3 h-1.5 rounded" style={{ backgroundColor: template.primaryBg }} />
          </div>
          {/* Dynamic grid panels */}
          <div className="grid grid-cols-12 gap-1 flex-1">
            {/* Left box */}
            <div className="col-span-8 flex flex-col gap-1">
              <div className="w-full h-[18px] border rounded bg-white p-0.5 text-[4px]" style={{ borderColor: `${template.primary}22` }}>
                <div className="w-1/2 h-0.5 rounded" style={{ backgroundColor: template.primary }} />
              </div>
              <div className="w-full h-[28px] border rounded bg-white p-0.5 flex flex-col gap-0.5" style={{ borderColor: `${template.primary}33` }}>
                <div className="w-4/5 h-1 bg-slate-200 rounded" />
                <div className="w-full h-0.5 bg-slate-150 rounded" />
                <div className="w-3/4 h-0.5 bg-slate-150 rounded" />
              </div>
            </div>
            {/* Right box badges */}
            <div className="col-span-4 flex flex-col gap-1">
              <div className="w-full h-full border rounded p-0.5 flex flex-col gap-0.5" style={{ borderColor: `${template.primary}22`, backgroundColor: template.primaryBg }}>
                <div className="w-full h-1 rounded" style={{ backgroundColor: template.secondary }} />
                <div className="w-5/6 h-1 rounded bg-white" />
                <div className="w-full h-1 rounded bg-white" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP SHIELD */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100] cursor-pointer print:hidden"
          />

          {/* LATERAL SLIDE-OUT PANEL */}
          <motion.div
            id="template-sidebar-container"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            style={{ contentVisibility: 'auto' }}
            className="fixed top-0 left-0 h-full w-[350px] sm:w-[440px] md:w-[480px] bg-slate-900 shadow-2xl z-[101] flex flex-col print:hidden border-r border-slate-800"
          >
            {/* HEADER AREA */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-1 px-2.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>30 Presets</span>
                </div>
                <h2 className="text-white text-base font-bold tracking-tight">
                  {lang === 'es' ? 'Selector de Plantillas' : 'Resume Template Catalog'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SELECTION SEARCH & SEARCH FILTERS */}
            <div className="p-5 border-b border-slate-800 flex flex-col gap-4 bg-slate-950/70">
              {/* Search text field */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={lang === 'es' ? 'Buscar plantilla por nombre...' : 'Search template, target specialization...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-850 hover:bg-slate-800 focus:bg-slate-800/90 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 text-xs p-0.5 rounded bg-slate-800"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Responsive horizontal category scroller */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-sm'
                          : 'bg-slate-850 text-slate-350 border-slate-850 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {cat[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CATALOG LIST CONTAINER */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin bg-slate-900/60">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">
                {lang === 'es' 
                  ? `Mostrando ${filteredTemplates.length} de 30 Diseños Especializados` 
                  : `Showing ${filteredTemplates.length} of 30 Professional Designs`}
              </p>

              {filteredTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-4 gap-2 bg-slate-850/30 rounded-2xl border border-dashed border-slate-800">
                  <Search className="w-8 h-8 text-slate-700 animate-pulse" />
                  <p className="text-xs text-slate-400 font-semibold">
                    {lang === 'es' ? 'No se encontraron plantillas' : 'No templates match search'}
                  </p>
                  <p className="text-[10.5px] text-slate-500">
                    {lang === 'es' ? 'Intenta buscando otra especialidad o borrando filtros.' : 'Try adjusting category filter.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('todos');
                    }}
                    className="mt-2.5 text-[10.5px] font-bold text-teal-400 hover:underline cursor-pointer"
                  >
                    {lang === 'es' ? 'Restablecer filtros' : 'Reset search filters'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTemplates.map((template, index) => {
                    const isSelected = selectedTemplateId === template.id;
                    return (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.2) }}
                        onClick={() => onSelectTemplate(template.id)}
                        className={`w-full border rounded-xl overflow-hidden shadow-sm relative transition-all duration-200 group flex gap-3 p-3 cursor-pointer bg-slate-850/80 hover:bg-slate-805 ${
                          isSelected
                            ? 'border-teal-400 bg-slate-800/90 shadow-md ring-1 ring-teal-500/20 shadow-teal-500/5'
                            : 'border-slate-800/80 hover:border-slate-700 hover:shadow-md'
                        }`}
                      >
                        {/* Mini live preview layout container */}
                        {renderThumbnailLayout(template)}

                        {/* Descriptive details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
                              <h4 className="font-bold text-xs text-white group-hover:text-teal-405 transition-colors leading-tight">
                                {template.name[lang]}
                              </h4>
                              {isSelected && (
                                <span className="bg-teal-500 text-slate-950 p-0.5 rounded-full inline-block shrink-0">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                            
                            {/* Specialty niche bubble */}
                            <span 
                              className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md inline-block w-fit mt-1 select-none"
                              style={{ height: 'content-fit', backgroundColor: `${template.primary}18`, color: template.primary }}
                            >
                              {template.accent[lang]}
                            </span>

                            {/* Description block */}
                            <p className="text-[10.5px] text-slate-400 line-clamp-2 md:line-clamp-3 leading-relaxed mt-1.5">
                              {template.desc[lang]}
                            </p>
                          </div>

                          {/* Meta Category label */}
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 border-t border-slate-800/60 pt-1.5 mt-2">
                            <span>
                              {lang === 'es' ? 'Categoría' : 'Category'}: {template.category[lang]}
                            </span>
                            <span 
                              style={{ color: template.secondary }}
                              className="capitalize font-mono opacity-80"
                            >
                              {template.layout}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* FOOTER TIPS PANEL */}
            <div className="p-4 bg-slate-950 border-t border-slate-850 text-[10px] text-slate-505 flex flex-col gap-1 tracking-tight leading-normal">
              <span className="font-bold text-slate-300">💡 {lang === 'es' ? 'Consejo del Diseñador:' : 'Designer Tip:'}</span>
              <p className="text-slate-400">
                {lang === 'es' 
                  ? 'Cada diseño adecúa la tipografía y los contrastes recomendados para el área. ¡Puedes probar libremente sin alterar ninguno de tus textos!' 
                  : 'Adjusts typography and color contrast ratios specifically for clinical screening. Rest easy knowing that switching designs is 100% loss-free.'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
