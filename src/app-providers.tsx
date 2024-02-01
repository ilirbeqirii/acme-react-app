import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context.tsx";
import { ProductProvider } from "./context/product-provider";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>{children}</ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export { AppProviders };
