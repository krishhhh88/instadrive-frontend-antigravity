import { ArrowUpRight, Instagram, HardDrive, Clock } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, John 👋</h1>
                <p className="text-[var(--text-secondary)]">Here's what's happening with your content today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Scheduled Posts"
                    value="12"
                    subtitle="+4 this week"
                    icon={Clock}
                    color="text-blue-400"
                />
                <StatCard
                    title="Drive Storage"
                    value="45%"
                    subtitle="12.5 GB used"
                    icon={HardDrive}
                    color="text-green-400"
                />
                <StatCard
                    title="Total Reach"
                    value="24.5k"
                    subtitle="+12% vs last month"
                    icon={Instagram}
                    color="text-pink-400"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                    <button className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-1">
                        View All <ArrowUpRight size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                            <div className="w-12 h-12 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden">
                                {/* Placeholder for thumbnail */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">Summer_Vibes_Reel_{i}.mp4</h4>
                                <p className="text-sm text-[var(--text-secondary)]">Processed 2 hours ago</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                Ready
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtitle, icon: Icon, color }: any) {
    return (
        <div className="glass-panel p-6 hover:border-[var(--accent-primary)] transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-[var(--bg-primary)] ${color}`}>
                    <Icon size={24} />
                </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        </div>
    );
}
