import { useState } from 'react'

import Sidebar from './components/Sidebar'
import Athlete from './components/Athlete'

function App() {

  return (
    <div className='flex'>
            <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4">
        <Athlete />
          {/* <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyst" element={<Analyst />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/athlete" element={<Athlete />} />
          </Routes> */}
        </div>
      </div>
    </div>
  )
}

export default App
