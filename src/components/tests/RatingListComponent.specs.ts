import { describe, it, expect, vi } from 'vitest';
import { flushPromises, shallowMount } from '@vue/test-utils';
import axios from 'axios';
import RatingListComponent from '../RatingListComponent.vue';
import type { Post } from '@/model/model';

describe('RatingListComponent', () => {
  vi.mock('axios');

  const emptyResponse: Post[] = [];
  const postsResponse: Post[] = [
    { animeTitle: 'Naruto', rating: 8.5, experience: 'Exciting' },
    { animeTitle: 'Bleach', rating: 7.8, experience: 'Thrilling' }
  ];

  const backendUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

  it('should display "No ratings yet" if list from backend is empty', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: emptyResponse });
    const wrapper = shallowMount(RatingListComponent);
    await flushPromises();
    expect(wrapper.text()).toContain('No ratings yet');
    expect(axios.get).toHaveBeenCalledWith(`${backendUrl}/rate`);
  });

  it('should render list from backend', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: postsResponse });
    const wrapper = shallowMount(RatingListComponent);
    await flushPromises();
    const expectedRows = 1 + postsResponse.length; // Header + one row per post
    expect(wrapper.findAll('tr').length).toBe(expectedRows);
    expect(wrapper.text()).toContain('Naruto');
    expect(wrapper.text()).toContain('Bleach');
    expect(axios.get).toHaveBeenCalledWith(`${backendUrl}/rate`);
  });
});
