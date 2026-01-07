export default function Footer() {
  return (
    <footer style={footer}>
      © {new Date().getFullYear()} LineContext
    </footer>
  );
}

const footer = {
  padding: 24,
  fontSize: 12,
  color: "#6b7280",
  textAlign: "center",
  marginTop: 48,
};
