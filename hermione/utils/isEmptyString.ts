export default function (string_processing: string): boolean {
  return typeof string_processing !== 'string' || string_processing.trim() === '';
}