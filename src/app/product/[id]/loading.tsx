import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-muted aspect-square animate-pulse rounded-lg"></div>

          <div className="space-y-4">
            <div className="bg-muted h-8 w-3/4 animate-pulse rounded"></div>
            <div className="bg-muted h-6 w-1/2 animate-pulse rounded"></div>
            <div className="bg-muted h-20 w-full animate-pulse rounded"></div>
            <div className="bg-muted h-12 w-full animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
