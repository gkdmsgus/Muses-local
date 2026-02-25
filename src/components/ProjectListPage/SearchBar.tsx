import { useState } from 'react';
import { MapPin, Search, Sparkles, ChevronDown, Check } from 'lucide-react';

export default function SearchBar() {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('전체');

  const locations = ['전체', '서울', '경기', '인천', '부산', '제주'];

  const popularTags = [
    '#졸업전시',
    '#생일카페',
    '#인디밴드',
    '#팝업스토어',
    '#댄스커버',
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false);
  };

  return (
    <div className="mb-12 font-mainFont items-center flex flex-col">
      {/* 필터 및 검색바 */}
      <div className="flex items-center gap-4 mb-4">
        {/* 지역 필터 */}
        <div className="relative">
          <button
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center gap-2 px-6 py-4 border border-white60 hover:border-black40 transition-colors w-fit cursor-pointer rounded-full bg-white"
            style={{
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            <MapPin className="w-4 h-4 text-black80" />
            <span className="text-base font-boldFont text-black80">
              {selectedLocation}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-black80 transition-transform ${
                isLocationDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* 드롭다운 메뉴 */}
          {isLocationDropdownOpen && (
            <div
              className="absolute top-full mt-2 bg-white border border-white60 rounded-2xl shadow-lg z-50 min-w-[190px] overflow-hidden py-2"
              style={{
                boxShadow:
                  '0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)',
              }}
            >
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full px-4 py-3 text-left text-sm font-mediumFont transition-colors hover:bg-[#EEF2FF] flex items-center justify-between ${
                    selectedLocation === location
                      ? 'text-[#4F46E5] bg-[#EEF2FF]'
                      : 'text-black80'
                  }`}
                >
                  <span>{location}</span>
                  {selectedLocation === location && (
                    <Check className="w-4 h-4 text-[#4F46E5]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 검색바 */}
        <div className="flex-1 relative max-w-[530px] w-full">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black40 cursor-pointer" />
          <input
            type="text"
            placeholder="프로젝트, 아티스트, 태그 검색"
            className="min-w-[530px] bg-white py-4 pl-13 pr-6 w-full border border-white60 rounded-full focus:border-black40 focus:outline-none"
            style={{
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          />
        </div>
      </div>

      {/* 인기 태그 */}
      <div className="flex items-center gap-1">
        <Sparkles className="w-4 h-4 text-black40" />
        <span className="text-sm font-boldFont text-black40 mr-2">
          인기 태그:
        </span>
        <div className="flex gap-2 flex-wrap">
          {popularTags.map((tag) => (
            <button
              key={tag}
              className="text-black60 text-sm font-mediumFont hover:text-[#4F46E5] transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
