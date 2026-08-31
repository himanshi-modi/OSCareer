function StepCard({ number, title, description }) {
  return (
    <div className="rounded-3xl border bg-career-border bg-career-card p-8">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-career-blue/10 text-lg font-bold text-career-blue">
        {number}
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default StepCard;