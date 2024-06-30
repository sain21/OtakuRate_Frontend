import { describe, it, expect, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import RatingListComponent from '@/components/RatingListComponent.vue'

describe('RatingListComponent', () => {
  vi.mock('axios')
  const mockPosts = [
    { id: 1, animeTitle: 'Naruto', image: 'http://example.com/naruto.jpg', rating: 85, experience: 'Great!' },
    { id: 2, animeTitle: 'Bleach', image: 'http://example.com/bleach.jpg', rating: 70, experience: 'Good' }
  ]

  it('should display "No ratings yet" if the list from backend is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: [] })
    const wrapper = shallowMount(RatingListComponent)
    await flushPromises()
    expect(wrapper.text()).toContain('No ratings yet')
  })

  it('should render list from backend', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPosts })
    const wrapper = shallowMount(RatingListComponent)
    await flushPromises()
    expect(wrapper.findAll('tr').length).toBe(mockPosts.length + 1) // including header row
    expect(wrapper.text()).toContain('Naruto')
    expect(wrapper.text()).toContain('Bleach')
  })

  it('should add a new post and reset form fields', async () => {
    axios.post.mockResolvedValueOnce({})
    axios.get.mockResolvedValueOnce({ data: mockPosts })
    const wrapper = shallowMount(RatingListComponent, {
      data() {
        return {
          animeField: 'One Piece',
          ratingField: '88',
          opinionField: 'Exciting',
          imageField: 'http://example.com/onepiece.jpg'
        }
      }
    })
    await wrapper.find('.form-button').trigger('click')
    await flushPromises()
    expect(axios.post).toHaveBeenCalledWith(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/rate', {
      animeTitle: 'One Piece',
      rating: parseFloat('88'),
      experience: 'Exciting',
      image: 'http://example.com/onepiece.jpg'
    })
    expect(wrapper.vm.animeField).toBe('')
    expect(wrapper.vm.ratingField).toBe('')
    expect(wrapper.vm.opinionField).toBe('')
    expect(wrapper.vm.imageField).toBe('')
  })

  it('should delete a post', async () => {
    axios.delete.mockResolvedValueOnce({})
    axios.get.mockResolvedValueOnce({ data: [] }) // Assume empty list after delete
    const wrapper = shallowMount(RatingListComponent)
    await wrapper.vm.deleteEntry(1) // Delete the first entry
    await flushPromises()
    expect(axios.delete).toHaveBeenCalledWith(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/rate/1`)
    expect(wrapper.text()).toContain('No ratings yet')
  })

  it('should update a post', async () => {
    axios.put.mockResolvedValueOnce({})
    axios.get.mockResolvedValueOnce({ data: mockPosts })
    const wrapper = shallowMount(RatingListComponent, {
      data() {
        return {
          animeField: 'Naruto Shippuden',
          ratingField: '90',
          opinionField: 'Awesome',
          imageField: 'http://example.com/narutoshippuden.jpg'
        }
      }
    })
    await wrapper.vm.updateEntry(1) // Update the first entry
    await flushPromises()
    expect(axios.put).toHaveBeenCalledWith(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/rate/1`, {
      animeTitle: 'Naruto Shippuden',
      rating: parseFloat('90'),
      experience: 'Awesome',
      image: 'http://example.com/narutoshippuden.jpg'
    })
  })
})