window.THINKDOTS = window.THINKDOTS || {};

window.THINKDOTS.CAT_COLOR = {
  logic: 'var(--cat-logic)', syntax: 'var(--cat-syntax)', tools: 'var(--cat-tools)',
  frontend: 'var(--cat-frontend)', backend: 'var(--cat-backend)', data: 'var(--cat-data)'
};

window.THINKDOTS.KB = {
  // PYTHON ROADMAP (REFINED & EXPANDED)
  "python": { cat: "syntax", desc: "Python is a high-level, interpreted language known for its readability and vast ecosystem.", conn: [["variables", .95], ["data types", .9], ["loops", .85], ["functions", .85], ["libraries", .8], ["decorators", .75], ["generators", .7], ["asyncio", .7], ["dunder methods", .75]] },
  "variables": { cat: "logic", desc: "Dynamic containers that store data without explicit type declarations.", conn: [["python", .9], ["assignment", .95], ["memory", .6], ["scope", .8]] },
  "data types": { cat: "syntax", desc: "Integers, Strings, Floats, Booleans, and complex types like Lists and Dicts.", conn: [["python", .95], ["lists", .9], ["dictionaries", .85], ["tuples", .8], ["sets", .8]] },
  "loops": { cat: "logic", desc: "Structures like 'for' and 'while' used to iterate over data collections.", conn: [["python", .9], ["for loops", .95], ["while loops", .95], ["list comprehension", .9], ["iterators", .8]] },
  "functions": { cat: "logic", desc: "Modular code blocks that take inputs (arguments) and return results.", conn: [["python", .9], ["lambda", .85], ["recursion", .8], ["args & kwargs", .85], ["closures", .75]] },
  "pip": { cat: "tools", desc: "The package installer for Python, connecting you to thousands of libraries.", conn: [["python", .8], ["libraries", .95], ["venv", .9], ["requirements.txt", .85]] },
  "libraries": { cat: "tools", desc: "Essential pre-built code like Pandas (data), NumPy (math), and Requests (web).", conn: [["python", .85], ["pip", .95], ["data science", .9], ["flask", .8]] },
  "decorators": { cat: "logic", desc: "A way to modify the behavior of a function or class without changing its source code.", conn: [["python", .9], ["functions", .95], ["wrappers", .9]] },
  "generators": { cat: "logic", desc: "Memory-efficient functions that yield values one at a time using 'yield'.", conn: [["python", .9], ["iterators", .95], ["memory optimization", .85]] },
  "asyncio": { cat: "logic", desc: "A library to write concurrent code using the async/await syntax.", conn: [["python", .9], ["asynchronous programming", .95], ["event loop", .9]] },

  // JAVASCRIPT ROADMAP (WEB & BEYOND)
  "javascript": { cat: "syntax", desc: "The engine of the web. Essential for frontend, backend, and everywhere in between.", conn: [["dom", .95], ["es6+", .9], ["react", .85], ["node.js", .85], ["typescript", .8], ["json", .9], ["closures", .75], ["prototypes", .7]] },
  "dom": { cat: "frontend", desc: "The Document Object Model — how JS interacts with HTML elements.", conn: [["javascript", .95], ["html", .9], ["events", .95], ["selectors", .9]] },
  "es6+": { cat: "syntax", desc: "Modern JS features like arrow functions, destructuring, and template literals.", conn: [["javascript", .95], ["let & const", .95], ["modules", .9]] },
  "async javascript": { cat: "logic", desc: "Handling time-consuming tasks without freezing the UI (Promises, Async/Await).", conn: [["javascript", .9], ["promises", .95], ["fetch api", .9], ["callbacks", .85]] },
  "react": { cat: "frontend", desc: "A component-based library for building fast, modern user interfaces.", conn: [["javascript", .85], ["hooks", .95], ["redux", .85], ["next.js", .9], ["vdom", .8]] },
  "typescript": { cat: "syntax", desc: "JavaScript with syntax for types, catching errors before you run your code.", conn: [["javascript", .95], ["interfaces", .9], ["generics", .8], ["static typing", .95]] },
  "node.js": { cat: "backend", desc: "JS outside the browser. Used to build scalable server-side systems.", conn: [["javascript", .9], ["express", .95], ["npm", .95], ["file system", .8]] },

  // C++ & SYSTEMS
  "c++": { cat: "syntax", desc: "A performance-critical language used in game engines and browsers.", conn: [["pointers", .95], ["stl", .9], ["memory management", .95], ["templates", .85], ["oop", .9]] },
  "pointers": { cat: "logic", desc: "Variables that hold memory addresses, allowing direct hardware control.", conn: [["c++", .95], ["memory", .95], ["smart pointers", .9], ["references", .85]] },
  "stl": { cat: "tools", desc: "The Standard Template Library — a collection of containers and algorithms.", conn: [["c++", .95], ["vectors", .9], ["maps", .9], ["algorithms", .85]] },
  "templates": { cat: "syntax", desc: "Blueprint code that works with any data type, enabling generic programming.", conn: [["c++", .9], ["generics", .95], ["meta-programming", .7]] },

  // FRONTEND & UX
  "html": { cat: "frontend", desc: "The structure of the web. Semantic HTML improves SEO and accessibility.", conn: [["css", .95], ["web development", .95], ["accessibility", .85]] },
  "css": { cat: "frontend", desc: "Design and layout. Master Flexbox and Grid to build stunning UIs.", conn: [["html", .95], ["flexbox", .95], ["tailwind", .85], ["sass", .8], ["animations", .85]] },
  "tailwind": { cat: "frontend", desc: "A utility-first CSS framework for rapid UI development.", conn: [["css", .9], ["responsive design", .95], ["post-css", .8]] },

  // BACKEND & CLOUD
  "backend": { cat: "backend", desc: "The 'brain' behind the scenes: logic, data storage, and security.", conn: [["node.js", .9], ["database", .95], ["auth", .9], ["rest api", .95], ["graphql", .8]] },
  "database": { cat: "data", desc: "Where data lives. Choose SQL for structure or NoSQL for scale.", conn: [["sql", .95], ["mongodb", .9], ["postgresql", .9], ["normalization", .8]] },
  "docker": { cat: "tools", desc: "Packaging your app into containers that run anywhere.", conn: [["devops", .9], ["backend", .85], ["kubernetes", .9]] },
  "authentication": { cat: "logic", desc: "Identifying who a user is (JWT, OAuth, Cookies).", conn: [["backend", .9], ["security", .95], ["json web tokens", .9]] },

  // LOGIC & ARCHITECTURE
  "algorithms": { cat: "logic", desc: "Optimizing code using Data Structures and Time Complexity analysis.", conn: [["big o", .95], ["sorting", .9], ["graphs", .8], ["binary trees", .85]] },
  "design patterns": { cat: "logic", desc: "Proven solutions to common software architecture problems.", conn: [["dry", .9], ["singleton", .85], ["observer", .85], ["solid", .95]] },
  "unit testing": { cat: "tools", desc: "Writing code to test your code, ensuring long-term reliability.", conn: [["tdd", .9], ["jest", .9], ["pytest", .9], ["qa", .85]] },

  // DATA SCIENCE
  "data science": { cat: "data", desc: "Extracting insights from data using statistics and machine learning.", conn: [["python", .9], ["pandas", .95], ["numpy", .95], ["machine learning", .9]] },
  "machine learning": { cat: "logic", desc: "Training algorithms to find patterns and make predictions.", conn: [["data science", .95], ["neural networks", .9], ["scikit-learn", .9], ["pytorch", .85]] }
};

window.THINKDOTS.getKBData = function(k, aiGraph) {
  if (aiGraph && aiGraph[k]) return aiGraph[k];
  if (window.THINKDOTS.KB[k]) return window.THINKDOTS.KB[k];
  const lowKey = k.toLowerCase().trim();
  const realKey = Object.keys(window.THINKDOTS.KB).find(key => key.toLowerCase() === lowKey);
  return realKey ? window.THINKDOTS.KB[realKey] : null;
};

// This helper resolves the CSS variable value for the canvas
function resolveColor(cssVar) {
    if (!cssVar.startsWith('var(')) return cssVar;
    const name = cssVar.slice(4, -1);
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#aaaaaa';
}

window.THINKDOTS.getColor = function(k, aiGraph) {
  const d = window.THINKDOTS.getKBData(k, aiGraph);
  if (!d) return '#aaaaaa';
  const raw = window.THINKDOTS.CAT_COLOR[d.cat] || '#aaaaaa';
  return resolveColor(raw);
};
