// src/utils/storage.ts

// Local Storage Helper Functions
export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

// Session Storage Helper Functions
export const saveToSessionStorage = (key: string, value: any): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = <T>(key: string): T | null => {
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

// Clear all storage
export const clearStorage = (): void => {
  localStorage.clear();
  sessionStorage.clear();
};
