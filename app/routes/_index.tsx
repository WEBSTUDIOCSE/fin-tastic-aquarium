import type { MetaFunction } from "@remix-run/node";
import Gallery from "~/components/Gallery";
import MainContent from "~/components/MainContent";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <MainContent />
      <Gallery />
    </div>
  );
}
