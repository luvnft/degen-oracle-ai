import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  StarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import AlertSettingsModal from '../modals/AlertSettingsModal';

const navigation = [
  { name: 'Trends', href: '/trends', icon: ChartBarIcon },
  { name: 'Discovery', href: '/discovery', icon: MagnifyingGlassIcon },
  { name: 'Watchlist', href: '/watchlist', icon: StarIcon },
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/token/${searchValue.trim()}`);
      setSearchValue('')
    }
  }

  return (
    <nav className="bg-[#111111] border-b border-[#333333]">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/trends" className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-[#88D693]" />
              <span className="ml-2 text-white font-bold text-lg">DEGEN ORACLE</span>
            </Link>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-lg mx-12">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by contract address..."
                  className="
                    w-full bg-black rounded-xl px-4 py-2
                    border border-[#333333]
                    text-white placeholder-gray-500
                    focus:outline-none focus:border-[#88D693]
                    transition-colors duration-200
                  "
                />
                <button
                  type="submit"
                  className="
                    absolute right-2 top-1/2 -translate-y-1/2
                    p-1.5 rounded-lg
                    text-gray-400 hover:text-white
                    transition-colors duration-200
                  "
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Links & Settings */}
          <div className="flex items-center">
            {/* Navigation Links */}
            <div className="flex items-center space-x-4 mr-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white'
                        : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Settings Button */}
            <div className="pl-4 border-l border-[#333333]">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="
                  p-2 rounded-lg
                  text-gray-300 hover:text-white
                  hover:bg-[#1A1A1A]
                  transition-colors duration-200
                "
                title="Alert Settings"
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Settings Modal */}
      <AlertSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(settings) => {
          // Handle save settings
          console.log('Save settings:', settings);
          setIsSettingsOpen(false);
        }}
      />
    </nav>
  )
}

export default Navbar;
