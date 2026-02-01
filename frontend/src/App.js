
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js'; // Requires: npm install react-plotly.js plotly.js
import { 
  Brain, 
  Database, 
  BarChart, 
  Github, 
  Linkedin, 
  Twitter, 
  Menu, 
  X, 
  ChevronRight, 
  Cpu, 
  Code, 
  Terminal,
  Send,
  Play,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Upload, 
  FileText, 
  AlertCircle, 
  BarChart2
} from 'lucide-react';

// --- Constants ---
const API_BASE_URL = "http://127.0.0.1:8000/api";

// --- Mock Data ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Transformers in Computer Vision",
    excerpt: "An in-depth look at how ViT is challenging CNNs in image classification tasks.",
    category: "Deep Learning",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    tags: ["CV", "PyTorch", "Research"],
  },
  {
    id: 2,
    title: "Deploying ML Models with FastAPI and Docker",
    excerpt: "A step-by-step guide to containerizing your scikit-learn models for production.",
    category: "MLOps",
    date: "Nov 05, 2023",
    readTime: "12 min read",
    tags: ["DevOps", "Python", "Docker"],
  },
  {
    id: 3,
    title: "The State of RAG in 2024",
    excerpt: "Retrieval-Augmented Generation is evolving. Here is what you need to know about vector databases.",
    category: "NLP",
    date: "Dec 10, 2023",
    readTime: "10 min read",
    tags: ["LLM", "GenAI", "LangChain"],
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Customer Churn Predictor",
    description: "End-to-end classification pipeline to identify customers at risk of leaving. utilizing XGBoost and SHAP for interpretability.",
    tech: ["Python", "XGBoost", "Streamlit", "Pandas"],
    stats: "89% Accuracy"
  },
  {
    id: 2,
    title: "Real-time Object Detection",
    description: "YOLOv8 implementation for traffic monitoring systems. Optimized for edge devices using TensorRT.",
    tech: ["Computer Vision", "YOLO", "C++", "CUDA"],
    stats: "30 FPS on Jetson"
  },
];

// --- Helper for Gemini API ---
const callGemini = async (prompt) => {
  const apiKey = ""; // Set by environment
  // ... (Retain existing exponential backoff logic if needed)
  // Simulating for now to keep code concise
  return new Promise(resolve => setTimeout(() => resolve("This is a simulated AI response. Connect API key to enable."), 1000));
};

