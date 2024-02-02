!['Github Actions'](./branding/actions.png)

[![codecov](https://codecov.io/gh/candidob/get-runner-ip/graph/badge.svg?token=3DQIY2JWK5)](https://codecov.io/gh/candidob/get-runner-ip) [![Maintainability](https://api.codeclimate.com/v1/badges/96297566c628732fc247/maintainability)](https://codeclimate.com/github/candidob/get-runner-ip/maintainability) ![Deploy](https://github.com/candidob/get-runner-ip/actions/workflows/main.yml/badge.svg)

# Github Actions Runner IP Addresses

> Gets the current Github Actions runner public IPv4 and IPv6 Addresses using latest Node

# Description

This is a simple TypeScript project that uses an external API (ipify) to retrieve the public IPv4 and IPv6 addresses of the currently running runner using minimal dependencies.

# Usage

### Outputs

-   `ipv4` the public ipv4 address of the runner
-   `ipv6` the public ipv6 address of the runner

> Note: If the execution environment does not have either of the two IP addresses, an empty string is returned instead of the IP address.

### Example

```yaml
name: Get Runner IP Addresses

on:
    push:
        branches: [main]

jobs:
    deploy:
        name: Deploy
        runs-on: ubuntu-latest

        steps:
            - name: Get IP Addresses
              id: ip
              uses: candidob@get-runner-ip@v1.0.0

            - name: See IP Addresses
              run: |
                  echo ${{ steps.ip.outputs.ipv4 }}
                  echo ${{ steps.ip.outputs.ipv6 }}
```

# Cases of use

A very common use case and the reason for creating the project is blacklisting and whitelisting the IP addresses of GitHub Actions runners when actions like SSH command execution or altering certain configurations on cloud service providers such as AWS, Azure, GCP, among others, are needed. Through the interface provided by the cloud provider and the IP address, it is easy to allow GitHub Actions runners through a firewall or security group to perform protected operations.

# Project structure

```
├── .github (Github Action for this project)
├── .husky (Git hooks)
├── branding (Branding related folder)
├── dist
    ├── index.js (Distributable file that Github Actions uses as the Action)
├── src
    ├── core
        ├── constants.ts (IP request API Endpoints URLs)
        ├── guards.ts (Type guards)
        ├── types.ts (Type definitions)
    ├── libs
        ├── https.ts (HTTPS Get request function)
        ├── ip.ts (IPv4 and IPv6 get functions)
    ├── index.ts (main function)
    ├── run.ts (main entrypoint of the Action)
├── tests
    ├── integration (Integration tests)
        ├── https.integration.tests.ts
        ├── index.integration.tests.ts
    ├── unit (Unit tests)
        ├── guards.unit.test.ts
        ├── https.unit.test.ts
        ├── index.unit.test.ts
        ├── ip.unit.test.ts
```

> Easily, the endpoints from which the IP addresses are obtained can be modified, some minor adjustments are necessary if the new API returns the IP in a different format than { ip: '127.0.0.1' }

# Dependencies

-   @actions/core

# Environment

-   Node latest

# Contributions and license

[MIT License](LICENSE) |
[Code of Conduit](CODE_OF_CONDUCT)
