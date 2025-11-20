import { useState } from 'react';
import { Clock, Calendar as CalendarIcon, ChevronDown, Plus, Trash2, Play } from 'lucide-react';

export default function Scheduler() {
    const [selectedDay, setSelectedDay] = useState('Monday');

    const mockVideos = [
        { id: 1, title: 'Summer Vacation Highlights', duration: '0m 58s', thumb: 'bg-gradient-to-br from-orange-400 to-pink-500' },
        { id: 2, title: 'Mountain Biking Adventure', duration: '0m 45s', thumb: 'bg-gradient-to-br from-green-400 to-emerald-600' },
        { id: 3, title: 'Cooking a new Recipe', duration: '0m 33s', thumb: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
        { id: 4, title: "My Cat's Funniest Moments", duration: '0m 25s', thumb: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
        { id: 5, title: 'City Timelapse.mov', duration: '1m 0s', thumb: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
        { id: 6, title: 'Workout Routine.mp4', duration: '0m 52s', thumb: 'bg-gradient-to-br from-red-400 to-rose-600' },
    ];

    const scheduleSlots = [
        { id: 1, time: '09:00', day: 'Monday' },
        { id: 2, time: '17:00', day: 'Monday' },
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockVideos.map((video) => (
                            <div key={video.id} className="group bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-indigo-500 transition-all cursor-pointer">
                                <div className={`aspect-video ${video.thumb} relative`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <Play className="text-white fill-white" size={32} />
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-sm truncate" title={video.title}>{video.title}</h3>
                                    <p className="text-xs text-neutral-500 mt-1">Ready to schedule</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Scheduling Sidebar */}
            <div className="w-96 glass-panel p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold mb-6">Scheduling</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Timezone</label>
                    <button className="w-full flex items-center justify-between px-4 py-2.5 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 text-left text-sm">
                        <span>America/New_York (EST)</span>
                        <ChevronDown size={16} className="text-neutral-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                        <div key={day} className={`rounded-xl border ${day === selectedDay ? 'bg-neutral-800/50 border-indigo-500/50' : 'bg-transparent border-transparent'}`}>
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-6 rounded-full relative transition-colors ${day === selectedDay ? 'bg-indigo-600' : 'bg-neutral-700'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${day === selectedDay ? 'left-5' : 'left-1'}`} />
                                    </div>
                                    <span className={`font-medium ${day === selectedDay ? 'text-white' : 'text-neutral-400'}`}>{day}</span>
                                </div>
                            </div>

                            {day === selectedDay && (
                                <div className="p-3 pt-0 space-y-3">
                                    {scheduleSlots.map((slot) => (
                                        <div key={slot.id} className="flex items-center gap-2">
                                            <div className="flex-1 bg-neutral-900 rounded-lg px-3 py-2 text-sm border border-neutral-700 flex items-center justify-between">
                                                <span>{slot.time}</span>
                                            </div>
                                            <button className="p-2 text-neutral-500 hover:text-red-400 transition-colors">
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
