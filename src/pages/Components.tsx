import React, { useState } from 'react';
import Select from '../components/form/Select';
import Card from '../components/ui/Card';

const Components = () => {
  const [selectedValue, setSelectedValue] = useState('');

  // Mock data for components
  const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Components</h1>
          <p className="text-gray-400">UI Component Library</p>
        </div>

        {/* Form Components */}
        <Card>
          <h2 className="text-xl font-medium mb-6">Form Components</h2>
          
          <div className="space-y-8">
            {/* Select */}
            <div>
              <h3 className="text-lg font-medium mb-4">Select</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Default</h4>
                  <Select
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={selectOptions}
                    placeholder="Select an option"
                  />
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">With Label</h4>
                  <Select
                    label="Select Option"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={selectOptions}
                    placeholder="Select an option"
                  />
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">With Error</h4>
                  <Select
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={selectOptions}
                    placeholder="Select an option"
                    error="This field is required"
                  />
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Disabled</h4>
                  <Select
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={selectOptions}
                    placeholder="Select an option"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-lg font-medium mb-4">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <h4 className="font-medium mb-2">Default Card</h4>
                  <p className="text-gray-400">Basic card component with default styling</p>
                </Card>

                <Card className="bg-[#222222]">
                  <h4 className="font-medium mb-2">Dark Variant</h4>
                  <p className="text-gray-400">Card with darker background color</p>
                </Card>

                <Card hoverable>
                  <h4 className="font-medium mb-2">Hoverable Card</h4>
                  <p className="text-gray-400">Card with hover effect</p>
                </Card>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-[#88D693] text-black font-medium rounded-lg hover:bg-[#88D693]/90 transition-colors">
                  Primary Button
                </button>
                
                <button className="px-4 py-2 bg-[#1A1A1A] text-white font-medium rounded-lg hover:bg-[#222222] transition-colors">
                  Secondary Button
                </button>

                <button className="px-4 py-2 border border-[#333333] text-white font-medium rounded-lg hover:bg-[#1A1A1A] transition-colors">
                  Outline Button
                </button>

                <button className="px-4 py-2 bg-[#88D693] text-black font-medium rounded-lg opacity-50 cursor-not-allowed">
                  Disabled Button
                </button>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-medium mb-4">Colors</h3>
              <div className="space-y-6">
                {/* Background Colors */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-4">Background Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-[#88D693] rounded-lg"></div>
                      <p className="text-sm text-gray-400">Primary (#88D693)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-[#1A1A1A] rounded-lg"></div>
                      <p className="text-sm text-gray-400">Card (#1A1A1A)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-[#222222] rounded-lg"></div>
                      <p className="text-sm text-gray-400">Dark (#222222)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-[rgb(240,148,164)] rounded-lg"></div>
                      <p className="text-sm text-gray-400">Error (rgb(240,148,164))</p>
                    </div>
                  </div>
                </div>

                {/* Text Colors */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-4">Text Colors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <div className="space-y-4">
                        <div>
                          <span className="text-white">text-white</span>
                          <span className="text-sm text-gray-400 ml-2">#FFFFFF</span>
                        </div>
                        <div>
                          <span className="text-[#88D693]">text-[#88D693]</span>
                          <span className="text-sm text-gray-400 ml-2">Primary Green</span>
                        </div>
                        <div>
                          <span className="text-gray-400">text-gray-400</span>
                          <span className="text-sm text-gray-400 ml-2">Secondary Text</span>
                        </div>
                        <div>
                          <span className="text-[rgb(240,148,164)]">text-[rgb(240,148,164)]</span>
                          <span className="text-sm text-gray-400 ml-2">Error/Negative</span>
                        </div>
                        <div>
                          <span className="text-[rgb(255,208,57)]">text-[rgb(255,208,57)]</span>
                          <span className="text-sm text-gray-400 ml-2">Warning/Market Cap</span>
                        </div>
                        <div>
                          <span className="text-[rgb(147,197,253)]">text-[rgb(147,197,253)]</span>
                          <span className="text-sm text-gray-400 ml-2">Info/Volume</span>
                        </div>
                      </div>
                    </Card>

                    <Card>
                      <div className="space-y-4">
                        <div>
                          <p className="text-2xl font-bold">Heading 1</p>
                          <span className="text-sm text-gray-400">text-2xl font-bold</span>
                        </div>
                        <div>
                          <p className="text-xl font-medium">Heading 2</p>
                          <span className="text-sm text-gray-400">text-xl font-medium</span>
                        </div>
                        <div>
                          <p className="text-lg font-medium">Heading 3</p>
                          <span className="text-sm text-gray-400">text-lg font-medium</span>
                        </div>
                        <div>
                          <p className="text-base">Regular Text</p>
                          <span className="text-sm text-gray-400">text-base</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Secondary Text</p>
                          <span className="text-sm text-gray-400">text-sm text-gray-400</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Tables */}
            <div>
              <h3 className="text-lg font-medium mb-4">Tables</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-400">
                      <th className="text-left py-3">Token</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Market Cap</th>
                      <th className="text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333333]">
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-[#222222] rounded-full"></div>
                          <span>Sample Token</span>
                        </div>
                      </td>
                      <td className="text-right">$1.234</td>
                      <td className="text-right text-[rgb(255,208,57)]">$1.2M</td>
                      <td className="text-right text-[rgb(147,197,253)]">$500K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Input Fields */}
            <div>
              <h3 className="text-lg font-medium mb-4">Input Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Text Input</label>
                    <input
                      type="text"
                      className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:border-[#88D693]"
                      placeholder="Enter text..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Search Input</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#88D693]"
                        placeholder="Search..."
                      />
                      <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Select Input</label>
                    <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:border-[#88D693]">
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Number Input</label>
                    <input
                      type="number"
                      className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:border-[#88D693]"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-lg font-medium mb-4">Badges & Tags</h3>
              <div className="flex flex-wrap gap-4">
                <span className="px-2 py-1 text-xs bg-[#88D693] text-black rounded-lg">Success</span>
                <span className="px-2 py-1 text-xs bg-[rgb(240,148,164)] text-white rounded-lg">Error</span>
                <span className="px-2 py-1 text-xs bg-[rgb(255,208,57)] text-black rounded-lg">Warning</span>
                <span className="px-2 py-1 text-xs bg-[rgb(147,197,253)] text-white rounded-lg">Info</span>
                <span className="px-2 py-1 text-xs border border-[#333333] text-white rounded-lg">Default</span>
              </div>
            </div>

            {/* Alerts */}
            <div>
              <h3 className="text-lg font-medium mb-4">Alerts</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#88D693]/10 border border-[#88D693] text-[#88D693] rounded-lg">
                  Success Alert: Operation completed successfully
                </div>
                <div className="p-4 bg-[rgb(240,148,164)]/10 border border-[rgb(240,148,164)] text-[rgb(240,148,164)] rounded-lg">
                  Error Alert: Something went wrong
                </div>
                <div className="p-4 bg-[rgb(255,208,57)]/10 border border-[rgb(255,208,57)] text-[rgb(255,208,57)] rounded-lg">
                  Warning Alert: Please check your input
                </div>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <h3 className="text-lg font-medium mb-4">Loading States</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-[#222222] rounded w-3/4"></div>
                    <div className="h-4 bg-[#222222] rounded w-1/2"></div>
                    <div className="h-4 bg-[#222222] rounded w-5/6"></div>
                  </div>
                </Card>
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#88D693] border-t-transparent"></div>
                </div>
              </div>
            </div>

            {/* Filter Components */}
            <div>
              <h3 className="text-lg font-medium mb-4">Filter Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Filter Dropdown */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Filter Dropdown</label>
                  <div className="relative">
                    <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2 appearance-none focus:outline-none focus:border-[#88D693]">
                      <option>All Time</option>
                      <option>Last 24h</option>
                      <option>Last 7d</option>
                      <option>Last 30d</option>
                    </select>
                    <svg
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Range Input */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Market Cap Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#88D693]"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$0</span>
                      <span>$1M+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Components */}
            <div>
              <h3 className="text-lg font-medium mb-4">Chart Components</h3>
              <div className="grid grid-cols-1 gap-6">
                {/* Price Chart */}
                <Card>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Price Chart</h4>
                      <div className="flex gap-2">
                        <button className="px-2 py-1 text-xs bg-[#222222] rounded-lg hover:bg-[#333333]">24H</button>
                        <button className="px-2 py-1 text-xs bg-[#88D693] text-black rounded-lg">7D</button>
                        <button className="px-2 py-1 text-xs bg-[#222222] rounded-lg hover:bg-[#333333]">30D</button>
                      </div>
                    </div>
                    <div className="h-48 bg-[#222222] rounded-lg flex items-center justify-center text-gray-400">
                      Chart Placeholder
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Stats Cards */}
            <div>
              <h3 className="text-lg font-medium mb-4">Stats Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Market Cap Card */}
                <Card>
                  <div className="space-y-2">
                    <h4 className="text-sm text-gray-400">Total Market Cap</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">$1.2B</span>
                      <span className="text-sm text-[#88D693]">+5.2%</span>
                    </div>
                  </div>
                </Card>

                {/* Volume Card */}
                <Card>
                  <div className="space-y-2">
                    <h4 className="text-sm text-gray-400">24h Volume</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">$425M</span>
                      <span className="text-sm text-[rgb(240,148,164)]">-2.1%</span>
                    </div>
                  </div>
                </Card>

                {/* Tokens Card */}
                <Card>
                  <div className="space-y-2">
                    <h4 className="text-sm text-gray-400">Total Tokens</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">1,234</span>
                      <span className="text-sm text-[#88D693]">+12</span>
                    </div>
                  </div>
                </Card>

                {/* Trending Card */}
                <Card>
                  <div className="space-y-2">
                    <h4 className="text-sm text-gray-400">Hot Trend</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">AI Tokens</span>
                      <span className="px-2 py-1 text-xs bg-[#88D693] text-black rounded-lg">Hot</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Components; 