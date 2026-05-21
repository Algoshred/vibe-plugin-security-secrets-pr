# @vibecontrols/vibe-plugin-security-secrets-pr

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

## License

Proprietary — Burdenoff Consultancy Services Pvt. Ltd.
