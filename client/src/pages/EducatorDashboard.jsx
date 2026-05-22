import React, { useState } from 'react';
import UploadDropzone from '../components/educator/UploadDropzone';
import AIProcessingScreen from '../components/educator/AIProcessingScreen';
import GeneratedDashboard from '../components/educator/GeneratedDashboard';
import ContentLibrary from '../components/educator/ContentLibrary';
import { useUser } from '../context/UserContext';

const EducatorDashboard = () => {
  const { logout } = useUser();
  // States: 'library', 'upload', 'processing', 'results'
  const [viewState, setViewState] = useState('upload');
  const [curriculumData, setCurriculumData] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleUpload = async (file) => {
    setViewState('processing');
    setIsProcessing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:5000/api/upload-content', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setCurriculumData(result.data);
      } else {
        setError(result.message || "Failed to process file");
      }
    } catch (err) {
      console.error(err);
      setError("Network error occurred during processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessingComplete = () => {
    if (error) {
      alert(`Processing Error: ${error}`);
      setViewState('upload');
    } else {
      setViewState('results');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080F] pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Tabs if not processing */}
        {viewState !== 'processing' && (
          <div className="flex items-center justify-between mb-12">
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewState('upload')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${viewState === 'upload' || viewState === 'results' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                Upload Content
              </button>
              <button 
                onClick={() => setViewState('library')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${viewState === 'library' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                My Library
              </button>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg font-medium text-sm transition-colors border border-transparent hover:border-red-500/30"
            >
              Switch Role / Logout
            </button>
          </div>
        )}

        {viewState === 'library' && <ContentLibrary onUploadNew={() => setViewState('upload')} />}
        {viewState === 'upload' && <UploadDropzone onUpload={handleUpload} />}
        {viewState === 'processing' && <AIProcessingScreen isProcessing={isProcessing} onComplete={handleProcessingComplete} />}
        {viewState === 'results' && <GeneratedDashboard data={curriculumData} onBack={() => setViewState('upload')} />}

      </div>
    </div>
  );
};

export default EducatorDashboard;
