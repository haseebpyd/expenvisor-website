"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Heart, Lightbulb, Globe } from "lucide-react";

const allTeamPhotos = [
  {
    src: "/team_photos/Large_professional_team_202511171147.jpeg",
    alt: "Expenvisor Full Team",
    title: "Full Team",
    description: "Our diverse team working together",
  },
  {
    src: "/team_photos/Large_professional_team_202511171146.jpeg",
    alt: "Expenvisor Development Team",
    title: "Development Team",
    description: "Building the future of expense tracking",
  },
  {
    src: "/team_photos/Group_of_810_202511171149.jpeg",
    alt: "Expenvisor Marketing Team",
    title: "Marketing Team",
    description: "Spreading the word about Expenvisor",
  },
  {
    src: "/team_photos/Group_of_810_202511171146.jpeg",
    alt: "Expenvisor Operations Team",
    title: "Operations Team",
    description: "Ensuring smooth operations",
  },
  {
    src: "/team_photos/Group_of_56_202511171147.jpeg",
    alt: "Expenvisor Leadership Team",
    title: "Leadership Team",
    description: "Guiding our vision forward",
  },
  {
    src: "/team_photos/Group_of_56_202511171146.jpeg",
    alt: "Expenvisor Finance Team",
    title: "Finance Team",
    description: "Managing our financial health",
  },
  {
    src: "/team_photos/Professional_photo_of_202511171147.jpeg",
    alt: "Expenvisor Professional Team",
    title: "Professional Team",
    description: "Dedicated professionals at work",
  },
  {
    src: "/team_photos/Professional_headshot_of_202511171149.jpeg",
    alt: "Expenvisor Team Member",
    title: "Team Member",
    description: "Passionate about innovation",
  },
  {
    src: "/team_photos/Professional_headshot_of_202511171149 (1).jpeg",
    alt: "Expenvisor Team Member",
    title: "Team Member",
    description: "Committed to excellence",
  },
  {
    src: "/team_photos/Professional_headshot_of_202511171148.jpeg",
    alt: "Expenvisor Team Member",
    title: "Team Member",
    description: "Driving positive change",
  },
  {
    src: "/team_photos/Professional_headshot_of_202511171148 (1).jpeg",
    alt: "Expenvisor Team Member",
    title: "Team Member",
    description: "Building for the future",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly push boundaries to create cutting-edge solutions that make expense tracking effortless.",
  },
  {
    icon: Heart,
    title: "Culture",
    description:
      "A supportive, inclusive environment where every team member can thrive and grow professionally.",
  },
  {
    icon: Globe,
    title: "Impact",
    description:
      "We're committed to making a positive difference in how people manage their finances worldwide.",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <Navbar />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent to-secondary rounded-2xl mb-6"
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Meet the</span>
                <br />
                <span className="gradient-text">Expenvisor Team</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary-dark max-w-3xl mx-auto">
                A diverse, passionate team of developers, designers, and
                innovators working together to revolutionize how people track
                expenses and manage their finances.
              </p>
            </motion.div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-surface-dark/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-accent/20 hover:border-accent/40 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-xl mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary-dark">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Team Photos Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
                <span className="text-white">Our</span>{" "}
                <span className="gradient-text">Team Gallery</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {allTeamPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative group"
                  >
                    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <h3 className="text-white font-semibold text-lg sm:text-xl mb-1">
                          {photo.title}
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base">
                          {photo.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

