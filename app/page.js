import { Header } from "@/components/Header/Header";
import { BsBodyText } from "react-icons/bs";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full px-2 mt-3">
        <div className="flex justify-between items-center md:justify-normal text-xl">
          <BsBodyText />
          <div>WireGuard Configurations</div>
        </div>
      </div>
    </div>
  );
}
