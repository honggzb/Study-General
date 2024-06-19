import { mount } from '@vue/test-utils'
import About from './About.vue'
test('uses mounts', async () => {
  const wrapper = mount(About)
  expect(wrapper.html()).toContain('About')
  expect(wrapper.html()).toContain('Count: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('Count: 1')
})
