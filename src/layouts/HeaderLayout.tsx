import { Outlet } from "react-router-dom";
import { Header } from "../presentation/components";

export function HeaderLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
