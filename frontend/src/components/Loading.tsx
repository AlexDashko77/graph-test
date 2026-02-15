interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export default function Loading({
  message = "Loading...",
  size = "md",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const containerClass = fullScreen
    ? "h-full flex items-center justify-center"
    : "absolute inset-0 flex items-center justify-center bg-gray-50 z-10";

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div
          className={`${sizeClasses[size]} animate-spin border-blue-500 border-t-transparent rounded-full mx-auto mb-4`}
        />
        <p className={`text-gray-600 ${textSizes[size]}`}>{message}</p>
      </div>
    </div>
  );
}
