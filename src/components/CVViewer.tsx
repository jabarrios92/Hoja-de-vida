/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Award, Briefcase, GraduationCap, Heart, CheckCircle2, Calendar } from 'lucide-react';
import { CVData, Language } from '../types';

interface CVViewerProps {
  data: CVData;
  lang: Language;
  onAvatarChange?: (newUrl: string) => void;
  forcePrintLayout?: boolean;
}

export default function CVViewer({ data, lang, onAvatarChange, forcePrintLayout }: CVViewerProps) {
  const { personalInfo, perfil, competencias, certificaciones, referencias, experiencia, educacion } = data;

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
        staggerChildren: 0.1
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

  return (
    <motion.div
      id="cv-print-area"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none min-h-[1414px] aspect-[1/1.414] ${
        forcePrintLayout 
          ? 'grid grid-cols-12 !rounded-none shadow-xl border border-slate-200' 
          : 'grid grid-cols-1 md:grid-cols-12'
      }`}
    >
      {/* LEFT COLUMN: Sidebar (Slate blue tint) */}
      <div 
        id="cv-sidebar" 
        className={`bg-[#1e2530] text-slate-100 p-8 flex flex-col gap-9 print:col-span-4 ${
          forcePrintLayout ? 'col-span-4' : 'md:col-span-4'
        }`}
      >
        {/* Avatar Area with hidden upload trigger */}
        <div className="relative group flex flex-col items-center">
          <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-700 hover:border-teal-500 transition-colors duration-300 shadow-lg bg-slate-800">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {onAvatarChange && (
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-white font-medium cursor-pointer transition-opacity duration-200">
                <span className="text-center px-2">Cambiar Foto / Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {/* Soft hint beneath photo */}
          {onAvatarChange && (
            <span className="text-[10px] text-slate-400 mt-2 hover:text-teal-400 transition-colors cursor-pointer md:block hidden print:hidden">
              (Click foto para cambiar)
            </span>
          )}
        </div>

        {/* CONTACT INFO */}
        <div id="contact-info-section" className="flex flex-col gap-4">
          <h3 className="text-teal-400 font-bold tracking-wider text-sm border-b border-slate-700/80 pb-2 uppercase">
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{personalInfo.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <a href={`tel:${personalInfo.phone}`} className="hover:text-teal-400 transition-colors">
                {personalInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" aria-label="Mail icon" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-teal-400 transition-colors break-all">
                {personalInfo.email}
              </a>
            </li>
          </ul>
        </div>

        {/* COMPETENCIAS / SKILLS */}
        <div id="skills-section" className="flex flex-col gap-4">
          <h3 className="text-teal-400 font-bold tracking-wider text-sm border-b border-slate-700/80 pb-2 uppercase">
            {lang === 'es' ? 'Competencias' : 'Skills & Focus'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {competencias[lang]?.map((comp, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              >
                {comp}
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICACIONES */}
        <div id="certifications-section" className="flex flex-col gap-4">
          <h3 className="text-teal-400 font-bold tracking-wider text-sm border-b border-slate-700/80 pb-2 uppercase">
            {lang === 'es' ? 'Certificaciones' : 'Certifications'}
          </h3>
          <div className="flex flex-col gap-3">
            {certificaciones.map((cert) => (
              <div key={cert.id} className="flex flex-col text-xs leading-relaxed border-l-2 border-teal-500/30 pl-3 py-0.5">
                <span className="font-semibold text-slate-200">{cert.title[lang]}</span>
                <span className="text-slate-400 text-[11px]">
                  {cert.entity} <span className="opacity-50">|</span> {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* REFERENCIAS */}
        <div id="references-section" className="flex flex-col gap-4 pt-6 border-t border-slate-700/80">
          <h3 className="text-teal-400 font-bold tracking-wider text-sm uppercase">
            {lang === 'es' ? 'Referencias' : 'References'}
          </h3>
          <div className="flex flex-col gap-4">
            {Array.isArray(referencias) && referencias.length > 0 ? (
              referencias.map((ref) => (
                <div key={ref.id || Math.random().toString()} className="flex flex-col text-xs leading-relaxed">
                  <span className="font-bold text-white text-[13px] tracking-wide">{ref.name}</span>
                  {ref.role && ref.role[lang] && (
                    <span className="text-slate-300 font-medium mt-0.5">{ref.role[lang]}</span>
                  )}
                  {(ref.institution || ref.phone) && (
                    <span className="text-slate-400 font-normal mt-0.5 flex flex-wrap items-center">
                      {ref.institution && <span>{ref.institution}</span>}
                      {ref.institution && ref.phone && <span className="mx-1.5 text-slate-600 font-light">|</span>}
                      {ref.phone && <span>{ref.phone}</span>}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">
                {lang === 'es' ? 'Sin referencias' : 'No references'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Professional Summary + Experience + Education */}
      <div 
        id="cv-main-body" 
        className={`p-9 md:p-11 flex flex-col gap-10 md:gap-11 text-slate-800 bg-white print:col-span-8 ${
          forcePrintLayout ? 'col-span-8' : 'md:col-span-8'
        }`}
      >
        {/* HEADER AREA */}
        <div id="header-area" className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {personalInfo.name}
          </h1>
          <h2 className="text-teal-600 font-bold text-lg tracking-wider uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full inline-block"></span>
            {personalInfo.titles[lang]}
          </h2>
        </div>

        {/* PROFESSIONAL PROFILE */}
        <section id="profile-section" className="flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-slate-900 font-bold text-lg">
            <div className="p-1 rounded-lg bg-teal-50 text-teal-600">
              <Heart className="w-5 h-5" />
            </div>
            <h2>{lang === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed text-justify">
            {perfil[lang]}
          </p>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience-section" className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-slate-900 font-bold text-lg">
            <div className="p-1 rounded-lg bg-teal-50 text-teal-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2>{lang === 'es' ? 'Experiencia Profesional' : 'Work Experience'}</h2>
          </div>

          <div className="relative border-l-2 border-slate-100 ml-3.5 pl-6 flex flex-col gap-8">
            {experiencia.map((job) => {
              const isCurrent = job.period.es.toLowerCase().includes('actual') || 
                               job.period.en.toLowerCase().includes('present');
              return (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center shadow-sm transition-colors duration-200 ${
                    isCurrent ? 'border-teal-500' : 'border-slate-300'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                      isCurrent ? 'bg-teal-500' : 'bg-slate-300'
                    }`}></span>
                  </span>

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {job.role[lang]}
                      </h3>
                      <p className="text-xs font-semibold text-teal-600">
                        {job.company} <span className="text-slate-400 font-normal">| {job.location}</span>
                      </p>
                    </div>
                    {/* Date Pill */}
                    <span className={`self-start text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-colors duration-200 ${
                      isCurrent 
                        ? 'text-teal-700 bg-teal-50 border-teal-100' 
                        : 'text-slate-500 bg-slate-100 border-slate-200'
                    }`}>
                      {job.period[lang]}
                    </span>
                  </div>

                  {job.details[lang] && job.details[lang].length > 0 && (
                    <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-600 mb-2">
                      {job.details[lang].map((detail, dIdx) => (
                        <li key={dIdx} className="leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.achievement && job.achievement[lang] && (
                    <div className="bg-slate-50 border-l-2 border-teal-500 p-2 text-xs text-slate-600 rounded-r-md mt-1.5 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-slate-900 font-bold">
                          {lang === 'es' ? 'Logro' : 'Achievement'}:
                        </strong>{' '}
                        {job.achievement[lang]}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education-section" className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-slate-900 font-bold text-lg">
            <div className="p-1 rounded-lg bg-teal-50 text-teal-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2>{lang === 'es' ? 'Formación Académica' : 'Academic Education'}</h2>
          </div>

          <div className="flex flex-col gap-4">
            {educacion.map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/45 hover:bg-slate-50/80 transition-colors duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {edu.degree[lang]}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {edu.institution}
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
