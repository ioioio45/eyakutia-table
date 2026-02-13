// src/types/institution.ts
export interface Institution {
  Id: string;
  ShortName?: string;
  FullName?: string;
  Address?: string;
  Inn?: string;
  Kpp?: string;
  Ogrn?: string;
  Coordinates?: {
    Latitude: number | null;
    Longitude: number | null;
  };
  ContactInfo?: {
    Phones?: string;
    Email?: string;
    SiteUrl?: string;
    Address?: string;
  };
}

export interface AgeRange {
  LowerAgeLimitMonths: number;
  LowerAgeLimitYears: number;
  UpperAgeLimitMonths: number;
  UpperAgeLimitYears: number;
}

export interface PreschoolGroup {
  Id: string;
  Name: string;
  Regime: number;
  Orientation: number;
  HealthCategory: string;
  AgeRange: AgeRange;
  EducYear: number;
  CapacityMax: number;
  Vacancies: number;
  EducProgramId: string;
  EducProgramName: string;
}

export interface EducProgram {
  Id: string;
  Name: string;
}

export interface InstitutionDetails extends Institution {
  EducPrograms: EducProgram[];
  PreschoolGroups: PreschoolGroup[];
  SchoolGroups: any[];
  OrganizationalStatus: number;
  AdditionalInfo: string | null;
  Assotiations: any[];
  ProfGroups: any[];
  PuttingIntoServiceDate: string;
  DirectorName?: string;
  District: any | null;
  TopInstitution: any | null;
  OrganizationPropertyType: number;
  WorkingHours?: string;
  OrganizationalStructure: number;
  OrganizationType: number;
  ProgramTypeByOrganizationType: number;
  SummaryPosition: any | null;
  PlanFreeSeats: any | null;
  FreeSeats: any | null;
  ParentId: any | null;
  SgoId: any | null;
  EducProgramsImplemented: number;
  Number: any | null;
}

export interface ContactInfo {
  phone: string;
  email: string;
  site: string;
  address: string;
}

export const RegimeMap: Record<number, string> = {
  1: "Полный день (10,5-12 часов)",
  2: "Кратковременного пребывания (3-4 часа)",
  3: "Сокращенного дня (8-10 часов)",
  4: "Продленного дня (12-14 часов)",
  5: "Круглосуточного пребывания",
};

export const OrientationMap: Record<number, string> = {
  0: "Общеразвивающая",
  1: "Компенсирующая",
  2: "Оздоровительная",
  3: "Комбинированная",
};

export const OrganizationStatusMap: Record<number, string> = {
  0: "Неизвестно",
  1: "Функционирует",
  2: "Ликвидирована",
  3: "Реорганизована",
};

export const OrganizationTypeMap: Record<number, string> = {
  1: "Дошкольное образование",
  2: "Общее образование",
  3: "Профессиональное образование",
  4: "Дополнительное образование",
};
