import Link from 'next/link';
import styles from './SidebarLayout.module.css';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  return (
    <nav className={styles.nav}>
      <input className={styles.input} placeholder="Search..." />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/sobre">
        <a>Sobre</a>
      </Link>
      <Link href="/contato">
        <a>Contato</a>
      </Link>
    </nav>
  );
};

export default SidebarLayout;
