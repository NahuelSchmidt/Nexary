// src/app/tech-suggester/page.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getTechSuggestions, techSuggesterSchema, type TechSuggesterFormState } from "./actions";
import type { z } from "zod";
import Section from "@/components/layout/section-layout";
import { Sparkles, Cpu, Loader2, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";

type Inputs = z.infer<typeof techSuggesterSchema>;

const initialState: TechSuggesterFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto group">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          Get Suggestions <Cpu className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
        </>
      )}
    </Button>
  );
}

export default function TechSuggesterPage() {
  const [state, formAction] = useFormState(getTechSuggestions, initialState);
  const { toast } = useToast();

  const form = useForm<Inputs>({
    resolver: zodResolver(techSuggesterSchema),
    defaultValues: {
      projectDescription: "",
    },
  });

  useEffect(() => {
    if (state.message && !state.success && state.issues) {
       toast({
        title: "Validation Error",
        description: state.issues.join("\n") || "Please check your input.",
        variant: "destructive",
        action: <AlertCircle className="text-red-500" />,
      });
    } else if (state.message && !state.success && !state.issues) {
        toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
        action: <AlertCircle className="text-red-500" />,
      });
    }
    // Success toast is handled by the presence of suggestions below.
  }, [state, toast]);


  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
    <Section id="tech-suggester" title="AI-Powered Tech Suggester" className="pt-28 md:pt-36">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-subtle-pulse" />
        <p className="text-lg md:text-xl text-muted-foreground">
          Unsure which technologies are best for your next project? Describe your project idea, and our AI will provide tailored recommendations to get you started on the right path.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Describe Your Project</CardTitle>
          <CardDescription>Provide as much detail as possible for the best suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6" onSubmit={form.handleSubmit(() => formAction(new FormData(form.control._formRef.current)))}>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                {...form.register("projectDescription")}
                placeholder="e.g., A social media platform for pet owners, a real-time collaborative whiteboard, an e-commerce site for handmade crafts..."
                rows={8}
                className={form.formState.errors.projectDescription ? "border-destructive" : ""}
              />
              {form.formState.errors.projectDescription && (
                <p className="text-sm text-destructive">{form.formState.errors.projectDescription.message}</p>
              )}
            </div>
             {state.issues && !state.success && (
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

      {state.success && state.suggestions && (
        <ScrollAnimationWrapper className="mt-12 opacity-0" animationClass="animate-fade-in-up">
          <Card className="max-w-2xl mx-auto shadow-2xl bg-gradient-to-br from-primary/5 via-muted to-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <Lightbulb className="mr-3 h-7 w-7 text-accent" />
                Our Recommendations
              </CardTitle>
              <CardDescription>Based on your project description, here are some technologies we suggest:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">Suggested Technologies:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  {state.suggestions.suggestedTechnologies.map((tech, index) => (
                    <li key={index} className="text-base">{tech}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">Reasoning:</h4>
                <p className="text-muted-foreground whitespace-pre-line text-base">{state.suggestions.reasoning}</p>
              </div>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Note: These suggestions are AI-generated and should be used as a starting point. Consult with our experts for a detailed technical plan.
                </p>
              </CardFooter>
          </Card>
        </ScrollAnimationWrapper>
      )}
    </Section>
    </div>
  );
}
