export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_MS: 300,
  DEFAULT_LIMIT: 100,
  INITIAL_QUERY: "main",
} as const;

export const GRAPH_CONFIG = {
  MIN_ZOOM: 0.4,
  MAX_ZOOM: 2.5,
  AUTO_ZOOM_THRESHOLDS: {
    VERY_LARGE: 80,
    LARGE: 50,
    MEDIUM: 30,
    SMALL: 15,
  },
  AUTO_ZOOM_MULTIPLIERS: {
    VERY_LARGE: 2.5,
    LARGE: 2.0,
    MEDIUM: 1.6,
    SMALL: 1.3,
    DEFAULT: 1.0,
  },
  TOOLTIP_OFFSET_Y: -70,
} as const;

export const ANIMATION_CONFIG = {
  GRAPH_LAYOUT: 500,
  NODE_CLICK: 150,
  TOOLBAR_RESET_DELAY: 600,
} as const;

export const Z_INDEX = {
  GRAPH_TOOLBAR: 10,
  GRAPH_LEGEND: 10,
  NAVIGATION_CONTROLS: 20,
  TOOLTIP: 1000,
  MODAL: 50,
} as const;

export const ROUTES = {
  API_BASE: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  FUNCTIONS: "/api/functions",
  GRAPH: "/api/graph",
  SOURCE: "/api/source",
  STATS: "/api/stats",
} as const;
