export const saveSettings = (settings) => localStorage.setItem('settings', JSON.stringify(settings));
export const currentSettings = () => JSON.parse(localStorage.getItem('settings') || '{}');