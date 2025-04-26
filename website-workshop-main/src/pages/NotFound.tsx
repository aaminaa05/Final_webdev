
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20 px-4">
      <h1 className="text-6xl font-extrabold text-primary mb-4">4😕4</h1>
      <p className="text-xl text-center mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="default" className="bg-secondary hover:bg-secondary/80">
          Go back home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
