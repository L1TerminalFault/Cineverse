import { create } from "zustand";

export const useDiscoverMoviesStore = create((set) => ({
  loading: true,
  error: null,
  discoverMovies: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setDiscoverMovies: (value) => set(() => ({ discoverMovies: value })),
}));

export const useDiscoverTVStore = create((set) => ({
  loading: true,
  error: null,
  discoverTV: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setDiscoverTV: (value) => set(() => ({ discoverTV: value })),
}));

export const useNowPlayingMoviesStore = create((set) => ({
  loading: true,
  error: null,
  nowPlayingMovies: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setNowPlayingMovies: (value) => set(() => ({ nowPlayingMovies: value })),
}));

export const useOnAirTVStore = create((set) => ({
  loading: true,
  error: null,
  onAirTV: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setOnAirTV: (value) => set(() => ({ onAirTV: value })),
}));

export const useOnAirTodayTVStore = create((set) => ({
  loading: true,
  error: null,
  onAirTodayTV: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setOnAirTodayTV: (value) => set(() => ({ onAirTodayTV: value })),
}));

export const usePopularMoviesStore = create((set) => ({
  loading: true,
  error: null,
  popularMovies: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setPopularMovies: (value) => set(() => ({ popularMovies: value })),
}));

export const usePopularTVStore = create((set) => ({
  loading: true,
  error: null,
  popularTV: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setPopularTV: (value) => set(() => ({ popularTV: value })),
}));

export const useTopRatedMoviesStore = create((set) => ({
  loading: true,
  error: null,
  topRatedMovies: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setTopRatedMovies: (value) => set(() => ({ topRatedMovies: value })),
}));

export const useTopRatedTVStore = create((set) => ({
  loading: true,
  error: null,
  topRatedTV: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setTopRatedTV: (value) => set(() => ({ topRatedTV: value })),
}));

export const useTrendingMoviesStore = create((set) => ({
  loading: true,
  error: null,
  trendingMovies: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setTrendingMovies: (value) => set(() => ({ trendingMovies: value })),
}));

export const useTrendingTVStore = create((set) => ({
  loading: true,
  error: null,
  trendingTV: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setTrendingTV: (value) => set(() => ({ trendingTV: value })),
}));

export const useUpcomingMoviesStore = create((set) => ({
  loading: true,
  error: null,
  upcomingMovies: null,
  setLoading: (value) => set(() => ({ loading: value })),
  setError: (value) => set(() => ({ error: value })),
  setUpcomingMovies: (value) => set(() => ({ upcomingMovies: value })),
}));

export const useCurrentPage = create((set) => ({
  page: "Movies",
  setPage: (value) => set(() => ({ page: value })),
}));
