'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Edit, Trash2, Check, X, Search, Filter } from 'lucide-react';

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [playerNumberInput, setPlayerNumberInput] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    isApproved: '',
    isActive: '',
    battingStyle: '',
    bowlingStyle: '',
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, players]);

  const fetchPlayers = async () => {
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      if (data.success) {
        setPlayers(data.data);
        setFilteredPlayers(data.data);
        // Initialize player number inputs
        const numberInputs = {};
        data.data.forEach(player => {
          numberInputs[player._id] = player.playerNumber || '';
        });
        setPlayerNumberInput(numberInputs);
      }
    } catch (error) {
      toast.error('Failed to fetch players');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...players];

    // Search by name or player number
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (player.playerNumber && player.playerNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(player => player.category === filters.category);
    }

    // Filter by approval status
    if (filters.isApproved !== '') {
      filtered = filtered.filter(player => player.isApproved === (filters.isApproved === 'true'));
    }

    // Filter by active status
    if (filters.isActive !== '') {
      filtered = filtered.filter(player => player.isActive === (filters.isActive === 'true'));
    }

    // Filter by batting style
    if (filters.battingStyle) {
      filtered = filtered.filter(player => player.battingStyle === filters.battingStyle);
    }

    // Filter by bowling style
    if (filters.bowlingStyle) {
      filtered = filtered.filter(player => player.bowlingStyle === filters.bowlingStyle);
    }

    setFilteredPlayers(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      isApproved: '',
      isActive: '',
      battingStyle: '',
      bowlingStyle: '',
    });
  };

  const handleApprove = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}/approve`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Player approved');
        fetchPlayers();
      }
    } catch (error) {
      toast.error('Failed to approve player');
    }
  };

  const handleToggleStatus = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}/toggle-status`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Player ${data.data.isActive ? 'activated' : 'deactivated'}`);
        fetchPlayers();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (playerId) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    
    try {
      const res = await fetch(`/api/players/${playerId}/delete`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Player deleted');
        fetchPlayers();
      }
    } catch (error) {
      toast.error('Failed to delete player');
    }
  };

  const startEdit = (player) => {
    setEditingPlayer(player._id);
    setEditForm({
      name: player.name,
      mobile: player.mobile,
      address: player.address,
      category: player.category,
      battingStyle: player.battingStyle,
      bowlingStyle: player.bowlingStyle,
      playerNumber: player.playerNumber || '',
    });
  };

  const handleUpdate = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Player updated');
        setEditingPlayer(null);
        fetchPlayers();
      }
    } catch (error) {
      toast.error('Failed to update player');
    }
  };

  const handlePlayerNumberUpdate = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerNumber: playerNumberInput[playerId] }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Player number updated');
        fetchPlayers();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Failed to update player number');
    }
  };

  const handlePlayerNumberDelete = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerNumber: '' }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Player number removed');
        setPlayerNumberInput({ ...playerNumberInput, [playerId]: '' });
        fetchPlayers();
      }
    } catch (error) {
      toast.error('Failed to remove player number');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading players...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-800 mb-2">Player Management</h1>
              <p className="text-gray-600">
                Showing <span className="font-bold text-indigo-600">{filteredPlayers.length}</span> of <span className="font-bold">{players.length}</span> players
              </p>
            </div>
            <Link 
              href="/admin/auction-display" 
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Generate Auction Display
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                placeholder="Search by name or player number..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="batsman">Batsman</option>
                  <option value="bowler">Bowler</option>
                  <option value="allrounder">All-rounder</option>
                  <option value="wicketkeeper">Wicketkeeper</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Approval Status</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={filters.isApproved}
                  onChange={(e) => setFilters({ ...filters, isApproved: e.target.value })}
                >
                  <option value="">All</option>
                  <option value="true">Approved</option>
                  <option value="false">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Active Status</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={filters.isActive}
                  onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Batting Style</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={filters.battingStyle}
                  onChange={(e) => setFilters({ ...filters, battingStyle: e.target.value })}
                >
                  <option value="">All</option>
                  <option value="right-hand">Right Hand</option>
                  <option value="left-hand">Left Hand</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bowling Style</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={filters.bowlingStyle}
                  onChange={(e) => setFilters({ ...filters, bowlingStyle: e.target.value })}
                >
                  <option value="">All</option>
                  <option value="right-arm-fast">Right Arm Fast</option>
                  <option value="left-arm-fast">Left Arm Fast</option>
                  <option value="right-arm-spin">Right Arm Spin</option>
                  <option value="left-arm-spin">Left Arm Spin</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <X size={18} />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Player Cards */}
        <div className="space-y-4">
          {filteredPlayers.map((player) => (
            <div key={player._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              {editingPlayer === player._id ? (
                // Edit Mode
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Player Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          value={editForm.mobile}
                          onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Player Number</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          value={editForm.playerNumber}
                          onChange={(e) => setEditForm({ ...editForm, playerNumber: e.target.value })}
                          placeholder="e.g., P001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        >
                          <option value="batsman">Batsman</option>
                          <option value="bowler">Bowler</option>
                          <option value="allrounder">All-rounder</option>
                          <option value="wicketkeeper">Wicketkeeper</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Batting Style</label>
                        <select
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          value={editForm.battingStyle}
                          onChange={(e) => setEditForm({ ...editForm, battingStyle: e.target.value })}
                        >
                          <option value="right-hand">Right Hand</option>
                          <option value="left-hand">Left Hand</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bowling Style</label>
                        <select
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          value={editForm.bowlingStyle}
                          onChange={(e) => setEditForm({ ...editForm, bowlingStyle: e.target.value })}
                        >
                          <option value="right-arm-fast">Right Arm Fast</option>
                          <option value="left-arm-fast">Left Arm Fast</option>
                          <option value="right-arm-spin">Right Arm Spin</option>
                          <option value="left-arm-spin">Left Arm Spin</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleUpdate(player._id)} 
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setEditingPlayer(null)} 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex gap-6 p-6">
                  {/* Player Photo */}
                  <div className="flex-shrink-0">
                    {player.photo?.url ? (
                      <img
                        src={player.photo.url}
                        alt={player.name}
                        className="w-[140px] h-[140px] rounded-2xl object-cover border-4 border-indigo-100 shadow-md"
                      />
                    ) : (
                      <div className="w-[140px] h-[140px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center border-4 border-gray-100">
                        <span className="text-gray-500 font-semibold">No Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-black text-gray-800 mb-2">{player.name}</h3>
                        
                        {/* Inline Player Number Input */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Enter Player #"
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all w-36 text-sm font-semibold"
                            value={playerNumberInput[player._id] || ''}
                            onChange={(e) => setPlayerNumberInput({ 
                              ...playerNumberInput, 
                              [player._id]: e.target.value 
                            })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handlePlayerNumberUpdate(player._id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handlePlayerNumberUpdate(player._id)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
                            title="Save player number"
                          >
                            Save
                          </button>
                          {player.playerNumber && (
                            <button
                              onClick={() => handlePlayerNumberDelete(player._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
                              title="Remove player number"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        {/* Active/Inactive Toggle Switch */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">
                            {player.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button
                            onClick={() => handleToggleStatus(player._id)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                              player.isActive ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                                player.isActive ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                          player.isApproved ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                          {player.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        {/* Edit and Delete Buttons */}
                        <button
                          onClick={() => startEdit(player)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold p-2.5 rounded-xl transition-all shadow-md"
                          title="Edit Player"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(player._id)}
                          className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold p-2.5 rounded-xl transition-all shadow-md"
                          title="Delete Player"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Category</p>
                        <p className="font-bold text-gray-800 capitalize">{player.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Mobile</p>
                        <p className="font-bold text-gray-800">{player.mobile}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">DOB</p>
                        <p className="font-bold text-gray-800">{new Date(player.dob).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Batting Style</p>
                        <p className="font-bold text-gray-800 capitalize">{player.battingStyle.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Bowling Style</p>
                        <p className="font-bold text-gray-800 capitalize">{player.bowlingStyle.replace('-', ' ')}</p>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Address</p>
                        <p className="font-bold text-gray-800">{player.address}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {!player.isApproved && (
                        <button
                          onClick={() => handleApprove(player._id)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-md"
                        >
                          <Check size={18} /> Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredPlayers.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <p className="text-gray-600 text-lg font-semibold">
                {players.length === 0 ? 'No players registered yet' : 'No players match your search criteria'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
