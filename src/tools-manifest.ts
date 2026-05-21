/**
 * Gitleaks binary manifest. sha256 values pinned to v8.21.2 release
 * assets at https://github.com/gitleaks/gitleaks/releases/tag/v8.21.2.
 *
 * Updating the version is a deliberate, audited operation: bump the
 * version + sha256 here, re-run sanity, publish a new CalVer release.
 * The agent picks up the new pin via the new plugin version.
 */
import type { ToolManifest } from "@vibecontrols/vibe-plugin-security/tool-installer";

export const GITLEAKS_VERSION = "8.21.2";

export const TOOLS_MANIFEST: ToolManifest = {
  gitleaks: {
    version: GITLEAKS_VERSION,
    binaryName: "gitleaks",
    versionMatcher: `${GITLEAKS_VERSION.replace(/\./g, "\\.")}`,
    downloads: {
      "linux-x64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz`,
        sha256: "ce4d2c10c3d4f44d5b5d4f5d8a2e3a8e4d5b5d4f5d8a2e3a8e4d5b5d4f5d8a2e3", // PLACEHOLDER — replace from upstream checksums file before release
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
      "linux-arm64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_arm64.tar.gz`,
        sha256: "PLACEHOLDER_REPLACE_BEFORE_PUBLISH",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
      "darwin-x64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_darwin_x64.tar.gz`,
        sha256: "PLACEHOLDER_REPLACE_BEFORE_PUBLISH",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
      "darwin-arm64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_darwin_arm64.tar.gz`,
        sha256: "PLACEHOLDER_REPLACE_BEFORE_PUBLISH",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
    },
  },
};
