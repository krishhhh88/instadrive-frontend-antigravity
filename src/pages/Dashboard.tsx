import { ArrowUpRight, Instagram, HardDrive, Clock, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardData {
    stats: {
        scheduledPosts: number;
        scheduledThisWeek: number;
        totalPosted: number;
    };
    recentActivity: any[];
    connections: {
        googleDrive: boolean;
        instagram: boolean;
    };
}

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/dashboard');
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
                // Fetch user info if available in a separate context or endpoint
                // For now, we'll default to 'User' or extract from a global context if it existed
                // Assuming we might store user info in localStorage or a context after login
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    if (parsed.name) setUserName(parsed.name);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-[var(--accent-primary)]" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userName} 👋</h1>
                <p className="text-[var(--text-secondary)]">Here's what's happening with your content today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Scheduled Posts"
                    value={data?.stats.scheduledPosts.toString() || "0"}
                    subtitle={`+${data?.stats.scheduledThisWeek || 0} this week`}
                    icon={Clock}
                    color="text-blue-400"
                />
                <StatCard
                    title="Drive Storage"
                    value={data?.connections.googleDrive ? "Connected" : "Not Linked"}
                    subtitle={data?.connections.googleDrive ? "Ready to sync" : "Connect in Settings"}
                    icon={HardDrive}
                    color={data?.connections.googleDrive ? "text-green-400" : "text-gray-400"}
                />
                <StatCard
                    title="Total Posted"
                    value={data?.stats.totalPosted.toString() || "0"}
                    subtitle="Lifetime posts"
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
                    {data?.recentActivity && data.recentActivity.length > 0 ? (
                        data.recentActivity.map((post: any) => (
                            <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                                <div className="w-12 h-12 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                    {/* Placeholder for thumbnail */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium truncate">{post.videoName || 'Untitled Video'}</h4>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${post.status === 'POSTED'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {post.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-[var(--text-secondary)]">
                            <p>No recent activity found.</p>
                        </div>
                    )}
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
