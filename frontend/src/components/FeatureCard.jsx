function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-3xl border bg-career-border bg-career-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-800">

      
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue transition-all duration-300 group-hover:bg-career-blue group-hover:text-white">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      
      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;