import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import telegram from '../../../lib/images/telegram.svg';
import whatsapp from '../../../lib/images/whatsapp.svg';


export interface IFab {
  size?:'small' | 'medium' | 'large' | 'larger',
  type: 'whatsapp'|'telegram',
  id: string,
}

const types = {
  whatsapp: 'https://wa.me/',
  telegram: 'https:/te.me/',
}

const images = {
  whatsapp: whatsapp,
  telegram:telegram,
}

const sizes = {
  small: 3,
  medium: 5,
  large: 7,
  larger: 9,
}

const Fab: React.FC<IFab> = ({ size, type, id }) => {

  const buttonSize = size || 'medium';

  const FabButton = styled.div`
display: inline-flex;
position: fixed;
bottom: 6rem;
right: 6rem;
border-radius: 50%;
padding: 10px;
justify-content: center;
align-items: center;
width: ${sizes[buttonSize]}rem;
height: ${sizes[buttonSize]}rem;
`;

return (
    <FabButton>
    <Link href={`${types[type]}${id}`} target='_blank'>
      <Image src={images[type]} layout="fill" />
    </Link>
    </FabButton>
  );
};



export default Fab;
