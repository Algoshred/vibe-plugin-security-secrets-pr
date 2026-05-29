# @vibecontrols/vibe-plugin-security-secrets-pr

<!-- VIBECONTROLS_OSS_HEADER_START -->

> **License**: MIT — see [LICENSE](./LICENSE).
> **Note**: This plugin is open source. The `@vibecontrols/agent` runtime that loads it is **not** open source — it is a proprietary product of Burdenoff Consultancy Services Pvt. Ltd. See [vibecontrols.com](https://vibecontrols.com) for the agent.

<!-- VIBECONTROLS_OSS_HEADER_END -->

Gitleaks-backed secret scanner for the `pull_request.fast` lifecycle stage in [VibeControls](https://vibecontrols.com).

Registers itself with [`@vibecontrols/vibe-plugin-security`](https://www.npmjs.com/package/@vibecontrols/vibe-plugin-security) under the per-stage provider type `security.secrets` and the provider name `gitleaks`. When the user picks "Gitleaks" as their default provider for `pull_request.fast` (or any other supported stage), the security meta plugin dispatches scan runs to this provider.

## Install

```bash
vibe plugin install @vibecontrols/vibe-plugin-security-secrets-pr
vibe security providers set-default --stage pull_request.fast --provider gitleaks
```

The plugin downloads the Gitleaks binary automatically on first use (sha256-verified per platform) into `~/.boff/vibecontrols/agents/<profile>/tools/gitleaks/`.

## Behavior

- Output format: SARIF v2.1.0 via `--report-format=sarif --report-path=<workdir>/gitleaks.sarif`
- Scans the working tree at `repoLocalPath`; if `--depth` is configured, restricts to that many commits of history (default 200)
- Findings normalized to `category: "secret"` with `severity` derived from `properties.severity` (Gitleaks rule field) when present, falling back to SARIF level
- Secret samples redacted before persistence: only the sha256 + first-4 + last-4 chars are stored

## Configuration

Per-vibe config (stored in `RepositorySecurityConfig.pluginAssignments["pull_request.fast"].config`):

```yaml
provider: gitleaks
config:
  configPath: .gitleaks.toml # optional, repo-local config file
  ignorePath: .gitleaksignore # optional, ignored matches re-reported as info
  historyDepth: 200 # commits of history to scan
  extraArgs: [] # additional CLI flags
```

<!-- VIBECONTROLS_OSS_FOOTER_START -->

---

## License

Released under the [MIT License](./LICENSE).

Copyright (c) 2026 Burdenoff Consultancy Services Private Limited, Algoshred Technologies Private Limited, and all its sister companies.

Maintainer: **Vignesh T.V** — <https://github.com/tvvignesh>

## Credits

This plugin builds on the following upstream open-source projects. All trademarks and copyrights remain with their respective owners.

- **Gitleaks** — <https://github.com/gitleaks/gitleaks>

## About VibeControls

**VibeControls** is the agentic engineering mission control for AI-native teams. Vibe-plugins extend the VibeControls agent with new providers, tools, sessions, tunnels, storage backends, and security stages.

- Website: <https://vibecontrols.com>
- Documentation: <https://docs.vibecontrols.com>
- Plugin SDK: <https://github.com/algoshred/vibecontrols-plugin-sdk>
- All plugins: <https://github.com/algoshred?q=vibe-plugin-&type=all>

## Important: agent is not open source

The `@vibecontrols/agent` runtime that loads and orchestrates these plugins is **closed source** and proprietary to Burdenoff Consultancy Services Pvt. Ltd. Only the plugin contract and the plugins themselves are released under MIT. If you want a fully self-hostable agent, please open an issue or contact the maintainer.

<!-- VIBECONTROLS_OSS_FOOTER_END -->
