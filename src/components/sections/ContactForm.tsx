"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceOptions } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Zadejte prosím jméno"),
  phone: z
    .string()
    .min(9, "Zadejte platné telefonní číslo")
    .regex(/^[+\d][\d\s]{8,}$/, "Zadejte platné telefonní číslo"),
  email: z.string().email("Zadejte platný e-mail").or(z.literal("")),
  service: z.string().min(1, "Vyberte službu"),
  message: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/40";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", service: "", message: "" },
  });

  const onSubmit = async () => {
    // Demo: no backend wired up yet. Simulate a successful submission.
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Děkujeme! Ozveme se vám co nejdříve.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Jméno a příjmení *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jan Novák"
            className={cn(fieldBase, errors.name ? "border-accent" : "border-line")}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-accent">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Telefon *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="775 444 443"
            className={cn(fieldBase, errors.phone ? "border-accent" : "border-line")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-accent">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jan@email.cz"
            className={cn(fieldBase, errors.email ? "border-accent" : "border-line")}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-accent">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
            Mám zájem o *
          </label>
          <select
            id="service"
            defaultValue=""
            className={cn(fieldBase, errors.service ? "border-accent" : "border-line")}
            {...register("service")}
          >
            <option value="" disabled>
              Vyberte službu
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1.5 text-xs text-accent">{errors.service.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Zpráva
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Napište nám, co potřebujete…"
          className={cn(fieldBase, "resize-none border-line")}
          {...register("message")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_8px_24px_rgba(192,0,10,0.25)] transition-all duration-200 hover:bg-accent-light hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Odesílám…" : "Odeslat poptávku"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
