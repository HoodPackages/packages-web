'use client'
import ProductCard from './ProductCard';
import { useState, useMemo } from "react";
import { FaSpinner } from "react-icons/fa";
import { usePackages } from "../data/usePackages";
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const sortOptions = [
    { name: 'За замовчуванням', current: true },
    { name: 'Найновіші', current: false },
    { name: 'Від дешевших до дорожчих', current: false },
    { name: 'Від дорожчих до дешевших', current: false },
]

const generateFiltersFromPackages = (packages) => {
    const categories = new Set();

    const sizes = new Set();
    const colors = new Set();
    const density = new Set();
    const bottom = new Set();
    const handle = new Set();
    const weight = new Set();

    packages.forEach((pkg) => {
        if (pkg.category) categories.add(pkg.category);

        if (pkg.size) sizes.add(pkg.size);
        if (pkg.color) colors.add(pkg.color);
        if (pkg.density) density.add(pkg.density);
        if (pkg.bottom) bottom.add(pkg.bottom);
        if (pkg.handle) handle.add(pkg.handle);
        if (pkg.weight) weight.add(pkg.weight);
    });

    return [
        {
            id: 'size',
            name: 'Розмір',
            options: Array.from(sizes).map((size) => ({
                value: size,
                label: size,
                checked: false,
            })),
        },
        {
            id: 'color',
            name: 'Колір',
            options: Array.from(colors).map((color) => ({
                value: color,
                label: color,
                checked: false,
            })),
        },
        {
            id: 'density',
            name: 'Щільність',
            options: Array.from(density).map((density) => ({
                value: density,
                label: density,
                checked: false,
            })),
        },
        {
            id: 'bottom',
            name: 'Донна складка',
            options: [
                { value: 'true', label: 'Так', checked: false },
                { value: 'false', label: 'Ні', checked: false },
                { value: 'any', label: 'Неважливо', checked: false }
            ],
        },
        {
            id: 'handle',
            name: 'Посилена ручка',
            options: [
                { value: 'true', label: 'Так', checked: false },
                { value: 'false', label: 'Ні', checked: false },
                { value: 'any', label: 'Неважливо', checked: false }
            ],
        },
        {
            id: 'weight',
            name: 'Витримає вагу',
            options: Array.from(weight).map((weight) => ({
                value: weight,
                label: weight,
                checked: false,
            })),
        }
    ];
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const colorMap = {
    'Білий': '#FFFFFF',
    'Жовтий': '#FFFF00',
    'Червоний': '#FF0000',
    'Синій': '#0000FF',
    'Зелений': '#00FF00',
    'Чорний': '#000000',
    'Рожевий': '#FFC0CB',
    'Срібний': '#C0C0C0',
    'Прозорий': 'transparent'
};
function darkenColor(hex, amount = 20) {
    let color = hex.replace('#', '');

    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }

    const num = parseInt(color, 16);
    let r = Math.max(0, (num >> 16) - amount);
    let g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
    let b = Math.max(0, (num & 0x0000FF) - amount);

    return `rgb(${r}, ${g}, ${b})`;
}

