import { Suspense } from "react";
import RegisterPage from "@/components/auth/RegisterPage";

const page = () => {
  return (
    <Suspense>
      <RegisterPage />
    </Suspense>
  );
};

export default page;
