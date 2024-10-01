import { Header } from "@/components/Header/Header";
import { Interface } from "@/components/MainSectoin/Interface";
import { MainSectionTopHeader } from "@/components/MainSectoin/MainSectionTopHeader";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full px-4 mt-3">
        <MainSectionTopHeader />
        <Interface />
      </div>
    </div>
  );
}
