# Album Card Gallery

A modern, responsive web application for creating and managing photo albums with a beautiful card-based gallery interface. Built with Next.js, TypeScript, and MongoDB.

## Features

- 🖼️ **Image Upload**: Upload and manage images using ImgBB integration
- 📱 **Responsive Design**: Beautiful card-based layout that works on all devices
- 🔄 **Real-time Updates**: Instant feedback when creating or updating albums
- 📊 **Pagination**: Efficient loading of albums with MongoDB-based pagination
- 🔒 **Type Safety**: Built with TypeScript for better development experience
- 🎨 **Modern UI**: Clean and intuitive user interface with smooth animations

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: CSS Modules
- **Database**: MongoDB
- **Image Hosting**: ImgBB
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 14.x or later
- MongoDB Atlas account or local MongoDB instance
- ImgBB API key (for image uploads)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd album-card
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   IMGBB_API_KEY=your_imgbb_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit `http://localhost:3000` to see the application in action.

## Project Structure

```
album-card/
├── components/         # React components
│   ├── AlbumGallery/  # Main gallery component
│   ├── Form/          # Album creation form
├── lib/               # Utility functions and configurations
│   ├── mongodb.ts     # MongoDB connection
│   └── models/        # TypeScript interfaces
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   └── index.tsx      # Main page
└── styles/            # CSS modules
```

## API Endpoints

- `GET /api/albums` - Get paginated list of albums
- `POST /api/albums` - Create a new album
- `PUT /api/albums/[id]` - Update an existing album
- `DELETE /api/albums/[id]` - Delete an album

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [MongoDB](https://www.mongodb.com/) - The database
- [ImgBB](https://imgbb.com/) - Image hosting service
