import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[44vh] items-center justify-center px-4 py-16">
        <div className="max-w-md rounded-lg border border-border bg-card p-8 text-center card-shadow">
          <p className="eyebrow">404</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-foreground">Page Not Found</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The page you are looking for is not available. Head back to the home page or explore upcoming events.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/">
              <Button className="w-full rounded-lg gradient-highlight text-highlight-foreground sm:w-auto">Go Home</Button>
            </Link>
            <Link to="/treks">
              <Button variant="outline" className="w-full rounded-lg sm:w-auto">View Events</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
