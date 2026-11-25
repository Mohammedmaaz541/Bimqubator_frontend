import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

function CardPro({ project, featuredLayout = false }) {
  const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://api2.bimqubator.com";
  const router = useRouter();

  let images = [];

  try {
    images =
      typeof project.project_images === "string"
        ? JSON.parse(project.project_images)
        : project.project_images || [];
  } catch (error) {
    console.error("Error parsing project images:", error);
  }

  const firstImage = images[0]
    ? `${API_URL}/${images[0].replace(/\\/g, "/")}`
    : "/placeholder.jpg";

  return (
    <div
      onClick={() => router.push(`/projects/${project.project_id}`)}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.14)] ${
        featuredLayout ? "lg:grid lg:grid-cols-[1.15fr_0.85fr]" : ""
      }`}
    >
      {/* Project Image */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          featuredLayout
            ? "h-64 sm:h-72 lg:h-full lg:min-h-[390px]"
            : "h-56"
        }`}
      >
        {images.length > 0 ? <Image
          src={firstImage}
          alt={project.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        /> : <div className="h-full border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
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
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] z-10">
          <span className="text-white font-black text-sm uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
            View Detail
          </span>
        </div>
      </div>

      <div
        className={`flex flex-grow flex-col p-6 md:p-8 ${
          featuredLayout ? "justify-center md:p-8 lg:p-10 xl:p-12" : ""
        }`}
      >
        <h4
          className={`mb-2 font-black uppercase tracking-tight text-slate-950 transition-colors group-hover:text-blue-700 ${
            featuredLayout
              ? "text-2xl leading-tight sm:text-3xl lg:text-4xl"
              : "line-clamp-1 text-xl tracking-tighter md:text-2xl"
          }`}
        >
          {project.name || "Untitled Project"}
        </h4>

        {/* Company & Client Row */}
        <div className="mt-auto border-t pt-4 pb-2 border-gray-100 flex justify-between items-center gap-4">
          {project.company_logo && (
            <div className="flex items-center gap-3">
              <Image
                src={`${API_URL}/${project.company_logo.replace(/\\/g, "/")}`}
                alt={project.company_name || "Company Logo"}
                width={56}
                height={56}
                unoptimized
                className="w-10 h-10 md:w-14 md:h-14 object-contain border border-gray-100 p-0.5 rounded-full shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <div className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                  Company
                </div>
                <div className="text-xs md:text-sm font-black text-gray-900 uppercase truncate max-w-[100px] md:max-w-[120px]">
                  {project.company_name}
                </div>
              </div>
            </div>
          )}

          {project.client_name && (
            <div className="text-right flex-grow">
              <div className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                Client
              </div>
              <div className="text-xs md:text-sm font-black text-gray-900 uppercase truncate max-w-[100px] md:max-w-[120px] ml-auto">
                {project.client_name}
              </div>
            </div>
          )}
        </div>

        {/* Country & Arrow Row */}
        <div className="mt-2 border-t pt-4 border-gray-100 flex justify-between items-center gap-4">
          <div className="flex-grow">
            {project.country && (
              <div>
                <div className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                  Country
                </div>
                <div className="text-xs md:text-sm font-black text-gray-900 uppercase truncate max-w-[120px]">
                  {project.country}
                </div>
              </div>
            )}
          </div>

          {/* Animated Cross-Arrow Button */}
          <div className="w-10 h-10 rounded-full bg-gray-50 flex flex-shrink-0 items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-sm border border-gray-100 group-hover:border-blue-600 group-hover:shadow-[2px_2px_0_0_rgba(17,24,39,1)]">
            <FaArrowUpRightFromSquare className="text-gray-400 group-hover:text-white transition-transform duration-300" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPro;