import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Header.module.css';

export interface IHeader {
}

const Header: React.FC<IHeader> = ({ }) => {
  const { data: session, status } = useSession();
  return (
    <div className={styles.component}>
      <div style={{ float: 'right', display: 'flex' }}>
        <Image alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px' }} width={40} height={40} src={session?.user?.image ? session.user.image : '/gato.png'} />
        {
          session?.user ? <p>{session.user.name}</p> : <p>Login</p>
        }
        <br />
        <span>{status}</span>
      </div>
    </div>
  );
};

export default Header;
