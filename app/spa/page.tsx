import dynamic from "next/dynamic";

const SpaApp = dynamic(() => import("./SpaApp"), { ssr: false });

export default function SpaPage() {
  return <SpaApp />;
}
