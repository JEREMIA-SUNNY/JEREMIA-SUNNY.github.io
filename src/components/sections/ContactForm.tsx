"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseBody = await res.json().catch(() => null);

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (responseBody?.error === "not_configured") {
        setStatus("not_configured");
        return;
      }

      setStatus("error");
      setErrorMessage(
        responseBody?.error === "invalid_input"
          ? "Please fill in every field with a valid email address."
          : "Something went wrong sending that. Please try again."
      );
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending that. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-border bg-surface p-6 text-sm"
      >
        Thanks for reaching out — your message is on its way. I&apos;ll get back to you soon.
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 text-sm"
      >
        <p>The contact form isn&apos;t wired up to send email yet — reach out directly instead:</p>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 font-medium text-accent hover:underline"
        >
          <Mail size={16} /> {site.email}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      {status === "error" && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"} <Send size={16} />
      </Button>
    </form>
  );
}
