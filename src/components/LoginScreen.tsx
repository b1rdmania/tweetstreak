import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Twitter } from "lucide-react";

interface LoginScreenProps {
  onLogin?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginScreen = ({
  onLogin = () => {},
  isLoading = false,
  error = null,
}: LoginScreenProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleLogin = () => {
    if (!isLoading) {
      onLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full">
            <Twitter className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Twitter Activity Tracker
          </CardTitle>
          <CardDescription className="mt-2">
            Track your daily Twitter engagement habits and build consistency
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Sign in with your Twitter account to track your activity and sync
              across devices.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={handleLogin}
            disabled={isLoading}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Twitter
                  className={`mr-2 h-4 w-4 ${isHovering ? "animate-bounce" : ""}`}
                />
                Sign in with Twitter
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginScreen;
