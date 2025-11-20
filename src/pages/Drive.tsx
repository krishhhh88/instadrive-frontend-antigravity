import { Search, Filter, MoreVertical, Folder, FileVideo } from 'lucide-react';

export default function Drive() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Folders */}
                {['Instagram Content', 'Raw Footage', 'Edited Reels'].map((folder) => (
                    <div key={folder} className="group p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] cursor-pointer transition-all">
                        <div className="flex items-start justify-between mb-3">
                            <Folder size={40} className="text-blue-400 fill-blue-400/20" />
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--bg-primary)] rounded">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <h3 className="font-medium truncate">{folder}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">12 items</p>
                    </div>
                ))}

                {/* Files */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="group p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] cursor-pointer transition-all">
                        <div className="aspect-video rounded-lg bg-[var(--bg-primary)] mb-3 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FileVideo size={32} className="text-[var(--text-secondary)]" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="px-3 py-1.5 bg-white text-black rounded-lg text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                    Select
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start justify-between">
                            <div className="min-w-0">
                                <h3 className="font-medium truncate">reel_draft_{i}.mp4</h3>
                                <p className="text-sm text-[var(--text-secondary)]">24.5 MB • Today</p>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--bg-primary)] rounded">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
