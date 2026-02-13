import type {
  Institution,
  ContactInfo,
  InstitutionDetails,
} from "../types/institution";

const API_URL =
  "/api/Modules/INSTITUTIONSEARCHMODULE/Api/GetInstitutions";
const INSTITUTION_URL =
  "/api/Modules/INSTITUTIONSEARCHMODULE/Api/GetInstitution";
const MUNICIPALITY_ID = "ac1d422d-747c-42d9-997b-a4530166797c";

export async function fetchInstitutions(): Promise<Institution[]> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        MunicipalityId: MUNICIPALITY_ID,
        Type: 1,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchInstitutionDetails(
  id: string,
): Promise<InstitutionDetails | null> {
  try {
    const response = await fetch(INSTITUTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        MunicipalityId: MUNICIPALITY_ID,
        InstitutionId: id,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getContactInfo(inst: Institution): ContactInfo {
  const contact = inst.ContactInfo || {};
  return {
    phone: contact.Phones || "",
    email: contact.Email || "",
    site: contact.SiteUrl || "",
    address: contact.Address || "",
  };
}
