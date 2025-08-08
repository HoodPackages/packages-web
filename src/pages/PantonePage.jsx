import React, { useState, useMemo } from "react";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";
import { FaPalette  } from "react-icons/fa";

const pantoneColors = [
  { name: "Classic Blue", pantone: "19-4052", hex: "#0F4C81", group: "Синій" },
  { name: "Cerulean", pantone: "15-4020", hex: "#9BB7D4", group: "Синій" },
  { name: "Dusk Blue", pantone: "19-3940", hex: "#1F456E", group: "Синій" },
  { name: "Niagara", pantone: "17-4123", hex: "#4C6E91", group: "Синій" },
  { name: "Sailor Blue", pantone: "19-4035", hex: "#1D3C6A", group: "Синій" },
  { name: "Blue Bell", pantone: "15-3817", hex: "#A3A6C1", group: "Синій" },

  { name: "Living Coral", pantone: "16-1546", hex: "#FF6F61", group: "Червоний/Помаранчевий" },
  { name: "Marsala", pantone: "18-1438", hex: "#955251", group: "Червоний/Помаранчевий" },
  { name: "Tangerine Tango", pantone: "17-1463", hex: "#DD4124", group: "Червоний/Помаранчевий" },
  { name: "Fiesta", pantone: "17-1564", hex: "#CE352C", group: "Червоний/Помаранчевий" },
  { name: "Fuchsia Red", pantone: "18-2436", hex: "#B6316C", group: "Червоний/Помаранчевий" },
  { name: "Flame Scarlet", pantone: "17-1462", hex: "#E03C31", group: "Червоний/Помаранчевий" },

  { name: "Ultra Violet", pantone: "18-3838", hex: "#5F4B8B", group: "Фіолетовий" },
  { name: "Radiant Orchid", pantone: "18-3224", hex: "#B565A7", group: "Фіолетовий" },
  { name: "Lavender Herb", pantone: "16-3905", hex: "#A397B4", group: "Фіолетовий" },
  { name: "Purple Rose", pantone: "17-3020", hex: "#B584A4", group: "Фіолетовий" },

  { name: "Mimosa", pantone: "14-0848", hex: "#F0C05A", group: "Жовтий" },
  { name: "Buttercup", pantone: "12-0752", hex: "#F2CB05", group: "Жовтий" },
  { name: "Aspen Gold", pantone: "14-0852", hex: "#FFB712", group: "Жовтий" },
  { name: "Candlelight", pantone: "13-0822", hex: "#F1E6A6", group: "Жовтий" },
  { name: "Golden Rod", pantone: "16-0940", hex: "#F3B562", group: "Жовтий" },

  { name: "Greenery", pantone: "15-0343", hex: "#88B04B", group: "Зелений" },
  { name: "Green Flash", pantone: "15-0146", hex: "#96B24B", group: "Зелений" },
  { name: "Lime Punch", pantone: "13-0550", hex: "#D9E650", group: "Зелений" },
  { name: "Jade Lime", pantone: "15-0543", hex: "#C0D725", group: "Зелений" },

  { name: "Hazelnut", pantone: "14-1318", hex: "#BC9B6A", group: "Коричневий" },
  { name: "Copper Tan", pantone: "16-1342", hex: "#B66E41", group: "Коричневий" },
  { name: "Toffee", pantone: "18-1140", hex: "#A9746E", group: "Коричневий" },

  { name: "Pink Yarrow", pantone: "17-2034", hex: "#CE3175", group: "Рожевий" },
  { name: "Pink Lavender", pantone: "15-2215", hex: "#D8A2C0", group: "Рожевий" },
  { name: "Pink Peacock", pantone: "18-2130", hex: "#B14E68", group: "Рожевий" },

  { name: "Sharkskin", pantone: "17-3914", hex: "#6E6F72", group: "Сірий" },
  { name: "Cloud Gray", pantone: "14-4102", hex: "#B7C2CE", group: "Сірий" },
  { name: "Storm Gray", pantone: "18-4005", hex: "#54585A", group: "Сірий" },

  { name: "Snow White", pantone: "11-0602", hex: "#F9F6F0", group: "Білий" },
  { name: "Black Beauty", pantone: "19-4007", hex: "#1C1C1C", group: "Чорний" },

  { name: "Turquoise", pantone: "15-5519", hex: "#45B5AA", group: "Бірюзовий" },
  { name: "Aquamarine", pantone: "14-4810", hex: "#7FFFD4", group: "Бірюзовий" },
  { name: "Blue Atoll", pantone: "16-5123", hex: "#4ECDC4", group: "Бірюзовий" },

  { name: "Peach Echo", pantone: "16-1548", hex: "#F88379", group: "Червоний/Помаранчевий" },
  { name: "Dove Gray", pantone: "14-4102", hex: "#D6D6D1", group: "Сірий" },
  { name: "Rose Quartz", pantone: "13-1520", hex: "#F7CAC9", group: "Рожевий" },
  { name: "Serenity", pantone: "15-3919", hex: "#92A8D1", group: "Синій" },
  { name: "Sand", pantone: "14-1116", hex: "#DECDBE", group: "Коричневий" },
  { name: "Spice Route", pantone: "19-1337", hex: "#8B5E3C", group: "Коричневий" },
  { name: "Peacock Blue", pantone: "19-4534", hex: "#006A70", group: "Синій" },
  { name: "Coral Rose", pantone: "16-1526", hex: "#FF6F61", group: "Червоний/Помаранчевий" },
  { name: "Sunset Orange", pantone: "17-1463", hex: "#FD5E53", group: "Червоний/Помаранчевий" },
  { name: "Placid Blue", pantone: "14-4318", hex: "#A7C6ED", group: "Синій" },
  { name: "Chocolate Brown", pantone: "19-1014", hex: "#381819", group: "Коричневий" },
  { name: "Dusty Cedar", pantone: "18-1630", hex: "#AD5D5D", group: "Червоний/Помаранчевий" },
  { name: "Peach Bud", pantone: "14-1228", hex: "#F8DBCA", group: "Жовтий" },
  { name: "Golden Glow", pantone: "14-1050", hex: "#FCC200", group: "Жовтий" },
];

export default function PantonePage() {
  const [copied, setCopied] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});

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
  }, [search]);

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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
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

        {groupsSorted.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Колір не знайдено.</p>
        ) : (
          <div className="space-y-8">
            {groupsSorted.map((group) => {
              const colors = groupedColors[group];
              const isExpanded = expandedGroups[group];

              return (
                <section key={group} className="bg-white rounded-lg shadow p-4 border border-gray-300">
                  <button
                    onClick={() => toggleGroup(group)}
                    className="flex justify-between items-center w-full font-semibold text-lg text-indigo-700 hover:text-indigo-900 transition"
                    aria-expanded={isExpanded}
                    aria-controls={`${group}-colors`}
                  >
                    <span>{group} ({colors.length})</span>
                    <span className="text-xl select-none">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div
                      id={`${group}-colors`}
                      className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                      {colors.map((color) => (
                        <div
                          key={color.pantone}
                          className="rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow"
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
                              className="mt-3 flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm font-semibold select-none"
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
