"use client";

import { useEffect, useState } from "react";

import { HomeLoadingScreen } from "./home-loading-state";
import { HomePage } from "./home-page";

const HOME_LOADING_DURATION_MS = 700;

export function HomeDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, HOME_LOADING_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <HomeLoadingScreen />;
  }

  return <HomePage />;
}
