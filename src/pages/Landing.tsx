import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col">
            <header style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                import {Link} from 'react-router-dom';

                export default function Landing() {
    return (
                <div className="min-h-screen flex flex-col">
                    <header style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '8px' }}></div>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>DriveReel</span>
                            </div>
                            <nav>
                                <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                    Login
                                </Link>
                            </nav>
                        </div>
                    </header>

                    <main className="container" style={{ padding: '4rem 0', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Automate your <span className="text-gradient">Instagram Reels</span><br />
                            directly from Google Drive
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            Seamlessly schedule, edit, and publish your content without lifting a finger.
                            The ultimate workflow for content creators.
                        </p>
                        <div>
                            <Link to="/login" className="btn-primary" style={{ display: 'inline-block', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                Get Started
                            </Link>
                        </div>
                    </main>
                </div>
                );
}
