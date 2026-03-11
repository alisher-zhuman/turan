const VENDOR_CHUNK_PATTERNS = {
  "react-vendor": ["/react/", "/react-dom/", "/scheduler/"],
  "mui-vendor": ["/@mui/", "/@emotion/", "/@popperjs/"],
  "router-vendor": ["/react-router/"],
  "query-vendor": ["/@tanstack/react-query/"],
  "form-vendor": ["/react-hook-form/", "/@hookform/resolvers/", "/zod/"],
  "http-vendor": ["/axios/"],
} as const;

export const getVendorChunkName = (id: string) => {
  const normalizedId = id.replaceAll("\\", "/");

  if (!normalizedId.includes("/node_modules/")) {
    return undefined;
  }

  for (const [chunkName, patterns] of Object.entries(VENDOR_CHUNK_PATTERNS)) {
    if (patterns.some((pattern) => normalizedId.includes(pattern))) {
      return chunkName;
    }
  }

  return "vendor";
};
