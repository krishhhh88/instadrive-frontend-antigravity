import { Clock, ChevronDown, Plus, Trash2, Play, Loader2, Save, FolderOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Scheduler() {
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [enabledDays, setEnabledDays] = useState<Set<string>>(new Set());
    const [timezone, setTimezone] = useState('America/New_York (EST)');
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [newTime, setNewTime] = useState('10:00 AM');

    // New state for persistence
    const [scheduleSlots, setScheduleSlots] = useState<any[]>([]);
    const [captionTemplate, setCaptionTemplate] = useState('');
    const [driveFolders, setDriveFolders] = useState<any[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<{ id: string, name: string } | null>(null);
    const [isFolderSelectOpen, setIsFolderSelectOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedFolder) {
            fetchVideos(selectedFolder.id);
        }
    }, [selectedFolder]);

    const fetchInitialData = async () => {
        try {
            const [scheduleRes, foldersRes] = await Promise.all([
                fetch('/api/schedule'),
                fetch('/api/drive/folders')
            ]);

            if (scheduleRes.ok) {
                const data = await scheduleRes.json();
                if (data.schedule) {
                    setEnabledDays(new Set(data.schedule.enabledDays || []));
                    setScheduleSlots(data.schedule.timeSlots || []);
                    setCaptionTemplate(data.schedule.captionTemplate || '');
                    if (data.schedule.driveFolderId) {
                        setSelectedFolder({
                            id: data.schedule.driveFolderId,
                            name: data.schedule.driveFolderName || 'Selected Folder'
                        });
                    }
                }
            }

            if (foldersRes.ok) {
                const data = await foldersRes.json();
                setDriveFolders(data.folders || []);
                // If no folder selected and we have folders, select the first one
                if (!selectedFolder && data.folders && data.folders.length > 0) {
                    // Don't auto-select here to avoid overriding saved state if it was just slow
                    // But if we truly have no saved state, we could. 
                    // For now, let's leave it null to prompt user selection or default behavior.
                }
            }
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVideos = async (folderId?: string) => {
        setLoading(true);
        try {
            let url = '/api/dashboard'; // Fallback
            // Ideally we should have a specific endpoint for listing videos in a folder
            // For now, let's assume we can pass folderId to a new endpoint or the existing one
            // Since we modified listVideoFiles to take folderId, let's use a new endpoint or modify dashboard
            // Actually, let's use the drive/files endpoint we verified earlier, but we need to update it to accept folderId
            // Wait, I didn't update the drive/files route to accept folderId query param yet.
            // I will assume I will do that next.
            url = `/api/drive/files${folderId ? `?folderId=${folderId}` : ''}`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setVideos(data.files || []);
            }
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveSchedule = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enabledDays: Array.from(enabledDays),
                    timeSlots: scheduleSlots,
                    captionTemplate,
                    driveFolderId: selectedFolder?.id,
                    driveFolderName: selectedFolder?.name
                }),
            });

            if (response.ok) {
                alert('Schedule saved successfully!');
            } else {
                alert('Failed to save schedule.');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('An error occurred while saving.');
        } finally {
            setSaving(false);
        }
    };

    const toggleDay = (day: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newEnabled = new Set(enabledDays);
        if (newEnabled.has(day)) {
            newEnabled.delete(day);
        } else {
            newEnabled.add(day);
        }
        setEnabledDays(newEnabled);
    };

    const addSlot = () => {
        if (!newTime) return;
        const newSlot = {
            id: Date.now(),
            time: newTime,
            day: selectedDay
        };
        setScheduleSlots([...scheduleSlots, newSlot]);
        setNewTime('10:00 AM');
    };

    const removeSlot = (id: number) => {
        setScheduleSlots(scheduleSlots.filter(s => s.id !== id));
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
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span className="text-neutral-400 font-normal">Content Source:</span> Google Drive
                        </h1>

                        <div className="mt-2 relative">
                            <button
                                onClick={() => setIsFolderSelectOpen(!isFolderSelectOpen)}
                                className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg text-sm text-neutral-400 inline-flex items-center gap-2 transition-colors border border-transparent hover:border-neutral-700"
                            >
                                <span>Watching folder:</span>
                                <span className="text-indigo-400 font-medium flex items-center gap-1">
                                    <FolderOpen size={14} />
                                    {selectedFolder ? selectedFolder.name : 'Select a folder...'}
                                </span>
                                <ChevronDown size={14} />
                            </button>

                            {isFolderSelectOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                                    {driveFolders.length > 0 ? (
                                        driveFolders.map(folder => (
                                            <button
                                                key={folder.id}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-700 transition-colors border-b border-neutral-700/50 last:border-0 flex items-center gap-2"
                                                onClick={() => {
                                                    setSelectedFolder({ id: folder.id, name: folder.name });
                                                    setIsFolderSelectOpen(false);
                                                }}
                                            >
                                                <FolderOpen size={16} className="text-neutral-500" />
                                                <span className="truncate">{folder.name}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-xs text-neutral-500">
                                            No folders found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
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
                                        {video.thumbnailLink ? (
                                            <img src={video.thumbnailLink} alt={video.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="text-white fill-white" size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-medium text-sm truncate" title={video.name}>{video.name || 'Untitled'}</h3>
                                        <p className="text-xs text-neutral-500 mt-1">
                                            {video.size ? `${(parseInt(video.size) / 1024 / 1024).toFixed(1)} MB` : 'Ready'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-neutral-500 bg-neutral-800/30 rounded-xl border border-neutral-800">
                            <p>No videos found in selected folder.</p>
                            {!selectedFolder && <p className="text-sm mt-2 text-indigo-400">Please select a folder to watch.</p>}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Scheduling Sidebar */}
            <div className="w-96 glass-panel p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Scheduling</h2>
                    <button
                        onClick={saveSchedule}
                        disabled={saving}
                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save
                    </button>
                </div>

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

                <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Caption Template</label>
                    <textarea
                        value={captionTemplate}
                        onChange={(e) => setCaptionTemplate(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 min-h-[80px] resize-none"
                        placeholder="Enter your default caption here... #hashtags"
                    />
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
                                    <div
                                        onClick={(e) => toggleDay(day, e)}
                                        className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${enabledDays.has(day) ? 'bg-indigo-600' : 'bg-neutral-700'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabledDays.has(day) ? 'left-5' : 'left-1'}`} />
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
                                                onClick={() => removeSlot(slot.id)}
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
                                                value={newTime}
                                                onChange={(e) => setNewTime(e.target.value)}
                                                placeholder="10:00 AM"
                                                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <button
                                            onClick={addSlot}
                                            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
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
