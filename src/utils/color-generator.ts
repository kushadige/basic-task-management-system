export const getRandomHexColor = () => {
  // Base value for pastel colors
  const base = 127;

  // Generate random RGB values between 127 and 255
  const r = Math.floor(Math.random() * 128 + base);
  const g = Math.floor(Math.random() * 128 + base);
  const b = Math.floor(Math.random() * 128 + base);

  // Convert the RGB values to a hex color
  const toHex = (value: number) => value.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
