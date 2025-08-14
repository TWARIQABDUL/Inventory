export function Button({button_value, button_color, onClick}){
  return (
    <button className={button_color} onClick={onClick}>{button_value}</button>
  );
}