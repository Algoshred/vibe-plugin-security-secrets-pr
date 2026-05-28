/**
 * @vibecontrols/vibe-plugin-security-secrets-pr
 *
 * Gitleaks-backed secret scanner. Registers as a `security.secrets`
 * provider with @vibecontrols/vibe-plugin-security on the host's
 * ServiceRegistry. The user picks "gitleaks" as their default provider
 * for the `pull_request.fast` stage and the meta plugin dispatches.
 */
import { ProviderRegistry, TelemetryEmitter, createLifecycleHooks } from "@vibecontrols/plugin-sdk";
import type {
  HostServices,
  ProfileContext,
  VibePlugin,
  VibePluginFactory,
} from "@vibecontrols/plugin-sdk/contract";

import { GitleaksProvider } from "./provider.js";

const PLUGIN_NAME = "security-secrets-pr";
const PLUGIN_VERSION = "2026.527.1";

export const createPlugin: VibePluginFactory = (_ctx: ProfileContext): VibePlugin => {
  const provider = new GitleaksProvider();
  const telemetry = new TelemetryEmitter(PLUGIN_NAME, PLUGIN_VERSION);

  const lifecycle = createLifecycleHooks({
    name: PLUGIN_NAME,
    telemetryEventName: "security.secrets-pr.ready",
    onInit: async (host: HostServices) => {
      await provider.init(host);
      const registry = new ProviderRegistry(host);
      registry.registerProvider("security.secrets", "gitleaks", provider);
      telemetry.emit("security.secrets-pr.registered", {
        provider: "gitleaks",
        toolVersion: provider.toolVersion,
      });
    },
  });

  return {
    name: PLUGIN_NAME,
    version: PLUGIN_VERSION,
    description: "Gitleaks-backed secret scanner for the pull_request.fast lifecycle stage.",
    tags: ["backend", "provider", "integration"],
    capabilities: {
      storage: "rw",
      subprocess: true,
      audit: true,
      telemetry: true,
    },
    onServerStart: lifecycle.onServerStart,
    onServerStop: lifecycle.onServerStop,
  };
};

export default createPlugin;
export { GitleaksProvider } from "./provider.js";
