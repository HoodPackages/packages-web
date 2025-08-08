import React, { useState, useMemo, useEffect } from "react";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";
import { FaPalette, FaSpinner } from "react-icons/fa";

// URL для завантаження даних про кольори Pantone.
// Цей файл може бути розміщений на вашому сервері або будь-якому іншому сховищі.
const PANTONE_COLORS_URL = "https://raw.githubusercontent.com/sergiiss/pantone-colors-json/main/pantone-colors.json";

export default function PantonePage() {
  const [pantoneColors, setPantoneColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(PANTONE_COLORS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPantoneColors(data);
        // За замовчуванням розгортаємо всі групи
        const initialExpandedState = data.reduce((acc, color) => {
          if (!acc[color.group]) {
            acc[color.group] = true;
          }
          return acc;
        }, {});
        setExpandedGroups(initialExpandedState);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const groupedColors = useMemo(() => {
    const lower = search.toLowerCase();
    const filtered = pantoneColors.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.pantone.toLowerCase().includes(lower) ||
      c.hex.toLowerCase().includes(lower)
    );

    return filtered.reduce((acc, color) => {
      if (!acc[color.group]) acc[color.group] = [];
      acc[color.group].push(color);
      return acc;
    }, {});
  }, [search, pantoneColors]);

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  const groupsSorted = Object.keys(groupedColors).sort();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
          <FaPalette size={36} />
          Кольори Pantone
        </h1>

        <div className="mb-8 max-w-md mx-auto">
          <input
            type="search"
            placeholder="Пошук за назвою, кодом або hex..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Пошук кольорів Pantone"
          />
        </div>

        <div aria-live="polite" aria-busy={loading}>
          {loading && (
            <div className="flex justify-center items-center gap-2 text-gray-500 text-lg">
              <FaSpinner className="animate-spin" size={24} />
              <span>Завантаження кольорів...</span>
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 text-lg">
              Помилка завантаження даних: {error}
            </p>
          )}
        </div>

        {!loading && !error && groupsSorted.length === 0 && (
          <p className="text-center text-gray-500 text-lg">Колір не знайдено.</p>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            {groupsSorted.map((group) => {
              const colors = groupedColors[group];
              const isExpanded = !!expandedGroups[group];

              return (
                <section key={group} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <button
                    onClick={() => toggleGroup(group)}
                    className="flex justify-between items-center w-full font-bold text-xl text-indigo-700 hover:text-indigo-900 transition"
                    aria-expanded={isExpanded}
                    aria-controls={`${group}-colors`}
                  >
                    <span>{group} ({colors.length})</span>
                    <span className="text-2xl select-none transform transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-45deg)' }}>{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div
                      id={`${group}-colors`}
                      className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                      {colors.map((color) => (
                        <div
                          key={color.pantone}
                          className="rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div
                            className="h-40"
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Колір ${color.name}, код Pantone ${color.pantone}`}
                          ></div>

                          <div className="p-4 bg-white flex flex-col items-center">
                            <h2 className="font-bold text-lg text-gray-900 truncate w-full text-center" title={color.name}>
                              {color.name}
                            </h2>
                            <p className="text-sm text-gray-500">{color.pantone}</p>

                            <button
                              onClick={() => handleCopy(color.hex)}
                              className="mt-3 flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 text-sm font-semibold select-none p-2 rounded-md transition-colors"
                              aria-label={`Скопіювати hex-код ${color.hex}`}
                              type="button"
                            >
                              {copied === color.hex ? (
                                <>
                                  <HiCheck size={18} aria-hidden="true" /> <span>Скопійовано!</span>
                                </>
                              ) : (
                                <>
                                  <HiClipboardCopy size={18} aria-hidden="true" /> <span>{color.hex}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}