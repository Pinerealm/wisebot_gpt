/**
 * Footer component.
 *
 * @returns The rendered footer component.
 */
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: '100%',
          minHeight: '20vh',
          maxHeight: '30vh',
          marginTop: 60,
        }}
      >
        <p
          style={{
            fontSize: '30px',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          ALX Specialisation Final Project
          <br />
          By
          <span>
            <Link
              style={{ color: 'inherit', fontSize: '25px' }}
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