// --- Components ---

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Home', 'Blog', 'Portfolio', 'Playground', 'Models', 'About'];

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('Home')}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Brain size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Data<span className="text-blue-400">Sphere</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveTab(link)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === link 
                      ? 'bg-slate-800 text-blue-400' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => { setActiveTab(link); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActiveTab }) => (
  <div className="bg-slate-900 text-white pt-20 pb-24 relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
      <Database size={400} />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center md:text-left md:w-2/3">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium mb-6 border border-blue-800">
          <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
          Now featuring Auto-EDA & Gemini Integration
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Bridging the gap between <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Data & Reality
          </span>
        </h1>
        <p className="mt-4 text-xl text-slate-400 max-w-2xl mb-8">
          I'm a Data Scientist specializing in Machine Learning, NLP, and Predictive Analytics. 
          Explore my research, check out my code, or interact with deployed models live.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button 
            onClick={() => setActiveTab('Playground')}
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <BarChart2 size={20} />
            Try Data Playground
          </button>
          <button 
            onClick={() => setActiveTab('Portfolio')}
            className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <Code size={20} />
            View Projects
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- SECTIONS ---

const BlogSection = () => (
  <div className="py-12 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Knowledge Hub</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-200 p-6 flex flex-col">
            <span className="text-blue-600 text-xs font-bold uppercase mb-2">{post.category}</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h3>
            <p className="text-slate-600 mb-4 flex-1">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
               {post.tags.map(tag => <span key={tag} className="text-xs bg-slate-100 px-2 py-1 rounded">#{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PortfolioSection = () => (
  <div className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
             <div className="flex justify-between items-start mb-4">
                <Terminal size={24} className="text-blue-600" />
                <Github size={20} className="text-slate-400" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
             <p className="text-slate-600 mb-6">{project.description}</p>
             <div className="bg-white p-4 rounded-lg border border-slate-100 mb-6 flex items-center gap-3">
                <TrendingUp size={20} className="text-green-500" />
                <span className="font-semibold text-slate-800">Result:</span>
                <span className="text-slate-600">{project.stats}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- PLAYGROUND (AUTO-EDA) SECTION ---
const PlaygroundSection = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze-data/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if(response.status === 404) throw new Error("Backend endpoint not found. Did you start the Django server?");
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Playground (Auto-EDA)</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Upload a CSV dataset. My backend will use Pandas & Plotly to generate instant insights.</p>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-3xl mx-auto border border-slate-200">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-12 hover:border-blue-500 transition-colors bg-slate-50">
            <Upload size={48} className="text-blue-500 mb-4" />
            <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
              Select Dataset
            </label>
            {file && <p className="mt-4 text-slate-700 font-medium flex items-center gap-2"><FileText size={16}/> {file.name}</p>}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white transition-all ${
                !file || loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'
              }`}
            >
              {loading ? 'Processing on Backend...' : 'Generate Dashboard'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-200">
              <AlertCircle size={20} /> {error}
            </div>
          )}
        </div>

        {/* Results */}
        {analysis && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow border border-slate-200 text-center">
                <div className="text-slate-500 text-sm font-medium uppercase">Rows</div>
                <div className="text-3xl font-bold text-slate-900">{analysis.rows}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow border border-slate-200 text-center">
                <div className="text-slate-500 text-sm font-medium uppercase">Columns</div>
                <div className="text-3xl font-bold text-slate-900">{analysis.columns.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow border border-slate-200 text-center">
                <div className="text-slate-500 text-sm font-medium uppercase">Missing</div>
                <div className="text-3xl font-bold text-red-500">{Object.values(analysis.missing_values).reduce((a, b) => a + b, 0)}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow border border-slate-200 text-center">
                <div className="text-slate-500 text-sm font-medium uppercase">File</div>
                <div className="text-3xl font-bold text-blue-500">CSV</div>
              </div>
            </div>

            {/* Plotly Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {analysis.charts.correlation && (
                <div className="bg-white p-4 rounded-xl shadow border border-slate-200 h-96">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Correlation Matrix</h3>
                   <Plot
                    data={analysis.charts.correlation.data}
                    layout={{ ...analysis.charts.correlation.layout, autosize: true, margin: { t: 30, r: 20, l: 40, b: 40 } }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    config={{ responsive: true, displayModeBar: false }}
                  />
                </div>
              )}
               {analysis.charts.histogram && (
                <div className="bg-white p-4 rounded-xl shadow border border-slate-200 h-96">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Data Distribution</h3>
                   <Plot
                    data={analysis.charts.histogram.data}
                    layout={{ ...analysis.charts.histogram.layout, autosize: true, margin: { t: 30, r: 20, l: 40, b: 40 } }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    config={{ responsive: true, displayModeBar: false }}
                  />
                </div>
              )}
            </div>

            {/* Stats Table */}
            <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800">Descriptive Statistics</div>
               <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">Metric</th>
                      {Object.keys(analysis.stats).map(col => <th key={col} className="px-6 py-3">{col}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {['count', 'mean', 'std', 'min', 'max'].map(metric => (
                      <tr key={metric} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-bold text-slate-700 capitalize">{metric}</td>
                        {Object.keys(analysis.stats).map(col => (
                          <td key={col} className="px-6 py-3 text-slate-600">
                            {analysis.stats[col][metric] ? Number(analysis.stats[col][metric]).toFixed(2) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MODELS (AI DEMO) SECTION ---
const ModelsSection = () => {
  const [activeModel, setActiveModel] = useState('text-insights');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runModel = async () => {
    setLoading(true);
    setResult(null);
    try {
        const textResponse = await callGemini(inputText);
        setResult({ text: textResponse });
    } catch (err) {
        setResult({ text: "Error processing request." });
    }
    setLoading(false);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Interactive AI Models</h2>
            <p>Powered by Gemini and Custom Python Endpoints</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/4 space-y-2">
            <button onClick={() => { setActiveModel('text-insights'); setResult(null); }} className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all ${activeModel === 'text-insights' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>
              <Sparkles size={20} />
              <div className="flex flex-col"><span className="font-bold">Text Insights</span></div>
            </button>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
            <div className="p-8 flex-1">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800">Text Analysis</h3>
                  <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className="w-full h-32 p-4 border border-slate-300 rounded-lg" placeholder="Enter text to analyze..."></textarea>
                  <button onClick={runModel} disabled={loading || !inputText} className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                    {loading ? 'Processing...' : <><Play size={18}/> Run Model</>}
                  </button>
                  {result && <div className="mt-4 p-4 bg-slate-100 rounded-lg border border-slate-200">{result.text}</div>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-lg text-slate-600">I am a machine learning engineer passionate about interpretable AI and efficient deployment.</p>
          <div className="mt-8 flex justify-center gap-6">
              <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-blue-600"><Linkedin /> LinkedIn</a>
              <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-blue-600"><Github /> GitHub</a>
          </div>
      </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-center">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-center gap-2 text-white font-bold text-xl mb-4">
        <Brain className="text-blue-500" /> DataSphere
      </div>
      <p className="text-sm">© 2024 DataSphere Portfolio. Built with React & Django.</p>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'Home' && (
        <>
          <Hero setActiveTab={setActiveTab} />
          <BlogSection />
          <PortfolioSection />
        </>
      )}

      {activeTab === 'Blog' && <BlogSection />}
      {activeTab === 'Portfolio' && <PortfolioSection />}
      {activeTab === 'Playground' && <PlaygroundSection />}
      {activeTab === 'Models' && <ModelsSection />}
      {activeTab === 'About' && <AboutSection />}
      
      <Footer />
    </div>
  );
}