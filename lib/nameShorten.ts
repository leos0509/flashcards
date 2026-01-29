export default function nameShorten(name: string): string {
  const nameParts = name.trim().split(" ");

  const shortendedParts = nameParts.map((part) => {
    return part.slice(0, length);
  });

  return shortendedParts.join().toUpperCase();
}
