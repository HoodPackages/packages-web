'use client'
import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from '@heroicons/react/20/solid'
import ProductCart from './ProductCart'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [{
    id: 'size',
    name: 'Розмір',
    options: [
        { value: '2l', label: '2L', checked: false },
        { value: '6l', label: '6L', checked: false },
        { value: '12l', label: '12L', checked: false },
        { value: '18l', label: '18L', checked: false },
        { value: '20l', label: '20L', checked: false },
        { value: '40l', label: '40L', checked: true },
    ],
},
{
    id: 'color',
    name: 'Колір',
    options: [
        { value: 'Білий', label: 'White', checked: false },
        { value: 'Чорний', label: 'Black', checked: false },
        { value: 'Розовий', label: 'Pink', checked: true },
    ],
},
{
    id: 'category',
    name: 'Category',
    options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: true },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
    ],
},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CategoryFilter() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const { packages, loading } = usePackages();
    const [selectedType, setSelectedType] = useState("Всі");

    const types = useMemo(() => {
        const allTypes = packages.map(p => p.category).filter(Boolean);
        return ["Всі", ...Array.from(new Set(allTypes))];
    }, [packages]);

    const filteredPackages = useMemo(() => {
        if (selectedType === "Всі") return packages;
        return packages.filter(p => p.category === selectedType);
    }, [packages, selectedType]);

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
                                            <a
                                                href={option.href}
                                                className={classNames(
                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                    'block px-4 py-2 text-sm hover:bg-gray-100'
                                                )}
                                            >
                                                {option.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>

                        <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                            <span className="sr-only">View grid</span>
                            <Squares2X2Icon aria-hidden="true" className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(true)}
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon aria-hidden="true" className="size-5" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <h2 id="products-heading" className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <form className="hidden lg:block lg:col-span-1">
                            <h3 className="sr-only">Categories</h3>
                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                {types.map((category) => (
                                    <li key={category}>
                                        <a href={category}>{category}</a>
                                    </li>
                                ))}
                            </ul>

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
                                            {section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex gap-3">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={option.checked}
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
                                <ProductCart />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
