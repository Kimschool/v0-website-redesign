'use client'

export function SongsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            KCP校歌と応援歌
          </h2>
        </div>

        <div className="space-y-8">
          {/* Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden">
                <img
                  src="https://weavus-group.com/kcp/wp-content/uploads/2025/11/Gemini_Generated_Image_c0ytb8c0ytb8.jpg"
                  alt="校歌"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-semibold text-gray-700">（校歌）</p>
            </div>

            <div className="space-y-2">
              <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden">
                <img
                  src="https://weavus-group.com/kcp/wp-content/uploads/2025/11/Gemini_Generated_Image_hzfjhlhzfjhl.jpg"
                  alt="応援歌"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-semibold text-gray-700">（応援歌）</p>
            </div>
          </div>

          {/* Videos Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden">
                <video
                  width="100%"
                  height="300"
                  controls
                  className="w-full h-auto bg-black"
                >
                  <source src="https://weavus-group.com/kcp/wp-content/uploads/2025/08/校歌字幕.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-sm font-semibold text-gray-700">KCP校歌</p>
            </div>

            <div className="space-y-2">
              <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden">
                <video
                  width="100%"
                  height="300"
                  controls
                  className="w-full h-auto bg-black"
                >
                  <source src="https://weavus-group.com/kcp/wp-content/uploads/2025/08/応援歌字幕明るいバージョン.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-sm font-semibold text-gray-700">応援歌</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


