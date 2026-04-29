import { create } from 'zustand';

const useTeamStore = create((set) => ({
  teams: [],
  currentTeam: null,
  
  setTeams: (teams) => set({ teams }),
  setCurrentTeam: (team) => set({ currentTeam: team }),
  
  updateTeam: (teamId, updates) => set((state) => ({
    teams: state.teams.map((team) =>
      team._id === teamId ? { ...team, ...updates } : team
    ),
    currentTeam: state.currentTeam?._id === teamId 
      ? { ...state.currentTeam, ...updates } 
      : state.currentTeam,
  })),
}));

export default useTeamStore;
