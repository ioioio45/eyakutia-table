// src/hooks/useInstitutionDetails.ts
import { useState, useEffect } from "react";
import { fetchInstitutionDetails } from "../api/institutions";
import type { InstitutionDetails } from "../types/institution";

export function useInstitutionDetails(id: string | undefined) {
  const [details, setDetails] = useState<InstitutionDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setDetails(null);
      return;
    }

    async function loadDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInstitutionDetails(id || "");
        setDetails(data);
      } catch (err) {
        setError("Ошибка загрузки данных");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  return { details, loading, error };
}
