import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

const page = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default page;
