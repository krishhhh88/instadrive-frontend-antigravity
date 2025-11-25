import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Settings() {
    const [connections, setConnections] = useState({
        googleConnected: false,
        instagramConnected: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            if (response.ok) {
                const data = await response.json();
                setConnections(data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = (provider: 'google' | 'instagram') => {
        window.location.href = `/api/auth/${provider}`;
    };

    const handleDisconnect = async (provider: 'google' | 'instagram') => {
        if (!confirm(`Are you sure you want to disconnect ${provider}?`)) return;

        try {
            const response = await fetch('/api/auth/disconnect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider }),
            });

            if (response.ok) {
                fetchSettings();
            } else {
                alert('Failed to disconnect account');
            }
        } catch (error) {
            console.error('Disconnect error:', error);
            alert('An error occurred while disconnecting');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-[var(--accent-primary)]" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-bold mb-1">Settings</h1>
            <p className="text-[var(--text-secondary)] mb-8">Manage your account connections and preferences.</p>

            <div className="space-y-6">
                {/* Connected Accounts */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
                    <div className="space-y-4">
                        {/* Google Drive */}
                        <div className="glass-panel p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.66667 3.5H15.3333L22 15H15.3333L8.66667 3.5Z" fill="#FFC107" />
                                        <path d="M5.33333 20.5H18.6667L15.3333 15H2L5.33333 20.5Z" fill="#4285F4" />
                                        <path d="M2 15L8.66667 3.5L5.33333 9.16667L2 15Z" fill="#34A853" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium">Google Drive</h3>
                                    <p className={`text-sm ${connections.googleConnected ? 'text-green-400' : 'text-[var(--text-secondary)]'}`}>
                                        {connections.googleConnected ? 'Connected' : 'Not connected'}
                                    </p>
                                </div>
                            </div>
                            {connections.googleConnected ? (
                                <button
                                    onClick={() => handleDisconnect('google')}
                                    className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                                >
                                    Disconnect
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleConnect('google')}
                                    className="btn-primary text-sm"
                                >
                                    Connect Account
                                </button>
                            )}
                        </div>

                        {/* Instagram */}
                        <div className="glass-panel p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium">Instagram Business</h3>
                                    <p className={`text-sm flex items-center gap-1 ${connections.instagramConnected ? 'text-green-400' : 'text-yellow-500'}`}>
                                        {!connections.instagramConnected && <AlertCircle size={12} />}
                                        {connections.instagramConnected ? 'Connected' : 'Not connected'}
                                    </p>
                                </div>
                            </div>
                            {connections.instagramConnected ? (
                                <button
                                    onClick={() => handleDisconnect('instagram')}
                                    className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                                >
                                    Disconnect
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleConnect('instagram')}
                                    className="btn-primary text-sm"
                                >
                                    Connect Account
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Preferences */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                    <div className="glass-panel p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Auto-Sync Drive</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Automatically scan for new video files</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-primary)]"></div>
                            </label>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
