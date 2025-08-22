import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import AppRoutes from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="279200332012-fmrs94vklth790iklmau6fh7hb95ngsd.apps.googleusercontent.com">
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <AppRoutes />
        </Content>
      </Layout>
    </GoogleOAuthProvider>
  );
}

export default App;
