import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        'Chat with WiseBot 🤖',
        2000,
        'Built with OpenAI 🧠',
        2000,
        'Customized for you 🎨',
        1500,
      ]}
      speed={50}
      style={{
        fontSize: '3em',
        display: 'inline-block',
        color: 'rgb(225, 218, 218)',
        textShadow: '1px 1px 20px #000',
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
