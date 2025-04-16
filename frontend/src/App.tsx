import { useState } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import PersonaSelectionPage from "@/pages/PersonaSelectionPage";
import { PersonaProvider } from './context/PersonaContext';

function Router() {
  const [location, setLocation] = useLocation();

  const navigateToPersona = () => {
    setLocation('/persona');
  };

  return (
    <Switch>
      <Route path="/">
        <LandingPage onGetStarted={navigateToPersona} />
      </Route>
      <Route path="/persona">
        <PersonaSelectionPage onGetStarted={navigateToPersona} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Adding PersonaProvider here as well to ensure it's always available */}
      <PersonaProvider>
        <Router />
        <Toaster />
      </PersonaProvider>
    </QueryClientProvider>
  );
}

export default App;
