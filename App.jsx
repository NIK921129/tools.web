import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const sidebarData = [
    { category: "Media Tools", tools: [
        { id: "img-to-pdf", label: "📄 Image to PDF" },
        { id: "img-compress", label: "🗜️ Image Compressor" }
    ]},
    { category: "Design Tools", tools: [
        { id: "color-palette", label: "🎨 Color Palette Gen" },
        { id: "css-gradient", label: "🌈 CSS Gradient Gen" },
        { id: "border-radius", label: "⭕ Border Radius Gen" },
        { id: "hex-rgb", label: "🖌️ HEX to RGB" },
        { id: "box-shadow", label: "🧊 Box Shadow Gen" },
        { id: "contrast-chk", label: "🌗 Contrast Checker" }
    ]},
    { category: "Text Tools", tools: [
        { id: "word-count", label: "📝 Word/Char Counter" },
        { id: "case-convert", label: "🔠 Case Converter" },
        { id: "text-reverse", label: "🔄 Text Reverser" },
        { id: "space-remove", label: "🧹 Remove Extra Spaces" },
        { id: "lorem-ipsum", label: "📖 Lorem Ipsum Gen" },
        { id: "slug-gen", label: "🔗 URL Slug Gen" },
        { id: "html-entity", label: "<> HTML Entities" },
        { id: "text-binary", label: "01 Text <> Binary" },
        { id: "word-shuffle", label: "🔀 Word Shuffle" },
        { id: "vowel-cons", label: "🅰️ Vowel Counter" },
        { id: "morse-code", label: "📡 Morse Code Tool" },
        { id: "palindrome-chk", label: "🔁 Palindrome Check" },
        { id: "text-repeat", label: "📑 Text Repeater" },
        { id: "line-break-rem", label: "🚫 Remove Line Breaks" },
        { id: "anagram-chk", label: "🔠 Anagram Checker" }
    ]},
    { category: "Developer Tools", tools: [
        { id: "json-format", label: "{} JSON Formatter" },
        { id: "json-minify", label: "📉 JSON Minifier" },
        { id: "base64-tool", label: "🔐 Base64 Encode/Decode" },
        { id: "url-tool", label: "🔗 URL Encode/Decode" },
        { id: "jwt-decoder", label: "🔓 JWT Decoder" },
        { id: "hash-gen", label: "#️⃣ SHA-256 Hash Gen" },
        { id: "uuid-gen", label: "🔑 UUID Generator" },
        { id: "pwd-gen", label: "🛡️ Password Generator" },
        { id: "keycode-info", label: "⌨️ Keycode Finder" },
        { id: "xml-format", label: "📋 XML Formatter" },
        { id: "css-minify", label: "🎨 CSS Minifier" },
        { id: "html-minify", label: "🌐 HTML Minifier" },
        { id: "regex-test", label: "🔍 Regex Tester" }
    ]},
    { category: "Math & Finance", tools: [
        { id: "calculator", label: "🧮 Calculator" },
        { id: "base-conv", label: "🔟 Base Converter" },
        { id: "tip-calc", label: "💵 Tip Calculator" },
        { id: "disc-calc", label: "🏷️ Discount Calc" },
        { id: "interest-calc", label: "📈 Interest Calc" },
        { id: "prime-chk", label: "🔢 Prime Checker" },
        { id: "pct-calc", label: "% Percentage Calc" },
        { id: "bmi-calc", label: "⚖️ BMI Calculator" },
        { id: "age-calc", label: "🎂 Age Calculator" },
        { id: "compound-int", label: "📈 Compound Interest" },
        { id: "roman-num", label: "🏛️ Roman Numerals" },
        { id: "gcd-lcm", label: "➗ GCD & LCM Calc" }
    ]},
    { category: "Utility & Time", tools: [
        { id: "qr-gen", label: "🔳 QR Code Gen" },
        { id: "pomodoro", label: "🍅 Pomodoro Timer" },
        { id: "stopwatch", label: "⏱️ Stopwatch" },
        { id: "unix-time", label: "⏳ Unix Time Convert" },
        { id: "date-diff", label: "📅 Date Difference" },
        { id: "leap-year", label: "🐸 Leap Year Check" },
        { id: "temp-conv", label: "🌡️ Temperature Conv" },
        { id: "length-conv", label: "📏 Length Converter" },
        { id: "weight-conv", label: "⚖️ Weight Converter" },
        { id: "data-conv", label: "💾 Data Storage Conv" },
        { id: "speed-conv", label: "🚗 Speed Converter" },
        { id: "countdown-timer", label: "⏲️ Countdown Timer" }
    ]},
    { category: "Fun & Games", tools: [
        { id: "coin-flip", label: "🪙 Coin Flipper" },
        { id: "dice-roll", label: "🎲 Dice Roller" },
        { id: "rng-tool", label: "🎰 Random Number" },
        { id: "magic-8-ball", label: "🎱 Magic 8 Ball" },
        { id: "joke-gen", label: "😂 Joke Generator" }
    ]}
];

