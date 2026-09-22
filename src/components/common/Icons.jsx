/**
 * Inline line icons for LOOKA.
 * Consistent 1.5 stroke, currentColor, no icon library.
 */

function Svg({ children, className = 'h-5 w-5', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
}

export function HomeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 10.2 12 3.75l8.5 6.45" />
      <path d="M5.75 9.1v9.4a1.4 1.4 0 0 0 1.4 1.4h9.7a1.4 1.4 0 0 0 1.4-1.4V9.1" />
      <path d="M10 19.9v-5.3h4v5.3" />
    </Svg>
  )
}

/* Wardrobe: a clothes hanger. */
export function HangerIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 8.4a2.2 2.2 0 1 1 2.2-2.2" />
      <path d="M12 8.4v2.1" />
      <path d="m12 10.5 7.4 4.9a1.5 1.5 0 0 1-.83 2.75H5.43a1.5 1.5 0 0 1-.83-2.75L12 10.5Z" />
    </Svg>
  )
}

/* Recommendation: a four-point sparkle with a small companion. */
export function SparkleIcon(props) {
  return (
    <Svg {...props}>
      <path d="M10 3.6c.9 3.6 1.9 4.6 5.5 5.5-3.6.9-4.6 1.9-5.5 5.5-.9-3.6-1.9-4.6-5.5-5.5 3.6-.9 4.6-1.9 5.5-5.5Z" />
      <path d="M17.2 14.2c.44 1.76.94 2.26 2.7 2.7-1.76.44-2.26.94-2.7 2.7-.44-1.76-.94-2.26-2.7-2.7 1.76-.44 2.26-.94 2.7-2.7Z" />
    </Svg>
  )
}

export function HeartIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 19.5s-6.75-4.02-6.75-8.7a3.6 3.6 0 0 1 6.75-1.77A3.6 3.6 0 0 1 18.75 10.8c0 4.68-6.75 8.7-6.75 8.7Z" />
    </Svg>
  )
}

export function CalendarIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3.75" y="5.4" width="16.5" height="14.1" rx="2.2" />
      <path d="M3.75 9.9h16.5" />
      <path d="M8.4 3.9v3" />
      <path d="M15.6 3.9v3" />
    </Svg>
  )
}

export function UserIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8.4" r="3.4" />
      <path d="M5.4 19.6a6.6 6.6 0 0 1 13.2 0" />
    </Svg>
  )
}

export function BellIcon(props) {
  return (
    <Svg {...props}>
      <path d="M17.4 10.2a5.4 5.4 0 1 0-10.8 0c0 4.2-1.65 5.4-1.65 5.4h14.1s-1.65-1.2-1.65-5.4Z" />
      <path d="M13.5 18.6a1.8 1.8 0 0 1-3 0" />
    </Svg>
  )
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.8 15.8 3.7 3.7" />
    </Svg>
  )
}


/* Sidebar toggle. `direction` flips it without a second glyph. */
export function ChevronIcon({ direction = 'left', ...props }) {
  return (
    <Svg {...props}>
      <path d={direction === 'left' ? 'M14.5 6.5 9 12l5.5 5.5' : 'M9.5 6.5 15 12l-5.5 5.5'} />
    </Svg>
  )
}

export function SunIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 3.2v1.9M12 19v1.9M3.2 12h1.9M19 12h1.9M5.8 5.8l1.35 1.35M16.85 16.85 18.2 18.2M18.2 5.8l-1.35 1.35M7.15 16.85 5.8 18.2" />
    </Svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.8 12h14.4" />
      <path d="M13.8 6.6 19.2 12l-5.4 5.4" />
    </Svg>
  )
}

export function FilterIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.2 7.2h15.6M7.2 12h9.6M10.2 16.8h3.6" />
    </Svg>
  )
}

export function PlusIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 5.4v13.2M5.4 12h13.2" />
    </Svg>
  )
}

/* Filled heart for an active favourite state. */
export function HeartFilledIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 20.2s-7.4-4.4-7.4-9.6a3.95 3.95 0 0 1 7.4-1.95 3.95 3.95 0 0 1 7.4 1.95c0 5.2-7.4 9.6-7.4 9.6Z" />
    </svg>
  )
}

export function ArrowLeftIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19.2 12H4.8" />
      <path d="M10.2 6.6 4.8 12l5.4 5.4" />
    </Svg>
  )
}

export function UploadCloudIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.9 18.3a4.05 4.05 0 0 1 .45-8.07 5.7 5.7 0 0 1 11.1 1.2 3.6 3.6 0 0 1-.45 7.02" />
      <path d="M12 20.4v-7.8" />
      <path d="M9.3 15.3 12 12.6l2.7 2.7" />
    </Svg>
  )
}

export function CameraIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 8.7h2.85l1.35-2.1h6.6l1.35 2.1H19.5a1.5 1.5 0 0 1 1.5 1.5v7.2a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.4v-7.2a1.5 1.5 0 0 1 1.5-1.5Z" />
      <circle cx="12" cy="13.8" r="3" />
    </Svg>
  )
}

