/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppSimulator } from './components/AppSimulator';
import { CodeViewer } from './components/CodeViewer';
import { AcademicKit } from './components/AcademicKit';
import { XamppGuide } from './components/XamppGuide';
import { 
  Play, 
  Code2, 
  GraduationCap, 
  Server, 
  Download, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code' | 'academic' | 'xampp'>('demo');
  const [inspectTargetFile, setInspectTargetFile] = useState<string>('database.sql');

  const handleInspectFileFromDemo = (fileName: string) => {
    setInspectTargetFile(fileName);
    setActiveTab('code');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900">
      {/* Top Application Header Bar */}
      <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo & College Project Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✈️</span>
              <div>
                <div className="text-base font-extrabold tracking-tight text-white leading-tight">
                  Travel<span className="text-amber-400">Ease</span>
                </div>
                <div className="text-[10px] text-sky-400 font-medium">
                  Travel Package Booking System &bull; PHP + MySQL
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 ml-3 pl-3 border-l border-slate-700 text-[11px] text-slate-300">
              <span className="bg-slate-800 text-sky-300 px-2 py-0.5 rounded font-mono font-semibold">
                College SE &amp; Testing Project
              </span>
            </div>
          </div>

          {/* Core Tabs Navigation */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 overflow-x-auto">
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'demo'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Interactive Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'code'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>PHP Source Code</span>
            </button>

            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'academic'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>SE &amp; Testing Dossier</span>
            </button>

            <button
              onClick={() => setActiveTab('xampp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'xampp'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>XAMPP Setup</span>
            </button>
          </div>

          {/* Download Zip Action */}
          <div className="flex items-center gap-2">
            <a
              href="/travelease.zip"
              download="travelease.zip"
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition"
              title="Download entire PHP + MySQL project folder as a ZIP file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span> .zip
            </a>
          </div>
        </div>
      </nav>

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'demo' && (
          <AppSimulator onInspectFile={handleInspectFileFromDemo} />
        )}

        {activeTab === 'code' && (
          <CodeViewer initialFile={inspectTargetFile} />
        )}

        {activeTab === 'academic' && (
          <AcademicKit />
        )}

        {activeTab === 'xampp' && (
          <XamppGuide />
        )}
      </main>
    </div>
  );
}
