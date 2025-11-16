export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 card">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
