import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      jobsListCounter: 0,
      jobsListSaved: [],
      worksListCounter: 0,
      worksListSaved: [],
      user: [],

      setUser: async (user) => {
        set(
          produce((state) => {
            state.user = user;
          })
        );
      },

      addToFavorites: async (item) => {
        let data = get().jobsListSaved;
        if (data.length === 0) {
          data = [item];
        } else {
          if (data.filter((items) => items.id === item.id).length === 0) {
            data = [...data, item];
          } else if (data.filter((items) => items.id === item.id).length > 0) {
            data = data.filter((e) => e.id !== item.id);
          }
        }
        set(
          produce((state) => {
            state.jobsListSaved = data;
            state.jobsListCounter = data.length;
          })
        );
      },

      addWorkToFavorites: async (item) => {
        let data = get().worksListSaved;
        if (data.length === 0) {
          data = [item];
        } else {
          if (data.filter((items) => items.id === item.id).length === 0) {
            data = [...data, item];
          } else if (data.filter((items) => items.id === item.id).length > 0) {
            data = data.filter((e) => e.id !== item.id);
          }
        }
        set(
          produce((state) => {
            state.worksListSaved = data;
            state.worksListCounter = data.length;
          })
        );
      },
    }),
    {
      name: "jobs-storage", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
