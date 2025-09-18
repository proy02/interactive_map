import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter(),
    paths: {
      // change the repo name if different
      base: process.env.NODE_ENV === 'production' ? '/interactive_map' : ''
    }
  }
};

export default config;