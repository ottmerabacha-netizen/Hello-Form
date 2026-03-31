export default function FormField({ label, name, type = 'text', value, onChange, onBlur, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
