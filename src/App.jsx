import { useState, useCallback } from 'react';

const quotes = [
  "Play it for the first person you see, and ask them for advice",
  "Always be a beginner",
  "Ask your body",
  "Assemble some of the elements in a group and treat the group",
  "Be dirty",
  "Be extravagant",
  "Be less critical more often",
  "Breathe more deeply",
  "Bridges (-build -burn)",
  "Cascades",
  "Change nothing and continue with immaculate consistency",
  "Children (-speaking -singing)",
  "Cluster analysis",
  "Consult other sources (-promising -unpromising)",
  "Convert a melodic element into a rhythmic element",
  "Courage!",
  "Decorate, decorate",
  "Define an area as \"gospel\" and use it as an anchor",
  "Destroy (-nothing -the most important thing)",
  "Discard an axiom",
  "Disciplined self-indulgence",
  "Discover the recipes you are using and abandon them",
  "Distorting time",
  "Do nothing for as long as possible",
  "Do something boring",
  "Do the washing up",
  "Do the words need changing?",
  "Do we need holes?",
  "Don't be afraid of things because they're easy to do",
  "Don't be frightened of clichés",
  "Don't be frightened to display your talents",
  "Don't break the silence",
  "Don't stress one thing more than another",
  "Emphasize differences",
  "Emphasize repetitions",
  "Emphasize the flaws",
  "Faced with a choice, do both",
  "Ghost echoes",
  "Give the game away",
  "Give way to your worst impulse",
  "Go slowly all the way round the outside",
  "Go to an extreme, move back to a more comfortable place",
  "Honor thy error as a hidden intention",
  "How would you have written it?",
  "Humanize something free of error",
  "If the composer didn't write it, would you still play it?",
  "Infinitesimal gradations",
  "Intentions (-credibility -nobility -humility)",
  "Into the impossible",
  "Is it really finished?",
  "Is there something missing?",
  "It is quite possible (after all)",
  "Just carry on",
  "Listen to the quiet voice",
  "Look at the order in which you do things",
  "Practice the slow part much slower",
  "Make a blank valuable by putting it in an exquisite frame",
  "Make an exhaustive list of everything you might do and do the last thing on the list",
  "Mute your instrument",
  "Not building a wall but making a brick",
  "Once the search is in progress, something will be found",
  "Only a part, not the whole",
  "Only one element of each kind",
  "(Organic) machinery",
  "Overtly resist change",
  "Play faster",
  "Put in earplugs",
  "Question the heroic approach",
  "Remove a restriction (Allow an easement)",
  "Remove ambiguities and convert to specifics",
  "Remove specifics and convert to ambiguities",
  "Repetition is a form of change",
  "Retrace your steps",
  "Simply a matter of work",
  "Slow fingers, fast brain",
  "State the problem in words as clearly as possible",
  "Take a break",
  "Take away the elements in order of apparent non-importance",
  "The inconsistency principle",
  "The most important thing is the thing most easily forgotten",
  "How would it sound on AM radio?",
  "Tidy up",
  "Towards the insignificant",
  "Ask \"unqualified\" people",
  "Use an unacceptable color",
  "Water",
  "What are you really thinking about just now?",
  "What is intonation?",
  "What is the reality of the situation?",
  "What mistakes did you make last time?",
  "What would make this really successful?",
  "What would your closest friend do?",
  "What wouldn't you do?",
  "Work at a different speed",
  "Would anybody want it?",
  "You are an engineer",
  "You don't have to be ashamed of using your own ideas",
  "?",
  "Treat the repeats as memories, not facts.",
  "The sound begins in the breath of the person sitting next to you.",
  "Your instrument is a guest in your house",
  "Your technique is a servant who has been given the night off.",
  "Listen to the sound of the room before you interrupt it.",
  "Exaggerate the transitions",
  "What if this piece were never intended to be heard by an audience?",
  "Your instrument is already vibrating",
  "Play as if you are struggling to remember a dream you had years ago.",
  "You are tired. Incorporate that.",
  "Beauty is a distraction"
];

const getRandomQuote = (currentQuote = null) => {
  let newQuote;
  do {
    newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  } while (newQuote === currentQuote && quotes.length > 1);
  return newQuote;
};

const backgrounds = [
  '/black-paper.jpeg',
  '/black-paper2.jpeg'
];

export default function App() {
  const [quote, setQuote] = useState(() => getRandomQuote());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [displayQuote, setDisplayQuote] = useState(quote);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const handleNewQuote = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setIsThinking(true);

    // Think for 2-3 seconds
    const thinkingTime = 2000 + Math.random() * 1000;
    
    // After thinking, start the quote exit animation
    setTimeout(() => {
      setIsThinking(false);
      setIsExiting(true);
    }, thinkingTime);

    // Change the quote and background after exit animation completes
    setTimeout(() => {
      const newQuote = getRandomQuote(quote);
      setQuote(newQuote);
      setDisplayQuote(newQuote);
      setIsExiting(false);
      setBackgroundIndex(prev => (prev + 1) % 2);
    }, thinkingTime + 500);

    // Allow new clicks after enter animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, thinkingTime + 1100);
  }, [quote, isTransitioning]);

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      background: '#0C0C0C',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      paddingTop: 'max(2rem, env(safe-area-inset-top))',
      paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
      paddingLeft: 'max(2rem, env(safe-area-inset-left))',
      paddingRight: 'max(2rem, env(safe-area-inset-right))',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'manipulation',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Background images with crossfade */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: backgroundIndex === index ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Subtle grain texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.4,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        zIndex: 1,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120vw',
        height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      
      {/* Quote */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '900px',
        position: 'relative',
        zIndex: 2
      }}>
        <p
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
            lineHeight: 1.4,
            color: '#E8E4E0',
            textAlign: 'center',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            margin: 0,
            padding: '0 1rem',
            animation: isExiting
              ? 'exitQuote 500ms cubic-bezier(0.4, 0, 1, 1) forwards' 
              : isThinking 
                ? 'none'
                : 'enterQuote 600ms cubic-bezier(0, 0, 0.2, 1) forwards',
          }}
        >
          {displayQuote}
        </p>
      </div>
      
      {/* New Strategy Button */}
      <button
        onClick={handleNewQuote}
        disabled={isTransitioning}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          padding: '0.75rem 1.25rem',
          marginTop: '2rem',
          marginBottom: '2rem',
          fontSize: '0.75rem',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.05em',
          textTransform: 'lowercase',
          cursor: isTransitioning ? 'default' : 'pointer',
          transition: 'all 0.3s ease',
          opacity: isTransitioning ? 0.3 : 1,
          position: 'relative',
          zIndex: 2
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.target.style.color = 'rgba(255, 255, 255, 0.4)';
        }}
      >
        <span style={{ visibility: isThinking ? 'hidden' : 'visible' }}>
          new strategy
        </span>
        {isThinking && (
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            inset: 0,
          }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  animation: `thinkingDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </button>
      
      {/* Keyframe Animations */}
      <style>{`
        @keyframes enterQuote {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
        
        @keyframes exitQuote {
          0% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            filter: blur(16px);
            transform: translateY(-24px);
          }
        }
        
        @keyframes thinkingDot {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          background: #0C0C0C;
        }
        
        ::selection {
          background: rgba(255, 255, 255, 0.15);
        }
        
        button:focus {
          outline: none;
        }
        
        button:focus-visible {
          border-color: rgba(255, 255, 255, 0.5) !important;
          color: rgba(255, 255, 255, 0.7) !important;
        }
      `}</style>
    </div>
  );
}
