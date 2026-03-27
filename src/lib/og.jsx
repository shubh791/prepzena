// src/lib/og.jsx
// Shared Prepzena OG image layout — used by every opengraph-image.jsx
// Satori-safe: only flex layout, solid colours, inline styles, no Tailwind.

export function OGBase({ title, subtitle, badge = null, tags = [] }) {
  const titleSize = title.length > 42 ? "50px" : title.length > 28 ? "62px" : "74px";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0F172A",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Teal glow — top right */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          background: "#14b8a6",
          borderRadius: "50%",
          opacity: 0.08,
          display: "flex",
        }}
      />

      {/* Teal glow — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "260px",
          height: "260px",
          background: "#14b8a6",
          borderRadius: "50%",
          opacity: 0.05,
          display: "flex",
        }}
      />

      {/* Horizontal rule accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "80px",
          right: "80px",
          height: "3px",
          background: "#14b8a6",
          display: "flex",
        }}
      />

      {/* Logo row */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "48px" }}>
        <div
          style={{
            width: "54px",
            height: "54px",
            background: "#14b8a6",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0F172A",
            fontWeight: 900,
            fontSize: "22px",
            marginRight: "16px",
          }}
        >
          PZ
        </div>
        <span style={{ color: "#94a3b8", fontSize: "26px", fontWeight: 700 }}>
          Prepzena
        </span>
      </div>

      {/* Badge */}
      {badge ? (
        <div
          style={{
            display: "flex",
            background: "#134e4a",
            borderRadius: "100px",
            padding: "7px 22px",
            marginBottom: "28px",
            color: "#2dd4bf",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          {badge}
        </div>
      ) : null}

      {/* Title */}
      <div
        style={{
          color: "#f1f5f9",
          fontSize: titleSize,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: "24px",
          maxWidth: "940px",
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: "#64748b",
          fontSize: "27px",
          lineHeight: 1.55,
          maxWidth: "700px",
        }}
      >
        {subtitle}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: "58px",
          left: "80px",
          right: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex" }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                background: "#1e293b",
                color: "#475569",
                borderRadius: "100px",
                padding: "7px 18px",
                fontSize: "15px",
                fontWeight: 600,
                display: "flex",
                marginRight: "10px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ color: "#334155", fontSize: "18px", fontWeight: 500 }}>
          prepzena.com
        </div>
      </div>
    </div>
  );
}
