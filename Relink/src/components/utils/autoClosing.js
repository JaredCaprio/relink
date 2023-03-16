export default function autoClosing(event, setFunc) {
  if (ref.current && !ref.current.contains(event.target)) {
    setFunc(false);
  }
}
