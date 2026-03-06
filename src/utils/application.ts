/* eslint-disable @typescript-eslint/no-explicit-any */
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export const exportToCSV = (data: any[], filename: string) => {
  const headers = [
    "Name",
    "Email",
    "Job Title",
    "Company",
    "Applied Date",
    "Cover Note",
  ];
  const csvData = data.map((app) => [
    app.name,
    app.email,
    app.job?.title || "N/A",
    app.job?.company || "N/A",
    new Date(app.createdAt).toLocaleDateString(),
    app.cover_note || "N/A",
  ]);

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
