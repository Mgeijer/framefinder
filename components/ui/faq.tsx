"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  showCategories?: boolean;
  className?: string;
}

export function FAQ({ items, showCategories = false, className = '' }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = showCategories 
    ? ['all', ...Array.from(new Set(items.map(item => item.category).filter(Boolean)))]
    : ['all'];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className={`space-y-6 ${className}`}>
      {showCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category || 'all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category === 'all' ? 'All Questions' : category}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isOpen = openItems.has(item.id);
          return (
            <Card key={item.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUpIcon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>
              {isOpen && (
                <CardContent className="pt-0 pb-6">
                  <div className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function FAQSection({ 
  title = "Frequently Asked Questions",
  description,
  items, 
  showCategories = false,
  className = '' 
}: {
  title?: string;
  description?: string;
  items: FAQItem[];
  showCategories?: boolean;
  className?: string;
}) {
  return (
    <section className={`px-4 py-16 ${className}`}>
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-4xl">
          <FAQ items={items} showCategories={showCategories} />
        </div>
      </div>
    </section>
  );
}