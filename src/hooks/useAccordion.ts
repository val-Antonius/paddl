// File: src/hooks/useAccordion.ts
'use client';

import { useState, useCallback } from 'react';

export function useAccordion(initialOpenId?: string) {
  const [openId, setOpenId] = useState<string | null>(initialOpenId || null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const isOpen = useCallback((id: string) => openId === id, [openId]);

  return {
    openId,
    toggle,
    isOpen
  };
}