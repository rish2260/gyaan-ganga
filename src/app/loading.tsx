export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
            <div className="w-20 h-20 relative">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="mt-8 text-primary font-bold tracking-[0.3em] animate-pulse">
                LOADING EXPERIENCE
            </div>
        </div>
    );
}
