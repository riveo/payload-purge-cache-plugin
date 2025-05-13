# Payload Purge Cache plugin

A plugin for [PayloadCMS](https://payloadcms.com/) that integrates cache purging functionalities directly into the admin panel, allowing administrators to efficiently manage and clear cached content across various platforms.

---

## Features

- 🧹 **One-click cache purge** from the admin panel
- 🔧 **Pluggable purgers**, with built-in support for Cloudflare, Next.js and raw HTTP request
- 🔐 Optional **access control**
- ✅ **Status feedback** for every purge attempt

## Installation

```shell
npm install @riveo/payload-purge-cache-plugin
```

Then register it in your payload.config.ts:

```typescript
import purgeCachePlugin from '@riveo/payload-purge-cache-plugin';
import { getNextjsPurgerAction } from '@riveo/payload-purge-cache-plugin/purgers';

export const config = buildConfig({
  plugins: [
    purgeCachePlugin({
      purgers: [
        {
          label: 'NextJS',
          action: getNextjsPurgerAction(),
          default: true,
        },
      ],
    }),
  ],
});
```

## Configuration

The plugin accepts an object with the following properties:

- `enabled: boolean`: Enable or disable the plugin. Default is `true`.
- `path?: string`: URL path for the admin page. Default is `/riveo-purge-cache`.
- `access?: AccessCallback`: Optional function to control access permissions.
- `purgers: Purger[]`: Array of purger configurations to be triggered on cache purge.

Example configuration:

```typescript
purgeCachePlugin({
  enabled: true,
  path: '/custom-purge-cache',
  access: ({ req }) => req.user.role === 'admin',
  purgers: [
    {
      label: 'Next.js',
      action: getNextjsPurgerAction(),
      default: false,
    },
  ],
});
```

### Built in purgers

#### Cloudflare

Purges Cloudflare cache for specified zone.

**Usage:** `getCloudflarePurgerAction({ apiKey, zoneId })`

**Parameters:**

- `options`
  - `apiKey: string` - Cloudflare API key
  - `zoneId: string` - ZoneID to purge cache for
  - `hosts?: string[]` - Optional list of hosts to purge
  - `tags?: string[]` - Optional list of tags to purge
  - `prefixes?: string[]` - Optional list of prefixes to purge. A prefix has to include hostname but not scheme e.g.: example.com/prefix
  - `files?: string[]` - Optional list of specific urls to purge. An url has to include scheme, hostname and path e.g.: https://example.com/full/path

#### Next.js

Purges internal Next.js cache.
Internally it calls `revalidatePath(basePath, 'layout')` ([Revalidating All Data - Next.js docs](https://nextjs.org/docs/app/api-reference/functions/revalidatePath#revalidating-all-data))

**Usage:** `getNextjsPurgerAction('/')`

**Parameters:**

- `basePath: string [dafault: '/']` - base path to invalidate cache for. It defaults to `/`

#### HTTP

Calls specified HTTP endpoint using `fetch`. Useful when your app is separate from PayloadCMS instance and exposes an endpoint to clear the cache.

**Usage:** `getHttpPurgerAction(endpoint, options)`

**Parameters:**

- `endpoint: RequestInfo`
- `options?: RequestInit`

## Usage

After setting it up:

1. Go to your PayloadCMS admin panel.
2. Click on the “Purge Cache” tab in the sidebar.
3. Click the button to run all purgers.
4. View real-time results for each purger.

## Contributing

We welcome contributions! To contribute:

1. **Fork the Repository**: Click the 'Fork' button at the top right of the repository page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
3. **Create a Branch**: Create a new branch for your feature or bugfix.
4. **Make Your Changes**: Implement your changes and commit them with clear messages.
5. **Push to GitHub**: Push your changes to your fork on GitHub.
6. **Submit a Pull Request**: Open a pull request to the main repository.

## License

This project is licensed under the [MIT License](./LICENSE.md).
