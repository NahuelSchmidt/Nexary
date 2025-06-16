// src/app/contact/page.tsx
"use client";

import { useActionState } from "react"; // Changed from "react-dom" and useFormState
import { useFormStatus } from "react-dom";
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
import { submitContactForm, type ContactFormState } from "./actions";
import { contactFormSchema } from "./schema";
import type { z } from "zod";
import Section from "@/components/layout/section-layout";
import { Mail, Loader2, AlertCircle } from "lucide-react";

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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
        </>
      ) : (
        <>
          Enviar Mensaje <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, initialState); // Changed to useActionState
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
        // For success, we don't show a toast as per the new requirement
        // We just log and reset the form
        console.log("Formulario enviado con éxito:", state.message);
        form.reset();
      } else {
        toast({
          title: "Error",
          description: state.message || "Algo salió mal.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast, form]);


  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
    <Section id="contact" title="Ponte en Contacto" className="pt-28 md:pt-36">
      <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
        ¿Tienes un proyecto en mente o simplemente quieres saludar? Nos encantaría saber de ti. Completa el formulario a continuación y nos pondremos en contacto lo antes posible.
      </p>
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Hablemos</CardTitle>
          <CardDescription>Cuéntanos sobre tu proyecto o consulta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" {...form.register("name")} placeholder="Juan Pérez" className={form.formState.errors.name ? "border-destructive" : ""} />
                {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" {...form.register("email")} placeholder="juan.perez@ejemplo.com" className={form.formState.errors.email ? "border-destructive" : ""} />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa (Opcional)</Label>
                <Input id="company" {...form.register("company")} placeholder="Tu Empresa S.A." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Tipo de Proyecto (Opcional)</Label>
                <Select name="projectType" onValueChange={(value) => form.setValue('projectType', value)}>
                  <SelectTrigger id="projectType" className="w-full">
                    <SelectValue placeholder="Selecciona el tipo de proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Desarrollo Web</SelectItem>
                    <SelectItem value="app-development">Desarrollo de Apps Móviles</SelectItem>
                    <SelectItem value="ui-ux-design">Diseño UI/UX</SelectItem>
                    <SelectItem value="consulting">Consultoría</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" {...form.register("message")} placeholder="Cuéntanos más sobre tu proyecto o cómo podemos ayudarte..." rows={5} className={form.formState.errors.message ? "border-destructive" : ""} />
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
