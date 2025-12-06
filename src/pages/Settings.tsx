import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Settings() {
    const [connections, setConnections] = useState({
        googleConnected: false,
        instagramConnected: false,
    });
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState<string | null>(null);

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
        setConnecting(provider);
        window.location.href = `/api/auth/${provider}?source=settings`;
    };

    const handleDisconnect = async (provider: 'google' | 'instagram') => {
        try {
            const response = await fetch(`/api/auth/disconnect?provider=${provider}`, {
                method: 'POST',
            });
            if (response.ok) {
                fetchSettings();
            }
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-[var(--accent-primary)]" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Settings</h1>
                    <p className="text-[var(--text-secondary)]">Manage your connected accounts and preferences.</p>
                </div>
            </div>

            {/* Connected Accounts */}
            <section>
                <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
                <div className="space-y-4">
                    {/* Google Drive */}
                    <div className="glass-panel p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.01 1.984c-1.14 0-2.195.545-2.86 1.48L1.613 15.555c-.535.928-.535 2.07 0 3 .536.928 1.54 1.48 2.614 1.48H19.77c1.074 0 2.078-.552 2.614-1.48.536-.93.536-2.072 0-3L14.87 3.464c-.665-.935-1.72-1.48-2.86-1.48zm-1.37 3.32l6.444 11.16H4.916l5.724-11.16zM13.66 17.5h-3.32l-1.66 2.88h6.64l-1.66-2.88z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium">Google Drive</h3>
                                <p className="text-sm text-[var(--text-secondary)]">
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
                                disabled={!!connecting}
                                className="btn-primary text-sm flex items-center gap-2"
                            >
                                {connecting === 'google' && <Loader2 className="animate-spin" size={14} />}
                                Connect Account
                            </button>
                        )}
                    </div>

                    {/* Instagram */}
                    <div className="glass-panel p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium">Instagram</h3>
                                <p className="text-sm text-[var(--text-secondary)]">
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
                                disabled={!!connecting}
                                className="btn-primary text-sm flex items-center gap-2"
                            >
                                {connecting === 'instagram' && <Loader2 className="animate-spin" size={14} />}
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
    );
}
