import { ROUTES } from "./constants";
import type {
  SearchFunctionsResponse,
  GraphResponse,
  SourceCodeResponse,
} from "@/types";

const API_BASE = ROUTES.API_BASE;

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 10000,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(
      error || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response.url,
    );
  }

  return response.json();
}

export async function searchFunctions(
  search?: string,
  limit = 100,
): Promise<SearchFunctionsResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("limit", limit.toString());

  const url = `${API_BASE}${ROUTES.FUNCTIONS}?${params}`;

  try {
    const response = await fetchWithTimeout(url);
    return handleResponse<SearchFunctionsResponse>(response);
  } catch (error) {
    console.error("Search functions failed:", error);
    throw new ApiError("Failed to search functions");
  }
}

export async function getCallGraph(functionId: string): Promise<GraphResponse> {
  const url = `${API_BASE}${ROUTES.GRAPH}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ functionId }),
    });
    return handleResponse<GraphResponse>(response);
  } catch (error) {
    console.error("Get call graph failed:", error);
    throw new ApiError("Failed to load call graph");
  }
}

export async function getSourceCode(
  filePath: string,
): Promise<SourceCodeResponse> {
  const params = new URLSearchParams({ file: filePath });
  const url = `${API_BASE}${ROUTES.SOURCE}?${params}`;

  try {
    const response = await fetchWithTimeout(url);
    return handleResponse<SourceCodeResponse>(response);
  } catch (error) {
    console.error("Get source code failed:", error);
    throw new ApiError("Failed to load source code");
  }
}
