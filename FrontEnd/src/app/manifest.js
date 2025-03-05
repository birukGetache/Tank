 const  manifest = () => {
    return {
      name: 'Waki Cards',
      short_name: 'Waki',
      description: 'A flashcard app for learning anything',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    };
  }
  

  export default manifest;