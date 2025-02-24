import React, { useState } from "react";

const ThemePage = () => {
  const [activeTheme, setActiveTheme] = useState("light");

  const themes = [
    { id: "light", name: "Light", bg: "bg-white", text: "text-gray-900" },
    { id: "dark", name: "Dark", bg: "bg-gray-900", text: "text-white" },
    { id: "blue", name: "Blue", bg: "bg-blue-500", text: "text-white" },
    { id: "green", name: "Green", bg: "bg-green-500", text: "text-white" },
    { id: "purple", name: "Purple", bg: "bg-purple-500", text: "text-white" },
    { id: "orange", name: "Orange", bg: "bg-orange-500", text: "text-white" },
    { id: "pink", name: "Pink", bg: "bg-pink-500", text: "text-white" },
  ];

  const applyTheme = (themeId) => {
    setActiveTheme(themeId);
    // You can add logic here to apply the theme globally (e.g., using CSS variables or a state management library)
    console.log(`Applied theme: ${themeId}`);
  };

  return (
    <div className={`min-h-screen p-6 ${themes.find(t => t.id === activeTheme)?.bg} ${themes.find(t => t.id === activeTheme)?.text}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Themes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`p-6 rounded-lg shadow-lg ${theme.bg} ${theme.text}`}
            >
              <h2 className="text-xl font-semibold mb-4">{theme.name} Theme</h2>
              <p className="mb-4">
                This is a preview of the {theme.name.toLowerCase()} theme.
              </p>
              <button
                onClick={() => applyTheme(theme.id)}
                className={`px-4 py-2 rounded ${
                  activeTheme === theme.id
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {activeTheme === theme.id ? "Applied" : "Apply Theme"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePage;