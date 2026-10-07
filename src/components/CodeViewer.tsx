import React, { useState } from 'react';
import { PHP_PROJECT_FILES, SourceFile } from '../data/sourceFiles';
import { 
  Folder, 
  FileCode, 
  Database, 
  Copy, 
  Check, 
  Download, 
  Search, 
  FileText,
  ExternalLink 
} from 'lucide-react';

interface CodeViewerProps {
  initialFile?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ initialFile }) => {
  const [selectedFileName, setSelectedFileName] = useState<string>(
    initialFile || 'database.sql'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activeFile = PHP_PROJECT_FILES.find(f => f.name === selectedFileName) || PHP_PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = PHP_PROJECT_FILES.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { key: 'database', label: 'Database & Schema', icon: Database },
    { key: 'config', label: 'Configuration', icon: Folder },
    { key: 'customer', label: 'Customer Pages', icon: FileCode },
    { key: 'admin', label: 'Admin Module', icon: FileCode },
    { key: 'shared', label: 'Shared Assets & Includes', icon: Folder }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner with Download Button */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
            <span>Modular PHP &amp; MySQL Source Tree</span>
            <span className="bg-slate-700 px-2 py-0.5 rounded text-[10px] text-slate-300">19 Total Files</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold">XAMPP Ready-to-Run Project Files</h2>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
            Pure beginner-friendly procedural PHP with mysqli and MySQL schema. No npm, no Laravel, no frameworks &ndash; simple code perfect for college vivas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/travelease.zip"
            download="travelease.zip"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Download Full Project (.zip)
          </a>
        </div>
      </div>

      {/* Main File Explorer Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Left Sidebar: File Tree */}
        <div className="md:col-span-4 border-r border-slate-200 bg-slate-50/60 p-4 flex flex-col">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search PHP / SQL files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-sky-600"
            />
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
            {categories.map(cat => {
              const catFiles = filteredFiles.filter(f => f.category === cat.key);
              if (catFiles.length === 0) return null;
              const Icon = cat.icon;

              return (
                <div key={cat.key}>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                    <Icon className="w-3 h-3 text-slate-400" />
                    <span>{cat.label}</span>
                  </div>
                  <div className="space-y-1">
                    {catFiles.map(file => (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFileName(file.name)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition ${
                          selectedFileName === file.name
                            ? 'bg-sky-600 text-white font-bold shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/70'
                        }`}
                      >
                        <span className="truncate">{file.path}</span>
                        <span className={`text-[10px] uppercase ml-2 ${
                          selectedFileName === file.name ? 'text-sky-200' : 'text-slate-400'
                        }`}>
                          {file.language}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Code Display Area */}
        <div className="md:col-span-8 p-4 md:p-6 flex flex-col bg-white">
          {/* Header of Active File */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold font-mono text-slate-800">
                  {activeFile.path}
                </span>
                <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                  {activeFile.language}
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                {activeFile.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-slate-100 flex-1">
            <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700/60 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{activeFile.name} &bull; {activeFile.content.split('\n').length} lines</span>
              <span>UTF-8 &bull; LF</span>
            </div>

            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[520px] select-all">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
