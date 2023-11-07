import React from "react";

const SingleBlogPage = ({ params }: any) => {
  return (
    <section className="container mx-auto">
      <div>This is blog {params.id}</div>
    </section>
  );
};

export default SingleBlogPage;
