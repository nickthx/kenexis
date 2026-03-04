"use client";

import { motion } from "motion/react";
import { Headphones, PlayCircle, Rss } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { externalLinks } from "@/lib/data/resources";

export function PodcastSection() {
  return (
    <section className="bg-navy-900 text-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Podcast feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <Headphones
            className="text-accent mx-auto mb-6"
            size={56}
            strokeWidth={1.5}
          />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Kenexis Functional Safety Podcast
          </h2>
          <p className="text-lg text-navy-200 max-w-2xl mx-auto mb-8">
            Expert discussions on process safety topics hosted by Ed Marszal.
            Explore the latest in functional safety, SIS design, fire and gas
            detection, and industry best practices.
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
            asChild
          >
            <a
              href={externalLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Headphones className="mr-2" size={20} />
              Listen on Spotify
            </a>
          </Button>
        </motion.div>

        {/* Additional external links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          <a
            href={externalLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="h-full bg-navy-800 border-navy-700 text-white hover:bg-navy-700 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <PlayCircle
                  className="text-accent mx-auto mb-2"
                  size={40}
                  strokeWidth={1.5}
                />
                <CardTitle className="text-xl text-white">
                  YouTube Channel
                </CardTitle>
                <CardDescription className="text-navy-200">
                  Watch product demos, webinar recordings, and process safety
                  videos
                </CardDescription>
              </CardHeader>
            </Card>
          </a>

          <a
            href={externalLinks.rss}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="h-full bg-navy-800 border-navy-700 text-white hover:bg-navy-700 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Rss
                  className="text-accent mx-auto mb-2"
                  size={40}
                  strokeWidth={1.5}
                />
                <CardTitle className="text-xl text-white">RSS Feed</CardTitle>
                <CardDescription className="text-navy-200">
                  Subscribe to the Kenexis news feed for the latest updates and
                  articles
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
