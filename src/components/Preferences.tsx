import { useState, useRef, useEffect } from 'react';
import { ArrowDown, Check } from 'lucide-react';

export default function Preferences() {
  const [theme, setTheme] = useState('Light');
  const [fontSize, setFontSize] = useState('24');
  const [fontStyle, setFontStyle] = useState('Satoshi');
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const themeOptions = ['Light', 'Dark', 'System'];
  const fontSizeOptions = ['16', '18', '20', '24', '28', '32'];
  const fontStyleOptions = ['Satoshi', 'Inter', 'Roboto', 'Arial', 'Georgia'];

  const Dropdown = ({ value, options, onChange, id }) => {
    const dropdownRef = useRef(null);
    const isOpen = openDropdown === id;

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && dropdownRef.current.contains && !dropdownRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="flex items-center px-4 border border-primary-dark dark:border-primary-white text-primary-dark dark:text-white rounded-md cursor-pointer"
        >
          {value}
          <ArrowDown className={`h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-0 left-full ml-2 bg-white dark:bg-black border border-primary-dark dark:border-primary-white rounded-md shadow-lg min-w-[120px] z-50 max-h-[144px] overflow-y-auto dropdown-scroll">
            <style>{`
              .dropdown-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .dropdown-scroll::-webkit-scrollbar-thumb {
                background: #1a1a1a;
                border-radius: 3px;
              }
              .dropdown-scroll::-webkit-scrollbar-thumb:hover {
                background: #404040;
              }
              .dark .dropdown-scroll::-webkit-scrollbar-thumb {
                background: #ffffff;
              }
              .dark .dropdown-scroll::-webkit-scrollbar-thumb:hover {
                background: #d4d4d4;
              }
            `}</style>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpenDropdown(null);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-between text-primary-dark dark:text-primary-white cursor-pointer"
              >
                {option}
                {value === option && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white my-3 pb-4">
        Preferences
      </h3>

      <div className="flex gap-10 w-2xl border pb-3 border-b-primary-dark border-t-primary-white border-x-primary-white dark:border-b-primary-white dark:border-t-primary-dark dark:border-x-primary-dark">
        <div className="w-full space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
                Appearance
              </h3>
              <Dropdown value={theme} options={themeOptions} onChange={setTheme} id="theme" />
            </div>
            <p className="text-dark-3 text-base dark:text-gray-400">
              Change how you want ThinkFlow would look
            </p>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
                Font Size
              </h3>
              <Dropdown value={fontSize} options={fontSizeOptions} onChange={setFontSize} id="fontSize" />
            </div>
            <p className="text-dark-3 text-base dark:text-gray-400">
              Change your preferred font size in ThinkFlow
            </p>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
                Font Style
              </h3>
              <Dropdown value={fontStyle} options={fontStyleOptions} onChange={setFontStyle} id="fontStyle" />
            </div>
            <p className="text-dark-3 text-base dark:text-gray-400">
              Change your preferred font style in ThinkFlow
            </p>
          </div>
        </div>
      </div>
    </>
  );
}