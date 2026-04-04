// app/under-construction/page.tsx

import { Construction } from "lucide-react";

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Construction className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Under Construction
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This page is currently being built. Please check back later!
        </p>

        {/* Footer note */}
        <div className="animate-pulse text-sm text-gray-400 dark:text-gray-500">
          We’re working hard to bring something awesome 🚀
        </div>
      </div>
    </div>
  );
}