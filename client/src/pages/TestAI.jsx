import React, { useState } from 'react';

const TestAI = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const testGemini = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data);
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError('Network error or server is down');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 mb-4 shadow-lg shadow-purple-500/30">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Connection Test</h1>
          <p className="text-purple-200">Verify Gemini 2.0 Flash Integration</p>
        </div>

        <button
          onClick={testGemini}
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/25"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <span>Test Gemini AI</span>
            </>
          )}
        </button>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200">
            <div className="flex items-center space-x-2">
              <span className="text-xl">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
            <button 
              onClick={testGemini}
              className="mt-3 text-sm text-red-300 hover:text-white underline decoration-red-300/50"
            >
              Try again
            </button>
          </div>
        )}

        {response && (
          <div className="mt-6 transition-all duration-500 ease-in-out">
            <div className="p-1 rounded-xl bg-gradient-to-r from-purple-500/30 to-indigo-500/30">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30">
                    {response.provider}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-white text-lg leading-relaxed font-medium">
                  {response.response}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center">
                  <p className="text-xs text-slate-400 flex items-center space-x-1">
                    <span>Powered by</span>
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Gemini AI
                    </span>
                    <span>✨</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAI;
