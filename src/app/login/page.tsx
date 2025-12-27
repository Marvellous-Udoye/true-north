"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const handleRequestOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json();
      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.error || "Unable to authenticate email.");
      }

      const supabase = supabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        throw error;
      }

      toast.success("OTP sent to your email.");
      setStep("otp");
      setRemaining(120);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = supabaseBrowserClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        throw error;
      }

      toast.success("Logged in successfully.");
      window.location.href = "/dashboard";
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid OTP.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/assets/about-1.svg"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-1 items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-none border-none py-0">
          <CardHeader>
            <div className="flex flex-col items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo.jpeg"
                  alt="TrueNorth logo"
                  width={140}
                  height={20}
                  className="object-cover"
                />
              </Link>
              <CardTitle className="text-xl sm:text-2xl text-primary -mt-6">
                Admin Login
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-0">
            <p className="text-base text-center text-muted-foreground">
              {step === "email"
                ? "Enter your approved admin email to receive a one-time code."
                : "Enter the OTP sent to your email."}
            </p>
            {step === "email" ? (
              <form onSubmit={handleRequestOtp} className="space-y-6">
                <label className="grid gap-2 text-base font-medium text-primary">
                  Email address
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@truenorth.com"
                      autoComplete="email"
                      className="pl-11"
                      required
                    />
                  </div>
                </label>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending code..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <label className="grid text-base font-medium text-primary text-center">
                  <div className="flex items-center justify-center gap-3">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <InputOTPSlot key={index + 3} index={index + 3} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </label>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </Button>
                <div className="flex items-center justify-between text-sm text-center text-muted-foreground">
                  <span>
                    {remaining > 0
                      ? `Code expires in ${remaining}s`
                      : "Code expired, request a new one."}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtp("");
                    }}
                    className="transition hover:text-primary cursor-pointer"
                  >
                    Resend
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
