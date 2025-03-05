import Link from "next/link";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-3 hover:bg-gray-600 p-2 rounded block"   onClick={() => setActiveComponent("boatowner")}>
         
            Boat Owner
        
        </li>
        <li className="mb-3 hover:bg-gray-600 p-2 rounded block" onClick={() => setActiveComponent("blog")}>
         
            Blog
         
        </li>
        <li className="mb-3 hover:bg-gray-600 p-2 rounded block"   onClick={() => setActiveComponent("chart")}>
         
            Chart
          
        </li>
        <li className="mb-3 hover:bg-gray-600 p-2 rounded block"   onClick={() => setActiveComponent("sponser")}>
         
            Sponsors
          
        </li>
        <li className="mb-3 hover:bg-gray-600 p-2 rounded block"   onClick={() => setActiveComponent("Destination")}>
         
            Destination
          
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
