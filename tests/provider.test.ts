import { describe, expect, test } from "bun:test";

import { GitleaksProvider } from "../src/provider.js";
import { GITLEAKS_VERSION } from "../src/tools-manifest.js";

describe("GitleaksProvider", () => {
  test("metadata reports the pinned tool version", () => {
    const p = new GitleaksProvider();
    expect(p.toolVersion).toBe(GITLEAKS_VERSION);
    expect(p.metadata().stage).toBe("pull_request.fast");
    expect(p.metadata().supportedProfiles).toContain("backend");
  });

  test("provider name + stage are immutable identifiers", () => {
    const p = new GitleaksProvider();
    expect(p.name).toBe("gitleaks");
    expect(p.stage).toBe("pull_request.fast");
  });

  test("cancel() on an unknown run is a no-op", async () => {
    const p = new GitleaksProvider();
    await expect(p.cancel("nonexistent")).resolves.toBeUndefined();
  });
});
