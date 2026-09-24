/** NepGuide brand logo — mountain peaks + trail path */
export function Logo({ className = "", size = 36 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ng-peak" x1="8" y1="52" x2="56" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="0.55" stopColor="#10b981" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
        <linearGradient id="ng-snow" x1="24" y1="18" x2="40" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ecfdf5" />
          <stop offset="1" stopColor="#a7f3d0" />
        </linearGradient>
        <linearGradient id="ng-path" x1="12" y1="56" x2="48" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {/* Soft circle background */}
      <circle cx="32" cy="32" r="30" fill="#064e3b" opacity="0.35" />
      <circle cx="32" cy="32" r="28" stroke="url(#ng-peak)" strokeWidth="1.5" opacity="0.5" />

      {/* Back peak (left) */}
      <path
        d="M6 50 L20 22 L28 38 L34 28 L42 44 L58 50 Z"
        fill="url(#ng-peak)"
        opacity="0.85"
      />

      {/* Main central peak */}
      <path
        d="M14 50 L32 10 L50 50 Z"
        fill="url(#ng-peak)"
      />

      {/* Snow cap */}
      <path
        d="M26 22 L32 10 L38 22 L35 24 L32 18 L29 24 Z"
        fill="url(#ng-snow)"
      />

      {/* Trail / path winding up */}
      <path
        d="M18 48 Q24 42 28 36 Q32 30 36 26 Q40 22 44 20"
        stroke="url(#ng-path)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
      {/* Path dots */}
      <circle cx="20" cy="46" r="1.6" fill="#fbbf24" />
      <circle cx="30" cy="32" r="1.4" fill="#fbbf24" />
      <circle cx="42" cy="21" r="1.5" fill="#fde68a" />
    </svg>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={36} />
      <span className="text-xl font-bold tracking-tight text-white">
        Nep<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Guide</span>
      </span>
    </div>
  );
}
