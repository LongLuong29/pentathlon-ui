import React, { useState } from 'react';
import AthleteList from '../components/AthleteList';
import AddAthleteForm from '../components/AddAthleteForm';

const Athlete = ({ showAddAthleteModal, setShowAddAthleteModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto">
        <AthleteList 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {showAddAthleteModal && (
          <AddAthleteForm
            onClose={() => setShowAddAthleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Athlete;
