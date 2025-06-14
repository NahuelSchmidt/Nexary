// src/app/contact/page.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, submitContactForm, type ContactFormState } from "./actions";
import type { z } from "zod";
import Section from "@/components/layout/section-layout";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Inputs = z.infer<typeof contactFormSchema>;

const initialState: ContactFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto group">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          Send Message <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  const form = useForm<Inputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      projectType: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
          action: <CheckCircle className="text-green-500" />,
        });
        form.reset(); 
      } else {
        toast({
          title: "Error",
          description: state.message || "Something went wrong.",
          variant: "destructive",
          action: <AlertCircle className="text-red-500" />,
        });
      }
    }
  }, [state, toast, form]);


  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
    <Section id="contact" title="Get In Touch" className="pt-28 md:pt-36">
      <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
        Have a project in mind or just want to say hello? We'd love to hear from you. Fill out the form below, and we'll get back to you as soon as possible.
      </p>
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Let's Talk</CardTitle>
          <CardDescription>Tell us about your project or inquiry.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...form.register("name")} placeholder="John Doe" className={form.formState.errors.name ? "border-destructive" : ""} />
                {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...form.register("email")} placeholder="john.doe@example.com" className={form.formState.errors.email ? "border-destructive" : ""} />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" {...form.register("company")} placeholder="Your Company Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type (Optional)</Label>
                <Select name="projectType" onValueChange={(value) => form.setValue('projectType', value)}>
                  <SelectTrigger id="projectType" className="w-full">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="app-development">Mobile App Development</SelectItem>
                    <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" {...form.register("message")} placeholder="Tell us more about your project or how we can help..." rows={5} className={form.formState.errors.message ? "border-destructive" : ""} />
              {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
            </div>
            
            {state.issues && (
              <div className="text-sm text-destructive">
                <ul>
                  {state.issues.map((issue) => (
                    <li key={issue} className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 shrink-0" /> {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
    </div>
  );
}
