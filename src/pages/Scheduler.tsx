import { Clock, ChevronDown, Plus, Trash2, Play, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Scheduler() {
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [timezone, setTimezone] = useState('America/New_York (EST)');
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);

    // Mock schedule slots for now - in a real app these would come from DB
    const [scheduleSlots, setScheduleSlots] = useState([
        { id: 1, time: '09:00', day: 'Monday' },
        { id: 2, time: '17:00', day: 'Monday' },
    ]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            // Fetch posts that are ready to schedule (PENDING status)
            // We might need a specific endpoint for this or filter on client
            const response = await fetch('/api/dashboard'); // Using dashboard for now as it returns recent posts
            if (response.ok) {
                const data = await response.json();
                // Filter for pending posts or just show all for now as "Content Source"
                setVideos(data.recentActivity || []);
            }
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const timezones = [
        'America/New_York (EST)',
        'America/Los_Angeles (PST)',
        'Europe/London (GMT)',
        'Asia/Tokyo (JST)',
        'Australia/Sydney (AEDT)'
    ];

    return (
        <div className="h-[calc(100vh-6rem)] flex gap-6">
            {/* Left Side: Content Source */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-neutral-400 font-normal">Content Source:</span> Google Drive
                    </h1>
                    <div className="mt-2 px-4 py-2 bg-neutral-800/50 rounded-lg text-sm text-neutral-400 inline-flex items-center gap-2">
                        <span>Watching folder:</span>
                        <span className="text-indigo-400 font-medium">/Instagram Reels/</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="animate-spin text-indigo-500" size={32} />
                        </div>
                    ) : videos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {videos.map((video) => (
                                <div key={video.id} className="group bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-indigo-500 transition-all cursor-pointer">
                                    <div className={`aspect-video bg-gradient-to-br from-gray-700 to-gray-600 relative`}>
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Play className="text-white fill-white" size={32} />
                                        </div>
                                        {/* <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                                            {video.duration || '0:00'}
                                        </span> */}
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-medium text-sm truncate" title={video.videoName}>{video.videoName || 'Untitled'}</h3>
                                        <p className="text-xs text-neutral-500 mt-1">
                                            {video.status === 'PENDING' ? 'Ready to schedule' : video.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-neutral-500">
                            <p>No videos found in Drive folder.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Scheduling Sidebar */}
            <div className="w-96 glass-panel p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold mb-6">Scheduling</h2>

                <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Timezone</label>
                    <button
                        onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 text-left text-sm"
                    >
                        <span>{timezone}</span>
                        <ChevronDown size={16} className={`text-neutral-500 transition-transform ${isTimezoneOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isTimezoneOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-10 overflow-hidden">
                            {timezones.map((tz) => (
                                <button
                                    key={tz}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 transition-colors"
                                    onClick={() => {
                                        setTimezone(tz);
                                        setIsTimezoneOpen(false);
                                    }}
                                >
                                    {tz}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                        <div
                            key={day}
                            className={`rounded-xl border transition-colors cursor-pointer ${day === selectedDay ? 'bg-neutral-800/50 border-indigo-500/50' : 'bg-transparent border-transparent hover:bg-neutral-800/30'}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-6 rounded-full relative transition-colors ${day === selectedDay ? 'bg-indigo-600' : 'bg-neutral-700'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${day === selectedDay ? 'left-5' : 'left-1'}`} />
                                    </div>
                                    <span className={`font-medium ${day === selectedDay ? 'text-white' : 'text-neutral-400'}`}>{day}</span>
                                </div>
                            </div>

                            {day === selectedDay && (
                                <div className="p-3 pt-0 space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                                    {scheduleSlots.filter(s => s.day === day).map((slot) => (
                                        <div key={slot.id} className="flex items-center gap-2">
                                            <div className="flex-1 bg-neutral-900 rounded-lg px-3 py-2 text-sm border border-neutral-700 flex items-center justify-between">
                                                <span>{slot.time}</span>
                                            </div>
                                            <button
                                                className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                                                onClick={() => setScheduleSlots(slots => slots.filter(s => s.id !== slot.id))}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
                                            <input
                                                type="text"
                                                placeholder="10:00 AM"
                                                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
