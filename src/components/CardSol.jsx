import React from 'react';

const CardSol = ({ item, index, getImageUrl }) => {
  let featuresArray = [];
  if (Array.isArray(item.features)) {
    featuresArray = item.features;
  } else if (typeof item.features === 'string') {
    try {
      featuresArray = JSON.parse(item.features);
    } catch (e) {}
  }

  return (
    <div className="group relative bg-white transition-all border-2 border-blue-600 duration-300 shadow-[4px_4px_0_0_rgba(37,99,235,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col">
      {/* Image Frame */}
      <div className="w-full h-40 sm:h-48 relative border-b-2 border-blue-600 overflow-hidden">
        {item.image ? <img
          src={getImageUrl(item.image)}
          alt={item.title || "Service image"}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
          : <div className="h-full border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <p className="text-gray-500 font-medium">No Images Available</p>
          </div>
        }
        {/* <div className="absolute top-3 left-3 px-2.5 py-1 bg-gray-900 text-white text-[8px] font-black uppercase tracking-widest z-20">
          SRV-{String(item.id || index + 1).padStart(2, '0')}
        </div> */}
      </div>

      {/* Content Spec Sheet */}
      <div className="p-4 md:p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="mb-3">
            <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tighter mb-1.5 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            {item.description && <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase">{item.description}</p>}
          </div>

          {/* Features Grid */}
          {featuresArray.length > 0 && <div className="grid grid-cols-2 gap-y-2">
            {featuresArray.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600"></div>
                <span className="text-[8px] md:text-[9px] font-black text-gray-900 uppercase tracking-wider">{feature}</span>
              </div>
            ))}
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CardSol;