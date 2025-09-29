import React, { useState, useMemo } from "react";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";
import { FaPalette } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const pantoneColors = [
  { name: "Classic Blue", pantone: "19-4052", hex: "#0F4C81", group: "blue" },
  { name: "Cerulean", pantone: "15-4020", hex: "#9BB7D4", group: "blue" },
  { name: "Dusk Blue", pantone: "19-3940", hex: "#1F456E", group: "blue" },
  { name: "Niagara", pantone: "17-4123", hex: "#4C6E91", group: "blue" },
  { name: "Sailor Blue", pantone: "19-4035", hex: "#1D3C6A", group: "blue" },
  { name: "Blue Bell", pantone: "15-3817", hex: "#A3A6C1", group: "blue" },

  { name: "Living Coral", pantone: "16-1546", hex: "#FF6F61", group: "red_orange" },
  { name: "Marsala", pantone: "18-1438", hex: "#955251", group: "red_orange" },
  { name: "Tangerine Tango", pantone: "17-1463", hex: "#DD4124", group: "red_orange" },
  { name: "Fiesta", pantone: "17-1564", hex: "#CE352C", group: "red_orange" },
  { name: "Fuchsia Red", pantone: "18-2436", hex: "#B6316C", group: "red_orange" },
  { name: "Flame Scarlet", pantone: "17-1462", hex: "#E03C31", group: "red_orange" },

  { name: "Ultra Violet", pantone: "18-3838", hex: "#5F4B8B", group: "violet" },
  { name: "Radiant Orchid", pantone: "18-3224", hex: "#B565A7", group: "violet" },
  { name: "Lavender Herb", pantone: "16-3905", hex: "#A397B4", group: "violet" },
  { name: "Purple Rose", pantone: "17-3020", hex: "#B584A4", group: "violet" },

  { name: "Mimosa", pantone: "14-0848", hex: "#F0C05A", group: "yellow" },
  { name: "Buttercup", pantone: "12-0752", hex: "#F2CB05", group: "yellow" },
  { name: "Aspen Gold", pantone: "14-0852", hex: "#FFB712", group: "yellow" },
  { name: "Candlelight", pantone: "13-0822", hex: "#F1E6A6", group: "yellow" },
  { name: "Golden Rod", pantone: "16-0940", hex: "#F3B562", group: "yellow" },

  { name: "Greenery", pantone: "15-0343", hex: "#88B04B", group: "green" },
  { name: "Green Flash", pantone: "15-0146", hex: "#96B24B", group: "green" },
  { name: "Lime Punch", pantone: "13-0550", hex: "#D9E650", group: "green" },
  { name: "Jade Lime", pantone: "15-0543", hex: "#C0D725", group: "green" },

  { name: "Hazelnut", pantone: "14-1318", hex: "#BC9B6A", group: "brown" },
  { name: "Copper Tan", pantone: "16-1342", hex: "#B66E41", group: "brown" },
  { name: "Toffee", pantone: "18-1140", hex: "#A9746E", group: "brown" },

  { name: "Pink Yarrow", pantone: "17-2034", hex: "#CE3175", group: "pink" },
  { name: "Pink Lavender", pantone: "15-2215", hex: "#D8A2C0", group: "pink" },
  { name: "Pink Peacock", pantone: "18-2130", hex: "#B14E68", group: "pink" },

  { name: "Sharkskin", pantone: "17-3914", hex: "#6E6F72", group: "gray" },
  { name: "Cloud Gray", pantone: "14-4102", hex: "#B7C2CE", group: "gray" },
  { name: "Storm Gray", pantone: "18-4005", hex: "#54585A", group: "gray" },

  { name: "Snow White", pantone: "11-0602", hex: "#F9F6F0", group: "white" },
  { name: "Black Beauty", pantone: "19-4007", hex: "#1C1C1C", group: "black" },

  { name: "Turquoise", pantone: "15-5519", hex: "#45B5AA", group: "turquoise" },
  { name: "Aquamarine", pantone: "14-4810", hex: "#7FFFD4", group: "turquoise" },
  { name: "Blue Atoll", pantone: "16-5123", hex: "#4ECDC4", group: "turquoise" },

  { name: "Peach Echo", pantone: "16-1548", hex: "#F88379", group: "red_orange" },
  { name: "Dove Gray", pantone: "14-4102", hex: "#D6D6D1", group: "gray" },
  { name: "Rose Quartz", pantone: "13-1520", hex: "#F7CAC9", group: "pink" },
  { name: "Serenity", pantone: "15-3919", hex: "#92A8D1", group: "blue" },
  { name: "Sand", pantone: "14-1116", hex: "#DECDBE", group: "brown" },
  { name: "Spice Route", pantone: "19-1337", hex: "#8B5E3C", group: "brown" },
  { name: "Peacock Blue", pantone: "19-4534", hex: "#006A70", group: "blue" },
  { name: "Coral Rose", pantone: "16-1526", hex: "#FF6F61", group: "red_orange" },
  { name: "Sunset Orange", pantone: "17-1463", hex: "#FD5E53", group: "red_orange" },
  { name: "Placid Blue", pantone: "14-4318", hex: "#A7C6ED", group: "blue" },
  { name: "Chocolate Brown", pantone: "19-1014", hex: "#381819", group: "brown" },
  { name: "Dusty Cedar", pantone: "18-1630", hex: "#AD5D5D", group: "red_orange" },
  { name: "Peach Bud", pantone: "14-1228", hex: "#F8DBCA", group: "yellow" },
  { name: "Golden Glow", pantone: "14-1050", hex: "#FCC200", group: "yellow" }
];

export default function PantonePage() {
  const { t } = useTranslation();
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
          {t("pantone.title")}
        </h1>

        <div className="mb-8 max-w-md mx-auto">
          <input
            type="search"
            placeholder={t("pantone.searchPlaceholder")}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t("pantone.searchAria")}
          />
        </div>

        {groupsSorted.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {t("pantone.notFound")}
          </p>
        ) : (
          <div className="space-y-8">
            {groupsSorted.map((group) => {
              const colors = groupedColors[group];
              const isExpanded = expandedGroups[group];

              return (
                <section
                  key={group}
                  className="bg-white rounded-lg shadow p-4 border border-gray-300"
                >
                  <button
                    onClick={() => toggleGroup(group)}
                    className="flex justify-between items-center w-full font-semibold text-lg text-indigo-700 hover:text-indigo-900 transition"
                    aria-expanded={isExpanded}
                    aria-controls={`${group}-colors`}
                  >
                    <span>
                      {t(`pantone.groups.${group}`)} ({colors.length})
                    </span>
                    <span className="text-xl select-none">
                      {isExpanded ? "−" : "+"}
                    </span>
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
                            aria-label={t("pantone.colorAria", {
                              name: color.name,
                              pantone: color.pantone,
                            })}
                          ></div>

                          <div className="p-4 bg-white flex flex-col items-center">
                            <h2
                              className="font-bold text-lg text-gray-900 truncate w-full text-center"
                              title={color.name}
                            >
                              {color.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {color.pantone}
                            </p>

                            <button
                              onClick={() => handleCopy(color.hex)}
                              className="mt-3 flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm font-semibold select-none"
                              aria-label={t("pantone.copyAria", {
                                hex: color.hex,
                              })}
                              type="button"
                            >
                              {copied === color.hex ? (
                                <>
                                  <HiCheck size={18} aria-hidden="true" />{" "}
                                  <span>{t("pantone.copied")}</span>
                                </>
                              ) : (
                                <>
                                  <HiClipboardCopy size={18} aria-hidden="true" />{" "}
                                  <span>{color.hex}</span>
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
