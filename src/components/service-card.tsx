// src/components/service-card.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type Service = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full text-center shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 flex flex-col bg-card group">
      <CardHeader className="items-center pt-6">
        <div className="p-3 bg-primary/10 rounded-full mb-2 group-hover:bg-primary/20 transition-colors duration-300">
           {React.cloneElement(service.icon as React.ReactElement, { className: "h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" })}
        </div>
        <CardTitle className="font-headline text-xl text-foreground group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow px-6 pb-6">
        <p className="text-muted-foreground text-sm">{service.description}</p>
      </CardContent>
    </Card>
  );
}
