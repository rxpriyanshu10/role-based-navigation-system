import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="text-4xl font-semibold text-text-tertiary">404</p>
        <h1 className="mt-2 text-base font-semibold text-text-primary">Page not found</h1>
        <p className="mt-1 text-sm text-text-secondary">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
        >
          Back to Overview
        </Link>
      </div>
    </div>
  )
}
