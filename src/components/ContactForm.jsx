import { useContactForm } from '../hooks/useContactForm';
import FormField from './FormField';
import SubmitButton from './SubmitButton';

export default function ContactForm() {
  const { fields, errors, status, handleChange, handleBlur, handleSubmit, resetStatus } =
    useContactForm();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-1">Fill out the form and we'll be in touch shortly.</p>
        </div>

        {status === 'success' && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="font-medium">Message sent!</p>
              <p className="text-green-700 mt-0.5">
                We've received your details and sent a confirmation to your email.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✕</span>
            <div>
              <p className="font-medium">Something went wrong.</p>
              <p className="text-red-700 mt-0.5">
                Please try again or contact us directly.{' '}
                <button onClick={resetStatus} className="underline font-medium">
                  Dismiss
                </button>
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField
            label="Full Name"
            name="name"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            placeholder="Jane Smith"
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            placeholder="jane@example.com"
          />
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            placeholder="+1 800 555 0199"
          />

          <div className="mt-2">
            <SubmitButton loading={status === 'sending'} />
          </div>
        </form>
      </div>
    </div>
  );
}
