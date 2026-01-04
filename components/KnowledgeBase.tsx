import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, CheckCircle, Clock, Trash2, Search, FileJson, FileSpreadsheet, Download, Loader2, RefreshCw, XCircle, Database, Brain, FileScan, Gamepad2 } from 'lucide-react';
import { MOCK_FILES } from '../constants';
import { IngestionFile } from '../types';
import { GHANA_FINANCIAL_LITERACY_DATASET } from '../data/sampleData';

const KnowledgeBase: React.FC = () => {
  const [files, setFiles] = useState<IngestionFile[]>(MOCK_FILES);
  const [dragActive, setDragActive] = useState(false);
  const [gamifyingId, setGamifyingId] = useState<string | null>(null);
  const intervalRefs = useRef<{ [key: string]: ReturnType<typeof setInterval> }>({});

  // Resume simulation for any existing 'processing' files on mount
  useEffect(() => {
    fetchDocuments(); // Fetch real documents on mount

    files.forEach(file => {
      if ((file.status === 'processing' || file.status === 'uploading') && file.progress < 100) {
        if (!intervalRefs.current[file.id]) {
          simulateFileProgress(file.id);
        }
      }
    });

    // Cleanup intervals on unmount
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
      intervalRefs.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simulateFileProgress = (fileId: string) => {
    // Clear any existing interval for this file just in case
    if (intervalRefs.current[fileId]) clearInterval(intervalRefs.current[fileId]);

    const interval = setInterval(() => {
      setFiles((currentFiles) => {
        const fileIndex = currentFiles.findIndex(f => f.id === fileId);

        // If file removed, stop interval
        if (fileIndex === -1) {
          clearInterval(interval);
          delete intervalRefs.current[fileId];
          return currentFiles;
        }

        const file = currentFiles[fileIndex];

        // If already done, stop interval
        if (file.progress >= 100) {
          clearInterval(interval);
          delete intervalRefs.current[fileId];
          return currentFiles.map(f => f.id === fileId ? {
            ...f,
            status: 'embedded',
            progress: 100,
            currentStep: 'Ready for RAG'
          } : f);
        }

        // Logic for detailed steps simulation
        let nextProgress = file.progress;
        let status: 'uploading' | 'processing' | 'embedded' = 'processing';
        let step = file.currentStep;

        // Stage 1: Uploading (0-20%)
        if (nextProgress < 20) {
          nextProgress += Math.floor(Math.random() * 5) + 2;
          status = 'uploading';
          step = `Uploading to bucket... ${Math.min(Math.round((nextProgress / 20) * 100), 99)}%`;
        }
        // Stage 2: Parsing (20-45%)
        else if (nextProgress < 45) {
          nextProgress += Math.floor(Math.random() * 3) + 1;
          status = 'processing';
          step = 'Parsing document structure & metadata...';
        }
        // Stage 3: Chunking & Embedding (45-80%)
        else if (nextProgress < 80) {
          nextProgress += Math.floor(Math.random() * 4) + 1;
          status = 'processing';
          const chunkCount = Math.floor((nextProgress - 45) * 2.5);
          step = `Generating embeddings: Chunk #${chunkCount}`;
        }
        // Stage 4: Indexing (80-99%)
        else if (nextProgress < 100) {
          nextProgress += Math.floor(Math.random() * 2) + 1;
          status = 'processing';
          step = 'Indexing vectors to Vertex AI...';
        }

        // Cap at 100 and finish
        if (nextProgress >= 100) {
          nextProgress = 100;
          status = 'embedded';
          step = 'Ready for RAG';
          clearInterval(interval);
          delete intervalRefs.current[fileId];
        }

        return currentFiles.map(f => f.id === fileId ? {
          ...f,
          progress: nextProgress,
          status: status as any,
          currentStep: step
        } : f);
      });
    }, 500); // 500ms tick for reasonably fast but readable updates

    intervalRefs.current[fileId] = interval;
  };

  const deleteFile = (id: string) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleGamify = async (file: IngestionFile) => {
    if (!file.serverFilename) {
      alert("Cannot gamify this file (missing server filename).");
      return;
    }

    setGamifyingId(file.id);
    try {
      const res = await fetch('/api/gamify/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.serverFilename })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Success! Gamification module "${data.title}" created. ID: ${data.gameId}`);
      } else {
        alert("Error: " + data.error);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to gamify content.");
    } finally {
      setGamifyingId(null);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/rag/documents');
      if (res.ok) {
        const data = await res.json();
        // Map backend files to IngestionFile format
        const realFiles: IngestionFile[] = data.documents.map((doc: any, index: number) => {
          // Clean filename: remove 'file-timestamp-' prefix if present
          let displayName = doc.name;
          const parts = doc.name.match(/^file-\d+-\d+-(.+)$/);
          if (parts && parts[1]) {
            displayName = parts[1];
          }

          return {
            id: doc.name + index,
            name: displayName,
            serverFilename: doc.name, // Store real filename
            type: doc.name.split('.').pop()?.toUpperCase() || 'TXT',
            size: doc.size,
            status: 'embedded',
            progress: 100,
            currentStep: 'Ready for RAG',
            uploadDate: doc.date
          };
        });
        setFiles(realFiles);
      }
    } catch (e) {
      console.error("Failed to fetch documents", e);
    }
  };

  const getIcon = (type: string) => {
    // Basic normalization
    const safeType = type?.toUpperCase() || 'TXT';

    if (safeType.includes('JSON')) return <FileJson size={20} className="text-orange-500" />;
    if (safeType.includes('CSV')) return <FileSpreadsheet size={20} className="text-green-500" />;
    if (safeType.includes('PDF')) return <FileText size={20} className="text-red-500" />;
    return <FileText size={20} className="text-blue-500" />;
  };

  const getStepIcon = (progress: number, status: string) => {
    if (status === 'embedded') return <CheckCircle size={12} />;
    if (progress < 20) return <Upload size={12} />;
    if (progress < 45) return <FileScan size={12} />;
    if (progress < 80) return <Brain size={12} />;
    return <Database size={12} />;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const downloadSampleDataset = () => {
    const jsonString = JSON.stringify(GHANA_FINANCIAL_LITERACY_DATASET, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'gh_financial_literacy_sample.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Reuse the logic from handleDrop by creating a synthetic event or extracting the logic
      // For simplicity, let's extract the upload logic to a function or just duplicate the essential part here
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const typeStr = file.name.split('.').pop()?.toUpperCase() || 'TXT';
    const fileType = ['PDF', 'JSON', 'CSV', 'TXT'].includes(typeStr) ? typeStr as any : 'TXT';

    const newFile: IngestionFile = {
      id: Date.now().toString(),
      name: file.name,
      type: fileType,
      size: (file.size / 1024).toFixed(1) + ' KB',
      status: 'uploading',
      progress: 0,
      currentStep: 'Starting upload...',
      uploadDate: 'Just now'
    };

    const formData = new FormData();
    formData.append('file', file);

    setFiles(prev => [newFile, ...prev]);

    fetch('/api/rag/ingest', {
      method: 'POST',
      body: formData
    }).then(async (res) => {
      if (res.ok) {
        // simulateFileProgress(newFile.id); // No longer needed, real backend update
        fetchDocuments(); // Reload list to show actual server state
      } else {
        const err = await res.json();
        alert("Upload Failed: " + err.error);
        setFiles(prev => prev.filter(f => f.id !== newFile.id));
      }
    }).catch(err => {
      console.error(err);
      alert("Upload Error");
      setFiles(prev => prev.filter(f => f.id !== newFile.id));
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.txt,.json,.csv"
      />
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Knowledge Ingestion</h2>
          <p className="text-slate-600 mt-2">
            Upload documents to train Osikani's generalized knowledge base (RAG Tier).
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadSampleDataset}
            className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            Download Sample JSON
          </button>
          <button
            onClick={handleBrowseClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Upload size={18} />
            Upload Document
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all ${dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Upload size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Drag & Drop files here</h3>
            <p className="text-slate-500 mt-1 mb-4">Supports PDF, JSON, CSV, TXT</p>
            <button onClick={handleBrowseClick} className="text-emerald-600 font-medium hover:underline">or browse computer</button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-700">Ingested Files</h3>
                <button
                  onClick={fetchDocuments}
                  className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                  title="Refresh List"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="pl-9 pr-4 py-1.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500 bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Size</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                      {getIcon(file.type)}
                      {file.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{file.type}</td>
                    <td className="px-6 py-4 text-slate-500">{file.size}</td>
                    <td className="px-6 py-4 min-w-[200px]">
                      {file.status === 'embedded' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} /> Embedded
                        </span>
                      ) : (
                        <div className="w-full">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5 animate-pulse">
                              {getStepIcon(file.progress, file.status)}
                              {file.currentStep}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{file.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${file.progress < 20 ? 'bg-slate-400' :
                                file.progress < 45 ? 'bg-orange-400' :
                                  file.progress < 80 ? 'bg-blue-500' : 'bg-purple-500'
                                }`}
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Gamify Button */}
                        {file.status === 'embedded' && (
                          <button
                            className="text-purple-500 hover:text-purple-700 hover:bg-purple-50 p-1.5 rounded transition-colors"
                            onClick={() => handleGamify(file)}
                            title="Gamify this Content"
                            disabled={gamifyingId === file.id}
                          >
                            {gamifyingId === file.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Gamepad2 size={16} />
                            )}
                          </button>
                        )}

                        <button
                          className="text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded"
                          onClick={() => deleteFile(file.id)}
                          title={file.status === 'processing' || file.status === 'uploading' ? 'Cancel' : 'Delete'}
                        >
                          {(file.status === 'processing' || file.status === 'uploading') ? (
                            <XCircle size={16} />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Vector Store Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Total Chunks</span>
                  <span className="font-bold text-slate-800">12,405</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[70%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Index Size</span>
                  <span className="font-bold text-slate-800">450 MB</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[45%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Endpoint</h4>
              <p className="text-xs font-mono bg-slate-100 p-2 rounded text-slate-600 break-all">
                projects/osikani-prod/locations/us-central1/indexes/finance-v1
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold mb-2">Ingestion Pipeline</h3>
            <p className="text-sm opacity-90 mb-4">
              Running <code>ingestion.py</code> worker nodes.
            </p>
            <div className="flex items-center gap-2 text-xs bg-white/20 p-2 rounded">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Processing Queue: Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;