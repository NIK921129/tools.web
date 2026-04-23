import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

export default function App() {
    const [theme, setTheme] = useState('light');
    const [activeTab, setActiveTab] = useState('img-to-pdf');

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
                    <div className="sidebar-category">Media Tools</div>
                    <button className={`nav-btn ${activeTab === 'img-to-pdf' ? 'active' : ''}`} onClick={() => setActiveTab('img-to-pdf')}>📄 Image to PDF</button>
                    <button className={`nav-btn ${activeTab === 'img-compress' ? 'active' : ''}`} onClick={() => setActiveTab('img-compress')}>🗜️ Image Compressor</button>
                    
                    <div className="sidebar-category">Math & Logic</div>
                    <button className={`nav-btn ${activeTab === 'calculator' ? 'active' : ''}`} onClick={() => setActiveTab('calculator')}>🧮 Calculator</button>

                    <div className="sidebar-category">Text Tools</div>
                    <button className={`nav-btn ${activeTab === 'word-count' ? 'active' : ''}`} onClick={() => setActiveTab('word-count')}>📝 Word/Char Counter</button>
                    <button className={`nav-btn ${activeTab === 'case-convert' ? 'active' : ''}`} onClick={() => setActiveTab('case-convert')}>🔠 Case Converter</button>
                    <button className={`nav-btn ${activeTab === 'text-reverse' ? 'active' : ''}`} onClick={() => setActiveTab('text-reverse')}>🔄 Text Reverser</button>
                    <button className={`nav-btn ${activeTab === 'space-remove' ? 'active' : ''}`} onClick={() => setActiveTab('space-remove')}>🧹 Remove Extra Spaces</button>
                    <button className={`nav-btn ${activeTab === 'lorem-ipsum' ? 'active' : ''}`} onClick={() => setActiveTab('lorem-ipsum')}>📖 Lorem Ipsum Gen</button>
                    
                    <div className="sidebar-category">Developer Tools</div>
                    <button className={`nav-btn ${activeTab === 'json-format' ? 'active' : ''}`} onClick={() => setActiveTab('json-format')}>{} JSON Formatter</button>
                    <button className={`nav-btn ${activeTab === 'base64-tool' ? 'active' : ''}`} onClick={() => setActiveTab('base64-tool')}>🔐 Base64 Encode/Decode</button>
                    <button className={`nav-btn ${activeTab === 'url-tool' ? 'active' : ''}`} onClick={() => setActiveTab('url-tool')}>🔗 URL Encode/Decode</button>
                    <button className={`nav-btn ${activeTab === 'uuid-gen' ? 'active' : ''}`} onClick={() => setActiveTab('uuid-gen')}>🔑 UUID Generator</button>
                    <button className={`nav-btn ${activeTab === 'pwd-gen' ? 'active' : ''}`} onClick={() => setActiveTab('pwd-gen')}>🛡️ Password Generator</button>
                    <button className={`nav-btn ${activeTab === 'hex-rgb' ? 'active' : ''}`} onClick={() => setActiveTab('hex-rgb')}>🎨 HEX to RGB</button>
                    <button className={`nav-btn ${activeTab === 'box-shadow' ? 'active' : ''}`} onClick={() => setActiveTab('box-shadow')}>🧊 Box Shadow Gen</button>
                    <button className={`nav-btn ${activeTab === 'keycode-info' ? 'active' : ''}`} onClick={() => setActiveTab('keycode-info')}>⌨️ Keycode Finder</button>
                    
                    <div className="sidebar-category">Utility & Time</div>
                    <button className={`nav-btn ${activeTab === 'qr-gen' ? 'active' : ''}`} onClick={() => setActiveTab('qr-gen')}>🔳 QR Code Gen</button>
                    <button className={`nav-btn ${activeTab === 'rng-tool' ? 'active' : ''}`} onClick={() => setActiveTab('rng-tool')}>🎲 Random Number</button>
                    <button className={`nav-btn ${activeTab === 'bmi-calc' ? 'active' : ''}`} onClick={() => setActiveTab('bmi-calc')}>⚖️ BMI Calculator</button>
                    <button className={`nav-btn ${activeTab === 'age-calc' ? 'active' : ''}`} onClick={() => setActiveTab('age-calc')}>🎂 Age Calculator</button>
                    <button className={`nav-btn ${activeTab === 'pct-calc' ? 'active' : ''}`} onClick={() => setActiveTab('pct-calc')}>% Percentage Calc</button>
                    <button className={`nav-btn ${activeTab === 'stopwatch' ? 'active' : ''}`} onClick={() => setActiveTab('stopwatch')}>⏱️ Stopwatch</button>
                    <button className={`nav-btn ${activeTab === 'unix-time' ? 'active' : ''}`} onClick={() => setActiveTab('unix-time')}>⏳ Unix Time Convert</button>
                </aside>
                
                <main className="main-content">
                    <div className="container">
                        {activeTab === 'img-to-pdf' && <ImageToPdf />}
                        {activeTab === 'img-compress' && <ImageCompressor />}
                        {activeTab === 'calculator' && <Calculator />}
                        {activeTab === 'word-count' && <WordCounter />}
                        {activeTab === 'case-convert' && <CaseConverter />}
                        {activeTab === 'text-reverse' && <TextReverser />}
                        {activeTab === 'space-remove' && <SpaceRemover />}
                        {activeTab === 'lorem-ipsum' && <LoremGenerator />}
                        {activeTab === 'json-format' && <JsonFormatter />}
                        {activeTab === 'base64-tool' && <Base64Tool />}
                        {activeTab === 'url-tool' && <UrlTool />}
                        {activeTab === 'uuid-gen' && <UuidGenerator />}
                        {activeTab === 'pwd-gen' && <PasswordGenerator />}
                        {activeTab === 'hex-rgb' && <HexRgbConverter />}
                        {activeTab === 'box-shadow' && <BoxShadowGenerator />}
                        {activeTab === 'keycode-info' && <KeycodeFinder />}
                        {activeTab === 'qr-gen' && <QrGenerator />}
                        {activeTab === 'rng-tool' && <RandomNumber />}
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

// --- UTILITY & TIME ---

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