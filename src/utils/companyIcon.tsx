export function CompanyIcon({ company }: { company: string }) {
  if (!company) return null;

  const firstLetter = company.charAt(0).toUpperCase();

  const gradients = [
    "from-emerald-400 to-emerald-600",
    "from-cyan-400 to-cyan-600",
    "from-blue-500 to-blue-700",
    "from-red-400 to-red-600",
    "from-purple-400 to-purple-600",
    "from-yellow-500 to-yellow-700",
  ];

  const gradientIndex = company.length % gradients.length;

  return (
    <div
      className={`w-10 h-10 bg-gradient-to-br ${gradients[gradientIndex]} 
      rounded-lg flex items-center justify-center text-white font-semibold`}
    >
      {firstLetter}
    </div>
  );
}
