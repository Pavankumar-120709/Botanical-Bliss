import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import { FullPageLoading } from "./components/common/Loading.jsx";
import { useUser } from "@clerk/clerk-react";
import apiClient from "./api/apiClient.js";

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      apiClient.post('/auth/sync', {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName || "User",
      }).catch(err => console.error("Sync user error:", err));
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Suspense fallback={<FullPageLoading message="Loading page..." />}>
          {isLoading ? (
            <FullPageLoading message="Loading..." />
          ) : (
            <Outlet />
          )}
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
