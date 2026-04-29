'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    matchName: '',
    team1: '',
    team2: '',
    matchDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [matchesRes, teamsRes] = await Promise.all([
        fetch('/api/matches'),
        fetch('/api/teams'),
      ]);
      const matchesData = await matchesRes.json();
      const teamsData = await teamsRes.json();
      
      setMatches(matchesData.data || []);
      setTeams(teamsData.data || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Match created');
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to create match');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Matches</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Create Match'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Match Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.matchName}
                  onChange={(e) => setFormData({ ...formData, matchName: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Team 1</label>
                  <select
                    className="input"
                    value={formData.team1}
                    onChange={(e) => setFormData({ ...formData, team1: e.target.value })}
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>{team.teamName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Team 2</label>
                  <select
                    className="input"
                    value={formData.team2}
                    onChange={(e) => setFormData({ ...formData, team2: e.target.value })}
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>{team.teamName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Match Date</label>
                <input
                  type="datetime-local"
                  className="input"
                  value={formData.matchDate}
                  onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Create Match</button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match._id} className="card">
              <h3 className="text-xl font-bold mb-2">{match.matchName}</h3>
              <p className="text-gray-600">
                {match.team1?.teamName} vs {match.team2?.teamName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(match.matchDate).toLocaleString()}
              </p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                match.status === 'completed' ? 'bg-green-500 text-white' :
                match.status === 'live' ? 'bg-red-500 text-white' :
                'bg-gray-300 text-gray-700'
              }`}>
                {match.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
