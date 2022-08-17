import { Session } from 'next-auth';
import { IHeader } from './Header';

const base: IHeader = {
  sampleTextProp: 'Sample text!',
};

const mockSession: Session = {
  user: {
    name: 'Vagner Rogério Batista',
    email: 'vagner-batista@procergs.rs.gov.br',
    image: '/gato.png',
  },
  expires: new Date().toString(),
};

export const mockHeaderProps = {
  base,
  mockSession,
};
