import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      jobsListCounter: 0,
      worksListCounter: 0,
      user: [],

      setUser: async (user) => {
        set(
          produce((state) => {
            state.user = user;
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
