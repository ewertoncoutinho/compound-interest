import Head from 'next/head';
import { Calculator } from '@/components/calculator';

export default function Home() {
  return (
    <main>
      <Head>
        <title>Compound Interest Calculator</title>
        <meta name="description" content="Uma calculadora de juros compostos avançada criada com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calculator/>
    </main>
  );
}