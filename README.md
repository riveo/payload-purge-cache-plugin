# Payload Purge Cache plugin

This plugin adds a custom page to the Payload CMS admin panel that allows users to manually purge caches across multiple platforms, such as Cloudflare. A single click executes all configured purgers and reports the status of each operation.

---

## Features

- 🧹 **One-click cache purge** from the admin panel
- 🔧 **Pluggable purgers**, with built-in support for Cloudflare, Next.js and raw HTTP request
- 🔐 Optional **access control**
- ✅ **Status feedback** for every purge attempt

## Installation

```shell
npm install @riveo/payload-purge-cache-plugin
````

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
        },
      ],
    }),
  ],
});
```

## Configuration

The plugin accepts an object of type `CloudflareCachePluginConfig`.

```typescript
type CloudflareCachePluginConfig = {
  enabled?: boolean;         // Enable/disable the plugin (default: true)
  path?: string;             // URL path for the admin page (default: '/riveo-purge-cache')
  access?: AccessCallback;   // Optional access control function
  purgers: Purger[];         // Array of purgers to be triggered on button click
};
```

## Usage

After setting it up:
	1.	Go to your Payload admin panel.
	2.	Click on the “Purge Cache” tab in the sidebar.
	3.	Click the button to run all purgers.
	4.	View real-time results for each purger.