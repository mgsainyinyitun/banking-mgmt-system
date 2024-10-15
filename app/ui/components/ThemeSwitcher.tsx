"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    console.log('theme is:', theme);
    if (theme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, [])

  const onThemeChange = (e: boolean) => {
    setIsDarkMode(e);
    if (e) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <Switch
      color="secondary"
      aria-label="Automatic updates"
      isSelected={isDarkMode} onValueChange={e => onThemeChange(e)}
    />
  )
};