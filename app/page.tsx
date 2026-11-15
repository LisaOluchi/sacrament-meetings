import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="space-y-6 text-center">
      <Image
        src="/hero.svg"
        alt="Illustration of a meeting program page with a title and lines of text"
        width={800}
        height={300}
        priority
        className="mx-auto h-auto w-full max-w-3xl rounded-lg"
      />
      <h1 className="text-4xl font-bold">Sacrament Meeting Planner</h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-700">
        Plan meeting agendas, review past programs, and print the program for
        any Sunday.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/meetings"
          className="rounded bg-blue-900 px-5 py-2 text-white hover:bg-blue-800"
        >
          View all meetings
        </Link>
        <Link
          href="/meetings/current"
          className="rounded border border-blue-900 px-5 py-2 text-blue-900 hover:bg-blue-50"
        >
          This Sunday&apos;s program
        </Link>
      </div>
    </section>
  );
}
