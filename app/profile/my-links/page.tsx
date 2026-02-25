import MyLinksPage from "@/components/links/my-links/MyLinksPage";
import React from "react";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

const page = () => {
  return (
    <AuthPageWarpper>
      <MyLinksPage />
    </AuthPageWarpper>
  );
};

export default page;
