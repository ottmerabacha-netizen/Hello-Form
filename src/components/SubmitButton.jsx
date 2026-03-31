export default function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg
        hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed
        transition-colors flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Sending…
        </>
      ) : (
        'Send Message'
      )}
    </button>
  );
}
