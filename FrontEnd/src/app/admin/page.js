"use client"
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BoatOwner from "../components/boatowner"; // Assuming you have this component
import Blog from "../components/blog"; // Assuming you have this component
import Chart from "../components/chart"; // Assuming you have this component
import Sponser from '../components/Sponser'
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("chart"); // Default is Chart

  const renderComponent = () => {
    switch (activeComponent) {
      case "boatowner":
        return <BoatOwner />;
      case "blog":
        return <Blog />;
      case "chart":
        return <Chart />;
      case "sponser":
        return <Sponser />;
      default:
        return <Chart />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 h-screen overflow-auto">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
