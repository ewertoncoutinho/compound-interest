// app/page.js
import Head from 'next/head';
import Calculator from '@/components/Calculator'; // Criaremos este componente a seguir

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Head>
        <title>Calculadora de Juros Compostos | Next.js</title>
        <meta name="description" content="Uma calculadora de juros compostos avançada criada com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Calculadora de Juros Compostos
          </h1>
          <p className="text-gray-600 mt-2">
            Calcule o crescimento do seu investimento ao longo do tempo com depósitos regulares.
          </p>
        </div>

        <Calculator />

      </div>
       <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Criado com Next.js e Tailwind CSS. Baseado em TheCalculatorSite.com.</p>
      </footer>
    </main>
  );
}