export default function App() {
    const [theme, setTheme] = useState('light');
    const [activeTab, setActiveTab] = useState('img-to-pdf');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === 'amoled' ? 'light' : 'amoled';
        setTheme(newTheme);
        if (newTheme === 'amoled') {
            document.body.setAttribute('data-theme', 'amoled');
        } else {
            document.body.removeAttribute('data-theme');
        }
    };

    return (
        <div className="app-wrapper">
            <nav className="navbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} title="Open Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <div className="logo">✨ NIK TOOLS</div>
                </div>
                <button id="theme-toggle" className="theme-btn" onClick={toggleTheme}>
                    {theme === 'amoled' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </nav>

            <div className="app-layout">
                <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div style={{ position: 'sticky', top: 0, backgroundColor: 'var(--bg-color)', zIndex: 10, paddingBottom: '0.5rem' }}>
                        <input 
                            type="text" 
                            placeholder="🔍 Search tools..." 
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value)} 
                            style={{ width: '100%' }} 
                        />
                    </div>
                    {sidebarData.map((cat, idx) => {
                        const filtered = cat.tools.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));
                        if (filtered.length === 0) return null;
                        return (
                            <React.Fragment key={idx}>
                                <div className="sidebar-category">{cat.category}</div>
                                {filtered.map(tool => (
                                    <button key={tool.id} className={`nav-btn ${activeTab === tool.id ? 'active' : ''}`} onClick={() => { setActiveTab(tool.id); setIsSidebarOpen(false); }}>
                                        {tool.label}
                                    </button>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </aside>
                
                <main className="main-content">
                    <div className="container">
                        {activeTab === 'img-to-pdf' && <ImageToPdf />}
                        {activeTab === 'img-compress' && <ImageCompressor />}
                        {activeTab === 'color-palette' && <ColorPaletteGen />}
                        {activeTab === 'css-gradient' && <CssGradientGen />}
                        {activeTab === 'border-radius' && <BorderRadiusGen />}
                        {activeTab === 'calculator' && <Calculator />}
                        {activeTab === 'word-count' && <WordCounter />}
                        {activeTab === 'case-convert' && <CaseConverter />}
                        {activeTab === 'text-reverse' && <TextReverser />}
                        {activeTab === 'space-remove' && <SpaceRemover />}
                        {activeTab === 'lorem-ipsum' && <LoremGenerator />}
                        {activeTab === 'slug-gen' && <SlugGen />}
                        {activeTab === 'html-entity' && <HtmlEntityTool />}
                        {activeTab === 'text-binary' && <TextToBinary />}
                        {activeTab === 'word-shuffle' && <WordShuffle />}
                        {activeTab === 'vowel-cons' && <VowelConsonant />}
                        {activeTab === 'json-format' && <JsonFormatter />}
                        {activeTab === 'json-minify' && <JsonMinifier />}
                        {activeTab === 'base64-tool' && <Base64Tool />}
                        {activeTab === 'url-tool' && <UrlTool />}
                        {activeTab === 'jwt-decoder' && <JwtDecoder />}
                        {activeTab === 'hash-gen' && <HashGenerator />}
                        {activeTab === 'uuid-gen' && <UuidGenerator />}
                        {activeTab === 'pwd-gen' && <PasswordGenerator />}
                        {activeTab === 'hex-rgb' && <HexRgbConverter />}
                        {activeTab === 'box-shadow' && <BoxShadowGenerator />}
                        {activeTab === 'keycode-info' && <KeycodeFinder />}
                        {activeTab === 'qr-gen' && <QrGenerator />}
                        {activeTab === 'pomodoro' && <PomodoroTimer />}
                        {activeTab === 'date-diff' && <DateDifference />}
                        {activeTab === 'leap-year' && <LeapYear />}
                        {activeTab === 'coin-flip' && <CoinFlipper />}
                        {activeTab === 'dice-roll' && <DiceRoller />}
                        {activeTab === 'rng-tool' && <RandomNumber />}
                        {activeTab === 'base-conv' && <BaseConverter />}
                        {activeTab === 'tip-calc' && <TipCalc />}
                        {activeTab === 'disc-calc' && <DiscountCalc />}
                        {activeTab === 'interest-calc' && <InterestCalc />}
                        {activeTab === 'prime-chk' && <PrimeChecker />}
                        {activeTab === 'bmi-calc' && <BmiCalculator />}
                        {activeTab === 'age-calc' && <AgeCalculator />}
                        {activeTab === 'pct-calc' && <PercentageCalculator />}
                        {activeTab === 'stopwatch' && <Stopwatch />}
                        {activeTab === 'unix-time' && <UnixConverter />}
                        {activeTab === 'contrast-chk' && <ContrastChecker />}
                        {activeTab === 'morse-code' && <MorseCodeTool />}
                        {activeTab === 'palindrome-chk' && <PalindromeChecker />}
                        {activeTab === 'text-repeat' && <TextRepeater />}
                        {activeTab === 'line-break-rem' && <LineBreakRemover />}
                        {activeTab === 'anagram-chk' && <AnagramChecker />}
                        {activeTab === 'xml-format' && <XmlFormatter />}
                        {activeTab === 'css-minify' && <CssMinifier />}
                        {activeTab === 'html-minify' && <HtmlMinifier />}
                        {activeTab === 'regex-test' && <RegexTester />}
                        {activeTab === 'compound-int' && <CompoundInterestCalc />}
                        {activeTab === 'roman-num' && <RomanNumeralConverter />}
                        {activeTab === 'gcd-lcm' && <GcdLcmCalculator />}
                        {activeTab === 'temp-conv' && <TemperatureConverter />}
                        {activeTab === 'length-conv' && <LengthConverter />}
                        {activeTab === 'weight-conv' && <WeightConverter />}
                        {activeTab === 'data-conv' && <DataStorageConverter />}
                        {activeTab === 'speed-conv' && <SpeedConverter />}
                        {activeTab === 'countdown-timer' && <CountdownTimer />}
                        {activeTab === 'magic-8-ball' && <Magic8Ball />}
                        {activeTab === 'joke-gen' && <JokeGenerator />}
                    </div>
                </main>
            </div>
        </div>
    );
}

// --- UTILITY COMPONENTS ---
function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
            {copied ? '✅' : '📋'}
        </button>
    );
}

// --- TEXT TOOLS ---

function WordCounter() {
    const [text, setText] = useState('');
    return (
        <section className="tool-section active">
            <h2>Word & Character Counter</h2>
            <textarea className="tool-textarea" placeholder="Type or paste text here..." value={text} onChange={e => setText(e.target.value)}></textarea>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Words: <br/><strong style={{fontSize:'1.5rem'}}>{text.trim() ? text.trim().split(/\s+/).length : 0}</strong></div>
                <div className="result-box text-center">Characters: <br/><strong style={{fontSize:'1.5rem'}}>{text.length}</strong></div>
            </div>
        </section>
    );
}

function ContrastChecker() {
    const [hex1, setHex1] = useState('#ffffff');
    const [hex2, setHex2] = useState('#000000');
    
    const getLuminance = (hex) => {
        let rgb = parseInt(hex.slice(1), 16);
        let r = (rgb >> 16) & 0xff;
        let g = (rgb >>  8) & 0xff;
        let b = (rgb >>  0) & 0xff;
        let a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    
    return (
        <section className="tool-section active">
            <h2>Color Contrast Checker</h2>
            <div className="controls">
                <label>Background: <input type="color" value={hex1} onChange={e=>setHex1(e.target.value)} style={{padding:0}} /></label>
                <label>Text Color: <input type="color" value={hex2} onChange={e=>setHex2(e.target.value)} style={{padding:0}} /></label>
            </div>
            <div style={{backgroundColor: hex1, color: hex2, padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1rem'}}>
                <h3 style={{color: hex2}}>Preview Text</h3>
                <p style={{color: hex2, marginBottom: 0}}>This is how your text will look.</p>
            </div>
            <div className="result-box text-center">
                Contrast Ratio: <h2>{ratio.toFixed(2)}:1</h2>
                <span style={{color: ratio >= 4.5 ? '#bcd81d' : '#d10536'}}>{ratio >= 4.5 ? 'Pass (AA)' : 'Fail'}</span>
            </div>
        </section>
    );
}

function MorseCodeTool() {
    const [text, setText] = useState('');
    const [mode, setMode] = useState('toMorse');
    const dict = { 'A':'.-', 'B':'-...', 'C':'-.-.', 'D':'-..', 'E':'.', 'F':'..-.', 'G':'--.', 'H':'....', 'I':'..', 'J':'.---', 'K':'-.-', 'L':'.-..', 'M':'--', 'N':'-.', 'O':'---', 'P':'.--.', 'Q':'--.-', 'R':'.-.', 'S':'...', 'T':'-', 'U':'..-', 'V':'...-', 'W':'.--', 'X':'-..-', 'Y':'-.--', 'Z':'--..', '1':'.----', '2':'..---', '3':'...--', '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.', '0':'-----', ' ':'/' };
    const revDict = Object.fromEntries(Object.entries(dict).map(([k, v]) => [v, k]));
    
    let result = '';
    if (mode === 'toMorse') {
        result = text.toUpperCase().split('').map(c => dict[c] || c).join(' ');
    } else {
        result = text.split(' ').map(c => revDict[c] || c).join('').replace(/\//g, ' ');
    }
    
    return (
        <section className="tool-section active">
            <h2>Morse Code Converter</h2>
            <div className="controls mt-2" style={{justifyContent:'center'}}>
                <button className={`theme-btn ${mode === 'toMorse' ? 'active' : ''}`} onClick={()=>setMode('toMorse')}>Text to Morse</button>
                <button className={`theme-btn ${mode === 'toText' ? 'active' : ''}`} onClick={()=>setMode('toText')}>Morse to Text</button>
            </div>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)} placeholder={mode === 'toMorse' ? "Enter text..." : "Enter morse code (use spaces between letters, / for words)..."}></textarea>
            <textarea className="tool-textarea mt-2" readOnly value={result} placeholder="Result..."></textarea>
        </section>
    );
}

function PalindromeChecker() {
    const [text, setText] = useState('');
    const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isPal = clean.length > 0 && clean === clean.split('').reverse().join('');
    
    return (
        <section className="tool-section active">
            <h2>Palindrome Checker</h2>
            <input type="text" style={{width:'100%'}} placeholder="Type a word or phrase..." value={text} onChange={e=>setText(e.target.value)} />
            <div className="result-box text-center mt-2">
                {text.length === 0 ? <h3>...</h3> : <h2 style={{color: isPal ? '#bcd81d' : '#d10536'}}>{isPal ? 'It is a Palindrome!' : 'Not a Palindrome'}</h2>}
            </div>
        </section>
    );
}

function TextRepeater() {
    const [text, setText] = useState('');
    const [count, setCount] = useState(5);
    const [sep, setSep] = useState(' ');
    
    return (
        <section className="tool-section active">
            <h2>Text Repeater</h2>
            <div className="controls">
                <label>Text: <input type="text" value={text} onChange={e=>setText(e.target.value)} /></label>
                <label>Repeat Count: <input type="number" min="1" max="10000" value={count} onChange={e=>setCount(e.target.value)} /></label>
                <label>Separator: <input type="text" value={sep} onChange={e=>setSep(e.target.value)} /></label>
            </div>
            <textarea className="tool-textarea mt-2" readOnly value={Array(Number(count)).fill(text).join(sep)} placeholder="Result..."></textarea>
        </section>
    );
}

function LineBreakRemover() {
    const [text, setText] = useState('');
    return (
        <section className="tool-section active">
            <h2>Remove Line Breaks</h2>
            <textarea className="tool-textarea" placeholder="Paste text with line breaks..." value={text} onChange={e=>setText(e.target.value)}></textarea>
            <div className="controls mt-2">
                <button className="action-btn" onClick={() => setText(text.replace(/(\r\n|\n|\r)/gm, " "))}>Remove Breaks (Space)</button>
                <button className="action-btn" onClick={() => setText(text.replace(/(\r\n|\n|\r)/gm, ""))}>Remove Breaks (No Space)</button>
                <button className="action-btn" onClick={() => setText(text.replace(/\n\s*\n/g, '\n'))}>Remove Empty Lines</button>
            </div>
        </section>
    );
}

function AnagramChecker() {
    const [w1, setW1] = useState('');
    const [w2, setW2] = useState('');
    const clean = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    const isAnagram = w1 && w2 && clean(w1) === clean(w2);
    
    return (
        <section className="tool-section active">
            <h2>Anagram Checker</h2>
            <div className="controls">
                <label>Word/Phrase 1: <input type="text" value={w1} onChange={e=>setW1(e.target.value)} /></label>
                <label>Word/Phrase 2: <input type="text" value={w2} onChange={e=>setW2(e.target.value)} /></label>
            </div>
            <div className="result-box text-center mt-2">
                {(!w1 || !w2) ? <h3>...</h3> : <h2 style={{color: isAnagram ? '#bcd81d' : '#d10536'}}>{isAnagram ? 'They are Anagrams!' : 'Not Anagrams'}</h2>}
            </div>
        </section>
    );
}

function XmlFormatter() {
    const [text, setText] = useState('');
    const format = () => {
        let formatted = '', pad = 0;
        const xml = text.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
        xml.split('\r\n').forEach(node => {
            let indent = 0;
            if (node.match( /.+<\/\w[^>]*>$/ )) indent = 0;
            else if (node.match( /^<\/\w/ )) { if (pad !== 0) pad -= 1; }
            else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) indent = 1;
            else indent = 0;
            formatted += '  '.repeat(pad) + node + '\r\n';
            pad += indent;
        });
        setText(formatted.trim());
    };
    return (
        <section className="tool-section active">
            <h2>XML Formatter</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={format}>Format XML</button>
        </section>
    );
}

function CssMinifier() {
    const [text, setText] = useState('');
    const minify = () => {
        setText(text.replace(/\/\*[\s\S]*?\*\/|[\r\n\t]+/g, '').replace(/\s+/g, ' ').replace(/ \}/g, '}').replace(/ \{ /g, '{').replace(/; /g, ';').replace(/: /g, ':').trim());
    };
    return (
        <section className="tool-section active">
            <h2>CSS Minifier</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={minify}>Minify CSS</button>
        </section>
    );
}

function HtmlMinifier() {
    const [text, setText] = useState('');
    const minify = () => {
        setText(text.replace(/<!--[\s\S]*?-->/g, '').replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').replace(/> </g, '><').trim());
    };
    return (
        <section className="tool-section active">
            <h2>HTML Minifier</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={minify}>Minify HTML</button>
        </section>
    );
}

function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('');
    const [res, setRes] = useState('...');
    
    useEffect(() => {
        if(!pattern) { setRes('No pattern'); return; }
        try {
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex);
            if(matches) setRes(`Found ${matches.length} match(es):\n` + matches.join(', '));
            else setRes('No matches found.');
        } catch(e) { setRes('Invalid Regular Expression'); }
    }, [pattern, flags, text]);

    return (
        <section className="tool-section active">
            <h2>Regex Tester</h2>
            <div className="controls">
                <label>Pattern: <input type="text" placeholder="e.g. \d+" value={pattern} onChange={e=>setPattern(e.target.value)} /></label>
                <label>Flags: <input type="text" placeholder="g, i, m" value={flags} onChange={e=>setFlags(e.target.value)} /></label>
            </div>
            <textarea className="tool-textarea" placeholder="Test string..." value={text} onChange={e=>setText(e.target.value)}></textarea>
            <div className="result-box mt-2" style={{whiteSpace:'pre-wrap'}}>{res}</div>
        </section>
    );
}

function CompoundInterestCalc() {
    const [p, setP] = useState(1000);
    const [r, setR] = useState(5);
    const [t, setT] = useState(10);
    const [n, setN] = useState(12);
    
    const amount = p * Math.pow(1 + (r / 100) / n, n * t);
    const interest = amount - p;

    return (
        <section className="tool-section active">
            <h2>Compound Interest Calc</h2>
            <div className="controls">
                <label>Principal: <input type="number" value={p} onChange={e=>setP(e.target.value)}/></label>
                <label>Rate (Annual %): <input type="number" value={r} onChange={e=>setR(e.target.value)}/></label>
                <label>Time (Years): <input type="number" value={t} onChange={e=>setT(e.target.value)}/></label>
                <label>Compounding / Year: <input type="number" value={n} onChange={e=>setN(e.target.value)}/></label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Interest Earned:<br/><h2>${interest.toFixed(2)}</h2></div>
                <div className="result-box text-center">Total Value:<br/><h2>${amount.toFixed(2)}</h2></div>
            </div>
        </section>
    );
}

function RomanNumeralConverter() {
    const [num, setNum] = useState('');
    const [rom, setRom] = useState('');
    
    const toRoman = (n) => {
        let val = parseInt(n);
        if(isNaN(val) || val < 1 || val > 3999) return "Invalid (1-3999)";
        const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
        let res = '';
        for (let i in lookup) {
            while (val >= lookup[i]) { res += i; val -= lookup[i]; }
        }
        return res;
    };
    
    const toNum = (r) => {
        const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
        let res = 0;
        let str = r.toUpperCase();
        for(let i in lookup) {
            while(str.indexOf(i) === 0) { res += lookup[i]; str = str.replace(i, ''); }
        }
        return res === 0 ? "" : res;
    };

    return (
        <section className="tool-section active">
            <h2>Roman Numeral Converter</h2>
            <div className="grid-2 mt-2">
                <label>Number (1-3999): <input type="number" value={num} onChange={e=>{setNum(e.target.value); setRom(toRoman(e.target.value));}} /></label>
                <label>Roman Numeral: <input type="text" value={rom} onChange={e=>{setRom(e.target.value.toUpperCase()); setNum(toNum(e.target.value));}} /></label>
            </div>
        </section>
    );
}

function GcdLcmCalculator() {
    const [n1, setN1] = useState(12);
    const [n2, setN2] = useState(18);
    
    const getGcd = (a, b) => !b ? a : getGcd(b, a % b);
    const gcd = getGcd(Math.abs(n1), Math.abs(n2)) || 0;
    const lcm = (Math.abs(n1 * n2) / gcd) || 0;

    return (
        <section className="tool-section active">
            <h2>GCD & LCM Calculator</h2>
            <div className="controls">
                <label>Number 1: <input type="number" value={n1} onChange={e=>setN1(e.target.value)} /></label>
                <label>Number 2: <input type="number" value={n2} onChange={e=>setN2(e.target.value)} /></label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Greatest Common Divisor (GCD):<br/><h2>{gcd}</h2></div>
                <div className="result-box text-center">Least Common Multiple (LCM):<br/><h2>{lcm}</h2></div>
            </div>
        </section>
    );
}

function TemperatureConverter() {
    const [val, setVal] = useState(0);
    const [unit, setUnit] = useState('C');
    
    const v = Number(val);
    const c = unit === 'C' ? v : (unit === 'F' ? (v - 32) * 5/9 : v - 273.15);
    const f = unit === 'F' ? v : (unit === 'C' ? v * 9/5 + 32 : (v - 273.15) * 9/5 + 32);
    const k = unit === 'K' ? v : (unit === 'C' ? v + 273.15 : (v - 32) * 5/9 + 273.15);

    return (
        <section className="tool-section active">
            <h2>Temperature Converter</h2>
            <div className="controls">
                <label>Value: <input type="number" value={val} onChange={e=>setVal(e.target.value)} /></label>
                <label>From Unit:
                    <select className="tool-textarea" style={{minHeight:'40px', padding:'0.5rem'}} value={unit} onChange={e=>setUnit(e.target.value)}>
                        <option value="C">Celsius</option><option value="F">Fahrenheit</option><option value="K">Kelvin</option>
                    </select>
                </label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Celsius: <h3>{c.toFixed(2)} °C</h3></div>
                <div className="result-box text-center">Fahrenheit: <h3>{f.toFixed(2)} °F</h3></div>
                <div className="result-box text-center" style={{gridColumn: '1 / -1'}}>Kelvin: <h3>{k.toFixed(2)} K</h3></div>
            </div>
        </section>
    );
}

function LengthConverter() {
    const [val, setVal] = useState(1);
    const [unit, setUnit] = useState('m');
    
    const toMeter = { 'm': 1, 'km': 1000, 'cm': 0.01, 'mm': 0.001, 'mi': 1609.34, 'yd': 0.9144, 'ft': 0.3048, 'in': 0.0254 };
    const meters = Number(val) * toMeter[unit];

    return (
        <section className="tool-section active">
            <h2>Length Converter</h2>
            <div className="controls">
                <label>Value: <input type="number" value={val} onChange={e=>setVal(e.target.value)} /></label>
                <label>Unit:
                    <select className="tool-textarea" style={{minHeight:'40px', padding:'0.5rem'}} value={unit} onChange={e=>setUnit(e.target.value)}>
                        <option value="m">Meters (m)</option><option value="km">Kilometers (km)</option><option value="cm">Centimeters (cm)</option>
                        <option value="mi">Miles (mi)</option><option value="yd">Yards (yd)</option><option value="ft">Feet (ft)</option><option value="in">Inches (in)</option>
                    </select>
                </label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Meters: <h4>{(meters).toFixed(4)} m</h4></div>
                <div className="result-box text-center">Feet: <h4>{(meters / toMeter['ft']).toFixed(4)} ft</h4></div>
                <div className="result-box text-center">Kilometers: <h4>{(meters / toMeter['km']).toFixed(4)} km</h4></div>
                <div className="result-box text-center">Miles: <h4>{(meters / toMeter['mi']).toFixed(4)} mi</h4></div>
            </div>
        </section>
    );
}

function WeightConverter() {
    const [val, setVal] = useState(1);
    const [unit, setUnit] = useState('kg');
    
    const toKg = { 'kg': 1, 'g': 0.001, 'mg': 0.000001, 'lb': 0.453592, 'oz': 0.0283495 };
    const kg = Number(val) * toKg[unit];

    return (
        <section className="tool-section active">
            <h2>Weight Converter</h2>
            <div className="controls">
                <label>Value: <input type="number" value={val} onChange={e=>setVal(e.target.value)} /></label>
                <label>Unit:
                    <select className="tool-textarea" style={{minHeight:'40px', padding:'0.5rem'}} value={unit} onChange={e=>setUnit(e.target.value)}>
                        <option value="kg">Kilograms (kg)</option><option value="g">Grams (g)</option>
                        <option value="lb">Pounds (lb)</option><option value="oz">Ounces (oz)</option>
                    </select>
                </label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Kilograms: <h4>{(kg).toFixed(4)} kg</h4></div>
                <div className="result-box text-center">Grams: <h4>{(kg / toKg['g']).toFixed(2)} g</h4></div>
                <div className="result-box text-center">Pounds: <h4>{(kg / toKg['lb']).toFixed(4)} lb</h4></div>
                <div className="result-box text-center">Ounces: <h4>{(kg / toKg['oz']).toFixed(4)} oz</h4></div>
            </div>
        </section>
    );
}

function DataStorageConverter() {
    const [val, setVal] = useState(1);
    const [unit, setUnit] = useState('MB');
    
    const toBytes = { 'B': 1, 'KB': 1024, 'MB': 1048576, 'GB': 1073741824, 'TB': 1099511627776 };
    const bytes = Number(val) * toBytes[unit];

    return (
        <section className="tool-section active">
            <h2>Data Storage Converter</h2>
            <div className="controls">
                <label>Value: <input type="number" value={val} onChange={e=>setVal(e.target.value)} /></label>
                <label>Unit:
                    <select className="tool-textarea" style={{minHeight:'40px', padding:'0.5rem'}} value={unit} onChange={e=>setUnit(e.target.value)}>
                        <option value="B">Bytes</option><option value="KB">Kilobytes</option><option value="MB">Megabytes</option>
                        <option value="GB">Gigabytes</option><option value="TB">Terabytes</option>
                    </select>
                </label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">KB: <h4>{(bytes / toBytes['KB']).toPrecision(6)}</h4></div>
                <div className="result-box text-center">MB: <h4>{(bytes / toBytes['MB']).toPrecision(6)}</h4></div>
                <div className="result-box text-center">GB: <h4>{(bytes / toBytes['GB']).toPrecision(6)}</h4></div>
                <div className="result-box text-center">TB: <h4>{(bytes / toBytes['TB']).toPrecision(6)}</h4></div>
            </div>
        </section>
    );
}

function SpeedConverter() {
    const [val, setVal] = useState(100);
    const [unit, setUnit] = useState('kmh');
    
    const toMs = { 'ms': 1, 'kmh': 0.277778, 'mph': 0.44704, 'knots': 0.514444 };
    const ms = Number(val) * toMs[unit];

    return (
        <section className="tool-section active">
            <h2>Speed Converter</h2>
            <div className="controls">
                <label>Value: <input type="number" value={val} onChange={e=>setVal(e.target.value)} /></label>
                <label>Unit:
                    <select className="tool-textarea" style={{minHeight:'40px', padding:'0.5rem'}} value={unit} onChange={e=>setUnit(e.target.value)}>
                        <option value="ms">Meters/sec (m/s)</option><option value="kmh">Km/hour (km/h)</option>
                        <option value="mph">Miles/hour (mph)</option><option value="knots">Knots</option>
                    </select>
                </label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">km/h: <h4>{(ms / toMs['kmh']).toFixed(2)}</h4></div>
                <div className="result-box text-center">mph: <h4>{(ms / toMs['mph']).toFixed(2)}</h4></div>
                <div className="result-box text-center">m/s: <h4>{(ms).toFixed(2)}</h4></div>
                <div className="result-box text-center">knots: <h4>{(ms / toMs['knots']).toFixed(2)}</h4></div>
            </div>
        </section>
    );
}

function CountdownTimer() {
    const [target, setTarget] = useState('');
    const [left, setLeft] = useState('');
    
    useEffect(() => {
        if(!target) return;
        const int = setInterval(() => {
            const diff = new Date(target).getTime() - new Date().getTime();
            if(diff <= 0) { setLeft("Timer Expired!"); clearInterval(int); return; }
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setLeft(`${d}d ${h}h ${m}m ${s}s`);
        }, 1000);
        return () => clearInterval(int);
    }, [target]);

    return (
        <section className="tool-section active">
            <h2>Countdown Timer</h2>
            <div className="controls">
                <label>Target Date/Time: <input type="datetime-local" value={target} onChange={e=>setTarget(e.target.value)} /></label>
            </div>
            <div className="result-box mt-2 text-center">
                <h1 style={{fontSize:'2.5rem', color:'var(--primary-color)'}}>{left || '0d 0h 0m 0s'}</h1>
            </div>
        </section>
    );
}

function Magic8Ball() {
    const [ans, setAns] = useState('Ask a question and shake!');
    const answers = [ "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful." ];
    
    return (
        <section className="tool-section active text-center">
            <h2>Magic 8 Ball</h2>
            <div className="result-box mt-2" style={{height:'200px', width:'200px', borderRadius:'50%', background:'#111', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', border:'10px solid #333', padding:'1rem'}}>
                <h3 style={{color:'#5c8d84'}}>{ans}</h3>
            </div>
            <button className="action-btn mt-4" onClick={() => setAns(answers[Math.floor(Math.random() * answers.length)])}>Shake 8 Ball</button>
        </section>
    );
}

function JokeGenerator() {
    const [joke, setJoke] = useState('Click to generate a joke!');
    const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "Why did the programmer quit his job? Because he didn't get arrays.",
        "I would tell you a joke about UDP, but you might not get it.",
        "What's a programmer's favorite hangout place? Foo Bar.",
        "To understand what recursion is, you must first understand recursion.",
        "Why do Java programmers have to wear glasses? Because they don't C#.",
        "A good programmer is someone who always looks both ways before crossing a one-way street."
    ];
    
    return (
        <section className="tool-section active text-center">
            <h2>Programming Joke Generator</h2>
            <div className="result-box mt-2" style={{minHeight:'150px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <h2>{joke}</h2>
            </div>
            <button className="action-btn mt-2" onClick={() => setJoke(jokes[Math.floor(Math.random() * jokes.length)])}>Tell me a joke!</button>
        </section>
    );
}

function CaseConverter() {
    const [text, setText] = useState('');
    return (
        <section className="tool-section active">
            <h2>Case Converter</h2>
            <textarea className="tool-textarea" placeholder="Enter text here..." value={text} onChange={e => setText(e.target.value)}></textarea>
            <div className="controls mt-2">
                <button className="action-btn" onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
                <button className="action-btn" onClick={() => setText(text.toLowerCase())}>lowercase</button>
                <button className="action-btn" onClick={() => setText(text.replace(/\b\w/g, c => c.toUpperCase()))}>Title Case</button>
            </div>
        </section>
    );
}

function TextReverser() {
    const [text, setText] = useState('');
    return (
        <section className="tool-section active">
            <h2>Text Reverser</h2>
            <textarea className="tool-textarea" placeholder="Enter text to reverse..." value={text} onChange={e => setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={() => setText(text.split('').reverse().join(''))}>Reverse Text</button>
        </section>
    );
}

function SpaceRemover() {
    const [text, setText] = useState('');
    return (
        <section className="tool-section active">
            <h2>Remove Extra Spaces</h2>
            <textarea className="tool-textarea" placeholder="Paste badly formatted text here..." value={text} onChange={e => setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={() => setText(text.replace(/\s+/g, ' ').trim())}>Clean Up Whitespace</button>
        </section>
    );
}

function LoremGenerator() {
    const [paras, setParas] = useState(3);
    const [out, setOut] = useState('');
    const generate = () => {
        const words = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","labore","et","dolore","magna","aliqua"];
        let result = [];
        for(let i=0; i<paras; i++) {
            let p = [];
            for(let j=0; j<35; j++) p.push(words[Math.floor(Math.random()*words.length)]);
            result.push(p.join(' ') + '.');
        }
        setOut(result.join('\n\n'));
    };
    return (
        <section className="tool-section active">
            <h2>Lorem Ipsum Generator</h2>
            <div className="controls">
                <label>Paragraphs: <input type="number" value={paras} min="1" onChange={e => setParas(e.target.value)} /></label>
            </div>
            <button className="action-btn" onClick={generate}>Generate Text</button>
            <textarea className="tool-textarea mt-2" readOnly value={out} placeholder="Generated text..."></textarea>
        </section>
    );
}

function SlugGen() {
    const [text, setText] = useState('');
    const slug = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    return (
        <section className="tool-section active">
            <h2>URL Slug Generator</h2>
            <input type="text" placeholder="Enter post title..." style={{width:'100%', marginBottom:'1rem'}} value={text} onChange={e=>setText(e.target.value)}/>
            <div className="result-box">{slug}</div>
        </section>
    );
}

function HtmlEntityTool() {
    const [text, setText] = useState('');
    const [res, setRes] = useState('');
    const enc = () => setRes(text.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';'));
    const dec = () => { const txt = document.createElement('textarea'); txt.innerHTML = text; setRes(txt.value); };
    return (
        <section className="tool-section active">
            <h2>HTML Entity Encode/Decode</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <div className="controls mt-2"><button className="action-btn" onClick={enc}>Encode</button><button className="action-btn" onClick={dec}>Decode</button></div>
            <textarea className="tool-textarea mt-2" readOnly value={res}></textarea>
        </section>
    );
}

function TextToBinary() {
    const [text, setText] = useState('');
    const [bin, setBin] = useState('');
    const toBin = () => setBin(text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '));
    const toText = () => { try { setBin(text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('')); } catch { setBin('Invalid Binary'); } };
    return (
        <section className="tool-section active">
            <h2>Text &lt;&gt; Binary</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <div className="controls mt-2"><button className="action-btn" onClick={toBin}>To Binary</button><button className="action-btn" onClick={toText}>To Text (from Bin)</button></div>
            <textarea className="tool-textarea mt-2" readOnly value={bin}></textarea>
        </section>
    );
}

function WordShuffle() {
    const [text, setText] = useState('');
    const shuffle = () => setText(text.split(/\s+/).sort(() => Math.random() - 0.5).join(' '));
    return (
        <section className="tool-section active">
            <h2>Word Shuffle</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={shuffle}>Shuffle Words</button>
        </section>
    );
}

function VowelConsonant() {
    const [text, setText] = useState('');
    const v = (text.match(/[aeiou]/gi) || []).length;
    const c = (text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
    return (
        <section className="tool-section active">
            <h2>Vowel & Consonant Counter</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Vowels: <h2>{v}</h2></div>
                <div className="result-box text-center">Consonants: <h2>{c}</h2></div>
            </div>
        </section>
    );
}

// --- DEVELOPER TOOLS ---

function JsonFormatter() {
    const [text, setText] = useState('');
    const format = () => {
        try { setText(JSON.stringify(JSON.parse(text), null, 4)); } 
        catch { alert('Invalid JSON Format'); }
    };
    return (
        <section className="tool-section active">
            <h2>JSON Formatter & Validator</h2>
            <textarea className="tool-textarea" style={{fontFamily: 'monospace'}} placeholder="Paste unformatted JSON here..." value={text} onChange={e => setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={format}>Format JSON</button>
        </section>
    );
}

function JsonMinifier() {
    const [text, setText] = useState('');
    const minify = () => { try { setText(JSON.stringify(JSON.parse(text))); } catch { alert('Invalid JSON'); } };
    return (
        <section className="tool-section active">
            <h2>JSON Minifier</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={minify}>Minify</button>
        </section>
    );
}

function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const encode = () => setOutput(btoa(input));
    const decode = () => { try { setOutput(atob(input)); } catch { alert('Invalid Base64'); } };
    return (
        <section className="tool-section active">
            <h2>Base64 Encoder / Decoder</h2>
            <textarea className="tool-textarea" placeholder="Enter text..." value={input} onChange={e => setInput(e.target.value)}></textarea>
            <div className="controls mt-2">
                <button className="action-btn" onClick={encode}>Encode</button>
                <button className="action-btn" onClick={decode}>Decode</button>
            </div>
            <textarea className="tool-textarea" readOnly value={output} placeholder="Result..."></textarea>
        </section>
    );
}

function UrlTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    return (
        <section className="tool-section active">
            <h2>URL Encoder / Decoder</h2>
            <textarea className="tool-textarea" placeholder="Enter URL string..." value={input} onChange={e => setInput(e.target.value)}></textarea>
            <div className="controls mt-2">
                <button className="action-btn" onClick={() => setOutput(encodeURIComponent(input))}>Encode URL</button>
                <button className="action-btn" onClick={() => setOutput(decodeURIComponent(input))}>Decode URL</button>
            </div>
            <textarea className="tool-textarea" readOnly value={output} placeholder="Result..."></textarea>
        </section>
    );
}

function JwtDecoder() {
    const [jwt, setJwt] = useState('');
    const [head, setHead] = useState('');
    const [payload, setPayload] = useState('');
    const dec = () => {
        try {
            const parts = jwt.split('.');
            setHead(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
            setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
        } catch { alert('Invalid JWT'); }
    };
    return (
        <section className="tool-section active">
            <h2>JWT Decoder</h2>
            <textarea className="tool-textarea" placeholder="Paste JWT string..." value={jwt} onChange={e=>setJwt(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={dec}>Decode Payload</button>
            <div className="grid-2 mt-2">
                <textarea className="tool-textarea" readOnly value={head} placeholder="Header..."></textarea>
                <textarea className="tool-textarea" readOnly value={payload} placeholder="Payload..."></textarea>
            </div>
        </section>
    );
}

function HashGenerator() {
    const [text, setText] = useState('');
    const [hash, setHash] = useState('');
    const gen = async () => {
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        setHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
    };
    return (
        <section className="tool-section active">
            <h2>SHA-256 Hash Generator</h2>
            <textarea className="tool-textarea" value={text} onChange={e=>setText(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={gen}>Generate Hash</button>
            <textarea className="tool-textarea mt-2" readOnly value={hash} placeholder="Result..."></textarea>
        </section>
    );
}

function UuidGenerator() {
    const [uuid, setUuid] = useState('...');
    const gen = () => {
        setUuid(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16);
        }));
    };
    return (
        <section className="tool-section active">
            <h2>UUID v4 Generator</h2>
            <p>Generate a cryptographically strong Universally Unique Identifier.</p>
            <button className="action-btn" onClick={gen}>Generate New UUID</button>
            <div className="result-box mt-2 text-center"><h3>{uuid}</h3></div>
        </section>
    );
}

function PasswordGenerator() {
    const [len, setLen] = useState(16);
    const [pwd, setPwd] = useState('...');
    const gen = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let res = '';
        for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
        setPwd(res);
    };
    return (
        <section className="tool-section active">
            <h2>Password Generator</h2>
            <div className="controls">
                <label>Length: <input type="number" value={len} min="4" max="128" onChange={e => setLen(e.target.value)} /></label>
            </div>
            <button className="action-btn" onClick={gen}>Generate Secure Password</button>
            <div className="result-box mt-2 text-center"><h3 style={{wordBreak: 'break-all'}}>{pwd}</h3></div>
        </section>
    );
}

function HexRgbConverter() {
    const [hex, setHex] = useState('');
    const [rgb, setRgb] = useState('');
    
    const handleHex = (val) => {
        setHex(val);
        let h = val.replace('#','');
        if(h.length === 3) h = h.split('').map(x=>x+x).join('');
        if(h.length === 6) {
            setRgb(`rgb(${parseInt(h.substring(0,2),16)}, ${parseInt(h.substring(2,4),16)}, ${parseInt(h.substring(4,6),16)})`);
        }
    };
    const handleRgb = (val) => {
        setRgb(val);
        let match = val.match(/\d+/g);
        if(match && match.length >= 3) {
            setHex('#' + match.slice(0,3).map(x=>parseInt(x).toString(16).padStart(2,'0')).join('').toUpperCase());
        }
    };

    return (
        <section className="tool-section active">
            <h2>HEX & RGB Color Converter</h2>
            <div className="grid-2 mt-2">
                <label>HEX: <input type="text" placeholder="#FFFFFF" value={hex} onChange={e => handleHex(e.target.value)} /></label>
                <label>RGB: <input type="text" placeholder="rgb(255, 255, 255)" value={rgb} onChange={e => handleRgb(e.target.value)} /></label>
            </div>
        </section>
    );
}

function BoxShadowGenerator() {
    const [x, setX] = useState(10);
    const [y, setY] = useState(10);
    const [b, setB] = useState(15);
    const [s, setS] = useState(-3);
    const [c, setC] = useState('#000000');
    const shadowStr = `${x}px ${y}px ${b}px ${s}px ${c}`;
    
    return (
        <section className="tool-section active">
            <h2>CSS Box Shadow Gen</h2>
            <div className="controls">
                <label>Offset X: <input type="range" min="-50" max="50" value={x} onChange={e=>setX(e.target.value)}/></label>
                <label>Offset Y: <input type="range" min="-50" max="50" value={y} onChange={e=>setY(e.target.value)}/></label>
                <label>Blur: <input type="range" min="0" max="100" value={b} onChange={e=>setB(e.target.value)}/></label>
                <label>Spread: <input type="range" min="-50" max="50" value={s} onChange={e=>setS(e.target.value)}/></label>
                <label>Color: <input type="color" style={{padding:0}} value={c} onChange={e=>setC(e.target.value)}/></label>
            </div>
            <div className="box-shadow-preview" style={{boxShadow: shadowStr}}></div>
            <div className="result-box text-center mt-2"><code>box-shadow: {shadowStr};</code></div>
        </section>
    );
}

function KeycodeFinder() {
    const [key, setKey] = useState('-');
    const [code, setCode] = useState('-');
    
    useEffect(() => {
        const handle = (e) => { e.preventDefault(); setKey(e.key === ' ' ? 'Space' : e.key); setCode(e.keyCode); };
        const handle = (e) => { 
            // SCROLL FIX 3: Only prevent default behavior for keys that inherently scroll the page
            if ([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key)) { e.preventDefault(); }
            setKey(e.key === ' ' ? 'Space' : e.key); 
            setCode(e.keyCode); 
        };
        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);

    return (
        <section className="tool-section active">
            <h2>Keycode Finder</h2>
            <p>Press any key on your keyboard to get its numeric code.</p>
            <div className="grid-2 text-center mt-2">
                <div className="result-box">Key: <h1 style={{color:'var(--primary-color)'}}>{key}</h1></div>
                <div className="result-box">Code: <h1 style={{color:'var(--primary-color)'}}>{code}</h1></div>
            </div>
        </section>
    );
}

// --- MATH & FINANCE ---

function BaseConverter() {
    const [dec, setDec] = useState('');
    const [bin, setBin] = useState('');
    const [hex, setHex] = useState('');
    const [oct, setOct] = useState('');
    const handle = (val, base) => {
        if(!val) { setDec(''); setBin(''); setHex(''); setOct(''); return; }
        try {
            const d = parseInt(val, base);
            if(isNaN(d)) return;
            setDec(d.toString(10)); setBin(d.toString(2)); setHex(d.toString(16).toUpperCase()); setOct(d.toString(8));
        } catch(e) {}
    };
    return (
        <section className="tool-section active">
            <h2>Base Converter</h2>
            <div className="grid-2">
                <label>Decimal: <input type="text" value={dec} onChange={e=>handle(e.target.value, 10)}/></label>
                <label>Binary: <input type="text" value={bin} onChange={e=>handle(e.target.value, 2)}/></label>
                <label>Hexadecimal: <input type="text" value={hex} onChange={e=>handle(e.target.value, 16)}/></label>
                <label>Octal: <input type="text" value={oct} onChange={e=>handle(e.target.value, 8)}/></label>
            </div>
        </section>
    );
}

function TipCalc() {
    const [bill, setBill] = useState(100);
    const [tip, setTip] = useState(15);
    const [split, setSplit] = useState(1);
    const total = Number(bill) + (Number(bill) * Number(tip) / 100);
    return (
        <section className="tool-section active">
            <h2>Tip Calculator</h2>
            <div className="controls">
                <label>Bill Amount: <input type="number" value={bill} onChange={e=>setBill(e.target.value)}/></label>
                <label>Tip %: <input type="number" value={tip} onChange={e=>setTip(e.target.value)}/></label>
                <label>Split (Persons): <input type="number" value={split} min="1" onChange={e=>setSplit(e.target.value)}/></label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Total Bill:<br/><strong style={{fontSize:'1.5rem'}}>${total.toFixed(2)}</strong></div>
                <div className="result-box text-center">Per Person:<br/><strong style={{fontSize:'1.5rem'}}>${(total/split).toFixed(2)}</strong></div>
            </div>
        </section>
    );
}

function DiscountCalc() {
    const [price, setPrice] = useState(100);
    const [disc, setDisc] = useState(20);
    const saved = (Number(price) * Number(disc)) / 100;
    const final = Number(price) - saved;
    return (
        <section className="tool-section active">
            <h2>Discount Calculator</h2>
            <div className="controls">
                <label>Original Price: <input type="number" value={price} onChange={e=>setPrice(e.target.value)}/></label>
                <label>Discount %: <input type="number" value={disc} onChange={e=>setDisc(e.target.value)}/></label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">You Save:<br/><strong style={{fontSize:'1.5rem'}}>${saved.toFixed(2)}</strong></div>
                <div className="result-box text-center">Final Price:<br/><strong style={{fontSize:'1.5rem'}}>${final.toFixed(2)}</strong></div>
            </div>
        </section>
    );
}

function InterestCalc() {
    const [p, setP] = useState(1000);
    const [r, setR] = useState(5);
    const [t, setT] = useState(1);
    const i = (p * r * t) / 100;
    return (
        <section className="tool-section active">
            <h2>Simple Interest Calc</h2>
            <div className="controls">
                <label>Principal: <input type="number" value={p} onChange={e=>setP(e.target.value)}/></label>
                <label>Rate (%): <input type="number" value={r} onChange={e=>setR(e.target.value)}/></label>
                <label>Time (Yrs): <input type="number" value={t} onChange={e=>setT(e.target.value)}/></label>
            </div>
            <div className="grid-2 mt-2">
                <div className="result-box text-center">Interest:<br/><h2>${i.toFixed(2)}</h2></div>
                <div className="result-box text-center">Total Amount:<br/><h2>${(Number(p)+i).toFixed(2)}</h2></div>
            </div>
        </section>
    );
}

function PrimeChecker() {
    const [num, setNum] = useState(7);
    const check = (n) => {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
        return true;
    };
    const isP = check(Number(num));
    return (
        <section className="tool-section active">
            <h2>Prime Number Checker</h2>
            <input type="number" style={{width:'100%'}} value={num} onChange={e=>setNum(e.target.value)} />
            <div className="result-box text-center mt-2">
                <h2 style={{color: isP ? '#bcd81d' : '#d10536'}}>{num} is {isP ? 'Prime' : 'NOT Prime'}</h2>
            </div>
        </section>
    );
}

// --- UTILITY & TIME ---

function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState('Work');
    useEffect(() => {
        let int; if(running) int = setInterval(()=>setTimeLeft(t=>(t > 0 ? t - 1 : 0)), 1000);
        return () => { if (int) clearInterval(int); };
    }, [running]);
    const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
    const s = (timeLeft%60).toString().padStart(2,'0');
    return (
        <section className="tool-section active">
            <h2>Pomodoro Timer</h2>
            <div className="controls mt-2" style={{justifyContent:'center'}}>
                <button className="theme-btn" onClick={()=>{setMode('Work'); setTimeLeft(25*60); setRunning(false);}}>Work (25m)</button>
                <button className="theme-btn" onClick={()=>{setMode('Break'); setTimeLeft(5*60); setRunning(false);}}>Break (5m)</button>
            </div>
            <div className="result-box text-center mt-2"><h3 style={{color:'var(--text-muted)'}}>{mode}</h3><h1 style={{fontSize:'4rem', fontVariantNumeric:'tabular-nums'}}>{m}:{s}</h1></div>
            <div className="controls mt-2">
                <button className="action-btn" onClick={()=>setRunning(!running)}>{running ? 'Pause' : 'Start'}</button>
                <button className="action-btn" style={{background:'#7f7f27'}} onClick={()=>{setRunning(false); setTimeLeft(mode==='Work'?25*60:5*60);}}>Reset</button>
            </div>
        </section>
    );
}

function DateDifference() {
    const [d1, setD1] = useState('');
    const [d2, setD2] = useState('');
    const diff = d1 && d2 ? Math.abs(new Date(d1) - new Date(d2)) / (1000 * 60 * 60 * 24) : '...';
    return (
        <section className="tool-section active">
            <h2>Date Difference</h2>
            <div className="controls">
                <label>Start Date: <input type="date" value={d1} onChange={e=>setD1(e.target.value)}/></label>
                <label>End Date: <input type="date" value={d2} onChange={e=>setD2(e.target.value)}/></label>
            </div>
            <div className="result-box text-center mt-2"><h3>{diff} Days</h3></div>
        </section>
    );
}

function LeapYear() {
    const [year, setYear] = useState(new Date().getFullYear());
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return (
        <section className="tool-section active">
            <h2>Leap Year Checker</h2>
            <input type="number" style={{width:'100%'}} value={year} onChange={e=>setYear(e.target.value)} />
            <div className="result-box text-center mt-2">
                <h2 style={{color: isLeap ? '#bcd81d' : '#d10536'}}>{year} is {isLeap ? 'a Leap Year' : 'NOT a Leap Year'}</h2>
            </div>
        </section>
    );
}

function QrGenerator() {
    const [val, setVal] = useState('');
    const [url, setUrl] = useState('');
    return (
        <section className="tool-section active">
            <h2>QR Code Generator</h2>
            <textarea className="tool-textarea" placeholder="Enter text or URL..." value={val} onChange={e=>setVal(e.target.value)}></textarea>
            <button className="action-btn mt-2" onClick={() => val && setUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(val)}`)}>Generate QR Code</button>
            {url && <div className="mt-2 text-center"><img src={url} alt="QR" style={{borderRadius:8, border:'4px solid white'}} /></div>}
        </section>
    );
}

function CoinFlipper() {
    const [res, setRes] = useState('-');
    const [flips, setFlips] = useState(0);
    const flip = () => { setRes(Math.random() > 0.5 ? 'HEADS' : 'TAILS'); setFlips(f=>f+1); };
    return (
        <section className="tool-section active text-center">
            <h2>Coin Flipper</h2>
            <p>Total Flips: {flips}</p>
            <div className="result-box mt-2" style={{height:'150px', display:'flex', alignItems:'center', justifyContent:'center'}}><h1 style={{fontSize:'3rem', color:'var(--primary-color)'}}>{res}</h1></div>
            <button className="action-btn mt-2" onClick={flip}>Flip Coin</button>
        </section>
    );
}

function DiceRoller() {
    const [res, setRes] = useState('-');
    const roll = () => setRes(Math.floor(Math.random() * 6) + 1);
    return (
        <section className="tool-section active text-center">
            <h2>Dice Roller</h2>
            <div className="result-box mt-2" style={{height:'150px', display:'flex', alignItems:'center', justifyContent:'center'}}><h1 style={{fontSize:'4rem', color:'var(--primary-color)'}}>{res}</h1></div>
            <button className="action-btn mt-2" onClick={roll}>Roll Dice</button>
        </section>
    );
}

function RandomNumber() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [res, setRes] = useState('-');
    return (
        <section className="tool-section active">
            <h2>Random Number Generator</h2>
            <div className="controls">
                <label>Min: <input type="number" value={min} onChange={e=>setMin(e.target.value)} /></label>
                <label>Max: <input type="number" value={max} onChange={e=>setMax(e.target.value)} /></label>
            </div>
            <button className="action-btn" onClick={() => setRes(Math.floor(Math.random()*(max-min+1))+Number(min))}>Roll</button>
            <div className="result-box mt-2 text-center"><h1 style={{fontSize:'3rem', color:'var(--primary-color)'}}>{res}</h1></div>
        </section>
    );
}

function BmiCalculator() {
    const [w, setW] = useState(70);
    const [h, setH] = useState(175);
    const [out, setOut] = useState('...');
    const calc = () => {
        const bmi = (w/((h/100)*(h/100))).toFixed(1);
        let c = bmi<18.5 ? 'Underweight' : (bmi<30 ? (bmi<25 ? 'Normal' : 'Overweight') : 'Obese');
        setOut(`BMI: ${bmi} (${c})`);
    };
    return (
        <section className="tool-section active">
            <h2>BMI Calculator</h2>
            <div className="controls">
                <label>Weight (kg): <input type="number" value={w} onChange={e=>setW(e.target.value)}/></label>
                <label>Height (cm): <input type="number" value={h} onChange={e=>setH(e.target.value)}/></label>
            </div>
            <button className="action-btn" onClick={calc}>Calculate</button>
            <div className="result-box mt-2 text-center"><h3>{out}</h3></div>
        </section>
    );
}

function AgeCalculator() {
    const [date, setDate] = useState('');
    const [out, setOut] = useState('...');
    const calc = () => {
        if(!date) return;
        const diff = new Date() - new Date(date);
        setOut(Math.abs(new Date(diff).getUTCFullYear() - 1970) + ' Years Old');
    };
    return (
        <section className="tool-section active">
            <h2>Age Calculator</h2>
            <div className="controls"><label>Date of Birth: <input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div>
            <button className="action-btn" onClick={calc}>Calculate Age</button>
            <div className="result-box mt-2 text-center"><h3>{out}</h3></div>
        </section>
    );
}

function PercentageCalculator() {
    const [val, setVal] = useState('');
    const [tot, setTot] = useState('');
    return (
        <section className="tool-section active">
            <h2>Percentage Calculator</h2>
            <div className="controls">
                <label>Value: <input type="number" value={val} onChange={e=>setVal(e.target.value)}/></label>
                <label>Total: <input type="number" value={tot} onChange={e=>setTot(e.target.value)}/></label>
            </div>
            <div className="result-box mt-2 text-center"><h1 style={{color:'var(--primary-color)'}}>{tot ? ((val/100)*tot).toFixed(2) : '...'}</h1></div>
        </section>
    );
}

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        let int; if(running) int = setInterval(()=>setTime(t=>t+1), 1000);
        return () => { if (int) clearInterval(int); };
    }, [running]);
    return (
        <section className="tool-section active">
            <h2>Stopwatch</h2>
            <div className="result-box text-center"><h1 style={{fontSize:'3rem', fontVariantNumeric:'tabular-nums'}}>{new Date(time*1000).toISOString().substr(11,8)}</h1></div>
            <div className="controls mt-2">
                <button className="action-btn" onClick={()=>setRunning(true)}>Start</button>
                <button className="action-btn" style={{background:'#d10536'}} onClick={()=>setRunning(false)}>Stop</button>
                <button className="action-btn" style={{background:'#7f7f27'}} onClick={()=>{setRunning(false); setTime(0);}}>Reset</button>
            </div>
        </section>
    );
}

function UnixConverter() {
    const [val, setVal] = useState('');
    const [out, setOut] = useState('...');
    return (
        <section className="tool-section active">
            <h2>Unix Timestamp</h2>
            <div className="controls"><label>Timestamp: <input type="number" value={val} onChange={e=>setVal(e.target.value)}/></label></div>
            <button className="action-btn" onClick={() => setOut(new Date(val * (val.length<=10 ? 1000 : 1)).toLocaleString())}>Convert</button>
            <div className="result-box mt-2 text-center"><h3>{out}</h3></div>
        </section>
    );
}

// --- DESIGN TOOLS ---

function ColorPaletteGen() {
    const [colors, setColors] = useState(['#e0e7ff', '#c7d2fe', '#a78bfa', '#8b5cf6', '#7c3aed']);
    const gen = () => setColors(Array(5).fill(0).map(() => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')));
    return (
        <section className="tool-section active">
            <h2>Color Palette Generator</h2>
            <div style={{display:'flex', gap:'10px', margin:'1rem 0', height:'100px'}}>
                {colors.map(c => <div key={c} style={{flex:1, backgroundColor:c, borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:'bold', textShadow:'0 1px 2px rgba(0,0,0,0.5)'}}>{c}</div>)}
            </div>
            <button className="action-btn" onClick={gen}>Generate Random Palette</button>
        </section>
    );
}

function CssGradientGen() {
    const [c1, setC1] = useState('#f66b02');
    const [c2, setC2] = useState('#5c8d84');
    const [angle, setAngle] = useState(135);
    const grad = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    return (
        <section className="tool-section active">
            <h2>CSS Gradient Generator</h2>
            <div className="controls">
                <label>Color 1: <input type="color" value={c1} onChange={e=>setC1(e.target.value)} style={{padding:0}}/></label>
                <label>Color 2: <input type="color" value={c2} onChange={e=>setC2(e.target.value)} style={{padding:0}}/></label>
                <label>Angle: <input type="number" value={angle} onChange={e=>setAngle(e.target.value)}/></label>
            </div>
            <div style={{height:'150px', background: grad, borderRadius:'12px', margin:'1rem 0'}}></div>
            <div className="result-box text-center"><code>background: {grad};</code></div>
        </section>
    );
}

function BorderRadiusGen() {
    const [tl, setTl] = useState(20); const [tr, setTr] = useState(20);
    const [br, setBr] = useState(20); const [bl, setBl] = useState(20);
    const rad = `${tl}px ${tr}px ${br}px ${bl}px`;
    return (
        <section className="tool-section active">
            <h2>Border Radius Generator</h2>
            <div className="controls">
                <label>Top L: <input type="range" value={tl} max="150" onChange={e=>setTl(e.target.value)}/></label>
                <label>Top R: <input type="range" value={tr} max="150" onChange={e=>setTr(e.target.value)}/></label>
                <label>Btm R: <input type="range" value={br} max="150" onChange={e=>setBr(e.target.value)}/></label>
                <label>Btm L: <input type="range" value={bl} max="150" onChange={e=>setBl(e.target.value)}/></label>
            </div>
            <div style={{height:'150px', width:'150px', background:'var(--primary-color)', borderRadius:rad, margin:'1rem auto'}}></div>
            <div className="result-box text-center"><code>border-radius: {rad};</code> <CopyButton text={`border-radius: ${rad};`} /></div>
        </section>
    );
}

function ImageToPdf() {
    const [status, setStatus] = useState('');
    const fileInputRef = useRef(null);

    const generatePdf = async () => {
        const files = fileInputRef.current.files;
        if (files.length === 0) {
            setStatus("Please select at least one image!");
            return;
        }

        setStatus("Generating PDF... Please wait.");
        const pdf = new jsPDF();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            const imgUrl = URL.createObjectURL(file);
            const img = new Image();
            img.src = imgUrl;
            await new Promise(resolve => img.onload = resolve);
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (img.height * pdfWidth) / img.width;

            if (i > 0) pdf.addPage();
            
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.8), 'JPEG', 0, 0, pdfWidth, pdfHeight);
            
            URL.revokeObjectURL(imgUrl);
        }

        pdf.save("NIK_TOOLS_Converted.pdf");
        setStatus("PDF Downloaded Successfully!");
    };

    return (
        <section className="tool-section active">
            <h2>Images to Single PDF</h2>
            <p>Select multiple JPG or PNG files to combine them into a single PDF document.</p>
            <div className="file-drop-area">
                <input type="file" ref={fileInputRef} accept="image/png, image/jpeg" multiple />
            </div>
            <button className="action-btn" onClick={generatePdf}>Convert to PDF</button>
            <p className="status-msg">{status}</p>
        </section>
    );
}

function ImageCompressor() {
    const [quality, setQuality] = useState(80);
    const [width, setWidth] = useState('');
    const fileInputRef = useRef(null);

    const compressImage = () => {
        if (!fileInputRef.current || fileInputRef.current.files.length === 0) {
            alert("Please select an image first.");
            return;
        }

        const file = fileInputRef.current.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let newWidth = width ? parseInt(width) : img.width;
                let newHeight = (img.height / img.width) * newWidth;

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);

                const link = document.createElement('a');
                link.download = `NIK_Compressed_${file.name}`;
                link.href = compressedDataUrl;
                link.click();
            }
        }
        reader.readAsDataURL(file);
    };

    return (
        <section className="tool-section active">
            <h2>Image Compressor & Resizer</h2>
            <p>Reduce the file size and dimensions of your images right in the browser.</p>
            <div className="file-drop-area">
                <input type="file" ref={fileInputRef} accept="image/png, image/jpeg" />
            </div>
            <div className="controls">
                <label>Quality: <span className="highlight-text">{quality}%</span>
                    <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(e.target.value)} />
                </label>
                <label>Width (px):
                    <input type="number" placeholder="e.g. 800" value={width} onChange={(e) => setWidth(e.target.value)} />
                </label>
            </div>
            <button className="action-btn" onClick={compressImage}>Compress & Download</button>
        </section>
    );
}

function Calculator() {
    const [expression, setExpression] = useState('');
    const [display, setDisplay] = useState('');

    const calcAction = (val) => {
        const newExp = expression + val;
        setExpression(newExp);
        
        let displayStr = newExp
            .replace(/Math\.sin\(/g, 'sin(')
            .replace(/Math\.cos\(/g, 'cos(')
            .replace(/Math\.tan\(/g, 'tan(')
            .replace(/Math\.log10\(/g, 'log(')
            .replace(/Math\.sqrt\(/g, '√(')
            .replace(/\*\*/g, '^');
        setDisplay(displayStr);
    };

    const calcClear = () => {
        setExpression('');
        setDisplay('');
    };

    const calcEval = () => {
        try {
            // Safe evaluation isolated from DOM context
            // eslint-disable-next-line no-new-func
            const result = new Function('return ' + expression)();
            if(result === undefined || Number.isNaN(result)) throw new Error("Invalid");
            
            setDisplay(result.toString());
            setExpression(result.toString());
        } catch (error) {
            setDisplay("Error");
            setExpression("");
        }
    };

    return (
        <section className="tool-section active">
            <h2>Scientific Calculator</h2>
            <div className="calc-wrapper">
                <input type="text" id="calc-display" disabled value={display} />
                <div className="calc-grid">
                    <button className="calc-btn func" onClick={() => calcAction('Math.sin(')}>sin</button>
                    <button className="calc-btn func" onClick={() => calcAction('Math.cos(')}>cos</button>
                    <button className="calc-btn func" onClick={() => calcAction('Math.tan(')}>tan</button>
                    <button className="calc-btn clear" onClick={calcClear}>AC</button>
                    
                    <button className="calc-btn func" onClick={() => calcAction('Math.log10(')}>log</button>
                    <button className="calc-btn func" onClick={() => calcAction('Math.sqrt(')}>√</button>
                    <button className="calc-btn func" onClick={() => calcAction('**')}>x^y</button>
                    <button className="calc-btn op" onClick={() => calcAction('/')}>÷</button>
                    
                    <button className="calc-btn num" onClick={() => calcAction('7')}>7</button>
                    <button className="calc-btn num" onClick={() => calcAction('8')}>8</button>
                    <button className="calc-btn num" onClick={() => calcAction('9')}>9</button>
                    <button className="calc-btn op" onClick={() => calcAction('*')}>×</button>
                    
                    <button className="calc-btn num" onClick={() => calcAction('4')}>4</button>
                    <button className="calc-btn num" onClick={() => calcAction('5')}>5</button>
                    <button className="calc-btn num" onClick={() => calcAction('6')}>6</button>
                    <button className="calc-btn op" onClick={() => calcAction('-')}>-</button>
                    
                    <button className="calc-btn num" onClick={() => calcAction('1')}>1</button>
                    <button className="calc-btn num" onClick={() => calcAction('2')}>2</button>
                    <button className="calc-btn num" onClick={() => calcAction('3')}>3</button>
                    <button className="calc-btn op" onClick={() => calcAction('+')}>+</button>
                    
                    <button className="calc-btn num" onClick={() => calcAction('0')}>0</button>
                    <button className="calc-btn num" onClick={() => calcAction('.')}>.</button>
                    <button className="calc-btn func" onClick={() => calcAction(')')}>)</button>
                    <button className="calc-btn equal" onClick={calcEval}>=</button>
                </div>
            </div>
        </section>
    );
}