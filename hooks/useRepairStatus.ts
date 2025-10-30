"use client";

import { useEffect, useMemo, useState } from "react";

export type RepairStatusKey = "recibido" | "revision" | "reparacion" | "reparado";

export const REPAIR_STATUSES: { key: RepairStatusKey; label: string }[] = [
  { key: "recibido", label: "Recibido" },
  { key: "revision", label: "En revisión" },
  { key: "reparacion", label: "En reparación" },
  { key: "reparado", label: "Reparado" }
];

const STORAGE_KEY = "upgrade-repair-status";

export function useRepairStatus() {
  const [status, setStatus] = useState<RepairStatusKey>("recibido");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as RepairStatusKey | null;
    if (saved && REPAIR_STATUSES.some(s => s.key === saved)) setStatus(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, status);
  }, [status]);

  const currentIndex = useMemo(() => REPAIR_STATUSES.findIndex(s => s.key === status), [status]);

  return { status, setStatus, statuses: REPAIR_STATUSES, currentIndex };
}


