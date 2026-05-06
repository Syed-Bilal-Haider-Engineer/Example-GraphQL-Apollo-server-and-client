export default function Navbar (){
  return (<nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 start-0 px-6 py-4 flex justify-between items-center">
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Graph QL
    </span>
    <div className="space-x-8 text-gray-600 font-medium">
      <a href="#" className="hover:text-blue-600 transition">Dashboard</a>
      <a href="#" className="hover:text-blue-600 transition">Directory</a>
    </div>
  </nav>)
};