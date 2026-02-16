// src/hooks/useInstitutions.ts
import { useState, useEffect, useCallback } from "react";
import type { Institution } from "../types/institution";
import { fetchInstitutions, getContactInfo } from "../api/institutions";

export function useInstitutions() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filtered, setFiltered] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await fetchInstitutions();
    setInstitutions(data);
    setFiltered(data);
    setLoading(false);
  }

  const filterInstitutions = useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (!query.trim()) {
        setFiltered(institutions);
        return;
      }

      const q = query.toLowerCase().trim();
      const filtered = institutions.filter((inst) => {
        const name = (inst.ShortName || inst.FullName || "").toLowerCase();
        const address = (inst.ContactInfo?.Address || "").toLowerCase();

        return (
          name.includes(q) ||
          address.includes(q)
        );
      });
      setFiltered(filtered);
    },
    [institutions],
  );

  const getInstitutionById = useCallback(
    (id: string): Institution | undefined => {
      return institutions.find((i) => i.Id === id);
    },
    [institutions],
  );

  return {
    institutions,
    filtered,
    loading,
    searchQuery,
    filterInstitutions,
    getInstitutionById,
  };
}
