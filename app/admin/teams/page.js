'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    ownerName: '',
    budget: 10000000,
    maxPlayers: 15,
    ownerId: '',
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams');
      const data = await res.json();
      if (data.success) {
        setTeams(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch teams');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Team created');
        setShowForm(false);
        fetchTeams();
      }
    } catch (error) {
      toast.error('Failed to create team');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Teams</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Create Team'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Team Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Owner Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Budget</label>
                <input
                  type="number"
                  className="input"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Create Team</button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team._id} className="card">
              <h3 className="text-xl font-bold mb-2">{team.teamName}</h3>
              <p className="text-gray-600">Owner: {team.ownerName}</p>
              <p className="text-gray-600">Budget: ₹{team.budget.toLocaleString()}</p>
              <p className="text-gray-600">Players: {team.purchasedPlayers.length}/{team.maxPlayers}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
