export default function Logo({ className = "", size = 32 }: { className?: string, size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Background Circle */}
            <circle cx="16" cy="16" r="16" fill="#9333ea" />

            {/* Cat Face Silhouette */}
            <path d="M16 25C20.4183 25 24 21.4183 24 17C24 14.5 22.5 12 20.5 11L21.5 6L17 8C16.6 8 16.3 8 16 8C15.7 8 15.4 8 15 8L10.5 6L11.5 11C9.5 12 8 14.5 8 17C8 21.4183 11.5817 25 16 25Z" fill="white" />

            {/* Star on Forehead */}
            <path d="M16 10L16.6 11.5H18.2L16.9 12.4L17.4 13.9L16 13L14.6 13.9L15.1 12.4L13.8 11.5H15.4L16 10Z" fill="#9333ea" />

            {/* Eyes */}
            <circle cx="13.5" cy="16.5" r="1.2" fill="#9333ea" />
            <circle cx="18.5" cy="16.5" r="1.2" fill="#9333ea" />

            {/* Nose */}
            <circle cx="16" cy="18.5" r="0.8" fill="#9333ea" />
        </svg>
    );
}
