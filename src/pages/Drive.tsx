import { Search, Filter, MoreVertical, FileVideo, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getDriveFiles } from '../lib/api';

export default function Drive() {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await getDriveFiles();
            setFiles(response.data.files || []);
        } catch (err) {
            console.error('Failed to fetch drive files:', err);
            setError('Failed to load files from Google Drive. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Drive Files</h1>
                    <p className="text-[var(--text-secondary)]">Select videos to schedule for Instagram.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-primary)] w-full md:w-64"
                        />
                    </div>
                    <button className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)]">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* File Grid */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="animate-spin text-[var(--accent-primary)]" size={48} />
                </div>
            ) : error ? (
                <div className="text-center py-12 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                    <p>{error}</p>
                    <button onClick={fetchFiles} className="mt-4 text-sm underline hover:text-red-300">Try Again</button>
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-12 text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <p>No video files found in your Google Drive.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {files.map((file) => (
                        <div key={file.id} className="group p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] cursor-pointer transition-all">
                            <div className="aspect-video rounded-lg bg-[var(--bg-primary)] mb-3 relative overflow-hidden">
                                {file.thumbnailLink ? (
                                    <img src={file.thumbnailLink} alt={file.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FileVideo size={32} className="text-[var(--text-secondary)]" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="px-3 py-1.5 bg-white text-black rounded-lg text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        Select
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start justify-between">
                                <div className="min-w-0">
                                    <h3 className="font-medium truncate" title={file.name}>{file.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {file.size ? `${(parseInt(file.size) / 1024 / 1024).toFixed(1)} MB` : 'Unknown size'}
                                    </p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--bg-primary)] rounded">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
