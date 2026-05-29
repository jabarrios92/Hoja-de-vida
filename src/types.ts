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
  achievementLabel?: TranslationMap;
}

export interface Educacion {
  id: string;
  degree: TranslationMap;
  institution: string;
  period: string;
  achievements?: TranslationMap<string[]>;
}

export interface PhotoEffect {
  type: 'none' | 'malibu' | 'radioactive' | 'retro' | 'midnight' | 'chroma';
  intensity: number;
  showFrame?: boolean;
  frameColor?: string;
  frameWidth?: number; // thickness in pixels (0 to 12)
  shape?: 'circle' | 'oval' | 'square' | 'rounded-square' | 'rectangular';
}

export interface CVData {
  fontFamily?: string;
  templateId?: string;
  spacingMode?: 'compact' | 'balanced' | 'spacious';
  baseFontSize?: 'small' | 'normal' | 'large';
  personalInfo: {
    name: string;
    titles: TranslationMap;
    location: string;
    phone: string;
    email: string;
    avatarUrl: string;
    photoEffect?: PhotoEffect;
  };
  perfil: TranslationMap;
  competencias: TranslationMap<string[]>;
  certificaciones: Certificacion[];
  referencias: Referencia[];
  experiencia: Experiencia[];
  educacion: Educacion[];
}

export type Language = 'es' | 'en';
