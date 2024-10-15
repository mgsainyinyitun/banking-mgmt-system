import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-10 bg-content1-900 shadow-lg rounded-xl">
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mx-auto text-6xl text-red-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-primary-900">
            Unauthorized Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! It seems you don&apos;t have permission to access this page.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-center text-md text-gray-500">
            If you believe this is an error, please contact the administrator or try logging in again.
          </p>
          <div className="flex justify-center">
            <Link href="/sign-in" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
