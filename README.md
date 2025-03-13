# Modrinth Embed

A modern way to embed Modrinth projects on your website using dynamic badges. Powered by the Modrinth API and Next.js.

## Features

- 🎨 Three beautiful badge styles: Default, Compact, and Full
- 🌙 Light and dark theme support
- 📊 Customizable display options (downloads, versions, etc.)
- ⚡ Optimized caching for fast loading
- 🖼️ PNG image output for maximum compatibility

## Usage

### Default Badge

```html
<img 
  src="https://modrinth-embed.vercel.app/IRm6z3S7.png" 
  alt="Modrinth Project" 
  width="340" 
  height="80" 
/>
```

### Compact Badge

```html
<img 
  src="https://modrinth-embed.vercel.app/IRm6z3S7.png?variant=compact" 
  alt="Modrinth Project" 
  height="32" 
/>
```

### Full Badge

```html
<img 
  src="https://modrinth-embed.vercel.app/IRm6z3S7.png?variant=full" 
  alt="Modrinth Project" 
  width="900" 
  height="400" 
/>
```

## Customization Options

You can customize the badge appearance using URL parameters:

- `variant`: Change badge style
  - `default` (Default badge)
  - `compact` (Compact single-line badge)
  - `full` (Full project showcase)

- `theme`: Change color theme
  - `dark` (Default)
  - `light`

- Display options:
  - `showDownloads=true|false` - Show/hide download count
  - `showVersion=true|false` - Show/hide version number
  - `showButton=true|false` - Show/hide download button (full variant only)
  - `showPadding=true|false` - Show/hide padding (full variant only)

Example with options:
```html
<img 
  src="https://modrinth-embed.vercel.app/IRm6z3S7.png?variant=full&theme=light&showDownloads=true" 
  alt="Modrinth Project" 
  width="900" 
  height="400"
/>
```

## Development

```bash
# Clone the repository
git clone https://github.com/Xurify/modrinth-embed.git
cd modrinth-embed

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Credits

- Data from [Modrinth API](https://docs.modrinth.com/)
