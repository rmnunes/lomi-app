import Feature from "./Feature";

export default function FeaturesSection() {
  return (
    <section className="mt-16 sm:mt-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Key Features of Lomi</h2>
      <p className="text-white/70 mb-6 sm:mb-10 text-sm sm:text-base">
        Lomi offers a powerful platform to bring your projects to life with ease. Discover the core features designed to support your campaign from start to finish.
      </p>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <Feature
          icon={<span className="material-icons text-xl sm:text-2xl">monitor_heart</span>}
          title="Transparent Tracking"
          description="Monitor your campaign's progress with real-time updates and blockchain transparency, ensuring full visibility and accountability."
        />
        <Feature
          icon={<span className="material-icons text-xl sm:text-2xl">attach_money</span>}
          title="Secure Transactions"
          description="Enjoy secure and seamless financial transactions, thanks to blockchain technology that protects your funds and personal information."
        />
        <Feature
          icon={<span className="material-icons text-xl sm:text-2xl">support_agent</span>}
          title="Comprehensive Support"
          description="Access extensive resources and support throughout your campaign, ensuring you have the tools and guidance needed for success."
        />
        <Feature
          icon={<span className="material-icons text-xl sm:text-2xl">groups</span>}
          title="Community Engagement"
          description="Build and engage with a community of backers who are passionate about your project, fostering collaboration and support."
        />
      </div>
    </section>
  );
}
