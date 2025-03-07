# Modrinth Embed

A modern Next.js application for embedding Modrinth projects anywhere on the web. This project provides multiple ways to showcase Modrinth projects in your website, from full-featured embeds to compact badges.

## Features

- 🎯 Server and Client Components for maximum flexibility
- 🎨 Modern, responsive design with dark mode support
- 🚀 Static badge generation API
- ⚡ Smart caching for optimal performance
- 🌐 WCAG compliant accessibility
- 📱 Mobile-friendly interface

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/modrinth-embed.git
cd modrinth-embed

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

### Server Component

```tsx
import { ModrinthEmbed } from 'modrinth-embed'

export default function Page() {
  return <ModrinthEmbed projectId="AANobbMI" />
}
```

### Client Component

```tsx
import { ClientModrinthEmbed } from 'modrinth-embed'

export default function Page() {
  return <ClientModrinthEmbed projectId="AANobbMI" />
}
```

### Compact Badge

```tsx
import { ModrinthBadge } from 'modrinth-embed'

export default function Page() {
  return (
    <ModrinthBadge
      projectId="AANobbMI"
      showDownloads={true}
      showVersion={true}
    />
  )
}
```

### Static Badge API

```html
<img src="https://your-domain.com/api/badge/AANobbMI" alt="Modrinth Project" />

<!-- With options -->
<img
  src="https://your-domain.com/api/badge/AANobbMI?theme=dark&style=compact"
  alt="Modrinth Project"
/>
```

## API Options

### Badge API Parameters

- `theme`: `light` (default) | `dark`
- `style`: `default` (default) | `compact`
- `showDownloads`: `true` (default) | `false`
- `showVersion`: `true` (default) | `false`

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE for details.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Data from [Modrinth API](https://docs.modrinth.com/api-spec)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
