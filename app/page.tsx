import Head from 'next/head';
import { Calculator } from '@/components/calculator';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <Head>
        <title>Compound Interest Calculator</title>
        <meta name="description" content="Uma calculadora de juros compostos avançada criada com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-4xl mx-auto rounded-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-300">
            Compound Interest Calculator
          </h1>
          <p className="text-neutral-500 mt-2 text-sm">
            Calcule o crescimento do seu investimento ao longo do tempo com depósitos regulares.
          </p>
        </div>
        <Calculator />
      </div>
      <footer className="text-center mt-8 text-neutral-500 text-xs">
        <p>Criado com Next.js e Tailwind CSS. Baseado em TheCalculatorSite.com.</p>
      </footer>
    </main>
  );
}