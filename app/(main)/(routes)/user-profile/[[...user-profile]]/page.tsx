"use client";
import { UserProfile } from "@clerk/clerk-react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const UserProfilePage = () => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark,
    light: undefined,
  };

  const theme = themeMap[currentTheme];
  return (
    <div className="flex items-center justify-center my-2">
      <UserProfile
        appearance={{
          baseTheme: theme,
        }}
        path="/user-profile"
        routing="path"
      />
    </div>
  );
};

export default UserProfilePage;
