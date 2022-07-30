import Teste from 'components/layouts/teste';
import Head from 'next/head';
import { NextPageWithLayout } from './page';

const Sobre: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Template utilizando Layout" />
        <title>Template utilizando layout</title>
      </Head>
      <Teste />
    </>
  );
};

export default Sobre;
