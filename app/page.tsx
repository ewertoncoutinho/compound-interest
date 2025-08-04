import Head from 'next/head';
import { Calculator } from '@/components/calculator';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Head>
        <title>Compound Interest Calculator</title>
        <meta name="description" content="Uma calculadora de juros compostos avançada criada com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calculator/>
      <footer className="text-center mt-8 text-neutral-500 text-xs">
        <p>Criado com Next.js e Tailwind CSS. Baseado em TheCalculatorSite.com.</p>
      </footer>
    </main>
  );
}