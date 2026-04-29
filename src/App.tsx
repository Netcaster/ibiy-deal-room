import { useState } from "react";
import TpgIbiyCoverPage from "./components/TpgIbiyCoverPage";
import TpgIbiyDealRoomUI from "./components/TpgIbiyDealRoomUI";

export default function App() {
  const [page, setPage] = useState<"cover" | "deal-room">("cover");

  if (page === "deal-room") {
    return <TpgIbiyDealRoomUI onBack={() => setPage("cover")} />;
  }

  return <TpgIbiyCoverPage onEnter={() => setPage("deal-room")} />;
}
