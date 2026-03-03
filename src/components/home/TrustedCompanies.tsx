export default function TrustedCompanies() {
  const companies = [
    { name: "Google", logo: "G" },
    { name: "Intel", logo: "I" },
    { name: "AMD", logo: "A" },
    { name: "Tesla", logo: "T" },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-8 md:gap-20">
          <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Trusted by :</span>
          <div className="flex items-center gap-8 md:gap-16 flex-wrap justify-center">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold text-gray-600 text-sm"
              >
                {company.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
