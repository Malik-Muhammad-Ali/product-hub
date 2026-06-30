"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up to a real subscription endpoint once the backend exists.
    setSubmitted(true);
  }

  return (
    <section className="bg-emerald-900">
      <Reveal className="mx-auto max-w-(--container-luxe) px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
        <h2 className="font-display text-3xl text-cream-50 md:text-4xl">
          Join the journal.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-emerald-100">
          One considered email a week. No noise, no spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <p className="mt-8 font-display text-lg text-gold-400">
            You&apos;re on the list — welcome.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email address"
              className="border-cream-50/30 bg-transparent text-cream-50 placeholder:text-emerald-100 focus-visible:ring-gold-400"
            />
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gold-400 text-emerald-900 hover:bg-gold-400/90 sm:w-auto"
              >
                Subscribe
              </Button>
            </motion.div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
