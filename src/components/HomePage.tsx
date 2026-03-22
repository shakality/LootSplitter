import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coins, Users, Calculator, ArrowRight, Info, HelpCircle } from 'lucide-react';
import { AdPlaceholder } from './Layout';

const LootSplitter = () => {
  const [currency, setCurrency] = useState({
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  });
  const [partySize, setPartySize] = useState(4);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrency((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };

  const results = useMemo(() => {
    const totalCP = 
      currency.cp + 
      currency.sp * 10 + 
      currency.ep * 50 + 
      currency.gp * 100 + 
      currency.pp * 1000;

    const shareCP = Math.floor(totalCP / Math.max(1, partySize));
    const remainderCP = totalCP % Math.max(1, partySize);

    const formatCurrency = (totalInCP: number) => {
      let remaining = totalInCP;
      const pp = Math.floor(remaining / 1000);
      remaining %= 1000;
      const gp = Math.floor(remaining / 100);
      remaining %= 100;
      const ep = Math.floor(remaining / 50);
      remaining %= 50;
      const sp = Math.floor(remaining / 10);
      remaining %= 10;
      const cp = remaining;

      return { pp, gp, ep, sp, cp };
    };

    return {
      perPerson: formatCurrency(shareCP),
      remainder: formatCurrency(remainderCP),
      totalGoldValue: (totalCP / 100).toFixed(2),
    };
  }, [currency, partySize]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card p-10">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Hoard Details</h2>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Total Value</p>
                <p className="text-indigo-600 font-display font-bold text-2xl">{results.totalGoldValue} GP</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { name: 'pp', label: 'Platinum', color: 'text-slate-500', bg: 'bg-slate-100' },
                { name: 'gp', label: 'Gold', color: 'text-amber-600', bg: 'bg-amber-50' },
                { name: 'ep', label: 'Electrum', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                { name: 'sp', label: 'Silver', color: 'text-slate-500', bg: 'bg-slate-100' },
                { name: 'cp', label: 'Copper', color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((coin) => (
                <div key={coin.name} className="relative group">
                  <label className={`absolute top-4 left-5 text-[10px] font-black uppercase tracking-[0.15em] ${coin.color} opacity-70`}>
                    {coin.label}
                  </label>
                  <input
                    type="number"
                    name={coin.name}
                    value={currency[coin.name as keyof typeof currency] || ''}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 pt-9 pb-4 text-xl font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              ))}
              
              <div className="relative group">
                <label className="absolute top-4 left-5 text-[10px] font-black uppercase tracking-[0.15em] text-indigo-600 opacity-70">
                  Party Size
                </label>
                <input
                  type="number"
                  value={partySize || ''}
                  onChange={(e) => setPartySize(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-indigo-50 border border-indigo-100 rounded-2xl px-5 pt-9 pb-4 text-xl font-mono font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <AdPlaceholder className="h-40" />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card p-10 h-full flex flex-col">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 tracking-tight">The Distribution</h2>
            
            <div className="space-y-8 flex-grow">
              <div className="space-y-4">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Individual Share</p>
                <div className="grid gap-3">
                  {Object.entries(results.perPerson).map(([key, val]) => (
                    (val as number) > 0 && (
                      <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-slate-500 uppercase text-xs font-black tracking-widest">{key}</span>
                        <span className="text-slate-900 font-mono font-bold text-lg">{val}</span>
                      </div>
                    )
                  ))}
                  {Object.values(results.perPerson).every(v => v === 0) && (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl">
                      <p className="text-slate-400 italic text-sm">Awaiting the spoils of war...</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">The Remainder</p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(results.remainder).map(([key, val]) => (
                    (val as number) > 0 && (
                      <div key={key} className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
                        <span className="text-slate-500 uppercase text-[10px] font-black">{key}</span>
                        <span className="text-indigo-600 font-mono font-bold">{val}</span>
                      </div>
                    )
                  ))}
                  {Object.values(results.remainder).every(v => v === 0) && (
                    <span className="text-slate-400 text-xs italic">Perfectly divided.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <button className="btn-primary w-full group">
                <span className="flex items-center justify-center gap-2">
                  Copy Distribution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "How does the conversion work in D&D 5e?",
      a: "The standard conversion is base-10: 10 Copper (cp) = 1 Silver (sp), 10 Silver = 1 Gold (gp), and 10 Gold = 1 Platinum (pp). Electrum (ep) is the outlier, where 1 Electrum = 5 Silver or 0.5 Gold."
    },
    {
      q: "What happens to the remainder?",
      a: "Our calculator calculates the remainder down to the last copper piece. Most parties put this into a 'party fund' for shared expenses like health potions or inn stays, or give it as a tip to the Dungeon Master."
    },
    {
      q: "Is Electrum used in all campaigns?",
      a: "Electrum is often considered an optional or 'ancient' currency. Many DMs skip it for simplicity, but it's officially part of the 5e ruleset and found in many classic modules."
    },
    {
      q: "How do I split magic items?",
      a: "Magic items are unique and cannot be easily divided like currency. We recommend using a 'Need before Greed' system, a roll-off (d20), or a point-buy system for magical loot."
    },
    {
      q: "What is the weight of coins in 5e?",
      a: "According to the Player's Handbook, 50 coins of any type weigh 1 pound. This is important for parties tracking encumbrance when hauling a massive hoard."
    },
    {
      q: "Can this calculator handle gems and art objects?",
      a: "Yes! Simply convert the value of your gems or art objects into their gold equivalent and add it to the Gold (gp) field for a quick split."
    }
  ];

  return (
    <section className="py-24">
      <div className="flex items-center gap-4 mb-16">
        <div className="h-px flex-grow bg-slate-200"></div>
        <h3 className="text-3xl font-display font-bold text-slate-900 tracking-tight px-4">
          Common Inquiries
        </h3>
        <div className="h-px flex-grow bg-slate-200"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card p-8">
            <h4 className="text-slate-900 font-bold mb-4 text-lg leading-tight">{faq.q}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SEOContent = () => {
  return (
    <article className="prose prose-slate max-w-none mt-32 text-slate-500 leading-relaxed">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center tracking-tight">Mastering the <span className="italic font-serif font-normal text-indigo-600">Dragon's Hoard</span></h2>
        
        <div className="space-y-12">
          <section>
            <p className="text-xl text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left">
              In the world of Dungeons & Dragons, nothing brings a session to a grinding halt faster than trying to divide a dragon's hoard. 
              Whether you've just cleared a goblin camp or raided a lich's vault, splitting the spoils fairly is essential for party harmony. 
              Our <strong>D&D 5e Loot Splitter Calculator</strong> is designed to handle the complex math of currency conversion so you can get back to the roleplay.
            </p>
          </section>

          <section className="glass-card p-10">
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-8">The 5e Currency Standard</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 px-4 text-indigo-600 uppercase text-[10px] font-black tracking-widest">Unit</th>
                    <th className="py-4 px-4 text-indigo-600 uppercase text-[10px] font-black tracking-widest">Value (CP)</th>
                    <th className="py-4 px-4 text-indigo-600 uppercase text-[10px] font-black tracking-widest">Value (GP)</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-mono">
                  {[
                    { u: 'Copper', cp: 1, gp: 0.01 },
                    { u: 'Silver', cp: 10, gp: 0.1 },
                    { u: 'Electrum', cp: 50, gp: 0.5 },
                    { u: 'Gold', cp: 100, gp: 1 },
                    { u: 'Platinum', cp: 1000, gp: 10 },
                  ].map((row) => (
                    <tr key={row.u} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 text-slate-700">{row.u}</td>
                      <td className="py-4 px-4 text-slate-500">{row.cp}</td>
                      <td className="py-4 px-4 text-indigo-500/50">{row.gp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Loot Disputes</h3>
              <p>
                Even with a calculator, disputes can arise. Here are three tips for Dungeon Masters to keep things civil:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex gap-4">
                  <span className="text-indigo-600 font-display font-bold">01</span>
                  <span><strong>The Party Fund:</strong> Encourage players to set aside 10% of all loot into a shared bag of holding for group expenses.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-indigo-600 font-display font-bold">02</span>
                  <span><strong>Round Down:</strong> Always round down when splitting coins. The remainder goes to the party fund or the DM.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-indigo-600 font-display font-bold">03</span>
                  <span><strong>Magic Items:</strong> Coins are easy, but magic items aren't. Use a 'Need before Greed' system or a roll-off for contested items.</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">DM Insights</h3>
              <p>
                Don't just give out gold. Use art objects, gems, and trade goods to make the world feel alive. 
                A silver-inlaid mirror worth 25gp is much more interesting than a pile of 2500 copper pieces. 
                Our calculator helps you convert these values into a spendable format when the party reaches a major city.
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
};

const Features = () => {
  const features = [
    {
      title: "Instant Conversion",
      desc: "Automatically handles Copper, Silver, Electrum, Gold, and Platinum conversions with 100% accuracy.",
      icon: <Coins className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Fair Distribution",
      desc: "Calculates the exact share for each party member, ensuring no one feels cheated by the math.",
      icon: <Users className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Remainder Tracking",
      desc: "Identifies the leftover coins down to the last copper, perfect for party funds or DM tips.",
      icon: <Calculator className="w-6 h-6 text-indigo-600" />
    }
  ];

  return (
    <section className="py-24 border-t border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="p-4 bg-indigo-500/10 rounded-2xl mb-6">
              {f.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-4">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const HomePage = () => {
  useEffect(() => {
    document.title = "LootSplitter 2026 | The Definitive D&D 5e Loot Calculator";
  }, []);

  return (
    <div className="relative">
      <div className="atmosphere"></div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="sr-only">LootSplitter 2026: D&D 5e Loot Calculator & Currency Converter</h1>
        <div className="max-w-6xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -inset-20 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <LootSplitter />
          </motion.div>
        </div>

        <AdPlaceholder className="mb-24" />
        
        <Features />

        <SEOContent />

        <FAQ />

        <AdPlaceholder className="mt-24" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "LootSplitter 2026",
            "url": "https://ais-dev-zvekkqiqa2cw3xqejfibak-23495064725.europe-west2.run.app",
            "description": "The definitive D&D 5e loot splitter and currency converter. Engineered for precision, designed for the modern adventurer.",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "author": {
              "@type": "Person",
              "name": "LootSplitter Team"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "D&D 5e Currency Conversion",
              "Party Loot Splitting",
              "Remainder Calculation",
              "Gold Value Estimation"
            ],
            "screenshot": "https://picsum.photos/seed/dnd-loot/1200/630"
          })}
        </script>
      </main>
    </div>
  );
};

