export function SongsSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">Songs</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-wide text-balance">
            {"KCP校歌と応援歌"}
          </h2>
          <div className="mt-6 w-12 h-px bg-accent mx-auto" />
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* School Song */}
          <div className="group bg-card border border-border overflow-hidden hover:border-accent transition-colors">
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {"校歌「今ここに」"}
              </h3>
            </div>
            {/* Image placeholder */}
            <div className="aspect-[16/10] bg-muted" aria-label="School song image placeholder" />
            <div className="px-6 py-4">
              <p className="text-sm font-light text-muted-foreground text-center">
                {"「今ここに」"}
              </p>
            </div>
          </div>

          {/* Cheering Song */}
          <div className="group bg-card border border-border overflow-hidden hover:border-accent transition-colors">
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {"応援歌「そらとほしと」"}
              </h3>
            </div>
            {/* Image placeholder */}
            <div className="aspect-[16/10] bg-muted" aria-label="Cheering song image placeholder" />
            <div className="px-6 py-4">
              <p className="text-sm font-light text-muted-foreground text-center">
                {"「そらとほしと」"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
