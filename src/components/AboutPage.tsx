import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Info, Target, Heart, ShieldCheck } from 'lucide-react';

export const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | LootSplitter 2026";
  }, []);

  return (
    <div className="relative">
      <div className="atmosphere"></div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight">Our <span className="italic font-serif font-normal text-indigo-600">Manifesto</span></h1>
          <p className="text-slate-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Crafting digital artifacts for the modern tabletop experience.
          </p>
        </motion.div>

        <div className="grid gap-12">
          <section className="glass-card p-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">The Vision</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed font-light mb-6">
              At LootSplitter, we believe that the math of Dungeons & Dragons shouldn't get in the way of the story. 
              Our mission is to build fast, intuitive, and beautiful web tools that help Dungeon Masters and players 
              manage the technical aspects of their games seamlessly.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed font-light">
              We started as a small group of players who were tired of spending 20 minutes at the end of every session 
              trying to figure out how many gold pieces each person got, especially when dealing with electrum and 
              platinum conversions. We wanted a tool that was as fast as a fireball and as reliable as a paladin's oath.
            </p>
          </section>

          <section className="glass-card p-12">
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight mb-8">Why Use a Loot Calculator?</h2>
            <div className="prose prose-slate max-w-none text-slate-500 font-light leading-relaxed">
              <p>
                In a typical 5e campaign, treasure comes in many forms: ancient copper coins from a crypt, silver bars from a merchant's wagon, 
                or the glittering platinum hoard of an adult red dragon. Converting these on the fly while trying to maintain the 
                narrative flow is a challenge for even the most experienced DMs.
              </p>
              <p>
                Our <strong>D&D 5e Loot Splitter</strong> solves this by providing:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Instant Conversion:</strong> Automatically converts all coin types to a base copper value for perfect division.</li>
                <li><strong>Remainder Handling:</strong> Clearly identifies leftover coins so the party can decide how to distribute them fairly.</li>
                <li><strong>Gold Value Estimation:</strong> Gives you a quick glance at the total worth of the hoard in standard Gold Pieces (GP).</li>
                <li><strong>Mobile-First Design:</strong> Works perfectly on smartphones and tablets at the gaming table.</li>
              </ul>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="glass-card p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <Heart className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Community</h2>
              </div>
              <p className="text-slate-500 leading-relaxed font-light">
                We are players ourselves. Every tool we build is tested at our own tables before it reaches yours. 
                We listen to feedback and constantly improve our algorithms.
              </p>
            </section>

            <section className="glass-card p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Privacy</h2>
              </div>
              <p className="text-slate-500 leading-relaxed font-light">
                Our tools will always be free to use. We support our development through non-intrusive 
                advertisements and community support, ensuring everyone has access to quality gaming aids.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

