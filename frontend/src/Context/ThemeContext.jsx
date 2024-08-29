import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from '../themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    var isDark = false;

    if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        isDark = true;
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('light');
    }

    const [currentTheme, setCurrentTheme] = useState(isDark ? darkTheme : lightTheme);
    const [themeName, setThemeName] = useState(isDark ? 'darkTheme' : 'lightTheme');

    const toggleTheme = () => {
        if (currentTheme === lightTheme) {
            setCurrentTheme(darkTheme);
            setThemeName('darkTheme');
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        else {
            setCurrentTheme(lightTheme);
            setThemeName('lightTheme');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};