export default function CategoryFilter() {
    const navigate = useNavigate();

    const { packages, loading } = usePackages();
    const { categoryName, subCategoryName } = useParams();

    const [currentSort, setCurrentSort] = useState(sortOptions[0].name);

    const sortPackages = (packagesList) => {
        switch (currentSort) {
            case 'Найновіші':
                return [...packagesList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'Від дешевших до дорожчих':
                return [...packagesList].sort((a, b) => {
                    const aMinPrice = Math.min(...a.price.map(p => p.price));
                    const bMinPrice = Math.min(...b.price.map(p => p.price));
                    return aMinPrice - bMinPrice;
                });

            case 'Від дорожчих до дешевших':
                return [...packagesList].sort((a, b) => {
                    const aMaxPrice = Math.max(...a.price.map(p => p.price));
                    const bMaxPrice = Math.max(...b.price.map(p => p.price));
                    return bMaxPrice - aMaxPrice;
                });
            case 'За замовчуванням':
            default:
                return packagesList;
        }
    };

    const subcategories = useMemo(() => {
        const subs = packages
            .filter(pkg => pkg.category === categoryName && pkg.subcategory)
            .map(pkg => pkg.subcategory);

        return Array.from(new Set(subs));
    }, [packages, categoryName]);

    const filters = useMemo(() => {
        const packagesInCategory = packages.filter(pkg => pkg.category === categoryName);
        const allFilters = generateFiltersFromPackages(packagesInCategory);
        return allFilters.filter(f => f.id !== 'category');
    }, [packages, categoryName, subCategoryName]);

    const [selectedFilters, setSelectedFilters] = useState({
        size: [],
        color: [],
        density: [],
        bottom: [],
        handle: [],
        weight: []
    });

    const handleFilterChange = (filterId, value) => {
        setSelectedFilters((prev) => {
            const currentValues = prev[filterId];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [filterId]: newValues,
            };
        });
    };

    const slugToName = (slug) => {
        let name = slug.replace(/-/g, ' ');
        name = name.replace(/\bZip\b /g, 'Zip-');
        return name;
    };

    const filteredAndSortedPackages = useMemo(() => {
        const subName = subCategoryName ? slugToName(subCategoryName) : null;

        const filtered = packages.filter((pkg) => {
            const categoryMatch = pkg.category === categoryName;
            const subcategoryMatch = subName ? pkg.subcategory === subName : true;

            const sizeMatch = selectedFilters.size.length === 0 || selectedFilters.size.includes(pkg.size);
            const colorMatch = selectedFilters.color.length === 0 || selectedFilters.color.includes(pkg.color);
            const densityMatch = selectedFilters.density.length === 0 || selectedFilters.density.includes(pkg.density);
            const bottomMatch = (selectedFilters.bottom.length === 0 || selectedFilters.bottom.includes('any') || selectedFilters.bottom.includes(String(pkg.bottom)));
            const handleMatch = (selectedFilters.handle.length === 0 || selectedFilters.handle.includes('any') || selectedFilters.handle.includes(String(pkg.handle)));
            const weightMatch = selectedFilters.weight.length === 0 || selectedFilters.weight.includes(pkg.weight);

            return categoryMatch && subcategoryMatch && sizeMatch && colorMatch && densityMatch && bottomMatch && handleMatch && weightMatch;
        });

        return sortPackages(filtered);
    }, [packages, selectedFilters, currentSort, categoryName, subCategoryName]);

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pl-10 pr-10">
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Категорія: {categoryName}
                        {subCategoryName && ` → ${slugToName(subCategoryName)}`}
                    </h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                                Сортувати
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                />
                            </MenuButton>

                            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.name}>
                                            {({ active }) => (
                                                <p
                                                    onClick={() => setCurrentSort(option.name)}
                                                    className={classNames(
                                                        option.name === currentSort ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm cursor-pointer'
                                                    )}
                                                >
                                                    {option.name}
                                                </p>
                                            )}
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>

                {subcategories.length > 0 && !subCategoryName && (
                    <div className="my-6 flex flex-wrap gap-3">
                        {subcategories.map(sub => {
                            const slug = sub.replace(/\s+/g, "-");
                            return (
                                <button
                                    key={sub}
                                    onClick={() => navigate(`/catalog/${categoryName}/${slug}`)}
                                    className="px-4 py-2 bg-gray-100 rounded-xl shadow hover:bg-gray-200 transition text-sm font-medium"
                                >
                                    {sub}
                                </button>
                            );
                        })}
                    </div>
                )}

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <form className="hidden lg:block lg:col-span-1">
                            {filters.map((section) => (
                                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6" defaultOpen>
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            {['bottom', 'handle'].includes(section.id) ? (
                                                section.options.map((option) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <input
                                                            type="radio"
                                                            name={section.id}
                                                            checked={selectedFilters[section.id][0] === option.value}
                                                            onChange={() =>
                                                                setSelectedFilters((prev) => ({
                                                                    ...prev,
                                                                    [section.id]: [option.value],
                                                                }))
                                                            }
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label className="text-sm text-gray-600">{option.label}</label>
                                                    </div>
                                                ))
                                            ) : (
                                                section.options.map((option) => (
                                                    <div key={option.value} className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFilters[section.id].includes(option.value)}
                                                            onChange={() => handleFilterChange(section.id, option.value)}
                                                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label className="text-sm text-gray-600 flex items-center gap-2">
                                                            {section.id === 'color' && colorMap[option.value] && (
                                                                <span
                                                                    className="inline-block w-3 h-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor: colorMap[option.value],
                                                                        borderColor: colorMap[option.value] === 'transparent' ? '#000000' : darkenColor(colorMap[option.value], 30)
                                                                    }}
                                                                />
                                                            )}
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}
                        </form>

                        <div className="lg:col-span-3">
                            {loading ? (
                                <div className="flex justify-center items-center h-[50vh]">
                                    <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
                                </div>
                            ) : filteredAndSortedPackages.length === 0 ? (
                                <p className="text-gray-500 text-lg">Нічого не знайдено</p>
                            ) : (
                                <ProductCard packages={filteredAndSortedPackages} />
                            )}
                        </div>

                    </div>
                </section>
            </main>
        </div>
    )
}
