'use client'

import Section from './Section'

// Expanded timeline with more detail for a richer educational experience
const timelineEvents = [
  {
    year: 'c. 3150 BC',
    event: 'Unification of Egypt',
    description:
      'King Narmer (often identified with Menes) unites Upper and Lower Egypt, establishing the First Dynasty and the capital city of Memphis.',
  },
  {
    year: 'c. 2686–2613 BC',
    event: 'The Step Pyramid of Djoser',
    description:
      'Architect Imhotep designs the first stone pyramid for King Djoser, marking the beginning of the Old Kingdom and the age of pyramid building.',
  },
  {
    year: 'c. 2589–2566 BC',
    event: 'The Great Pyramid of Giza',
    description:
      'The reign of Pharaoh Khufu, who commissioned the largest pyramid ever built, a testament to the power and organizational skills of the Old Kingdom.',
  },
  {
    year: 'c. 1479–1458 BC',
    event: 'Reign of Hatshepsut',
    description:
      'One of the most powerful female pharaohs, Hatshepsut, declares herself ruler and oversees a period of peace, prosperity, and extensive trade.',
  },
  {
    year: 'c. 1353–1336 BC',
    event: 'The Amarna Revolution',
    description:
      'Pharaoh Akhenaten shifts Egypt to a monotheistic religion centered on the sun disk, Aten, and moves the capital to a new city, Amarna.',
  },
  {
    year: 'c. 1332–1323 BC',
    event: 'Reign of Tutankhamun',
    description:
      'The "Boy King" restores the traditional pantheon of gods after Akhenaten\'s reign. His nearly intact tomb, discovered in 1922, provides unparalleled insight into pharaonic burial practices.',
  },
  {
    year: 'c. 1279–1213 BC',
    event: 'Reign of Ramesses II (The Great)',
    description:
      'A long and prosperous reign marked by major military campaigns, including the Battle of Kadesh, and monumental construction projects like the Abu Simbel temples.',
  },
  {
    year: '332 BC',
    event: 'Conquest by Alexander the Great',
    description:
      'Alexander conquers Egypt, ending Persian rule. He is welcomed as a liberator and establishes the city of Alexandria, a future center of learning and culture.',
  },
  {
    year: '51–30 BC',
    event: 'Reign of Cleopatra VII',
    description:
      'The last pharaoh of the Ptolemaic dynasty. Her alliances with Julius Caesar and Mark Antony fail to secure Egypt\'s independence, leading to its annexation by Rome after her death.',
  },
]

export default function Timeline() {
  return (
    <Section>
      <div
        className="relative bg-center bg-cover py-16 md:py-20"
        style={{
          backgroundImage: "url('/papyrus-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pharaoh-dark/95 via-pharaoh-dark/90 to-egyptian-gold/20"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-cinzel text-egyptian-gold text-center mb-16 md:mb-24 drop-shadow-lg tracking-wide">
            A Journey Through Time
          </h2>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line - (Left on Mobile, Center on Desktop) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-egyptian-gold/50 via-egyptian-gold to-egyptian-gold/50 transform -translate-x-1/2"></div>

            {timelineEvents.map((item, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div
                  key={index}
                  className="relative mb-10 md:mb-16 flex items-center w-full"
                >
                 
                  <div className="absolute left-6 md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-pharaoh-dark w-8 h-8 rounded-full border-2 border-egyptian-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <span className="block w-3 h-3 bg-egyptian-gold rounded-full"></span>
                  </div>


                  <div
                    className={`w-full pl-16 md:w-1/2 md:pl-0 ${
                      isEven
                        ? 'md:pr-12 md:text-right' 
                        : 'md:pl-12 md:ml-auto' 
                    }`}
                  >
                    <div className="px-5 py-5 md:px-6 md:py-6 rounded-xl shadow-xl bg-pharaoh-dark/90 text-papyrus border border-egyptian-gold/40 hover:border-egyptian-gold/80 transition-colors duration-300">
                      <p className="font-cinzel text-base md:text-lg mb-1 text-egyptian-gold drop-shadow-md">
                        {item.year}
                      </p>
                      <h3 className="font-cinzel font-bold text-lg md:text-xl mb-3 text-white leading-snug">
                        {item.event}
                      </h3>
                      <p className="font-inter leading-relaxed text-sm md:text-base text-papyrus/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
