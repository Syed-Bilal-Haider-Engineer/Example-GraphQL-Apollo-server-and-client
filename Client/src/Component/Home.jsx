import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Navbar from './Navbar.js';
import { CREATE_USER_MUTATION,QUERY_ALL_USERS } from '../Queries/queries.js';

const UserCard = ({ user }) => (
  <div className="bg-white p-6 cursor-pointer rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-4">
      {user?.name?.charAt(0)}
    </div>
    <h3 className="text-xl font-bold text-gray-800">{user?.name}</h3>
    <p className="text-gray-500 text-sm mb-4">@{user?.username}</p>
    <div className="flex justify-between items-center border-t pt-4">
      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-600 uppercase">
        {user?.nationality}
      </span>
     <span className="text-sm text-gray-600">
  {user?.age ? `${user.age} years old` : ""}
</span>
    </div>
  </div>
);

function Home() {
  const [form, setForm] = useState({ name: "", username: "", age: "", nationality: "PAK" });
  const [errors, setErrors] = useState({});

  const { data, loading } = useQuery(QUERY_ALL_USERS);
  
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: QUERY_ALL_USERS }] 
  });

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (form.username.length < 3) newErrors.username = "Username too short";
    if (form.age <= 0) newErrors.age = "Enter a valid age";
    if (!form.nationality) newErrors.nationality = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await createUser({
        variables: {
          input: { ...form, age: Number(form.age) },
        },
      });
      setForm({ name: "", username: "", age: "", nationality: "" }); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Navbar />
      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Community Directory</h1>
          <p className="mt-2 text-lg text-gray-600">Manage and view all registered members below.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 sticky top-28">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Create New User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    className={`w-full p-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    className={`w-full p-3 rounded-xl border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={form.age}
                      onChange={(e) => setForm({...form, age: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <select
  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
  value={form.nationality}
  onChange={(e) =>
    setForm({ ...form, nationality: e.target.value })
  }
>
  <option value="">Select Nationality</option>
  <option value="PAK">Pakistan</option>
  <option value="US">United States</option>
  <option value="CA">Canada</option>
  <option value="UK">United Kingdom</option>
  <option value="AU">Australia</option>
  <option value="NZ">New Zealand</option>
</select>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition transform active:scale-95 shadow-lg shadow-indigo-200 mt-4"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;