
import React from 'react';
import { SUB_CATEGORIES, SIZES, COLORS } from '../constants';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (type: string, value: string) => void;
  activeFilters: { categories: string[], sizes: string[], colors: string[] };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, activeFilters }) => {
  const FilterSection = ({ title, options, filterKey }: { title: string, options: string[], filterKey: 'categories' | 'sizes' | 'colors' }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 cursor-pointer">
        <h3 className="text-[11px] font-bold tracking-widest uppercase">{title}</h3>
        <ChevronDown size={14} />
      </div>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeFilters[filterKey].includes(option)}
              onChange={() => onFilterChange(filterKey, option)}
              className="w-4 h-4 border-gray-300 rounded focus:ring-black accent-black"
            />
            <span className="text-[11px] font-medium text-gray-600 group-hover:text-black uppercase">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-gray-100 pr-8">
      <div className="flex items-center space-x-2 mb-10">
        <SlidersHorizontal size={16} />
        <h2 className="text-sm font-bold tracking-widest uppercase">Filters</h2>
      </div>

      <FilterSection title="Category" options={SUB_CATEGORIES} filterKey="categories" />
      <FilterSection title="Size" options={SIZES} filterKey="sizes" />
      <FilterSection title="Color" options={COLORS} filterKey="colors" />
      
      <div className="mb-8">
        <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4">Price</h3>
        <div className="flex flex-col space-y-4">
          <input type="range" min="0" max="10000" className="w-full accent-black" />
          <div className="flex justify-between text-[10px] font-bold">
            <span>₹0</span>
            <span>₹10,000+</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
