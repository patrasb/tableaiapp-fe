import styled from '@emotion/styled';
import LogoFilled from '@/images/logoFilled.png';

const Foot = styled('footer')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '150px',
  background: '#9747FF',
  marginTop: '20%',
  padding: '16px',
});

export default function Footer() {
  return (
    <Foot>
      <img src={LogoFilled} alt='footer' />
    </Foot>
  );
}
