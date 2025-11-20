import { Calendar as CalendarIcon, Plus } from 'lucide-react';

export default function Schedule() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Content Schedule</h1>
                    <p className="text-[var(--text-secondary)]">Manage your upcoming posts and reels.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    <span>New Post</span>
                </button>
            </div>

            <div className="flex-1 glass-panel overflow-hidden flex flex-col">
                {/* Calendar Header */}
                <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                    <h2 className="font-semibold text-lg">November 2025</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-primary)]">Today</button>
                        <div className="flex rounded-lg border border-[var(--border-color)] overflow-hidden">
                            <button className="px-3 py-1 bg-[var(--accent-primary)] text-white">Month</button>
                            <button className="px-3 py-1 hover:bg-[var(--bg-primary)]">Week</button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid Placeholder */}
                <div className="flex-1 bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)]">
                    <div className="text-center">
                        <CalendarIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Calendar View Implementation Coming Soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
