import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-medium text-ink-200 sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium sm:text-4xl">Page Not Found</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-400">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <Home size={16} />
        Back to Home
      </Link>
    </div>
  );
}
