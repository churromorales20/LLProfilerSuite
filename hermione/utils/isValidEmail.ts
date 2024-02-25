export default function (emailValue: string): boolean {
  return emailValue !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
};
