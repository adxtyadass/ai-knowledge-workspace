export default function AboutPage() {
    return(
            <div className="bg-[#fafafa] px-20 py-12 h-full">
                <h2 className="text-black font-semibold text-4xl border-b border-gray-200">About us</h2>
                <p className="mt-4 text-gray-600 text-md leading-6">Welcome to our AI Knowledge Workspace! We are dedicated to providing a comprehensive platform for managing and utilizing AI knowledge effectively. Our goal is to empower individuals and organizations with the tools they need to harness the power of artificial intelligence.</p>
                <div className="mt-4 flex justify-center"><img className="w-full rounded-lg" src="/assets/images/about_us.jpg" /></div>
            </div>
    )
}