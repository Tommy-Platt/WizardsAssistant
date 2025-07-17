import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FEATURES } from '../constants/features';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Is feature enabled or disabled?
type FeatureState = Record<string, boolean>;

type FeatureContextType = {
  enabledFeatures: FeatureState;
  toggleFeature: (id: string) => void;
};

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

// Wraps around the app to provide feature toggling functionality from the settings menu
export const FeatureProvider = ({ children }: { children: ReactNode }) => {
  const [enabledFeatures, setEnabledFeatures] = useState<FeatureState>(
    FEATURES.reduce((acc, f) => ({ ...acc, [f.id]: true }), {})
  );

  // Features loaded and saved asyncronously to AsyncStorage
  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem('enabledFeatures');
      if (json) setEnabledFeatures(JSON.parse(json));
    })();
  }, []);

// Toggle a feature on or off
  const toggleFeature = (id: string) => {
    setEnabledFeatures((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      AsyncStorage.setItem('enabledFeatures', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FeatureContext.Provider value={{ enabledFeatures, toggleFeature }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatures = () => {
  const ctx = useContext(FeatureContext);
  if (!ctx) throw new Error('useFeatures must be used within FeatureProvider');
  return ctx;
};