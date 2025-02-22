"use client";
import { use, useState } from "react";
import RightSideNav from "./components/RightSideNav";
import UserOverView from "./components/UserOverView";
import Tags from "./components/Tags";
import Questions from "./components/Questions";


export type ComponentName =
  | "userOverview"
  | "tags"
  | "questions"
  | "users"
  | "companies";


export default function Page(props: PageProps<'scopeId'>) {
  const params = use(props.params);

  const [selectedComponent, setSelectedComponent] =
    useState<ComponentName>("userOverview");

  const handleNavClick = (componentName: ComponentName) => {
    setSelectedComponent(componentName);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "questions":
        return <Questions params={params} />;

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
