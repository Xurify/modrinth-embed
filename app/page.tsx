import ModrinthEmbed from "./components/ModrinthEmbed";
import ClientModrinthEmbed from "./components/ClientModrinthEmbed";

export default function Home() {
  const projectIds = {
    sodium: "AANobbMI",
    iris: "YL57xq9U",
    elytraAssistant: "IRm6z3S7",
  };

  return (
    <main className="min-h-screen bg-[#1B1D1F] p-4 pb-16">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white flex items-center gap-2">
          <svg
            className="w-8 h-8 text-emerald-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
          </svg>
          Modrinth Embed
        </h1>
        <p className="text-gray-400 mb-8 max-w-3xl">
          A modern way to embed Modrinth projects on your website, powered by the{" "}
          <a 
            href="https://docs.modrinth.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:underline"
          >
            Modrinth API
          </a>
          .{" "}
          <br />
          Choose between server and client components, or use the compact badge format.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Project Badges
            </h2>
            <p className="text-gray-400 mb-6">
              Choose from three different badge styles: Default, Compact, and Full. Each style can be customized with various options.
            </p>

            <div className="space-y-8">
              {/* Default Variant */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">Default Badge</h3>
                <div className="space-y-4">
                  <a 
                    href={`https://modrinth.com/mod/${projectIds.sodium}`} 
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.sodium}.png`}
                      alt="Sodium"
                      width="340"
                      height="80"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://modrinth-embed.vercel.app/AANobbMI.png" alt="Modrinth Project" width="340" height="80" />`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Compact Variant */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">Compact Badge</h3>
                <div className="space-y-4">
                  <a 
                    href={`https://modrinth.com/mod/${projectIds.sodium}`} 
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.sodium}.png?variant=compact`}
                      alt="Sodium"
                      height="32"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://modrinth-embed.vercel.app/AANobbMI.png?variant=compact" alt="Modrinth Project" height="32" />`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Full Variant */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">Full Badge</h3>
                <div className="space-y-4">
                  <a 
                    href={`https://modrinth.com/mod/${projectIds.sodium}`} 
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.sodium}.png?variant=full`}
                      alt="Sodium"
                      width="600"
                      height="260"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://modrinth-embed.vercel.app/AANobbMI.png?variant=full" alt="Modrinth Project" width="900" height="400" />`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`<!-- Basic usage -->
<img 
  src="https://modrinth-embed.vercel.app/AANobbMI.png"
  alt="Modrinth Project"
  width="340"
  height="80"
/>

<!-- Optional URL parameters -->
?variant=default|compact|full    # Change badge style
?theme=dark|light               # Change color theme
?showDownloads=true|false      # Show/hide download count
?showVersion=true|false        # Show/hide version number
?showButton=true|false         # Show/hide download button (full variant only)
?showPadding=true|false        # Show/hide padding (full variant only)
`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Server vs Client Components
            </h2>
            <p className="text-gray-400 mb-6">
              Choose between server components (better for SEO and initial load) or client
              components (better for dynamic updates and loading states).
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Server Component
                </h3>
                <div className="max-w-2xl">
                  <ModrinthEmbed projectId={projectIds.iris} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Client Component
                </h3>
                <div className="max-w-2xl">
                  <ClientModrinthEmbed projectId={projectIds.elytraAssistant} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
