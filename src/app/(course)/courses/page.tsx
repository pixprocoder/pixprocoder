import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";

function CoursesPage() {
  const id = 1;
  return (
    <div>
      Course Details prevImage
      <Button>
        <Link href={`/courses/${id}`}>View Details</Link>
      </Button>
    </div>
  );
}

export default CoursesPage;
