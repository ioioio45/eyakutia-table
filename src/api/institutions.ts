import type {
  Institution,
  ContactInfo,
  InstitutionDetails,
} from "../types/institution";

const PROXY_URL = "https://eyakutia-table.vercel.app/api/proxy";
const MUNICIPALITY_ID = "ac1d422d-747c-42d9-997b-a4530166797c";

export async function fetchInstitutions(): Promise<Institution[]> {
  try {
    const response = await fetch(PROXY_URL, {
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Fetch institutions error:", error);
    return [];
  }
}

export async function fetchInstitutionDetails(
  id: string,
): Promise<InstitutionDetails | null> {
  try {
    const response = await fetch(PROXY_URL, {
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Fetch institution details error:", error);
    return null;
  }
}

export function getContactInfo(inst: Institution): ContactInfo {
  const contact = inst.ContactInfo || {};
  return {
    phone: contact.Phones || "",
    email: contact.Email || "",
    site: contact.SiteUrl || "",
    address: contact.Address || inst.Address || "",
  };
}