export function InfoIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 11.1v5.1" />
      <path d="M12 8.1h.01" />
    </Svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.6 9.6 12 15l5.4-5.4" />
    </Svg>
  )
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.6 6.6 17.4 17.4M17.4 6.6 6.6 17.4" />
    </Svg>
  )
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="m5.4 12.6 4.2 4.2 9-9.6" />
    </Svg>
  )
}

export function TrashIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.8 7.2h14.4" />
      <path d="M9.6 7.2V5.7a1.2 1.2 0 0 1 1.2-1.2h2.4a1.2 1.2 0 0 1 1.2 1.2v1.5" />
      <path d="M6.6 7.2l.75 11.1a1.5 1.5 0 0 0 1.5 1.4h6.3a1.5 1.5 0 0 0 1.5-1.4L17.4 7.2" />
    </Svg>
  )
}

export function LockIcon(props) {
  return (
    <Svg {...props}>
      <rect x="5.4" y="10.8" width="13.2" height="8.4" rx="2" />
      <path d="M8.4 10.8V8.1a3.6 3.6 0 0 1 7.2 0v2.7" />
    </Svg>
  )
}

export function LockOpenIcon(props) {
  return (
    <Svg {...props}>
      <rect x="5.4" y="10.8" width="13.2" height="8.4" rx="2" />
      <path d="M8.4 10.8V8.1a3.6 3.6 0 0 1 6.9-1.35" />
    </Svg>
  )
}

export function ShuffleIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.2 7.2h3.3l9 9.6h3.3" />
      <path d="M4.2 16.8h3.3l3.3-3.6" />
      <path d="M13.5 9.6l3.3-2.4h3.3" />
      <path d="M17.7 4.5 20.7 7.2l-3 2.7" />
      <path d="M17.7 14.1l3 2.7-3 2.7" />
    </Svg>
  )
}

export function StarIcon(props) {
  return (
    <Svg {...props}>
      <path d="m12 4.5 2.35 4.76 5.25.77-3.8 3.7.9 5.23L12 16.49l-4.7 2.47.9-5.23-3.8-3.7 5.25-.77L12 4.5Z" />
    </Svg>
  )
}

export function GridIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4.2" y="4.2" width="6.3" height="6.3" rx="1.4" />
      <rect x="13.5" y="4.2" width="6.3" height="6.3" rx="1.4" />
      <rect x="4.2" y="13.5" width="6.3" height="6.3" rx="1.4" />
      <rect x="13.5" y="13.5" width="6.3" height="6.3" rx="1.4" />
    </Svg>
  )
}

export function EyeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.4 12s3.6-6.6 9.6-6.6S21.6 12 21.6 12s-3.6 6.6-9.6 6.6S2.4 12 2.4 12Z" />
      <circle cx="12" cy="12" r="2.7" />
    </Svg>
  )
}

export function EyeOffIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9.9 5.7a7.9 7.9 0 0 1 2.1-.3c6 0 9.6 6.6 9.6 6.6a16 16 0 0 1-2.4 3.3" />
      <path d="M6.3 7.5A15.8 15.8 0 0 0 2.4 12s3.6 6.6 9.6 6.6a8.6 8.6 0 0 0 3.6-.78" />
      <path d="M10.1 10.1a2.7 2.7 0 0 0 3.8 3.8" />
      <path d="m4.2 4.2 15.6 15.6" />
    </Svg>
  )
}

export function PaletteIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.6a8.4 8.4 0 0 0 0 16.8c.9 0 1.5-.7 1.5-1.5 0-.4-.15-.75-.4-1a1.45 1.45 0 0 1 1.05-2.5h1.75a4.5 4.5 0 0 0 4.5-4.5c0-4-4.2-7.3-8.4-7.3Z" />
      <circle cx="7.8" cy="11.4" r="1" />
      <circle cx="11.4" cy="7.8" r="1" />
      <circle cx="15.6" cy="9.6" r="1" />
    </Svg>
  )
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.4" width="18" height="13.2" rx="2.2" />
      <path d="m3.6 7.2 7.35 5.06a1.85 1.85 0 0 0 2.1 0L20.4 7.2" />
    </Svg>
  )
}

export function LogoutIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14.4 7.2V5.7a1.5 1.5 0 0 0-1.5-1.5H5.7a1.5 1.5 0 0 0-1.5 1.5v12.6a1.5 1.5 0 0 0 1.5 1.5h7.2a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
      <path d="M9.6 12h10.2" />
      <path d="m16.8 8.4 3.6 3.6-3.6 3.6" />
    </Svg>
  )
}

export function PencilIcon(props) {
  return (
    <Svg {...props}>
      <path d="M16.5 4.8a2.05 2.05 0 0 1 2.9 2.9L8.4 18.7l-3.9 1 1-3.9L16.5 4.8Z" />
    </Svg>
  )
}
