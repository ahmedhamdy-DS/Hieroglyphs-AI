'use client'

import Section from './Section'


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
        
        className="relative bg-center bg-cover py-20"
        style={{
          backgroundImage: "url('/papyrus-bg.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-b from-pharaoh-dark/95 via-pharaoh-dark/90 to-egyptian-gold/20"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-cinzel text-egyptian-gold text-center mb-20 drop-shadow-lg tracking-wide">
            A Journey Through Time
          </h2>

          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 w-[3px] h-full bg-gradient-to-b from-egyptian-gold/50 via-egyptian-gold to-egyptian-gold/50 transform -translate-x-1/2"></div>

            {timelineEvents.map((item, index) => (
              <div
                key={index}
                className="relative mb-12 flex justify-between items-center w-full"
              >
                {/* Left Side Content Block */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'order-1' : 'order-3 text-right'
                  }`}
                >
                  
                  <div className="px-6 py-4 rounded-xl shadow-xl bg-pharaoh-dark/90 text-papyrus border border-egyptian-gold/50 backdrop-blur-sm">
                    <p className="font-cinzel text-lg mb-2 text-egyptian-gold drop-shadow-md">
                      {item.year}
                    </p>
                    <h3 className="font-cinzel font-bold text-xl mb-3 text-white">
                      {item.event}
                    </h3>
                    <p className="font-inter leading-relaxed text-base text-papyrus/80">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="z-20 order-2 flex items-center justify-center bg-pharaoh-dark w-8 h-8 rounded-full border-2 border-egyptian-gold shadow-lg">
                  <span className="block w-3 h-3 bg-egyptian-gold rounded-full"></span>
                </div>

                {/* Right Side Spacer */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'order-3' : 'order-1'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

