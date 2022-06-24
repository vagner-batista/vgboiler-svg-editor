import Head from 'next/head';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import styles from '../styles/Home.module.css';
import { NextPageWithLayout } from './page';

const Contato: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Template utilizando Layout" />
        <title>Template utilizando layout</title>
      </Head>
      <section className={styles.main}>
        <h1 className={styles.title}>Exemplo de layout ( Contato )</h1>
        <p>
          This example adds a property <code>getLayout</code> to your page,
          allowing you to return a React component for the layout. This allows
          you to define the layout on a per-page basis. Since we&apos;re
          returning a function, we can have complex nested layouts if desired.
        </p>
        <p>
          When navigating between pages, we want to persist page state (input
          values, scroll position, etc.) for a Single-Page Application (SPA)
          experience.
        </p>
        <p>
          This layout pattern will allow for state persistence because the React
          component tree is persisted between page transitions. To preserve
          state, we need to prevent the React component tree from being
          discarded between page transitions.
        </p>
        <h3>Try It Out</h3>
        <p>
          To visualize this, try tying in the search input in the{' '}
          <code>Sidebar</code> and then changing routes. You&apos;ll notice the
          input state is persisted.
        </p>
      </section>
    </>
  );
};

export default Contato;

Contato.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
