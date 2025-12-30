const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center h-full justify-center">
      {children}
    </div>
  );
};

export default Layout;
