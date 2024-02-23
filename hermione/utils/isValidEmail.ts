export default function (emailValue: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
};
