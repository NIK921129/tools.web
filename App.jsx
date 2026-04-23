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
        { id: "box-shadow", label: "🧊 Box Shadow Gen" }
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
        { id: "vowel-cons", label: "🅰️ Vowel Counter" }
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
        { id: "keycode-info", label: "⌨️ Keycode Finder" }
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
        { id: "age-calc", label: "🎂 Age Calculator" }
    ]},
    { category: "Utility & Time", tools: [
        { id: "qr-gen", label: "🔳 QR Code Gen" },
        { id: "pomodoro", label: "🍅 Pomodoro Timer" },
        { id: "stopwatch", label: "⏱️ Stopwatch" },
        { id: "unix-time", label: "⏳ Unix Time Convert" },
        { id: "date-diff", label: "📅 Date Difference" },
        { id: "leap-year", label: "🐸 Leap Year Check" }
    ]},
    { category: "Fun & Games", tools: [
        { id: "coin-flip", label: "🪙 Coin Flipper" },
        { id: "dice-roll", label: "🎲 Dice Roller" },
        { id: "rng-tool", label: "🎰 Random Number" }
    ]}
];

export default function App() {
    const [theme, setTheme] = useState('light');
    const [activeTab, setActiveTab] = useState('img-to-pdf');
    const [searchQuery, setSearchQuery] = useState('');

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
                <div className="logo">✨ NIK TOOLS</div>
                <button id="theme-toggle" className="theme-btn" onClick={toggleTheme}>
                    {theme === 'amoled' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </nav>

            <div className="app-layout">
                <aside className="sidebar">
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
                                    <button key={tool.id} className={`nav-btn ${activeTab === tool.id ? 'active' : ''}`} onClick={() => setActiveTab(tool.id)}>
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
                <h2 style={{color: isP ? '#10b981' : '#ef4444'}}>{num} is {isP ? 'Prime' : 'NOT Prime'}</h2>
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
        let int; if(running && timeLeft > 0) int = setInterval(()=>setTimeLeft(t=>t-1), 1000);
        return () => clearInterval(int);
    }, [running, timeLeft]);
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
                <button className="action-btn" style={{background:'#6b7280'}} onClick={()=>{setRunning(false); setTimeLeft(mode==='Work'?25*60:5*60);}}>Reset</button>
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
                <h2 style={{color: isLeap ? '#10b981' : '#ef4444'}}>{year} is {isLeap ? 'a Leap Year' : 'NOT a Leap Year'}</h2>
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
        return () => clearInterval(int);
    }, [running]);
    return (
        <section className="tool-section active">
            <h2>Stopwatch</h2>
            <div className="result-box text-center"><h1 style={{fontSize:'3rem', fontVariantNumeric:'tabular-nums'}}>{new Date(time*1000).toISOString().substr(11,8)}</h1></div>
            <div className="controls mt-2">
                <button className="action-btn" onClick={()=>setRunning(true)}>Start</button>
                <button className="action-btn" style={{background:'#ef4444'}} onClick={()=>setRunning(false)}>Stop</button>
                <button className="action-btn" style={{background:'#6b7280'}} onClick={()=>{setRunning(false); setTime(0);}}>Reset</button>
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
    const [c1, setC1] = useState('#8b5cf6');
    const [c2, setC2] = useState('#6366f1');
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

        const readFileAsDataURL = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imgData = await readFileAsDataURL(file);
            
            const img = new Image();
            img.src = imgData;
            await new Promise(resolve => img.onload = resolve);
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (img.height * pdfWidth) / img.width;

            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
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