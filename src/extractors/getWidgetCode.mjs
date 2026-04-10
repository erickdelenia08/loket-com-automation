export default function getWidgetCode(url) {
  const u = new URL(url);
  const parts = u.pathname.split('/');
  return parts[2]; // /widget/{code}
}