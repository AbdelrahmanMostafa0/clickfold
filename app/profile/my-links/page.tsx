import MyLinksPage from "@/components/links/my-links/MyLinksPage";
import React from "react";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const page = () => {
  return (
    <AuthPageWrapper>
      <MyLinksPage />
    </AuthPageWrapper>
  );
};

export default page;
