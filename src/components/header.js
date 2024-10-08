export default function Header() {
  return (
    <header style={headerStyle}>
      <h1>Restaurants</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </header>
  );
}

// styling
const headerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "20px 0",
};
