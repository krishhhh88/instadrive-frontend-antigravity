import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    HardDrive,
    Calendar,
    Settings,
    LogOut,
    Menu
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: HardDrive, label: 'Drive Files', path: '/dashboard/drive' },
        { icon: Calendar, label: 'Schedule', path: '/dashboard/schedule' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)]
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-[var(--border-color)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent-gradient)] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight">DriveReel</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            // Check if the current path starts with the item path (for nested routes)
                            // But for exact match on dashboard root, we need to be careful
                            const isActive = item.path === '/dashboard'
                                ? location.pathname === '/dashboard'
                                : location.pathname.startsWith(item.path);

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive: routeActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive || routeActive
                                            ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-indigo-500/20'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-white'
                                        }
                  `}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-[var(--border-color)]">
                        <Link to="/login" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[var(--bg-primary)] transition-colors text-left">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                JD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">John Doe</p>
                                <p className="text-xs text-[var(--text-secondary)] truncate">Pro Plan</p>
                            </div>
                            <LogOut size={18} className="text-[var(--text-secondary)]" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
                {/* Top Bar (Mobile Only) */}
                <div className="lg:hidden p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]">
                    <span className="font-bold text-lg">DriveReel</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-lg hover:bg-[var(--bg-primary)]"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
