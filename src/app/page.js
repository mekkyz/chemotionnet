import Image from "next/image";
import { client, urlFor } from "../sanity/lib/client";

async function fetchData() {
  const query = `*[_type == "yourContentType"] { _id, title, description, mainImage }`;
  const data = await client.fetch(query);
  return data;
}

export default async function HomePage() {
  const data = await fetchData();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dynamic Next.js Site</h1>
          <p className="mb-6 text-gray-600">
            This page is dynamically generated with Sanity content integration. Edit content in Sanity and see it here automatically!
          </p>
        </div>

        {/* Render dynamic Sanity content */}
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item._id} className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
              {item.mainImage && (
                <div className="mt-4">
                  <Image
                    src={urlFor(item.mainImage).width(500).url()}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.15] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the Docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-16">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
