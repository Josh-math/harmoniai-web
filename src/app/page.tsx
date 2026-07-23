"use client";

import {
  useState,
} from "react";

import ScreenRenderer from "./components/layout/screen-renderer";
import Sidebar from "./components/layout/sidebar";
import Topbar from "./components/layout/topbar";

export default function Home() {
  const [
    isPremium,
    setIsPremium,
  ] = useState(false);

  return (
    <main
      className={
        isPremium
          ? "app premium-theme"
          : "app"
      }
    >
      <Sidebar
        isPremium={isPremium}
        setIsPremium={setIsPremium}
      />

      <section className="workspace">
        <Topbar />

        <div className="content">
          <ScreenRenderer />
        </div>
      </section>
    </main>
  );
}