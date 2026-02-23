import CreateLinkForm from "@/components/create-link/CreateLinkForm";

export default function CreatePage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-24 noise-bg relative">
            {/* Background glows */}
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#ff2d2d]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-[#00ff88]/3 rounded-full blur-[100px] pointer-events-none" />

            <CreateLinkForm />
        </main>
    );
}
