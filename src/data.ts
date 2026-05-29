/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CVData } from './types';

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    name: "Dr. Jorge Andrés Barrios Durán",
    titles: {
      es: "MÉDICO GENERAL",
      en: "GENERAL PRACTITIONER"
    },
    location: "Laureles, Medellín",
    phone: "+57 300 609 8075",
    email: "jabarrios92@gmail.com",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=350&auto=format&fit=crop"
  },
  perfil: {
    es: "Médico general bilingüe (Inglés C1) egresado de la Universidad de Antioquia con más de 6 años de experiencia clínica. Destaco por mi solidez en el manejo integral de pacientes en servicios de urgencias, hospitalización y atención médica domiciliaria de alta complejidad. Me distingo por mi capacidad analítica para la toma de decisiones críticas bajo presión, mi liderazgo en la atención prehospitalaria y mi enfoque centrado en la humanización del paciente.",
    en: "Bilingual general practitioner (English C1) graduated from the Universidad de Antioquia with over 6 years of clinical experience. I stand out for my solid, comprehensive management of patients in emergency services, hospitalization, and high-complexity home medical care. I distinguish myself by my analytical capacity for critical decision-making under pressure, my leadership in prehospital care, and my patient-centered humanized approach."
  },
  competencias: {
    es: [
      "Paciente Crítico (Urgencias)",
      "Electrocardiografía Avanzada",
      "Inglés Avanzado (C1)",
      "Telemedicina y Triaje Remoto",
      "Atención Domiciliaria",
      "Toma de Decisiones Clínicas"
    ],
    en: [
      "Critical Care (Emergencies)",
      "Advanced Electrocardiography",
      "Advanced English (C1)",
      "Telemedicine & Remote Triage",
      "Home Care Services",
      "Clinical Decision Making"
    ]
  },
  certificaciones: [
    {
      id: "cert1",
      title: {
        es: "BLS & ACLS (Vigentes)",
        en: "BLS & ACLS (Current)"
      },
      entity: "CertiHealth",
      year: "2026"
    },
    {
      id: "cert2",
      title: {
        es: "Víctimas de Violencia Sexual",
        en: "Sexual Violence Victim Care"
      },
      entity: "CertiHealth",
      year: "2026"
    },
    {
      id: "cert3",
      title: {
        es: "PALS (Soporte Pediátrico)",
        en: "PALS (Pediatric Advanced Life Support)"
      },
      entity: "Raphael Group",
      year: "2022"
    },
    {
      id: "cert4",
      title: {
        es: "Electrocardiografía Avanzada",
        en: "Advanced Electrocardiography"
      },
      entity: "Raphael Group",
      year: "2023"
    }
  ],
  referencias: [
    {
      id: "ref1",
      name: "Dr. Mauricio D. Carrascal",
      role: {
        es: "Pediatra - U. de A.",
        en: "Pediatrician - U. de A."
      },
      institution: "H. Alma Mater",
      phone: "316 285 7255"
    }
  ],
  experiencia: [
    {
      id: "exp1",
      role: {
        es: "Médico General y Co-Desarrollador",
        en: "General Practitioner & Co-Developer"
      },
      company: "MDrip",
      location: "Medellín, Antioquia",
      period: {
        es: "Feb 2026 - Actual",
        en: "Feb 2026 - Present"
      },
      details: {
        es: [
          "Brindo atención médica domiciliaria integral y personalizada a pacientes nacionales y extranjeros (gestión clínica en inglés)."
        ],
        en: [
          "Provide comprehensive and personalized home medical care to domestic and foreign patients (clinical management conducted in English)."
        ]
      },
      achievement: {
        es: "Participación activa en el diseño y consolidación estratégica del modelo de atención privada, garantizando altos estándares de calidad y satisfacción.",
        en: "Active participation in the design and strategic consolidation of the private health care model, guaranteeing high standards of quality and patient satisfaction."
      }
    },
    {
      id: "exp2",
      role: {
        es: "Médico Gral. Atención Prehospitalaria",
        en: "General Practitioner - Prehospital Care"
      },
      company: "Grupo EMI",
      location: "Medellín, Antioquia",
      period: {
        es: "May 2022 - Ene 2026",
        en: "May 2022 - Jan 2026"
      },
      details: {
        es: [
          "Lideré la atención de emergencias en ambulancias AVA, realizando valoración inicial, estabilización y remisión de pacientes críticos.",
          "Proporcioné orientación médica telefónica y triaje remoto, optimizando la derivación de pacientes."
        ],
        en: [
          "Led emergency response in Advanced Life Support (AVA) ambulances, carrying out initial assessment, stabilization, and referral of critical patients.",
          "Provided tele-health medical advice and remote triage, optimizing patient screening and referrals."
        ]
      }
    },
    {
      id: "exp3",
      role: {
        es: "Médico General Intrahospitalario",
        en: "In-Hospital General Practitioner"
      },
      company: "E.S.E. Hospital Santamaría",
      location: "Santa Bárbara, Antioquia",
      period: {
        es: "Nov 2020 - Feb 2022",
        en: "Nov 2020 - Feb 2022"
      },
      details: {
        es: [
          "Atención médica integral rotando por urgencias, hospitalización y consulta externa.",
          "Coordinación y ejecución de traslados asistenciales primarios."
        ],
        en: [
          "Comprehensive medical care rotating through emergency departments, inpatient hospitalization, and outpatient consultations.",
          "Coordination and execution of primary medical patient transfers."
        ]
      }
    },
    {
      id: "exp4",
      role: {
        es: "Médico General - 1ra Línea COVID-19",
        en: "General Practitioner - COVID-19 First Line"
      },
      company: "E.S.E. Hospital José María Córdoba",
      location: "Concepción, Antioquia",
      period: {
        es: "Nov 2019 - Oct 2020",
        en: "Nov 2019 - Oct 2020"
      },
      details: {
        es: [],
        en: []
      },
      achievement: {
        es: "Asumí liderazgo institucional coordinando protocolos de atención durante la pandemia, garantizando seguridad de pacientes y personal sanitario.",
        en: "Assumed institutional leadership coordinating care protocols during the pandemic, ensuring safety for patients and medical personnel."
      }
    }
  ],
  educacion: [
    {
      id: "edu1",
      degree: {
        es: "Médico y Cirujano",
        en: "Medicine and Surgery (MD)"
      },
      institution: "Universidad de Antioquia",
      period: "2010 - 2016"
    },
    {
      id: "edu2",
      degree: {
        es: "Certificación de Inglés C1",
        en: "C1 Advanced English Certification"
      },
      institution: "Kaplan International Languages, Australia",
      period: "2017 - 2018"
    }
  ]
};
