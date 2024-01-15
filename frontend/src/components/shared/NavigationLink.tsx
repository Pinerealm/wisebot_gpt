import { Link } from 'react-router-dom';

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

/**
 * Renders a navigation link.
 * @param props - The component props.
 * @returns The rendered navigation link.
 */
const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
