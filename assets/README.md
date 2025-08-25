# Multimedia Assets Structure

## Required Asset Files for Full Multimedia System

### Thumbnails (assets/thumbnails/)
- sower-video.jpg - Thumbnail for sower parable video
- house-rock-illustration.jpg - Thumbnail for house on rock illustration
- israel-map.jpg - Thumbnail for Israel map
- vineyard-mosaic.jpg - Thumbnail for vineyard mosaic
- sea-galilee-tour.jpg - Thumbnail for Sea of Galilee tour
- temple-game.jpg - Thumbnail for temple building game
- walking-trails.jpg - Thumbnail for walking trails map
- ancient-tools.jpg - Thumbnail for ancient tools
- jewish-tradition.jpg - Thumbnail for Jewish tradition lecture
- parables-quiz.jpg - Thumbnail for parables quiz

### Full Size Images (assets/images/)
- house-rock-full.jpg - Full illustration of house on rock
- vineyard-mosaic-full.jpg - Full size vineyard mosaic image
- ancient-tools-full.jpg - Full size ancient tools image

### Videos (assets/videos/)
- sower-parable.mp4 - Interactive explanation of sower parable
- galilee-fishing.mp4 - Virtual tour of Sea of Galilee
- jewish-tradition-parables.mp4 - Lecture on Jewish tradition

### Audio (assets/audio/)
- good-shepherd.mp3 - Professional reading of Good Shepherd parable
- sower-children.mp3 - Children's version with sound effects

### Interactive Maps (assets/maps/)
- israel-parables.json - Interactive map data for parables locations
- parable-trails.json - Walking trails map data

## Asset Creation Guidelines

### Image Assets
- Format: JPEG for photos, PNG for illustrations with transparency
- Thumbnails: 400x300px, optimized for web
- Full images: Maximum 1920x1080px, compressed for web
- Alt text and descriptions for accessibility

### Video Assets
- Format: MP4 with H.264 codec
- Resolution: 1080p maximum, with 720p fallback
- Subtitles: Hebrew subtitles in VTT format
- Duration: 3-15 minutes optimal

### Audio Assets
- Format: MP3, 128kbps minimum
- Length: 2-10 minutes optimal
- Professional quality recording
- Hebrew narration with clear pronunciation

### Interactive Content
- Maps: GeoJSON format for geographic data
- Games: HTML5/JavaScript based
- Responsive design for mobile devices

## Implementation Status
- ✅ HTML structure complete
- ✅ CSS styling complete
- ✅ JavaScript functionality complete
- 🔄 Asset creation needed
- 🔄 Content population required

## Next Steps
1. Create or source actual media content
2. Optimize assets for web delivery
3. Implement CDN for large files
4. Add progressive loading for videos
5. Include accessibility features
