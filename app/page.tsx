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
        <h1 className="text-3xl font-bold mb-4 text-white flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-brand"
            fill="currentColor"
            viewBox="0 0 500 500"
          >
            <path d="M453.012 351.506c0 8.571-4.738 16.015-11.955 19.851L262.858 471.508c-3.61 2.708-8.121 4.06-12.859 4.06-4.736 0-9.246-1.352-12.856-4.06L58.944 371.357c-7.217-3.836-11.955-11.28-11.955-19.851V148.493c0-8.57 4.738-16.015 11.955-19.848L237.143 28.491c3.61-2.707 8.12-4.059 12.856-4.059 4.738 0 9.249 1.352 12.859 4.059l178.199 100.154c7.217 3.833 11.955 11.278 11.955 19.848z"></path>
            <path
              fill="#FFF"
              d="M339.892 342.205h-60.293q.82-33.633.82-68.496t-3.418-79.16q4.649-9.707 12.988-29.532.958-2.187 4.922-5.537 3.965-3.349 6.973-3.349h41.836q-.957 18.047-.957 40.058 0 68.907 9.16 136.993 0 1.777-4.375 5.4t-7.656 3.623m-93.789-7.109q-.957 2.05-4.239 4.58-3.281 2.529-5.195 2.529h-21.738q-5.742-34.043-14.902-71.641-9.161-37.597-18.184-61.933.547-3.145 3.623-19.209 3.076-16.065 4.307-24.405.41-1.914 4.648-5.4t7.246-3.486h39.785q9.434 54.687 15.655 73.896 6.22 19.209 11.416 30.694-13.125 39.238-22.422 74.375m-67.266-91.739q.684 34.18 2.529 52.227 1.846 18.047 7.998 37.598 0 1.777-4.443 5.4t-7.724 3.623h-43.614q13.535-32.266 21.192-52.295 7.656-20.029 12.168-37.666 0-1.777 4.375-5.332t7.519-3.555"
              paintOrder="fill"
              style={{ textTransform: "capitalize", textWrapMode: "nowrap" }}
            ></path>
          </svg>
          Modrinth Embed
        </h1>
        <p className="text-gray-400 mb-8 max-w-3xl">
          A modern way to embed Modrinth projects on your website, powered by
          the{" "}
          <a
            href="https://docs.modrinth.com/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Modrinth API
          </a>
          . <br />
          Choose between server and client components, or use the compact badge
          format.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Project Badges
            </h2>
            <p className="text-gray-400 mb-6">
              Choose from three different badge styles: Default, Compact, and
              Full. Each style can be customized with various options.
            </p>

            <div className="space-y-8">
              {/* Default Variant */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">
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

              {/* Compact Variant */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">
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

              {/* Full Variant */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">
                  Full Badge
                </h3>
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
        </div>
      </div>
    </main>
  );
}
