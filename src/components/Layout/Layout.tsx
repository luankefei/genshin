import Nav from "../Nav";

const Layout = ({ children }) => (
  <div>
    <Nav />
    {children}
  </div>
);

export default Layout;
