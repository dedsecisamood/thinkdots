export const CAT_COLOR = {
  technology: '#00d4ff', science: '#7b2fff', philosophy: '#ff6b35',
  arts: '#ff3d9a', cosmos: '#00ff88', mind: '#ffd93d'
};

export const KB = {
  "artificial intelligence": { cat: "technology", desc: "The simulation of human intelligence in machines — learning, reasoning, problem-solving.", conn: [["machine learning", .95], ["neural networks", .9], ["deep learning", .85], ["natural language processing", .8], ["computer vision", .75], ["robotics", .65], ["ethics", .6], ["data science", .7]] },
  "machine learning": { cat: "technology", desc: "Algorithms that discover patterns in data to make predictions without explicit rules.", conn: [["artificial intelligence", .9], ["statistics", .85], ["neural networks", .9], ["deep learning", .85], ["data science", .8], ["optimization", .75]] },
  "neural networks": { cat: "technology", desc: "Computational models loosely inspired by the biological neurons of animal brains.", conn: [["machine learning", .9], ["deep learning", .95], ["brain", .8], ["artificial intelligence", .85], ["mathematics", .7]] },
  "deep learning": { cat: "technology", desc: "Multi-layered neural networks that learn hierarchical representations from raw data.", conn: [["neural networks", .95], ["computer vision", .9], ["natural language processing", .85], ["machine learning", .85]] },
  "natural language processing": { cat: "technology", desc: "AI's ability to understand, generate, and interpret human language.", conn: [["artificial intelligence", .85], ["deep learning", .9], ["linguistics", .8], ["consciousness", .4]] },
  "computer vision": { cat: "technology", desc: "Teaching machines to interpret and understand the visual world.", conn: [["deep learning", .9], ["robotics", .75], ["optics", .6], ["neuroscience", .55]] },
  "robotics": { cat: "technology", desc: "Design and construction of autonomous machines that interact with the physical world.", conn: [["artificial intelligence", .8], ["computer vision", .75], ["physics", .65], ["ethics", .55]] },
  "quantum computing": { cat: "technology", desc: "Computing using quantum superposition and entanglement to solve problems classically intractable.", conn: [["quantum physics", .95], ["cryptography", .8], ["mathematics", .85], ["artificial intelligence", .65]] },
  "data science": { cat: "technology", desc: "Extracting knowledge and insights from structured and unstructured data.", conn: [["machine learning", .9], ["statistics", .9], ["artificial intelligence", .8]] },
  "optimization": { cat: "technology", desc: "Finding the best solution from all feasible solutions — central to engineering and AI training.", conn: [["mathematics", .85], ["machine learning", .9]] },
  "cryptography": { cat: "technology", desc: "The practice of secure communication — encoding messages so only intended recipients can read them.", conn: [["mathematics", .9], ["quantum computing", .85], ["information theory", .75]] },
  "information theory": { cat: "technology", desc: "The mathematical study of quantification, storage, and communication of information.", conn: [["mathematics", .85], ["entropy", .9], ["cryptography", .75], ["artificial intelligence", .7]] },

  "universe": { cat: "cosmos", desc: "All of space, time, matter, and energy — the totality of existence.", conn: [["dark matter", .85], ["black holes", .8], ["stars", .9], ["big bang", .95], ["time", .8], ["mathematics", .7], ["galaxies", .9], ["dark energy", .8]] },
  "dark matter": { cat: "cosmos", desc: "Invisible matter comprising ~27% of the universe, detected only through gravity.", conn: [["universe", .85], ["gravity", .9], ["dark energy", .75], ["physics", .8]] },
  "dark energy": { cat: "cosmos", desc: "A mysterious force driving the universe's accelerating expansion — ~68% of total content.", conn: [["universe", .9], ["dark matter", .7], ["gravity", .75], ["physics", .85]] },
  "black holes": { cat: "cosmos", desc: "Regions of spacetime where gravity is so extreme that nothing — not even light — can escape.", conn: [["gravity", .95], ["time", .85], ["quantum physics", .8], ["universe", .8], ["information theory", .65]] },
  "stars": { cat: "cosmos", desc: "Massive luminous plasma spheres fusing hydrogen into heavier elements — the universe's furnaces.", conn: [["nuclear fusion", .95], ["gravity", .85], ["universe", .9], ["chemistry", .8], ["life", .6]] },
  "big bang": { cat: "cosmos", desc: "The cosmological origin event ~13.8 billion years ago from which all matter, space, and time emerged.", conn: [["universe", .95], ["time", .9], ["physics", .85], ["quantum physics", .75]] },
  "galaxies": { cat: "cosmos", desc: "Massive gravitational systems of billions of stars, gas, dust, and dark matter.", conn: [["universe", .9], ["stars", .9], ["dark matter", .8], ["black holes", .75]] },
  "time": { cat: "cosmos", desc: "The dimension in which events occur in sequence — woven into spacetime by relativity.", conn: [["universe", .9], ["physics", .85], ["gravity", .85], ["consciousness", .75], ["memory", .7], ["entropy", .75]] },
  "entropy": { cat: "science", desc: "The measure of disorder in a system — always increasing in the universe, giving time its arrow.", conn: [["physics", .9], ["information theory", .85], ["universe", .75], ["time", .75]] },

  "consciousness": { cat: "mind", desc: "The subjective, inner experience of awareness — philosophy's hardest problem.", conn: [["brain", .85], ["philosophy", .9], ["neuroscience", .85], ["perception", .85], ["free will", .8], ["meditation", .7], ["quantum physics", .35]] },
  "brain": { cat: "mind", desc: "The ~86 billion-neuron organ that processes perception, thought, memory, and identity.", conn: [["consciousness", .85], ["neuroscience", .9], ["neural networks", .8], ["memory", .9], ["emotions", .85], ["evolution", .75], ["language", .8]] },
  "neuroscience": { cat: "mind", desc: "Scientific study of the nervous system — bridging biology, chemistry, and psychology.", conn: [["brain", .95], ["consciousness", .85], ["psychology", .8], ["medicine", .75], ["artificial intelligence", .6]] },
  "memory": { cat: "mind", desc: "The cognitive encoding, storage, and retrieval of information — the foundation of identity.", conn: [["brain", .9], ["consciousness", .8], ["emotions", .85], ["time", .7]] },
  "emotions": { cat: "mind", desc: "Complex states combining physiological arousal and conscious feeling — fundamental to behavior.", conn: [["brain", .9], ["music", .85], ["psychology", .8], ["evolution", .7], ["memory", .8]] },
  "perception": { cat: "mind", desc: "How the brain organizes and interprets sensory information to construct our reality.", conn: [["consciousness", .9], ["brain", .9], ["neuroscience", .8]] },
  "meditation": { cat: "mind", desc: "Focused attention practices that reshape brain structure and deepen self-awareness.", conn: [["consciousness", .85], ["brain", .75], ["neuroscience", .7], ["philosophy", .65]] },
  "psychology": { cat: "mind", desc: "Scientific study of the mind and behavior — bridging biology and social science.", conn: [["brain", .85], ["consciousness", .8], ["emotions", .9], ["neuroscience", .85]] },
  "language": { cat: "mind", desc: "A symbolic system enabling humans to share complex thoughts — the carrier of culture.", conn: [["consciousness", .8], ["natural language processing", .9], ["brain", .85], ["culture", .9], ["linguistics", .95]] },
  "linguistics": { cat: "mind", desc: "The scientific study of language structure, acquisition, and relationship to the mind.", conn: [["language", .95], ["natural language processing", .85], ["philosophy", .65]] },

  "philosophy": { cat: "philosophy", desc: "The study of fundamental questions: existence, knowledge, values, reason, and language.", conn: [["consciousness", .9], ["ethics", .85], ["mathematics", .7], ["science", .75], ["free will", .85], ["metaphysics", .9]] },
  "ethics": { cat: "philosophy", desc: "Branch of philosophy examining moral principles, values, and what constitutes right action.", conn: [["philosophy", .9], ["artificial intelligence", .8], ["free will", .75], ["society", .85]] },
  "free will": { cat: "philosophy", desc: "The capacity to make choices unconstrained — the cornerstone debate of determinism vs. agency.", conn: [["consciousness", .85], ["philosophy", .9], ["physics", .75], ["ethics", .8]] },
  "metaphysics": { cat: "philosophy", desc: "Philosophy of fundamental reality — existence, space, time, causality, and the nature of being.", conn: [["philosophy", .95], ["consciousness", .85], ["physics", .75], ["time", .8]] },

  "music": { cat: "arts", desc: "The art of organizing sound in time — a universal language transcending culture and biology.", conn: [["mathematics", .85], ["emotions", .9], ["physics", .75], ["brain", .85], ["creativity", .9], ["harmony", .95], ["rhythm", .9], ["culture", .8]] },
  "harmony": { cat: "arts", desc: "The simultaneous combination of musical notes into chords — built on mathematical frequency ratios.", conn: [["music", .95], ["mathematics", .85], ["physics", .8], ["rhythm", .75]] },
  "rhythm": { cat: "arts", desc: "The pattern of pulses and beats in music — synchronized with the brain's own oscillations.", conn: [["music", .95], ["mathematics", .7], ["brain", .8], ["harmony", .75]] },
  "creativity": { cat: "arts", desc: "The generation of novel ideas and connections — the hallmark of human and emerging machine cognition.", conn: [["music", .85], ["brain", .8], ["consciousness", .8], ["artificial intelligence", .65], ["mathematics", .55]] },
  "culture": { cat: "arts", desc: "Shared beliefs, values, customs, and artifacts binding a community — humanity's collective identity.", conn: [["music", .85], ["language", .9], ["philosophy", .7], ["evolution", .65], ["society", .85]] },

  "evolution": { cat: "science", desc: "The change in heritable characteristics across generations via natural selection and genetic drift.", conn: [["life", .95], ["genetics", .9], ["brain", .8], ["mathematics", .65], ["chemistry", .7], ["time", .8], ["consciousness", .65]] },
  "life": { cat: "science", desc: "Self-sustaining chemical systems capable of growth, metabolism, reproduction, and evolution.", conn: [["evolution", .9], ["chemistry", .9], ["DNA", .95], ["stars", .55], ["consciousness", .65]] },
  "DNA": { cat: "science", desc: "The double-helix molecule encoding genetic instructions for all known living organisms.", conn: [["life", .95], ["evolution", .9], ["genetics", .95], ["chemistry", .85]] },
  "genetics": { cat: "science", desc: "The study of heredity, genes, and genetic variation among organisms.", conn: [["DNA", .95], ["evolution", .9], ["life", .85], ["medicine", .8]] },
  "mathematics": { cat: "science", desc: "The abstract study of quantity, structure, space, and pattern — the language of the universe.", conn: [["physics", .95], ["music", .85], ["universe", .8], ["artificial intelligence", .8], ["philosophy", .7], ["infinity", .85], ["patterns", .9]] },
  "physics": { cat: "science", desc: "The science of matter, energy, space, time, and the fundamental forces of nature.", conn: [["mathematics", .95], ["quantum physics", .9], ["universe", .9], ["chemistry", .85], ["gravity", .9]] },
  "quantum physics": { cat: "science", desc: "Physics of atomic and subatomic scales — probabilistic, wave-like, and observer-dependent.", conn: [["physics", .9], ["universe", .85], ["quantum computing", .9], ["mathematics", .9], ["entanglement", .9], ["consciousness", .35]] },
  "entanglement": { cat: "science", desc: "Quantum phenomenon where distant particles remain correlated — instantaneously and mysteriously.", conn: [["quantum physics", .95], ["quantum computing", .85], ["information theory", .75]] },
  "gravity": { cat: "science", desc: "The fundamental force of attraction between all mass — from apples to galaxy clusters.", conn: [["physics", .9], ["black holes", .9], ["universe", .85], ["time", .85], ["stars", .8]] },
  "chemistry": { cat: "science", desc: "The science of matter's composition, properties, and transformations through atomic interactions.", conn: [["physics", .85], ["life", .9], ["evolution", .75], ["stars", .8]] },
  "statistics": { cat: "science", desc: "The discipline of collecting, analyzing, interpreting, and presenting data.", conn: [["mathematics", .9], ["machine learning", .85], ["data science", .9]] },
  "nuclear fusion": { cat: "science", desc: "Combining atomic nuclei to release immense energy — the process powering every star.", conn: [["stars", .95], ["physics", .9], ["chemistry", .8], ["energy", .85]] },
  "energy": { cat: "science", desc: "The capacity to do work — conserved, transformed, but never created or destroyed.", conn: [["physics", .95], ["nuclear fusion", .85], ["universe", .75], ["chemistry", .75]] },
  "optics": { cat: "science", desc: "The branch of physics studying light and its interaction with matter.", conn: [["physics", .9], ["computer vision", .7], ["astronomy", .8]] },
  "astronomy": { cat: "cosmos", desc: "The scientific study of celestial objects, phenomena, and the structure of the universe.", conn: [["universe", .95], ["physics", .9], ["mathematics", .85], ["stars", .9], ["optics", .8]] },
  "medicine": { cat: "science", desc: "The science and art of healing — diagnosing, treating, and preventing disease.", conn: [["genetics", .8], ["neuroscience", .75], ["chemistry", .8], ["artificial intelligence", .7]] },
  "society": { cat: "philosophy", desc: "Organized communities of humans bound by shared culture, norms, and institutions.", conn: [["ethics", .85], ["culture", .9], ["philosophy", .75], ["evolution", .6], ["artificial intelligence", .7]] },
  "patterns": { cat: "science", desc: "Recurring structures found across nature, language, and mathematics — a signal within noise.", conn: [["mathematics", .9], ["music", .85], ["evolution", .7], ["artificial intelligence", .85], ["consciousness", .75]] },
  "infinity": { cat: "science", desc: "Something without any bound — a mind-bending concept central to mathematics and cosmology.", conn: [["mathematics", .95], ["universe", .6], ["philosophy", .8], ["consciousness", .55]] },
  "science": { cat: "science", desc: "The systematic study of the structure and behavior of the natural world through observation and experiment.", conn: [["mathematics", .85], ["philosophy", .75], ["physics", .9], ["medicine", .7], ["evolution", .7]] },

  // ISLAM
  "Islam": { cat: "philosophy", desc: "One of the world's major Abrahamic religions, founded in the 7th century CE in Arabia, centered on submission to the will of Allah as revealed through the Prophet Muhammad (★).", conn: [["Quran", .95], ["Prophet Muhammad", .95], ["Five Pillars", .95], ["Tawhid", .9], ["Sharia", .85], ["Sunnah", .85], ["Ummah", .8], ["Islamic history", .85], ["Sufism", .7], ["Islamic science", .75]] },
  "Quran": { cat: "philosophy", desc: "The holy scripture of Islam — the literal word of Allah revealed to Prophet Muhammad (★) over 23 years through the Angel Jibreel. It contains guidance, law, and wisdom for all humanity.", conn: [["Islam", .95], ["Prophet Muhammad", .9], ["Sunnah", .85], ["Tawhid", .9], ["Sharia", .8], ["Arabic language", .85]] },
  "Prophet Muhammad": { cat: "philosophy", desc: "The final prophet of Islam (★), born in Mecca c. 570 CE. He received divine revelation, unified Arabia, and founded a civilization that transformed the world within a century of his death.", conn: [["Islam", .95], ["Quran", .9], ["Sunnah", .95], ["Islamic history", .9], ["Mecca", .85], ["Ummah", .8]] },
  "Five Pillars": { cat: "philosophy", desc: "The five core practices of Islam: Shahadah (faith declaration), Salah (prayer), Zakah (charity), Sawm (fasting in Ramadan), and Hajj (pilgrimage to Mecca).", conn: [["Islam", .95], ["Shahadah", .9], ["Salah", .9], ["Zakah", .9], ["Ramadan", .9], ["Hajj", .9]] },
  "Tawhid": { cat: "philosophy", desc: "The Islamic doctrine of the absolute oneness of Allah — the most fundamental concept in Islam, forming the foundation of all belief and practice.", conn: [["Islam", .95], ["Quran", .9], ["philosophy", .7], ["Five Pillars", .85]] },
  "Sharia": { cat: "philosophy", desc: "Islamic law derived from the Quran and Sunnah — a comprehensive moral, spiritual, and legal framework governing all aspects of Muslim life.", conn: [["Islam", .9], ["Quran", .85], ["Sunnah", .9], ["ethics", .8], ["society", .75]] },
  "Sunnah": { cat: "philosophy", desc: "The recorded words, actions, and approvals of Prophet Muhammad (★), preserved in the Hadith. Alongside the Quran, it forms the primary source of Islamic guidance.", conn: [["Islam", .9], ["Prophet Muhammad", .95], ["Quran", .85], ["Sharia", .9], ["Islamic history", .8]] },
  "Ummah": { cat: "philosophy", desc: "The global Muslim community — a transnational brotherhood bound not by ethnicity or nationality but by shared faith in Islam.", conn: [["Islam", .85], ["Prophet Muhammad", .8], ["Hajj", .75], ["society", .8]] },
  "Islamic history": { cat: "philosophy", desc: "A 1,400-year legacy spanning the birth of Islam in Mecca, the golden age of Islamic civilization, the Caliphates, and the spread of Islam across Asia, Africa, and Europe.", conn: [["Islam", .9], ["Prophet Muhammad", .9], ["Caliphate", .9], ["Islamic science", .85], ["Mecca", .8]] },
  "Sufism": { cat: "philosophy", desc: "The mystical dimension of Islam focused on the inner, spiritual path toward closeness with Allah through meditation, remembrance (dhikr), and purification of the soul.", conn: [["Islam", .8], ["consciousness", .6], ["meditation", .75], ["philosophy", .65]] },
  "Islamic science": { cat: "science", desc: "The extraordinary scientific achievements of Islamic civilization (8th–14th century) in algebra, astronomy, medicine, optics, and philosophy that preserved and advanced human knowledge.", conn: [["Islam", .85], ["Islamic history", .85], ["mathematics", .9], ["astronomy", .85], ["medicine", .8]] },
  "Caliphate": { cat: "philosophy", desc: "The Islamic state led by a Caliph (successor to the Prophet), representing Muslim political and spiritual authority. Major caliphates include the Rashidun, Umayyad, Abbasid, and Ottoman.", conn: [["Islamic history", .95], ["Islam", .85], ["society", .7]] },
  "Mecca": { cat: "cosmos", desc: "The holiest city in Islam, birthplace of Prophet Muhammad (★) and home of the Masjid al-Haram and the Kaaba — the direction all Muslims face in prayer.", conn: [["Islam", .95], ["Hajj", .95], ["Prophet Muhammad", .9], ["Five Pillars", .85]] },
  "Hajj": { cat: "philosophy", desc: "The annual pilgrimage to Mecca — one of the Five Pillars of Islam, obligatory once in a lifetime for every able Muslim. It commemorates the trials of Ibrahim and Ismail (★★).", conn: [["Five Pillars", .95], ["Mecca", .95], ["Islam", .9], ["Ummah", .8]] },
  "Ramadan": { cat: "philosophy", desc: "The ninth month of the Islamic lunar calendar — a month of fasting (Sawm), prayer, reflection, and community. The Quran was first revealed during Ramadan.", conn: [["Five Pillars", .95], ["Islam", .9], ["Quran", .85], ["Ummah", .75]] },
  "Salah": { cat: "philosophy", desc: "The five daily prayers — the direct, unmediated connection between a Muslim and Allah, performed at dawn, midday, afternoon, sunset, and night.", conn: [["Five Pillars", .95], ["Islam", .9], ["Quran", .8], ["Mecca", .7]] },
  "Zakah": { cat: "philosophy", desc: "Obligatory almsgiving — 2.5% of savings given annually to those in need, purifying wealth and redistributing resources within the Muslim community.", conn: [["Five Pillars", .95], ["Islam", .9], ["ethics", .85], ["society", .8]] },
  "Shahadah": { cat: "philosophy", desc: "The Islamic declaration of faith: 'There is no god but Allah, and Muhammad is His messenger.' The first and most fundamental of the Five Pillars.", conn: [["Five Pillars", .95], ["Islam", .95], ["Tawhid", .9]] },
  "Arabic language": { cat: "arts", desc: "The sacred language of the Quran and Islamic scholarship — one of the world's oldest languages and a profound vehicle of faith, poetry, and civilization.", conn: [["Quran", .95], ["Islam", .85], ["Islamic history", .8], ["linguistics", .8]] }
};

export function getKBData(k, aiGraph) {
  if (aiGraph && aiGraph[k]) return aiGraph[k];
  if (KB[k]) return KB[k];
  const lowKey = k.toLowerCase().trim();
  const realKey = Object.keys(KB).find(key => key.toLowerCase() === lowKey);
  return realKey ? KB[realKey] : null;
}

export function getColor(k, aiGraph) {
  const d = getKBData(k, aiGraph);
  return d ? CAT_COLOR[d.cat] || '#aaaaaa' : '#aaaaaa';
}
