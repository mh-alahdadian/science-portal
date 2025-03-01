"use client";
import { useState } from "react";
import RightSideNav from "./components/RightSideNav";
import UserOverView from "./components/UserOverView";
import Tags from "./components/Tags";
import { ComponentName } from "./components/types/Type"; // Import the shared type
import Questions from "./components/Questions";

export default function Page() {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentName>("userOverview");

  const handleNavClick = (componentName: ComponentName) => {
    setSelectedComponent(componentName);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "questions":
        return <Questions />;

      case "users":
        return <UserOverView />;
      case "tags":
        return <Tags />;

      default:
        return <Questions />;
    }
  };

  return (
    <main className="bg-white">
      <div className="mx-auto w-full flex h-full min-h-screen">
        <RightSideNav onNavClick={handleNavClick} />

        {renderComponent()}
      </div>
    </main>
  );
}
