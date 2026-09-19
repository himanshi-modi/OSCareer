function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-career-bg text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-10 text-center">
            <p className="text-xl font-bold tracking-tight">
              Career<span className="text-career-blue">OS</span>
            </p>
          </div>

          {/* Auth Content */}
          {children}

        </div>
      </div>
    </main>
  );
}

export default AuthLayout;