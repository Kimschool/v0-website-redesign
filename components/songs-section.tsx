'use client'

export function SongsSection() {
  const songs = [
    {
      title: "KCP校歌",
      videoUrl: "https://weavus-group.com/kcp/wp-content/uploads/2025/08/校歌字幕.webm",
    },
    {
      title: "応援歌",
      videoUrl: "https://weavus-group.com/kcp/wp-content/uploads/2025/08/応援歌字幕明るいバージョン.webm",
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            KCP校歌と応援歌
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {songs.map((song, index) => (
            <div key={index} className="space-y-4">
              <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden">
                <video
                  width="100%"
                  height="300"
                  controls
                  className="w-full h-auto bg-black"
                >
                  <source src={song.videoUrl} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800">
                {song.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

