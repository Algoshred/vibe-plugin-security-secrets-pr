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
        sha256: "5bc41815076e6ed6ef8fbecc9d9b75bcae31f39029ceb55da08086315316e3ba",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
      "linux-arm64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_arm64.tar.gz`,
        sha256: "654c935542c89f565aabe7bf7c6c500830f116c114f0aeb509d2460c1ac2e6da",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
      "darwin-x64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_darwin_x64.tar.gz`,
        sha256: "5b42c6e4b1fd693eaeb2b5b7faa5f17a1434299d4deb2de63d4b2efd7c753128",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
      "darwin-arm64": {
        url: `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_darwin_arm64.tar.gz`,
        sha256: "cad3de5dc9a4d5447d967a70a4d49499c557f04db028274cc324f9ff983f6502",
        binaryWithinArchive: "gitleaks",
        archive: "tar.gz",
      },
    },
  },
};
