// File: src/hooks/usePricingTab.ts
'use client';

import { useState, useCallback } from 'react';
import { PricingCategory } from '@/types';

export function usePricingTab(initialTab: PricingCategory = 'hourly') {
  const [activeTab, setActiveTab] = useState<PricingCategory>(initialTab);

  const changeTab = useCallback((tab: PricingCategory) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    changeTab,
    isActive: (tab: PricingCategory) => activeTab === tab
  };
}
