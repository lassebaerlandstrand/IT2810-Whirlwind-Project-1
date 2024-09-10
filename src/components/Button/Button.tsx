type ButtonType = {
  text: string;
};

const Button = ({text}: ButtonType) => {
  return <button>{text}</button>;
};

export default Button;
