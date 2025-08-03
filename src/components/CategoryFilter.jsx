'use client'
import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'

const sortOptions = [
    { name: 'За замовчуванням', current: true },
    { name: 'Найновіші', current: false },
    { name: 'Від дешевших до дорожчих', current: false },
    { name: 'Від дорожчих до дешевших', current: false },
]

const generateFiltersFromPackages = (packages) => {
    const sizes = new Set();
    const colors = new Set();
    const categories = new Set();

    packages.forEach((pkg) => {
        if (pkg.size) sizes.add(pkg.size);
        if (pkg.color) colors.add(pkg.color);
        if (pkg.category) categories.add(pkg.category);
    });

    return [
        {
            id: 'category',
            name: 'Категорія',
            options: Array.from(categories).map((cat) => ({
                value: cat,
                label: cat,
                checked: false,
            })),
        },
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
    ];
};


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CategoryFilter() {
    const { packages, loading } = usePackages();

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

    const filters = useMemo(() => generateFiltersFromPackages(packages), [packages]);

    const [selectedFilters, setSelectedFilters] = useState({
        size: [],
        color: [],
        category: [],
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

    const filteredAndSortedPackages = useMemo(() => {
        const filtered = packages.filter((pkg) => {
            const sizeMatch = selectedFilters.size.length === 0 || selectedFilters.size.includes(pkg.size);
            const colorMatch = selectedFilters.color.length === 0 || selectedFilters.color.includes(pkg.color);
            const categoryMatch = selectedFilters.category.length === 0 || selectedFilters.category.includes(pkg.category);
            return sizeMatch && colorMatch && categoryMatch;
        });

        return sortPackages(filtered);
    }, [packages, selectedFilters, currentSort]);

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 pl-10 pr-10">
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Пакети</h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <form className="hidden lg:block lg:col-span-1">
                            {filters.map((section) => (
                                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
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
                                            {section.options.map((option) => (
                                                <div key={option.value} className="flex gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters[section.id].includes(option.value)}
                                                        onChange={() => handleFilterChange(section.id, option.value)}
                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label className="text-sm text-gray-600">{option.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}
                        </form>

                        <div className="lg:col-span-3">
                            <div className="">
                                <ProductCard packages={filteredAndSortedPackages} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
