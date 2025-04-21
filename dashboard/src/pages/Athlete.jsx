import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AthleteList from '../components/AthleteList';
import AddAthleteForm from '../components/AddAthleteForm';
import { athletesService } from '../api';
import { toast } from 'react-toastify';

const Athlete = ({ showAddAthleteModal, setShowAddAthleteModal }) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        const data = await athletesService.getAll();
        setAthletes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching athletes:', err);
        setError('Failed to fetch athletes');
        setAthletes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const handleAddAthlete = async (formData) => {
    try {
      setLoading(true);
      const newAthlete = await athletesService.create(formData);
      setAthletes(prevAthletes => [...prevAthletes, newAthlete]);
      setShowAddAthleteModal(false);
      toast.success('Athlete added successfully!');
    } catch (err) {
      console.error('Error adding athlete:', err);
      setError('Failed to add athlete');
      toast.error('Failed to add athlete');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateAthlete = async (id, formData) => {
    try {
      setLoading(true);
      const updatedAthlete = await athletesService.update(id, formData);
      setAthletes(prevAthletes =>
        prevAthletes.map(athlete =>
          athlete.id === id ? updatedAthlete : athlete
        )
      );
      toast.success('Athlete updated successfully!');
    } catch (err) {
      console.error('Error updating athlete:', err);
      setError('Failed to update athlete');
      toast.error('Failed to update athlete');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAthlete = async (id) => {
    try {
      setLoading(true);
      await athletesService.delete(id);
      setAthletes(prevAthletes => prevAthletes.filter(athlete => athlete.id !== id));
      toast.success('Athlete deleted successfully!');
    } catch (err) {
      console.error('Error deleting athlete:', err);
      setError('Failed to delete athlete');
      toast.error('Failed to delete athlete');
    } finally {
      setLoading(false);
    }
  };

  if (loading && athletes.length === 0) {
    return (
      <div className="pt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && athletes.length === 0) {
    return (
      <div className="pt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto">
        <AthleteList 
          athletes={athletes} 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onDelete={handleDeleteAthlete}
          onUpdate={handleUpdateAthlete}
        />
        {showAddAthleteModal && (
          <AddAthleteForm
            onClose={() => setShowAddAthleteModal(false)}
            onSubmit={handleAddAthlete}
          />
        )}
      </div>
    </div>
  );
};

export default Athlete;
