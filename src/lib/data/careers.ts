import type { SEOMeta } from "./types";

export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: "full-time";
  description: string;
}

export const jobListings: JobListing[] = [
  {
    id: "pse-senior",
    title: "Process Safety Engineer (Senior)",
    location: "Columbus, OH or Houston, TX",
    type: "full-time",
    description:
      "Senior-level process safety engineer to lead PHA studies, SIS evaluations, and risk assessments for clients in the chemical process industry. Requires significant experience with HAZOP, LOPA, and IEC 61511.",
  },
  {
    id: "pse-staff",
    title: "Process Safety Engineer (Staff)",
    location: "Columbus, OH",
    type: "full-time",
    description:
      "Staff-level process safety engineer to participate in and support PHA facilitation, risk analysis, and safety system evaluations for a variety of industrial clients.",
  },
  {
    id: "see",
    title: "Senior Electrical Engineer",
    location: "Location TBD",
    type: "full-time",
    description:
      "Senior electrical engineer to support safety instrumented system design, SIL verification, and functional safety assessment projects.",
  },
];

export const companyValues: string[] = [
  "Safety and Quality",
  "Integrity and Trust",
  "Customer Focus and Innovation",
  "Teamwork and Accountability",
];

export const benefits: string[] = [
  "Competitive salary",
  "Health, wellness, and income protection",
  "Retirement with company match",
  "Paid time off",
  "Educational reimbursement",
  "Flexible work arrangements",
];

export const applicationEmail = "employment@kenexis.com";

export const careersSEO: SEOMeta = {
  title: "Careers at Kenexis - Process Safety Jobs",
  description:
    "Join the Kenexis team. Open positions in process safety engineering, electrical engineering, and more. Competitive benefits and flexible work.",
};
