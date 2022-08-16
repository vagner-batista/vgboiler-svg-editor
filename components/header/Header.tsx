import { useSession } from 'next-auth/react';
import styles from './Header.module.css';

export interface IHeader {
  sampleTextProp: String;
}

const Header: React.FC<IHeader> = ({ sampleTextProp }) => {

  const { data: session, status } = useSession();
  return <div className={styles.component}>
    <h1>{sampleTextProp}</h1>
    <p>{session ? session.user?.name : "Login"}</p>
    <p>{session?.user?.name}, {session?.user?.email}, {session?.user?.image}</p>
    <p>{status}</p>
  </div>;
};

export default Header;
