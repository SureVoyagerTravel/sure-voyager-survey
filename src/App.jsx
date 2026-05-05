import { useState } from "react";

const STAR_CHOICES = [1, 2, 3, 4, 5];
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ken@voyagertravel.co.za";
const LOGO_URL = "https://explore.surevoyagertravel.co.za/wp-content/uploads/sure-voyager-travel-logo-500.png";

function StarRating({ name, value, onChange }) {
  return (
    <div className="flex gap-2">
      {STAR_CHOICES.map((star) => (
        <button
          key={`${name}-${star}`}
          type="button"
          onClick={() => onChange(star)}
          className="text-3xl leading-none transition hover:scale-105"
          aria-label={`Rate ${star} out of 5`}
        >
          <span className={star <= value ? "text-amber-400" : "text-slate-300"}>★</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const params = new URLSearchParams(window.location.search);
  const initialRating = Number(params.get("rating")) || 0;
  const firstName = params.get("fname") || "there";

  const [formData, setFormData] = useState({
    tripExperience: initialRating,
    activitiesRating: 0,
    mainHighlights: "",
    serviceRating: 0,
    memorableMoment: "",
    quotePermission: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("First Name From Link", firstName);
    payload.append("Trip Experience Rating", String(formData.tripExperience));
    payload.append("Planned Activities Rating", String(formData.activitiesRating));
    payload.append("Main Highlights", formData.mainHighlights);
    payload.append("Sure Voyager Service Rating", String(formData.serviceRating));
    payload.append("Most Memorable Moment", formData.memorableMoment);
    payload.append(
      "Permission To Use Quote",
      formData.quotePermission === "yes" ? "Yes" : "No",
    );
    payload.append("_subject", "Japanese Grand Prix Survey Response");
    payload.append("_captcha", "false");
    payload.append("_template", "table");

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("Thanks, your feedback was sent successfully.");
      setFormData({
        tripExperience: 0,
        activitiesRating: 0,
        mainHighlights: "",
        serviceRating: 0,
        memorableMoment: "",
        quotePermission: "",
      });
    } catch (error) {
      setStatus("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <div className="rounded-xl bg-white p-6 shadow-lg md:p-10">
        <img
          src={LOGO_URL}
          alt="Sure Voyager Travel"
          className="mx-auto mb-4 h-auto w-60 object-contain"
        />
        <h1 className="text-center text-2xl font-semibold text-slate-800 md:text-3xl">
          <span className="block">Unilever</span>
          <span className="block">Japanese Gand Prix Tour - 2026</span>
        </h1>
        <div className="mx-auto mt-4 max-w-2xl text-center text-slate-700">
          <p className="mb-3">
            Hi {firstName}. I am really privileged to have you as part of our tour.
          </p>
          <p className="mb-3">
            It was a pleasure meeting you, and we hope your Japanese Grand Prix journey was
            unforgettable.
          </p>
          <p className="mb-3">
            Would you be so kind as to tell us about your tour experience?
          </p>
          <p className="mb-1">Regards</p>
          <p className="font-medium">Janet</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <section>
            <p className="mb-2 text-sm font-medium text-slate-700">
              How was your Japanese Grand Prix experience?
            </p>
            <StarRating
              name="tripExperience"
              value={formData.tripExperience}
              onChange={(value) => updateField("tripExperience", value)}
            />
          </section>

          <section>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Please rate the planned activities.
            </p>
            <StarRating
              name="activitiesRating"
              value={formData.activitiesRating}
              onChange={(value) => updateField("activitiesRating", value)}
            />
          </section>

          <label className="block text-sm font-medium text-slate-700">
            What were the main highlights of the Japanese Grand Prix experience?
            <textarea
              className="mt-2 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2"
              maxLength={2000}
              required
              value={formData.mainHighlights}
              onChange={(e) => updateField("mainHighlights", e.target.value)}
            />
          </label>

          <section>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Please rate the services provided by Sure Voyager Travel.
            </p>
            <StarRating
              name="serviceRating"
              value={formData.serviceRating}
              onChange={(value) => updateField("serviceRating", value)}
            />
          </section>

          <label className="block text-sm font-medium text-slate-700">
            What was the single most memorable, delicious, or unforgettable moment of the trip?
            <textarea
              className="mt-2 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2"
              maxLength={2000}
              required
              value={formData.memorableMoment}
              onChange={(e) => updateField("memorableMoment", e.target.value)}
            />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">
              Do we have your permission to use your quote in future marketing (with your first name only)?
            </legend>
            <div className="mt-2 flex gap-6 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="quotePermission"
                  value="yes"
                  checked={formData.quotePermission === "yes"}
                  onChange={(e) => updateField("quotePermission", e.target.value)}
                  required
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="quotePermission"
                  value="no"
                  checked={formData.quotePermission === "no"}
                  onChange={(e) => updateField("quotePermission", e.target.value)}
                  required
                />
                No
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto block rounded-md bg-rose-500 px-8 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {status && <p className="text-center text-sm text-slate-700">{status}</p>}
        </form>
      </div>
    </main>
  );
}

export default App;
