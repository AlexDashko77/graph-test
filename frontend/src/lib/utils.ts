export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function formatPackageName(packageName: string): string {
  if (!packageName) return "";
  const parts = packageName.split("/");
  return parts[parts.length - 1];
}

export function formatFunctionName(fullName: string): string {
  if (!fullName) return "";

  // Handle :: separator
  if (fullName.includes("::")) {
    const parts = fullName.split("::");
    return parts[parts.length - 1];
  }

  return fullName;
}

export function extractTypeFromMethod(methodName: string): string | null {
  const methodMatch = methodName.match(/\(\*?([^)]+)\)\./);
  return methodMatch ? methodMatch[1] : null;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
}

export function isGenericFunctionName(name: string): boolean {
  const genericNames = [
    "String",
    "New",
    "Read",
    "Write",
    "Close",
    "Open",
    "Get",
    "Set",
    "Init",
    "Error",
    "Start",
    "Stop",
  ];
  return genericNames.includes(name);
}

export function formatFilePath(filePath: string | null): string {
  if (!filePath) return "N/A";

  // Get last 2 parts of path
  const parts = filePath.split("/");
  if (parts.length <= 2) return filePath;

  return ".../" + parts.slice(-2).join("/");
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
