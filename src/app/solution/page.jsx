import Image from "next/image";
import Link from "next/link";
import CardSol from "@/components/CardSol";
import CTA from "@/components/CTA";
import styles from "./solution.module.css";

// This tells Next.js to revalidate the cached data every 60 seconds
export const revalidate = 60;

export default async function Services({ searchParams }) {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api2.bimqubator.com';
  let services = [];

  // Handle Next.js versions where searchParams is a promise
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams?.page) || 1;
  const itemsPerPage = 12; // Show 12 services per page

  // Fetch data on the Server instead of the Client
  try {
    const response = await fetch(`${API_URL}/api/v1/services`);
    const data = await response.json();
    if (data && data.success) {
      services = data.items.filter(item => item.status === 'Active');
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  const getImageUrl = (path) => {
    if (!path) return "/MEP System Design.jpeg"; // default fallback
    return path.startsWith('http') ? path : `${API_URL}${path}`;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  return (
    <>
      <main className="bg-white text-gray-900 font-sans overflow-x-hidden">

        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f7f9fc] px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-10">
          <div aria-hidden="true" className={styles.heroGrid} />
          <div aria-hidden="true" className={styles.heroGlow} />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-cyan-300" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={`${styles.heroCopy} max-w-xl`}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 sm:mb-5 sm:text-xs">
                  <span className={`${styles.badgeDot} h-1.5 w-1.5 rounded-full bg-blue-600`} />
                  MEP & BIM Engineering
                </div>

                <h1 className="mb-4 text-[clamp(2.2rem,4.8vw,4rem)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-slate-950 sm:mb-5">
                  <span className="block">360° MEP &</span>
                  <span className={`${styles.titleAccent} block text-blue-600`}>BIM Solutions.</span>
                </h1>

                <p className="max-w-lg text-sm font-medium leading-6 text-slate-600 sm:text-base sm:leading-7">
                  End-to-end engineering and BIM services across design, coordination, fabrication, and lifecycle management.
                </p>
              </div>

              <div className={`${styles.heroVisual} relative mx-auto w-full max-w-[680px]`}>
                <div aria-hidden="true" className={`${styles.imageFrame} absolute -bottom-2 -right-2 left-2 top-2 border-b-[3px] border-r-[3px] border-blue-600`} />
                <div className={`${styles.imageStage} relative z-10 aspect-[1.4] overflow-hidden bg-white`}>
                  <Image
                    src="/Bim Model.png"
                    alt="BIM Model"
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full object-contain"
                  />
                  <span aria-hidden="true" className={styles.imageSweep} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE SERVICES - REFINED 2D SPECS */}
        <section id="services" className="py-10 md:py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-blue-600 sm:text-sm">Service Catalog</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase ">Core Expertise.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {services.length === 0 ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500 font-bold uppercase">
                  No active services found.
                </div>
              ) : (
                <>
                  {currentServices.map((item, i) => (
                    <CardSol key={item.id || i} item={item} index={i} getImageUrl={getImageUrl} />
                  ))}
                </>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-16 md:mt-24">
                {currentPage > 1 ? (
                  <Link
                    href={`/solution?page=${currentPage - 1}#services`}
                    scroll={true}
                    className="px-4 py-3 border-2 font-black uppercase text-[10px] tracking-widest transition-all duration-300 bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white shadow-[4px_4px_0_0_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                  >
                    Prev
                  </Link>
                ) : (
                  <button disabled className="px-4 py-3 border-2 font-black uppercase text-[10px] tracking-widest transition-all duration-300 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed">
                    Prev
                  </button>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/solution?page=${page}#services`}
                      scroll={true}
                      className={`w-10 h-10 border-2 font-black flex items-center justify-center transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600 shadow-[4px_4px_0_0_rgba(17,24,39,1)]'
                          : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white shadow-[4px_4px_0_0_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages ? (
                  <Link
                    href={`/solution?page=${currentPage + 1}#services`}
                    scroll={true}
                    className="px-4 py-3 border-2 font-black uppercase text-[10px] tracking-widest transition-all duration-300 bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white shadow-[4px_4px_0_0_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                  >
                    Next
                  </Link>
                ) : (
                  <button disabled className="px-4 py-3 border-2 font-black uppercase text-[10px] tracking-widest transition-all duration-300 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed">
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA - FLAT FINAL */}
        <CTA heading="Start Your Project."
          subheading="Precise Engineering. World-Class Coordination."
          buttonText1="Get In Touch"
          link1="/contact-us"
        />
      </main>
    </>
  );
}