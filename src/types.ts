/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationMap<T = string> {
  es: T;
  en: T;
}

export interface Certificacion {
  id: string;
  title: TranslationMap;
  entity: string;
  year: string;
}

export interface Referencia {
  id: string;
  name: string;
  role: TranslationMap;
  institution: string;
  phone: string;
}

export interface Experiencia {
  id: string;
  role: TranslationMap;
  company: string;
  location: string;
  period: TranslationMap;
  details: TranslationMap<string[]>;
  achievement?: TranslationMap;
}

export interface Educacion {
  id: string;
  degree: TranslationMap;
  institution: string;
  period: string;
}

export interface CVData {
  personalInfo: {
    name: string;
    titles: TranslationMap;
    location: string;
    phone: string;
    email: string;
    avatarUrl: string;
  };
  perfil: TranslationMap;
  competencias: TranslationMap<string[]>;
  certificaciones: Certificacion[];
  referencias: Referencia[];
  experiencia: Experiencia[];
  educacion: Educacion[];
}

export type Language = 'es' | 'en';
