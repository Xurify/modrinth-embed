const projectIds = {
  sodium: "AANobbMI",
  iris: "YL57xq9U",
  elytraAssistant: "IRm6z3S7",
};

export const revalidate = 604800;
export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1B1D1F] p-4 pb-16">
      <div className="container mx-auto">
        <div className="flex gap-1">
          <img src="/icon.png" alt="Modrinth Embed" className="w-10 h-10" />
          <h1 className="font-heading text-4xl font-bold mb-4 text-white flex items-center gap-3">
            <span className="sr-only">M</span>odrinth Embed
          </h1>
        </div>
        <p className="text-gray-400 mb-10 max-w-3xl text-lg leading-relaxed">
          A modern way to embed Modrinth projects on your website, powered by
          the{" "}
          <a
            href="https://docs.modrinth.com/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline font-medium"
          >
            Modrinth API
          </a>
          . <br />
          Choose between server and client components, or use the compact badge
          format.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="font-heading text-3xl font-semibold mb-2 text-white">
              Project Badges
            </h2>
            <p className="text-gray-400 mb-6">
              Choose from three different badge styles: Default, Compact, and
              Full. Each style can be customized with various options.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-medium mb-4 text-white">
                  Default Badge
                </h3>
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

              <div>
                <h3 className="font-heading text-2xl font-medium mb-4 text-white">
                  Compact Badge
                </h3>
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

              <div>
                <h3 className="font-heading text-2xl font-medium mb-4 text-white">
                  Full Badge
                </h3>
                <div className="space-y-4">
                  <a
                    href={`https://modrinth.com/mod/${projectIds.elytraAssistant}`}
                    className="inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/${projectIds.elytraAssistant}.png?variant=full`}
                      alt="Elytra Assistant"
                      width="600"
                      height="260"
                    />
                  </a>
                  <div className="bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`<img src="https://modrinth-embed.vercel.app/${projectIds.elytraAssistant}.png?variant=full" alt="Modrinth Project" width="900" height="400" />`}</code>
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
        </div>
      </div>
    </main>
  );
}
