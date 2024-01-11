import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: '100%',
          padding: 20,
          minHeight: '20vh',
          maxHeight: '30vh',
          marginTop: 50,
        }}
      >
        <p
          style={{
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          ALX Specialisation Final Project
          <br />
          By
          <span>
            <Link
              style={{ color: 'inherit' }}
              className="nav-link"
              to="https://github.com/Pinerealm/wisebot_gpt"
            >
              Oluwaseyi Salami
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
