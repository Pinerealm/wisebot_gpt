import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div
      style={{
        display: 'flex',
        marginRight: 'auto',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Link to={'/'}>
        <img
          src="robot-icon.png"
          alt="robot-icon"
          width="45px"
          height="45px"
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: 'block', sm: 'none', xs: 'none' },
          mr: 'auto',
          fontWeight: '800',
          textShadow: '2px 2px 20px #000',
        }}
      >
        <span style={{ fontSize: '40px' }}>WiseBOT</span>
      </Typography>
    </div>
  );
};

export default Logo;
