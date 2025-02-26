import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddAthleteModal = () => {
    return (
        <div
          className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm"
          onClick={() => setShowAddAthleteModal(false)}
        >
          <div
            className="bg-white  shadow-lg w-96 p-6 rounded-lg text-sm font-medium text-gray-500"
            onClick={(e) => e.stopPropagation()} // Chặn sự kiện click lan ra ngoài
          >
            <h2 className="text-lg font-bold mb-4">Add New Athlete</h2>

            {/* Form nhập thông tin */}

            <div class="flex items-center justify-center space-x-4 mb-4">
              <img
                id="avatarPreview"
                class="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
                src="https://via.placeholder.com/80"
                alt="Avatar"
              />
              <label class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Choose File
                <input
                  type="file"
                  class="hidden"
                  id="avatarInput"
                  accept="image/*"
                />
              </label>
            </div>

            <div class="space-y-3">
              <div className="personal-info">
                <label className="text-base">Personal information</label>
                <div className="px-3 py-2">
                  <div>
                    <label class="block font-semibold">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label class="block font-semibold">Gender</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>

              <div className="contact-info mt-4">
                <label className="text-base">Personal information</label>
                <div className="px-3 py-2">
                  <div>
                    <label class="block font-semibold">Email Address</label>
                    <input
                      type="email"
                      placeholder="example @ your email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label class="block font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="123 456 7890"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label class="block font-semibold">Home Address</label>
                    <input
                      type="text"
                      placeholder="Your Address"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <button class="w-full bg-[#00a884] text-white py-2 rounded-md hover:bg-green-600">
                Update Profile
              </button>
              <button class="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )

}

export default AddAthleteModal;
