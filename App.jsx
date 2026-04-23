import React, { useState, useRef } from 'react';
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
                </aside>
                
                <main className="main-content">
                    <div className="container">
                        {activeTab === 'img-to-pdf' && <ImageToPdf />}
                        {activeTab === 'img-compress' && <ImageCompressor />}
                        {activeTab === 'calculator' && <Calculator />}
                    </div>
                </main>
            </div>
        </div>
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