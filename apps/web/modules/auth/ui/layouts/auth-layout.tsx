export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center h-full justify-center">
      {children}
    </div>
  );
};
