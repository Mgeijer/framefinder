'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{question}</h3>
          <span className="text-2xl transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
            +
          </span>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <p className="text-muted-foreground">
            {answer}
          </p>
        </CardContent>
      )}
    </Card>
  );
}