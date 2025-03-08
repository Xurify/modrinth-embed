import ModrinthEmbed from "./components/ModrinthEmbed";
import ClientModrinthEmbed from "./components/ClientModrinthEmbed";
import ModrinthBadge from "./components/ModrinthBadge";

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
              Project Badge
            </h2>
            <p className="text-gray-400 mb-6">
              A compact badge that shows key project information in a single
              line. Perfect for READMEs and project documentation.
            </p>

            <div className="space-y-8">
              <div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="text-base font-medium mb-2 text-white flex items-center gap-2">
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
                      React Component
                    </h4>
                    <div className="space-y-4 space-x-4">
                      <ModrinthBadge projectId={projectIds.sodium} />
                      <ModrinthBadge projectId={projectIds.iris} />
                      <ModrinthBadge projectId={projectIds.elytraAssistant} />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-medium mb-2 text-white flex items-center gap-2">
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
                          d="M4 16l4 4m0 0l4-4m-4 4V4"
                        />
                      </svg>
                      Static Image
                    </h4>
                    <div className="flex flex-col space-y-4">
                      <img
                        src={`/api/badge/${projectIds.sodium}`}
                        alt="Sodium"
                        width="250"
                        height="70"
                      />
                      <img
                        src={`/api/badge/${projectIds.iris}`}
                        alt="Iris"
                        width="250"
                        height="70"
                      />
                      <img
                        src={`/api/badge/${projectIds.elytraAssistant}`}
                        alt="elytraAssistant"
                        width="250"
                        height="70"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-[#2D2F31] text-white p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`// React Component
import ModrinthBadge from './components/ModrinthBadge';

<ModrinthBadge projectId="AANobbMI" />

// Static Image
<img 
  src="https://modrinth-embed.vercel.app/api/badge/AANobbMI"
  alt="Modrinth Project"
  width="250"
  height="70"
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Component Sizes
            </h2>
            <p className="text-gray-400 mb-6">
              The component is responsive by default and adapts to its container width
              while maintaining a consistent look and feel.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">
                  Default Size
                </h3>
                <div className="max-w-2xl">
                  <ModrinthEmbed projectId={projectIds.sodium} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-white">
                  Constrained Width
                </h3>
                <div className="max-w-sm">
                  <ModrinthEmbed projectId={projectIds.sodium} />
                </div>
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
