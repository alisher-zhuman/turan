const VENDOR_CHUNK_PATTERNS = {
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

  return undefined;
};
